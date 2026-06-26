# KF-CHK-03: Self-check UI

Back-reference: [00-matrix.md](./00-matrix.md), row `KF-CHK-03`.

## Scope

Render Checkpoint Steps in Cursus as learner-facing Self-checks with locked state, one-at-a-time MCQ cards, immediate feedback, review mode, retake action, optional reflection spoilers, and compact sidebar score.

## Out Of Scope

- Content schema and loader. Delivered by `KF-CHK-01`.
- Runtime attempt persistence. Delivered by `KF-CHK-02`.
- Applied Algorithms full content migration. Deferred to `KF-CHK-04`.
- Embedding previous code or TestCase results in Self-checks. Explicitly deferred.

## Data Model Changes

No new content model changes expected beyond `KF-CHK-01` and attempt state from `KF-CHK-02`.

## API Changes

No HTTP/API endpoints.

## UI States

Must implement:

- success: active Self-check question card and completed review mode
- empty: Checkpoint with no MCQs uses acknowledgement action
- loading: hydrated Cursus shell before local storage attempt state is available
- error: missing Checkpoint or invalid runtime attempt state
- permission-denied: not applicable; replace with locked state for unsolved attached Kata
- edge states: locked direct URL, answered current question, last question summary, retake confirmation/start, optional reflection spoiler collapsed/expanded

## Migration / Backward Compatibility

Existing Lesson and Kata Steps continue rendering as they do now.

Existing Cursus sidebar remains navigable with additional `checkpoint` step kind.

## Permissions Model

Not applicable. Locked state is sequencing, not permission enforcement.

## Test Plan

- Component: locked Self-check shows attached Kata context and return action.
- Component: one MCQ is shown at a time.
- Component: selecting an answer locks choices and reveals explanation.
- Component: completion summary shows compact local score and Continue action.
- Component: completed Self-check reopens in review mode and offers Retake.
- Component: sidebar uses label `Self-check` and shows compact `correct/total` score only after completion.
- Accessibility: keyboard can choose answers, proceed, expand spoilers, and retake; status changes are announced appropriately.
- Browser workflow: solve a Kata, open unlocked Self-check, answer MCQs, continue to next Step.

## Workflow Acceptance Test

1. Learner directly opens a Self-check URL before solving its attached Kata.
2. System shows locked Self-check state with a primary action back to the attached Kata.
3. Learner completes the attached Kata successfully and opens the Self-check.
4. System shows one MCQ card with `After: {Kata title}` context; learner answers and sees immediate explanation.
5. Edge condition: learner reloads after answering the first of two MCQs.
6. System restores the locked first answer and resumes at the next unanswered MCQ.
7. Invariant: the sidebar marks the Kata complete and the Self-check in progress or complete without showing pass/fail grade badges.

## Acceptance Criteria

- Locked Self-check URL shows locked shell and return action.
- Unlocked Self-check shows one MCQ at a time.
- Selected answer locks and explanation reveals immediately.
- Completed Self-check reopens in review mode.
- Sidebar labels as Self-check and shows compact score after completion.

## Definition Of Done

- [ ] Data model changes applied and migrated, or explicitly not needed.
- [ ] API endpoints implemented with documented contracts, or explicitly not needed.
- [ ] All named UI states implemented: success, empty, loading, error, permission-denied, and edge states.
- [ ] Permissions enforced at the API layer, not only the UI, when permissions apply.
- [ ] Migration / backward-compatibility behavior verified.
- [ ] Unit tests pass.
- [ ] Workflow acceptance test passes.
- [ ] Docs updated: README, API reference, user-facing docs, or architecture docs as applicable.
- [ ] Invariants checked: data integrity, idempotency, no orphaned records, no dangling references, and project-specific invariants.

## Open Questions

None blocking, after `KF-CHK-01` and `KF-CHK-02` are done.

## Status

planned
