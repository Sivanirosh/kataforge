# Acceptance Tests

Use this checklist before considering a release done.

## App startup

- [x] `pnpm install` completes *(CI: install step)*
- [ ] `pnpm dev` starts the app *(manual smoke)*
- [ ] Landing page loads without console errors *(manual; e2e covers render)*
- [x] `pnpm build` succeeds *(CI: build job)*

## Problem rendering

For each example kata (two-sum, fizzbuzz):

- [x] Title, difficulty, estimated time, tags visible *(e2e: `e2e/smoke.spec.ts`)*
- [x] Prompt body readable *(e2e: problem pages load markdown body)*
- [x] Starter code in Monaco *(e2e: `.monaco-editor` visible)*

## Code execution

With a correct solution:

- [ ] Run Samples passes visible tests *(manual — Pyodide first load is slow)*
- [ ] Submit passes all tests *(manual)*

With an incorrect solution:

- [ ] Run Samples shows understandable failure output *(manual)*
- [ ] Submit shows hidden pass/fail without expected/actual *(manual)*

## Error handling

- [x] Syntax error displayed; UI remains usable *(unit: `TestPanel.test.tsx`, `judgeHarness` tests)*
- [x] Missing function error displayed *(unit: judge harness)*
- [x] `while True: pass` times out and UI recovers *(unit: judge harness timeout)*

## Persistence

- [x] Code draft survives navigation between katas *(e2e: `e2e/smoke.spec.ts`)*
- [x] Timer survives reload (timed assessment) *(e2e: `e2e/smoke.spec.ts`)*
- [x] currentKataIndex survives reload (multi-Kata assessment) *(unit test: `storage.test.ts`)*
- [x] Navigator completion markers restore after reload when Submit passed all tests *(PRD-5)*
- [x] Reset restores starter code *(unit test: `storage.test.ts` — clearDraft)*

## Results

- [x] Results page shows accurate scores from localStorage *(e2e + `ResultsPage.test.tsx`)*
- [x] Hidden TestCases on results show pass/fail only *(PRD-6 `ResultSummary`)*
- [x] Retry assessment clears prior attempt *(e2e: `e2e/smoke.spec.ts`)*

## CI coverage

- [x] Unit tests (`pnpm test`) on push/PR
- [x] Production build (`pnpm build`) on push/PR
- [x] Playwright smoke tests (`pnpm test:e2e`) on push/PR
