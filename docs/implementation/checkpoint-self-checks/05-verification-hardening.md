# KF-CHK-05: Verification And Hardening

Back-reference: [00-matrix.md](./00-matrix.md), row `KF-CHK-05`.

## Scope

Prove the Checkpoint feature is production-ready as a connected learner path. This slice runs the full validation gate, adds any missing workflow checks, and hardens edge cases found after content and UI are connected.

## Out Of Scope

- New Checkpoint product behavior not already accepted in ADRs.
- Broader product docs cleanup or restoration of unrelated deleted docs.
- Analytics, global grades, historical attempt charts, or platform-wide Checkpoint enforcement.

## Data Model Changes

No new model changes expected. Any change discovered here must be routed back to the owning slice or explicitly documented.

## API Changes

No HTTP/API endpoints expected.

## UI States

Verify, do not newly define, the states from `KF-CHK-03`:

- locked
- active question
- answered question
- completed review
- retake
- no-MCQ acknowledgement
- missing content error
- responsive/mobile layout

## Migration / Backward Compatibility

Verify existing standalone Kata, Assessment, Lesson, and Lesson/Kata-only Cursus flows still work.

Verify old local configs without `checkpointDirs` do not break.

## Permissions Model

Not applicable.

## Test Plan

- Run `pnpm lint`.
- Run `pnpm test`.
- Run `pnpm build`.
- Run browser checks for a real Cursus path after Applied Algorithms content is migrated.
- Inspect console/runtime errors for Self-check routes and existing Lesson/Kata routes.

## Workflow Acceptance Test

1. Learner starts the Applied Algorithms Cursus from the overview.
2. Learner completes a Kata and reaches the attached Self-check.
3. Learner answers MCQs, sees immediate explanations, receives local score, and continues to the next Kata.
4. Edge condition: learner opens the completed Self-check later and chooses Retake.
5. System overwrites the latest attempt and keeps Cursus completion/progress coherent.
6. Invariant: no global Cursus score is created, no Assessment score is mutated, and every Checkpoint still references an existing attached Kata.

## Acceptance Criteria

- Full validation gate passes.
- Real Cursus browser path is verified.
- No dangling Checkpoint/Kata references.
- Existing Lesson/Kata Cursus paths still work.
- Unrelated deleted docs remain untouched unless separately requested.

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

None yet. This slice cannot move to `ready` until `KF-CHK-01` through `KF-CHK-04` are done.

## Status

planned
