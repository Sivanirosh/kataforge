# Judge Engine

## MVP model

Pyodide inside a Web Worker executes Python in the browser.

## Lifecycle

1. UI sends code, function name, test cases, and timeout to the worker
2. Worker loads Pyodide once per worker instance (reused across runs in a session)
3. For each TestCase: fresh namespace, exec candidate code, call function, compare result in JS
4. Worker returns structured results per test

## Isolation

Candidate code is re-executed for each TestCase (no shared mutable globals between tests). This is the only supported isolation model.

## Timeouts

Each TestCase is capped at the request `timeoutMs` (RunSamples vs Submit). A hung test returns `status: timeout` for that case only; subsequent cases still run. Pyodide's interrupt buffer is used to stop runaway Python; the harness also races each test against a JS timer.

If the worker stops responding entirely, the client applies a safety timeout, terminates the worker, and recreates it on the next run.

Defaults (configurable in `kataforge.config.ts`):

- RunSamples: 2000 ms per test
- Submit: 3000 ms per test

## Error categories

- `syntax_error`
- `missing_function`
- `runtime_error`
- `timeout`
- `internal_error`

## Security note

Browser-side execution is acceptable for local practice. Hidden tests bundled in the client are not secret. For production multi-user deployments, use a sandboxed backend (see optional remote judge adapter).

## Test coverage

Judge harness logic (`judgeHarness.ts`) is covered by Vitest with a mocked Pyodide runner. The worker is a thin wrapper around `executeJudgeRequest`.
