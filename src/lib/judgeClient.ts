import type { JudgeRequest, JudgeResponse } from './configTypes';

type PendingRun = {
  request: JudgeRequest;
  resolve: (response: JudgeResponse) => void;
  safetyTimer: ReturnType<typeof setTimeout>;
};

export class JudgeClient {
  private worker: Worker | null = null;
  private pending: PendingRun | null = null;

  private createWorker(): Worker {
    return new Worker(new URL('../workers/pyodideJudge.worker.ts', import.meta.url), {
      type: 'module',
    });
  }

  private resetWorker(): void {
    this.worker?.terminate();
    this.worker = null;
  }

  private ensureWorker(): Worker {
    if (!this.worker) {
      this.worker = this.createWorker();
      this.worker.onmessage = (event: MessageEvent<JudgeResponse>) => {
        if (!this.pending) return;
        const { resolve, safetyTimer, request } = this.pending;
        if (event.data.requestId !== request.requestId) return;

        clearTimeout(safetyTimer);
        this.pending = null;
        resolve(event.data);
      };
      this.worker.onerror = () => {
        if (!this.pending) {
          this.resetWorker();
          return;
        }

        const { resolve, safetyTimer, request } = this.pending;
        clearTimeout(safetyTimer);
        this.pending = null;
        this.resetWorker();
        resolve({
          requestId: request.requestId,
          results: [],
          error: 'Worker failed to execute',
        });
      };
    }
    return this.worker;
  }

  async run(request: JudgeRequest): Promise<JudgeResponse> {
    const safetyTimeout =
      request.timeoutMs * Math.max(request.tests.length, 1) + 10000;

    return new Promise((resolve) => {
      const safetyTimer = setTimeout(() => {
        if (!this.pending) return;
        this.pending = null;
        this.resetWorker();
        resolve({
          requestId: request.requestId,
          results: request.tests.map((test) => ({
            testId: test.id,
            name: test.name,
            hidden: test.hidden,
            status: 'timeout',
            durationMs: request.timeoutMs,
            errorCategory: 'timeout',
          })),
        });
      }, safetyTimeout);

      this.pending = { request, resolve, safetyTimer };
      this.ensureWorker().postMessage(request);
    });
  }
}

export const judgeClient = new JudgeClient();
