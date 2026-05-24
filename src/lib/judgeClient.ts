import type { JudgeRequest, JudgeResponse } from './configTypes';

export class JudgeClient {
  private worker: Worker | null = null;

  private createWorker(): Worker {
    return new Worker(new URL('../workers/pyodideJudge.worker.ts', import.meta.url), {
      type: 'module',
    });
  }

  async run(request: JudgeRequest): Promise<JudgeResponse> {
    const totalTimeout =
      request.timeoutMs * Math.max(request.tests.length, 1) + 5000;

    return new Promise((resolve) => {
      this.worker?.terminate();
      this.worker = this.createWorker();

      let settled = false;
      const finish = (response: JudgeResponse) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        this.worker?.terminate();
        this.worker = null;
        resolve(response);
      };

      const timer = setTimeout(() => {
        this.worker?.terminate();
        this.worker = null;
        finish({
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
      }, totalTimeout);

      this.worker.onmessage = (event: MessageEvent<JudgeResponse>) => {
        finish(event.data);
      };

      this.worker.onerror = () => {
        finish({
          requestId: request.requestId,
          results: [],
          error: 'Worker failed to execute',
        });
      };

      this.worker.postMessage(request);
    });
  }
}

export const judgeClient = new JudgeClient();
