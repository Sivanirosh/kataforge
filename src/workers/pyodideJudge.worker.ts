import {
  createInterruptBuffer,
  executeJudgeRequest,
  supportsSharedInterruptBuffer,
} from '../lib/judgeHarness';
import type { JudgeRequest, JudgeResponse } from '../lib/configTypes';

const PYODIDE_VERSION = '0.27.7';
const PYODIDE_INDEX = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type PyodideInterface = Awaited<
  ReturnType<typeof import('pyodide')['loadPyodide']>
>;

let pyodideInstance: PyodideInterface | null = null;
const interruptBuffer = createInterruptBuffer();

async function getPyodide(): Promise<PyodideInterface> {
  if (!pyodideInstance) {
    const { loadPyodide } = await import('pyodide');
    pyodideInstance = await loadPyodide({ indexURL: PYODIDE_INDEX });
    if (supportsSharedInterruptBuffer()) {
      pyodideInstance.setInterruptBuffer(interruptBuffer);
    }
  }
  return pyodideInstance;
}

self.onmessage = async (event: MessageEvent<JudgeRequest>) => {
  try {
    const pyodide = await getPyodide();
    const response = await executeJudgeRequest(pyodide, interruptBuffer, event.data);
    self.postMessage(response);
  } catch (err) {
    const response: JudgeResponse = {
      requestId: event.data.requestId,
      results: [],
      error: err instanceof Error ? err.message : String(err),
    };
    self.postMessage(response);
  }
};

export {};
