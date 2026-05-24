# Living Spec — PRD-5: Assessment session orchestration

## Objective

Harden assessment session persistence: storage tests, navigator completion restore, submit assessment flow, index persistence, and landing resume/start-over UX.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-P5-1 | Completion derived from `loadResults` all-pass | Matches navigator semantics |
| AD-P5-2 | Keep **View Results** + add **Submit Assessment** | Human UX: finalize vs peek results |
| AD-P5-3 | Landing shows **Resume** + **Start Over** when session exists | Clear in-progress vs fresh attempt |
| AD-P5-4 | `clearAssessmentAttempt` clears session, score, drafts, results | Start over resets timer via new `startedAt` |

## Sub-unit Registry

| Issue | Title | Status |
|-------|-------|--------|
| #15 | Storage unit tests | **done** |
| #13 | Restore navigator completion | **done** |
| #28 | Verify currentKataIndex survives reload | **done** |
| #14 | Submit Assessment header action | **done** |
| #33 | Start fresh vs resume | **done** |

## Integration Log

- **#15**: `storage.test.ts` with localStorage mock — drafts, session, timer, completion, start-over.
- **#13**: `loadKataCompletionMap` restores navigator done state on mount.
- **#28**: Session index round-trip test; acceptance checklist updated.
- **#14**: Submit Assessment button sets `submitted: true` and navigates to results.
- **#33**: `AssessmentStartActions` on landing with Resume + Start Over.
