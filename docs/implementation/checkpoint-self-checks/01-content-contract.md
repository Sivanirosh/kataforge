# KF-CHK-01: Checkpoint Content Contract

Back-reference: [00-matrix.md](./00-matrix.md), row `KF-CHK-01`.

## Scope

Deliver the generic, production-ready content contract for authored Checkpoints. This slice adds configured Checkpoint directories, typed Markdown frontmatter, a Checkpoint loader, explicit Cursus `checkpoint` steps, and validation linking Checkpoints to existing Katas.

## Out Of Scope

- Runtime attempt storage and scoring behavior. Deferred to `KF-CHK-02`.
- Self-check UI rendering, locked states, sidebar scores, and review mode. Deferred to `KF-CHK-03`.
- Applied Algorithms content migration. Deferred to `KF-CHK-04`.
- Full connected browser verification. Deferred to `KF-CHK-05`.

## Data Model Changes

Add `checkpointDirs: string[]` to `KataForgeConfig`.

Base config should establish conventional Checkpoint directories alongside the
existing Lesson and Kata directories:

```ts
checkpointDirs: ['examples/checkpoints', 'packs/applied-algorithms-2026/checkpoints']
```

Older local overlays that omit `checkpointDirs` must continue to work by using
the base config value. A local overlay may still replace `checkpointDirs` when a
ProblemPack needs a custom authored-content layout.

Add a Checkpoint content model loaded from Markdown files:

```yaml
id: contains-duplicate-self-check
title: Contains Duplicate Self-check
attachedKataId: aa-contains-duplicate
questions:
  - id: q1
    prompt: Which invariant made the set solution work?
    choices:
      - id: a
        text: The set contains every value seen so far.
      - id: b
        text: The set contains only duplicate values.
    correctChoiceId: a
    explanation: The set records prior values so each new value can be checked in O(1).
reflections:
  - id: tradeoff
    prompt: When would sorting be preferable to a set here?
    expectedAnswer: When O(1) extra space is required and in-place sorting is allowed.
```

Rules:
- `id`, `title`, and `attachedKataId` are required.
- `questions` may be empty only for non-scored acknowledgement Checkpoints.
- Reflection-only Checkpoints are allowed, but a Checkpoint with no questions
  and no reflections is invalid.
- Each MCQ is single-answer only.
- Each `correctChoiceId` must match one choice in the same question.
- Choice ids are unique within a question.
- Question ids and reflection ids are unique within a Checkpoint.
- Unknown v1 fields in Checkpoint, question, choice, or reflection YAML are
  invalid so authoring mistakes do not silently ship.
- Markdown body content is reserved but unused in this slice. The typed YAML
  frontmatter is the runtime contract for MCQs and reflections; loaders must
  not depend on body parsing or body rendering semantics in `KF-CHK-01`.

Add Cursus step shape:

```json
{ "type": "checkpoint", "checkpointId": "contains-duplicate-self-check" }
```

## API Changes

No HTTP/API endpoints. This is static content loading and validation.

## Architecture Notes

The Checkpoint loader should return an indexed collection, not a bare array:

```ts
{
  all: Checkpoint[];
  byId: Map<string, Checkpoint>;
}
```

The exact TypeScript names can follow the existing loader style, but the module
interface should preserve both ordered iteration and direct id lookup. Duplicate
Checkpoint id validation stays local to the loader implementation instead of
forcing each caller to rebuild maps.

The Checkpoint loader should tolerate missing configured directories and treat
them as empty content sources. This lets base config name conventional
Checkpoint directories before every ProblemPack has authored Checkpoints.
Malformed Checkpoint files and duplicate Checkpoint ids still fail hard.

`loadAllCursus` should keep Cursus Steps as references in this slice. A
Checkpoint Step remains `{ "type": "checkpoint", "checkpointId": "..." }` after
schema parsing and validation; it is not enriched with Checkpoint content by
`KF-CHK-01`. The Checkpoint loader provides the indexed collection, and the
Cursus validation module checks references against it. Runtime resolution
belongs to the later Cursus runtime and Self-check UI work.

Introduce a small Cursus validation module in this slice. Its interface should
stay focused on authored content/reference invariants:

- referenced Lesson, Kata, and Checkpoint ids exist;
- each Checkpoint's `attachedKataId` exists;
- each Checkpoint Step appears immediately after the Kata Step it reinforces,
  in the same Module;
- duplicate ids are rejected where the loader can detect them locally.

