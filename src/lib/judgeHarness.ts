import { deepEqual } from './compare';
import type {
  JudgeErrorCategory,
  JudgeRequest,
  JudgeResponse,
  TestCase,
  TestResult,
} from './configTypes';

export interface PyodideRunner {
  runPythonAsync: (code: string) => Promise<unknown>;
  setInterruptBuffer?: (buffer: Uint8Array) => void;
}

type PythonRunPayload = {
  ok: boolean;
  result?: unknown;
  stdout?: string;
  error?: string;
  category?: JudgeErrorCategory;
};

export function supportsSharedInterruptBuffer(): boolean {
  return typeof SharedArrayBuffer !== 'undefined';
}

export function createInterruptBuffer(): Uint8Array {
  if (supportsSharedInterruptBuffer()) {
    return new Uint8Array(new SharedArrayBuffer(1));
  }
  return new Uint8Array(1);
}

export function buildPythonRunner(
  code: string,
  functionName: string,
  test: TestCase,
): string {
  return `
import sys
import io
import traceback
import json

def __run_test():
    namespace = {}
    stdout_buffer = io.StringIO()
    old_stdout = sys.stdout
    sys.stdout = stdout_buffer
    try:
        exec(${JSON.stringify(code)}, namespace)
        fn = namespace[${JSON.stringify(functionName)}]
        args = json.loads(${JSON.stringify(JSON.stringify(test.args))})
        result = fn(*args)
        return json.dumps({
            "ok": True,
            "result": result,
            "stdout": stdout_buffer.getvalue()
        })
    except SyntaxError:
        return json.dumps({"ok": False, "category": "syntax_error", "error": traceback.format_exc(), "stdout": stdout_buffer.getvalue()})
    except KeyError:
        return json.dumps({"ok": False, "category": "missing_function", "error": traceback.format_exc(), "stdout": stdout_buffer.getvalue()})
    except KeyboardInterrupt:
        return json.dumps({"ok": False, "category": "timeout", "error": "Execution timed out", "stdout": stdout_buffer.getvalue()})
    except Exception:
        return json.dumps({"ok": False, "category": "runtime_error", "error": traceback.format_exc(), "stdout": stdout_buffer.getvalue()})
    finally:
        sys.stdout = old_stdout

__run_test()
`;
}

export function parseRunnerOutput(
  raw: unknown,
  test: TestCase,
  durationMs: number,
): Omit<TestResult, 'testId' | 'name' | 'hidden'> {
  const parsed = JSON.parse(String(raw)) as PythonRunPayload;

  if (!parsed.ok) {
    const category = parsed.category ?? 'runtime_error';
    if (category === 'timeout') {
      return {
        status: 'timeout',
        errorCategory: 'timeout',
        durationMs,
      };
    }
    return {
      status: 'error',
      error: parsed.error,
      errorCategory: category,
      stdout: parsed.stdout,
      durationMs,
    };
  }

  const actual = parsed.result;
  const passed = deepEqual(actual, test.expected);
  return {
    status: passed ? 'passed' : 'failed',
    expected: test.expected,
    actual,
    stdout: parsed.stdout,
    durationMs,
  };
}

export function applyHiddenRedaction(
  result: TestResult,
  revealHiddenDetails: boolean,
): TestResult {
  if (!result.hidden || revealHiddenDetails) {
    return result;
  }

  const redacted: TestResult = { ...result };
  delete redacted.expected;
  delete redacted.actual;
  delete redacted.stdout;
  if (redacted.status !== 'passed') {
    delete redacted.error;
  }
  return redacted;
}

export async function runSingleTest(
  pyodide: PyodideRunner,
  code: string,
  functionName: string,
  test: TestCase,
): Promise<Omit<TestResult, 'testId' | 'name' | 'hidden'>> {
  const start = performance.now();
  const runner = buildPythonRunner(code, functionName, test);

  try {
    const raw = await pyodide.runPythonAsync(runner);
    return parseRunnerOutput(raw, test, Math.round(performance.now() - start));
  } catch (err) {
    return {
      status: 'error',
      error: err instanceof Error ? err.message : String(err),
      errorCategory: 'internal_error',
      durationMs: Math.round(performance.now() - start),
    };
  }
}

export async function runSingleTestWithTimeout(
  pyodide: PyodideRunner,
  interruptBuffer: Uint8Array,
  code: string,
  functionName: string,
  test: TestCase,
  timeoutMs: number,
): Promise<Omit<TestResult, 'testId' | 'name' | 'hidden'>> {
  const canInterrupt = interruptBuffer.buffer instanceof SharedArrayBuffer;
  interruptBuffer[0] = 0;

  const timeoutResult = new Promise<Omit<TestResult, 'testId' | 'name' | 'hidden'>>(
    (resolve) => {
      setTimeout(() => {
        if (canInterrupt) {
          interruptBuffer[0] = 2;
        }
        resolve({
          status: 'timeout',
          errorCategory: 'timeout',
          durationMs: timeoutMs,
        });
      }, timeoutMs);
    },
  );

  const runResult = runSingleTest(pyodide, code, functionName, test).then((result) => {
    if (result.status === 'timeout') {
      return {
        status: 'timeout' as const,
        errorCategory: 'timeout' as const,
        durationMs: timeoutMs,
      };
    }
    return result;
  });

  const result = await Promise.race([runResult, timeoutResult]);
  interruptBuffer[0] = 0;
  return result;
}

export async function executeJudgeRequest(
  pyodide: PyodideRunner,
  interruptBuffer: Uint8Array,
  request: JudgeRequest,
): Promise<JudgeResponse> {
  const results: TestResult[] = [];

  for (const test of request.tests) {
    const partial = await runSingleTestWithTimeout(
      pyodide,
      interruptBuffer,
      request.code,
      request.functionName,
      test,
      request.timeoutMs,
    );

    const result = applyHiddenRedaction(
      {
        testId: test.id,
        name: test.name,
        hidden: test.hidden,
        ...partial,
      },
      request.revealHiddenDetails,
    );

    results.push(result);
  }

  return { requestId: request.requestId, results };
}
