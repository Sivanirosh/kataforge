# KF-CHK-04: Applied Algorithms Self-check Authoring

Back-reference: [00-matrix.md](./00-matrix.md), row `KF-CHK-04`.

## Scope

Convert Applied Algorithms day-level Checkpoint draft material into per-Kata Self-check content and wire explicit `checkpoint` Steps into the Applied Algorithms Cursus sequence.

## Out Of Scope

- Generic Checkpoint schema/loader. Delivered by `KF-CHK-01`.
- Runtime and UI implementation. Delivered by `KF-CHK-02` and `KF-CHK-03`.
- Platform-wide enforcement that every Cursus must have Checkpoints. Explicitly deferred.
- Broad historical/fun-fact content unless tightly tied to the immediately preceding Kata.

## Data Model Changes

No new generic model changes expected. This slice creates authored Checkpoint Markdown files under the Applied Algorithms pack and updates its Cursus JSON.

## API Changes

No HTTP/API endpoints.

## UI States

Uses UI states implemented in `KF-CHK-03`. Content must avoid creating pathological layouts:

- overly long prompts
- choice text that cannot fit compact cards
- reflections that read like full lessons
- missing explanations

## Migration / Backward Compatibility

The five current day-level Checkpoint drafts are source material, not final content units. They should be split into per-Kata Self-checks or moved into non-scored Lesson summaries where appropriate.

Existing Katas and Lessons must keep their ids unless there is a deliberate content migration note.

## Permissions Model

Not applicable.

## Test Plan

- Content validation: every authored Checkpoint id is unique.
- Content validation: every `attachedKataId` exists.
- Content validation: every Applied Algorithms Checkpoint Step appears immediately after its attached Kata.
- Content review: each Self-check is 2-4 minutes, usually 1-2 MCQs and at most one reflection spoiler.
- Browser smoke: Day 1 representative path loads Kata -> Self-check -> next Kata.

## Workflow Acceptance Test

1. Learner opens the Applied Algorithms Cursus and completes the first Day 1 Kata.
2. System unlocks the immediately following Self-check for that Kata.
3. Learner answers 1-2 MCQs and continues to the next Kata.
4. Edge condition: a day-level draft contains a broad toolbox table that would make a Self-check too long.
5. Author moves that table into a Lesson or summary instead of the per-Kata Self-check.
6. Invariant: each Self-check remains anchored to the immediately preceding Kata and stays within the 2-4 minute content budget.

## Acceptance Criteria

- Applied Algorithms Cursus has explicit per-Kata Checkpoint Steps for the deliberate-practice cadence.
- Day-level drafts are split or converted into Lessons/summaries.
- Each Self-check follows the schema and size contract.
- Representative real Cursus path works in browser checks.

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

None blocking, after `KF-CHK-01` through `KF-CHK-03` are done.

## Status

planned
