import type {
  JudgeRequest,
  JudgeResponse,
  JudgeWorkerInboundMessage,
} from './configTypes';
import { createMainThreadInterruptBuffer } from './judgeHarness';

type PendingRun = {
  request: JudgeRequest;
  resolve: (response: JudgeResponse) => void;
  safetyTimer: ReturnType<typeof setTimeout>;
};

export class JudgeClient {
  private worker: Worker | null = null;
  private pending: PendingRun | null = null;
  private configured = false;

  private createWorker(): Worker {
    return new Worker(new URL('../workers/pyodideJudge.worker.ts', import.meta.url), {
      type: 'module',
    });
  }

  private resetWorker(): void {
    this.worker?.terminate();
    this.worker = null;
    this.configured = false;
  }

  private configureWorker(worker: Worker): void {
    const interruptBuffer = createMainThreadInterruptBuffer();
    const message: JudgeWorkerInboundMessage = {
      type: 'configure',
      ...(interruptBuffer ? { interruptBuffer } : {}),
    };
    worker.postMessage(message);
    this.configured = true;
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
      this.worker.onerror = (event: ErrorEvent) => {
        if (!this.pending) {
          this.resetWorker();
          return;
        }

        const { resolve, safetyTimer, request } = this.pending;
        clearTimeout(safetyTimer);
        this.pending = null;
        this.resetWorker();
        const detail = event.message?.trim();
        resolve({
          requestId: request.requestId,
          results: [],
          error: detail || 'Worker failed to execute',
        });
      };
    }

    if (!this.configured) {
      this.configureWorker(this.worker);
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
      const message: JudgeWorkerInboundMessage = { type: 'run', request };
      this.ensureWorker().postMessage(message);
    });
  }
}

export const judgeClient = new JudgeClient();
