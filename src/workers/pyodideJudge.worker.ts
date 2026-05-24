import {
  createLocalInterruptBuffer,
  executeJudgeRequest,
  isSharedInterruptBuffer,
} from '../lib/judgeHarness';
import type { JudgeResponse, JudgeWorkerInboundMessage } from '../lib/configTypes';

const PYODIDE_VERSION = '0.27.7';
const PYODIDE_INDEX = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type PyodideInterface = Awaited<
  ReturnType<typeof import('pyodide')['loadPyodide']>
>;

let pyodideInstance: PyodideInterface | null = null;
let interruptBuffer = createLocalInterruptBuffer();

function applyInterruptBuffer(pyodide: PyodideInterface): void {
  if (isSharedInterruptBuffer(interruptBuffer)) {
    pyodide.setInterruptBuffer(interruptBuffer);
  }
}

async function getPyodide(): Promise<PyodideInterface> {
  if (!pyodideInstance) {
    const { loadPyodide } = await import('pyodide');
    pyodideInstance = await loadPyodide({ indexURL: PYODIDE_INDEX });
    applyInterruptBuffer(pyodideInstance);
  }
  return pyodideInstance;
}

self.onmessage = async (event: MessageEvent<JudgeWorkerInboundMessage>) => {
  const message = event.data;

  if (message.type === 'configure') {
    if (message.interruptBuffer) {
      interruptBuffer = message.interruptBuffer;
    }
    if (pyodideInstance) {
      applyInterruptBuffer(pyodideInstance);
    }
    return;
  }

  try {
    const pyodide = await getPyodide();
    const response = await executeJudgeRequest(pyodide, interruptBuffer, message.request);
    self.postMessage(response);
  } catch (err) {
    const response: JudgeResponse = {
      requestId: message.request.requestId,
      results: [],
      error: err instanceof Error ? err.message : String(err),
    };
    self.postMessage(response);
  }
};

export {};
