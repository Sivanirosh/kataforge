# Acceptance Tests

Use this checklist before considering a release done.

## App startup

- [ ] `pnpm install` completes
- [ ] `pnpm dev` starts the app
- [ ] Landing page loads without console errors
- [ ] `pnpm build` succeeds

## Problem rendering

For each example kata (two-sum, fizzbuzz):

- [ ] Title, difficulty, estimated time, tags visible
- [ ] Prompt body readable
- [ ] Starter code in Monaco

## Code execution

With a correct solution:

- [ ] Run Samples passes visible tests
- [ ] Submit passes all tests

With an incorrect solution:

- [ ] Run Samples shows understandable failure output
- [ ] Submit shows hidden pass/fail without expected/actual

## Error handling

- [ ] Syntax error displayed; UI remains usable
- [ ] Missing function error displayed
- [ ] `while True: pass` times out and UI recovers

## Persistence

- [x] Code draft survives navigation between katas *(e2e: `e2e/smoke.spec.ts`)*
- [x] Timer survives reload (timed assessment) *(manual; same storage layer covered by unit tests)*
- [x] currentKataIndex survives reload (multi-Kata assessment) *(unit test: `storage.test.ts`)*
- [x] Navigator completion markers restore after reload when Submit passed all tests *(PRD-5)*
- [ ] Reset restores starter code

## Results

- [x] Results page shows accurate scores from localStorage *(e2e + `ResultsPage.test.tsx`)*
- [x] Hidden TestCases on results show pass/fail only *(PRD-6 `ResultSummary`)*