The validation module should accept plain indexed collections, not loader
modules. The implementation can choose exact names, but the seam should look
conceptually like:

```ts
validateCursusContent(cursus, {
  lessonsById,
  katasById,
  checkpointsById,
});
```

`loadCursus` owns orchestration: loading the authored content, passing indexes
into the validation module, composing structured validation errors, and throwing
the final author-facing error at the loader seam. This keeps the validation
module pure, testable, and independent of filesystem loading.

The validation implementation should return structured validation errors rather
than throw. It should collect all Cursus content/reference errors it can find;
do not fail fast on the first invalid Step when later Steps can still be
checked. Structured errors should carry enough context for `loadCursus` to name
the Cursus id, Module id when available, the bad Step reference, and the
violated invariant.

Do not put Step identity, routing, browser history, progress keys, or navigation
invariants behind this module yet. Those belong to the later Cursus runtime and
Step identity module so the first Checkpoint slice keeps strong locality.

## UI States

No rendered UI in this slice.

Named UI states are explicitly deferred to `KF-CHK-03`: success, empty, loading, error, locked, active question, answered question, completed review, and retake.

## Migration / Backward Compatibility

Existing Cursus JSON containing only `lesson` and `kata` steps must continue to parse and load unchanged.

Existing Lesson Markdown remains loaded only by the Lesson loader. The five current untracked day-level Checkpoint drafts are not converted or policed in this slice.

Base config and local overlay behavior must remain backward compatible when `checkpointDirs` is missing from an older local config.

## Permissions Model

Not applicable. KataForge runs local static content and browser-local state for this feature.

## Test Plan

- Unit: `KataForgeConfig` includes `checkpointDirs`, and local config overlays can replace it.
- Unit: Checkpoint frontmatter schema accepts the v1 single-answer MCQ shape.
- Unit: schema rejects missing `attachedKataId`, duplicate choices, missing `correctChoiceId`, and invalid `correctChoiceId`.
- Unit: schema accepts reflection-only Checkpoints, rejects fully empty Checkpoints, and rejects unknown v1 fields.
- Unit: loader reads Checkpoint Markdown from every configured directory and rejects duplicate Checkpoint ids.
- Unit: loader treats missing configured Checkpoint directories as empty sources.
- Unit: Cursus schema accepts `checkpoint` steps and still accepts existing Lesson/Kata-only Cursus data.
- Unit: loaded Cursus Checkpoint steps remain reference-shaped and are not enriched with Checkpoint content.
- Unit: `loadAllCursus` rejects unknown `checkpointId`, unknown `attachedKataId`, and Checkpoint steps not immediately after their attached Kata.
- Unit: Cursus validation reports multiple content/reference errors in one author-facing failure.

## Workflow Acceptance Test

1. Author adds a temporary Checkpoint Markdown file with one MCQ and `attachedKataId: two-sum`.
2. Author adds `{ "type": "checkpoint", "checkpointId": "two-sum-self-check" }` immediately after `{ "type": "kata", "kataId": "two-sum" }` in a test Cursus.
3. The loader returns a Cursus whose flattened steps preserve Lesson, Kata, and Checkpoint reference order.
4. Edge condition: author moves the Checkpoint before the Kata or after a different Kata.
5. The loader rejects the Cursus with an error naming the misplaced Checkpoint and its attached Kata.
6. Invariant: existing Lesson/Kata-only Cursus fixtures still parse and load without requiring Checkpoints.

## Acceptance Criteria

- App parses Checkpoint Markdown from configured dirs.
- Cursus accepts explicit `checkpoint` steps.
- Validation catches duplicate ids, unknown checkpoint ids, unknown attached Kata ids, and misplaced Checkpoints.
- Existing Lesson/Kata Cursus content still loads.

## Definition Of Done

- [x] Data model changes applied: config, Cursus step schema, Checkpoint schema, loader, and validation module.
- [x] API endpoints explicitly not needed.
- [x] UI states explicitly deferred to `KF-CHK-03`; only type-safe fallback handling was added for the new Step variant.
- [x] Permissions explicitly not applicable.
- [x] Migration / backward-compatibility behavior verified.
- [x] Unit tests pass.
- [x] Workflow acceptance test passes through loader/validation coverage.
- [x] Architecture docs updated for the content contract decisions.
- [x] Invariants checked: duplicate ids, dangling references, invalid attachment, misplaced Checkpoints, empty Checkpoints, and unknown v1 fields.

## Open Questions

None. This slice is ready.

## Status

done
