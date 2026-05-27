# Living Spec — PRD-6: Scoring, results & polish

## Objective

Complete results experience: persist scores, hidden test visibility, ResultsPage tests, retry semantics, README security, and Playwright smoke tests.

## Sub-unit Registry

| Issue | Title | Status |
|-------|-------|--------|
| #17 | README security note | **done** |
| #30 | Persist AssessmentScore | **done** |
| #16 | Hidden TestCase pass/fail on Results | **done** |
| #32 | ResultsPage integration test | **done** |
| #34 | Retry clears prior attempt | **done** |
| #35 | Playwright smoke tests | **done** | Local + CI (`e2e` job in `.github/workflows/ci.yml`) |

## Integration Log

- **#17**: README Security section with Pyodide, inspectable hidden tests, sandbox note.
- **#30**: `assessmentResults.ts` with `persistAssessmentScore`; Results + Submit Assessment persist score.
- **#16**: `ResultSummary` lists hidden tests pass/fail only; visible remain aggregated.
- **#32**: `ResultsPage.test.tsx` with happy-dom project in Vitest.
- **#34**: Retry uses `startFreshSession` before reopening assessment.
- **#35**: `e2e/smoke.spec.ts`, `pnpm test:e2e`, CI e2e job with Chromium install.
