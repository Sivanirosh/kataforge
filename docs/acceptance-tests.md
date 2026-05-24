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

- [ ] Code draft survives navigation between katas
- [ ] Timer survives reload (timed assessment)
- [ ] Reset restores starter code

## Results

- [ ] Results page shows accurate scores from localStorage
