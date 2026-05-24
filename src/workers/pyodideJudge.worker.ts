import { deepEqual } from '../lib/compare';
import type {
  JudgeErrorCategory,
  JudgeRequest,
  JudgeResponse,
  TestCase,
  TestResult,
} from '../lib/configTypes';

const PYODIDE_VERSION = '0.27.7';
const PYODIDE_INDEX = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type PyodideInterface = Awaited<
  ReturnType<typeof import('pyodide')['loadPyodide']>
>;

let pyodideInstance: PyodideInterface | null = null;

async function getPyodide(): Promise<PyodideInterface> {
  if (!pyodideInstance) {
    const { loadPyodide } = await import('pyodide');
    pyodideInstance = await loadPyodide({ indexURL: PYODIDE_INDEX });
  }
  return pyodideInstance;
}

async function runSingleTest(
  pyodide: PyodideInterface,
  code: string,
  functionName: string,
  test: TestCase,
): Promise<Omit<TestResult, 'testId' | 'name' | 'hidden'>> {
  const start = performance.now();
  const runner = `
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
    except SyntaxError as e:
        return json.dumps({"ok": False, "category": "syntax_error", "error": traceback.format_exc(), "stdout": stdout_buffer.getvalue()})
    except KeyError as e:
        return json.dumps({"ok": False, "category": "missing_function", "error": traceback.format_exc(), "stdout": stdout_buffer.getvalue()})
    except Exception:
        return json.dumps({"ok": False, "category": "runtime_error", "error": traceback.format_exc(), "stdout": stdout_buffer.getvalue()})
    finally:
        sys.stdout = old_stdout

__run_test()
`;
  try {
    const raw = await pyodide.runPythonAsync(runner);
    const parsed = JSON.parse(String(raw)) as {
      ok: boolean;
      result?: unknown;
      stdout?: string;
      error?: string;
      category?: JudgeErrorCategory;
    };
    const durationMs = Math.round(performance.now() - start);

    if (!parsed.ok) {
      return {
        status: 'error',
        error: parsed.error,
        errorCategory: parsed.category ?? 'runtime_error',
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
  } catch (err) {
    return {
      status: 'error',
      error: err instanceof Error ? err.message : String(err),
      errorCategory: 'internal_error',
      durationMs: Math.round(performance.now() - start),
    };
  }
}

async function handleRequest(request: JudgeRequest): Promise<JudgeResponse> {
  const pyodide = await getPyodide();
  const results: TestResult[] = [];

  for (const test of request.tests) {
    let result: TestResult;

    if (request.reexecPerTest) {
      const single = await runSingleTest(pyodide, request.code, request.functionName, test);
      result = {
        testId: test.id,
        name: test.name,
        hidden: test.hidden,
        ...single,
      };
    } else {
      // shared namespace path — not used in MVP but kept for config flexibility
      const single = await runSingleTest(pyodide, request.code, request.functionName, test);
      result = {
        testId: test.id,
        name: test.name,
        hidden: test.hidden,
        ...single,
      };
    }

    if (result.hidden && !request.revealHiddenDetails) {
      delete result.expected;
      delete result.actual;
      delete result.stdout;
      if (result.status !== 'passed') {
        delete result.error;
      }
    }

    results.push(result);
  }

  return { requestId: request.requestId, results };
}

self.onmessage = async (event: MessageEvent<JudgeRequest>) => {
  try {
    const response = await handleRequest(event.data);
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
