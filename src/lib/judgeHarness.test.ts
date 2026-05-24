import { afterEach, describe, expect, it, vi } from 'vitest';
import type { JudgeRequest, TestCase } from './configTypes';
import {
  applyHiddenRedaction,
  createInterruptBuffer,
  executeJudgeRequest,
  parseRunnerOutput,
  runSingleTestWithTimeout,
  type PyodideRunner,
} from './judgeHarness';

const FIZZBUZZ_CODE = `def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out
`;

const visibleFizzbuzzTests: TestCase[] = [
  {
    id: 'sample-1',
    name: 'n equals 5',
    hidden: false,
    args: [5],
    expected: ['1', '2', 'Fizz', '4', 'Buzz'],
  },
  {
    id: 'sample-2',
    name: 'n equals 15',
    hidden: false,
    args: [15],
    expected: [
      '1',
      '2',
      'Fizz',
      '4',
      'Buzz',
      'Fizz',
      '7',
      '8',
      'Fizz',
      'Buzz',
      '11',
      'Fizz',
      '13',
      '14',
      'FizzBuzz',
    ],
  },
];

function okPayload(result: unknown, stdout = '') {
  return JSON.stringify({ ok: true, result, stdout });
}

function errorPayload(category: string, error = 'traceback') {
  return JSON.stringify({ ok: false, category, error, stdout: '' });
}

function createMockPyodide(responses: unknown[]): PyodideRunner {
  const runPythonAsync = vi.fn();
  for (const response of responses) {
    if (response instanceof Error) {
      runPythonAsync.mockRejectedValueOnce(response);
    } else if (typeof response === 'function') {
      runPythonAsync.mockImplementationOnce(response as () => Promise<unknown>);
    } else {
      runPythonAsync.mockResolvedValueOnce(response);
    }
  }
  return { runPythonAsync };
}

describe('parseRunnerOutput', () => {
  it('returns failed with expected/actual for wrong answer', () => {
    const result = parseRunnerOutput(
      okPayload(['wrong']),
      { id: 't1', name: 't1', hidden: false, args: [5], expected: ['1'] },
      12,
    );
    expect(result.status).toBe('failed');
    expect(result.expected).toEqual(['1']);
    expect(result.actual).toEqual(['wrong']);
  });

  it('returns syntax_error category', () => {
    const result = parseRunnerOutput(
      errorPayload('syntax_error'),
      { id: 't1', name: 't1', hidden: false, args: [], expected: 1 },
      5,
    );
    expect(result.status).toBe('error');
    expect(result.errorCategory).toBe('syntax_error');
  });

  it('returns missing_function category', () => {
    const result = parseRunnerOutput(
      errorPayload('missing_function'),
      { id: 't1', name: 't1', hidden: false, args: [], expected: 1 },
      5,
    );
    expect(result.status).toBe('error');
    expect(result.errorCategory).toBe('missing_function');
  });
});

describe('applyHiddenRedaction', () => {
  it('omits expected/actual for hidden tests when details are hidden', () => {
    const redacted = applyHiddenRedaction(
      {
        testId: 'hidden-1',
        name: 'hidden',
        hidden: true,
        status: 'failed',
        expected: [1],
        actual: [2],
        stdout: 'out',
        durationMs: 1,
      },
      false,
    );
    expect(redacted.expected).toBeUndefined();
    expect(redacted.actual).toBeUndefined();
    expect(redacted.stdout).toBeUndefined();
  });
});

describe('executeJudgeRequest', () => {
  it('passes all visible fizzbuzz TestCases with a valid solution', async () => {
    const pyodide = createMockPyodide([
      okPayload(visibleFizzbuzzTests[0].expected),
      okPayload(visibleFizzbuzzTests[1].expected),
    ]);
    const request: JudgeRequest = {
      requestId: 'fizzbuzz-samples',
      language: 'python',
      code: FIZZBUZZ_CODE,
      functionName: 'fizzbuzz',
      tests: visibleFizzbuzzTests,
      timeoutMs: 2000,
      revealHiddenDetails: false,
    };

    const response = await executeJudgeRequest(
      pyodide,
      createInterruptBuffer(),
      request,
    );

    expect(response.results).toHaveLength(2);
    expect(response.results.every((r) => r.status === 'passed')).toBe(true);
  });

  it('redacts hidden TestCase fields when not passed', async () => {
    const pyodide = createMockPyodide([okPayload(['1'])]);
    const request: JudgeRequest = {
      requestId: 'hidden-submit',
      language: 'python',
      code: FIZZBUZZ_CODE,
      functionName: 'fizzbuzz',
      tests: [
        {
          id: 'hidden-1',
          name: 'n equals 1',
          hidden: true,
          args: [1],
          expected: ['1'],
        },
      ],
      timeoutMs: 3000,
      revealHiddenDetails: false,
    };

    const response = await executeJudgeRequest(
      pyodide,
      createInterruptBuffer(),
      request,
    );

    expect(response.results[0].status).toBe('passed');
    expect(response.results[0].expected).toBeUndefined();
    expect(response.results[0].actual).toBeUndefined();
  });
});

describe('runSingleTestWithTimeout', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('marks a hung test as timeout and allows subsequent tests to run', async () => {
    vi.useFakeTimers();
    const pyodide = createMockPyodide([
      () => new Promise(() => {}),
      okPayload(42),
    ]);
    const interruptBuffer = createInterruptBuffer();

    const hung = runSingleTestWithTimeout(
      pyodide,
      interruptBuffer,
      'def f():\\n    while True: pass',
      'f',
      { id: 'hang', name: 'hang', hidden: false, args: [], expected: 1 },
      100,
    );
    await vi.advanceTimersByTimeAsync(100);
    const timeoutResult = await hung;
    expect(timeoutResult.status).toBe('timeout');
    expect(timeoutResult.errorCategory).toBe('timeout');

    const followUp = await runSingleTestWithTimeout(
      pyodide,
      interruptBuffer,
      'def g(): return 42',
      'g',
      { id: 'ok', name: 'ok', hidden: false, args: [], expected: 42 },
      100,
    );
    expect(followUp.status).toBe('passed');
    expect(followUp.actual).toBe(42);
  });
});
