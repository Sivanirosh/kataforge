import { describe, expect, it, vi } from 'vitest';
import type { JudgeRequest, JudgeResponse, JudgeWorkerInboundMessage } from './configTypes';
import { JudgeClient } from './judgeClient';

class MockWorker {
  static instances: MockWorker[] = [];
  onmessage: ((event: MessageEvent<JudgeResponse>) => void) | null = null;
  onerror: (() => void) | null = null;
  terminated = false;

  constructor(_url: URL, _options?: WorkerOptions) {
    MockWorker.instances.push(this);
  }

  postMessage(payload: JudgeWorkerInboundMessage) {
    if (payload.type !== 'run') return;
    const request = payload.request;
    queueMicrotask(() => {
      this.onmessage?.({
        data: {
          requestId: request.requestId,
          results: request.tests.map((test) => ({
            testId: test.id,
            name: test.name,
            hidden: test.hidden,
            status: 'passed',
            durationMs: 1,
          })),
        },
      } as MessageEvent<JudgeResponse>);
    });
  }

  terminate() {
    this.terminated = true;
  }
}

describe('JudgeClient', () => {
  it('reuses the same worker across consecutive runs', async () => {
    vi.stubGlobal('Worker', MockWorker as unknown as typeof Worker);
    MockWorker.instances = [];

    const client = new JudgeClient();
    const request = (id: string): JudgeRequest => ({
      requestId: id,
      language: 'python',
      code: 'def f(): return 1',
      functionName: 'f',
      tests: [{ id: 't1', name: 't1', hidden: false, args: [], expected: 1 }],
      timeoutMs: 2000,
      revealHiddenDetails: false,
    });

    await client.run(request('run-1'));
    await client.run(request('run-2'));

    expect(MockWorker.instances).toHaveLength(1);
    expect(MockWorker.instances[0].terminated).toBe(false);

    vi.unstubAllGlobals();
  });
});
