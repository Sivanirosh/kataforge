# Judge Engine

## MVP model

Pyodide inside a Web Worker executes Python in the browser.

## Lifecycle

1. UI sends code, function name, test cases, and timeout to the worker
2. Worker loads Pyodide once per worker instance
3. For each TestCase: fresh namespace, exec candidate code, call function, compare result in JS
4. Worker returns structured results per test

## Isolation

Candidate code is re-executed for each TestCase (no shared mutable globals between tests).

## Timeouts

Enforced at the JS orchestration layer: if the worker does not respond in time, terminate and recreate it.

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
