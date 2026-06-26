# KF-CHK-02: Checkpoint Runtime Behavior

Back-reference: [00-matrix.md](./00-matrix.md), row `KF-CHK-02`.

## Scope

Deliver browser-local runtime behavior for Checkpoint attempts: selected answers, immediate scoring, latest-attempt persistence, retake overwrite, review data, and Soft Gate completion after all MCQs are answered.

## Out Of Scope

- Content schema and loader. Delivered by `KF-CHK-01`.
- Visual Self-check UI. Deferred to `KF-CHK-03`.
- Applied Algorithms content migration. Deferred to `KF-CHK-04`.
- Historical attempt analytics. Explicitly deferred.

## Data Model Changes

Add browser-local Checkpoint attempt state. Suggested shape:

```ts
interface CheckpointAttempt {
  checkpointId: string;
  selectedChoiceIds: Record<string, string>;
  correctByQuestionId: Record<string, boolean>;
  score: {
    correct: number;
    total: number;
  };
  attemptNumber: number;
  completedAt: number | null;
}
```

Retakes overwrite the latest stored attempt while incrementing `attemptNumber`.

## API Changes

No HTTP/API endpoints. Storage is local browser storage.

## UI States

No final UI in this slice, but runtime must support these future states:

- active unanswered attempt
- answered current question
- completed latest attempt
- retake initialized
- corrupted or missing local attempt data

## Migration / Backward Compatibility

Existing `CursusProgress`, Assessment scores, Kata drafts, and TestCase results must keep their current storage keys and behavior.

Corrupted Checkpoint attempt storage should be ignored or cleared without breaking Cursus loading.

## Permissions Model

Not applicable. Storage is local to the browser.

## Test Plan

- Unit: answer a question records selected choice and correctness.
- Unit: completion is false until all MCQs are answered.
- Unit: completion is true after all MCQs are answered and can mark the Checkpoint step complete.
- Unit: retake overwrites previous selected answers and increments attempt number.
- Unit: Checkpoint attempt storage never creates or mutates Assessment score keys.
- Unit: corrupted local storage returns a safe empty state.

## Workflow Acceptance Test

1. Learner starts a Checkpoint with two MCQs.
2. Learner answers the first MCQ incorrectly; runtime records the selection and locks the answer.
3. Learner answers the second MCQ correctly; runtime computes `1/2` and marks the Checkpoint complete.
4. Edge condition: local storage contains malformed JSON for the same Checkpoint on reload.
5. Runtime discards the malformed attempt and returns to a safe unanswered state.
6. Invariant: no `kataforge:score:*` Assessment score key is created by Checkpoint activity.

## Acceptance Criteria

- Latest attempt persists selected answers, correctness, score, completion timestamp, and attempt number.
- Retake overwrites latest attempt.
- Soft Gate completes after all MCQs are answered.
- No global Cursus score or Assessment result is created.

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

None blocking, after `KF-CHK-01` is done.

## Status

planned
