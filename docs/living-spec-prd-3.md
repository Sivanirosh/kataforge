# Living Spec — PRD-3: Browser judge engine (Pyodide worker)

## Objective

Harden the in-browser Judge: per-TestCase timeouts, warm worker reuse, integration tests, and remove dead `reexecPerTest` false stub.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-P3-1 | Per-test timeout via Pyodide interrupt buffer + `Promise.race` | One hung test must not block subsequent cases |
| AD-P3-2 | Extract `judgeHarness.ts` for worker + Vitest | Testable deep module without loading Pyodide in CI |
| AD-P3-3 | Keep worker warm between runs; terminate on safety timeout or fatal error | Avoid Pyodide cold start every Run/Submit |
| AD-P3-4 | **Option B** for #36: remove `reexecPerTest` flag | Re-exec per test is the only supported isolation model |

## Interface Registry

| Symbol | Module | Contract |
|--------|--------|----------|
| `executeJudgeRequest` | `src/lib/judgeHarness.ts` | Runs all tests with per-test timeout; applies hidden redaction |
| `runSingleTestWithTimeout` | `src/lib/judgeHarness.ts` | Returns `timeout` status when limit exceeded |
| `JudgeClient.run` | `src/lib/judgeClient.ts` | Reuses worker; safety timeout terminates worker |

## Dependency Graph

```text
#9  Per-TestCase timeout
 └── #26 Warm worker reuse
#10 Judge integration tests (parallel after harness extract)
#36 Remove reexecPerTest stub (independent)
```

## Sub-unit Registry

| Issue | Title | Status |
|-------|-------|--------|
| #9 | Enforce per-TestCase timeout | **done** |
| #10 | Add Judge integration tests | **done** |
| #26 | Reuse warm Pyodide worker | **done** |
| #36 | Remove reexecPerTest false mode | **done** |

## Integration Log

- **#9**: Extracted `judgeHarness.ts`; per-test timeout via interrupt buffer + `Promise.race`; worker delegates to harness.
- **#26**: `JudgeClient` keeps worker warm; terminates on safety timeout or fatal error only.
- **#10**: `judgeHarness.test.ts` (7 tests) + `judgeClient.test.ts` (warm reuse); 27 tests total.
- **#36**: Removed `reexecPerTest` from config/types/UI; documented re-exec-only model in `docs/judge-engine.md`.
