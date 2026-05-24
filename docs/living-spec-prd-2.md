# Living Spec — PRD-2: Problem schema & content pipeline

## Objective

Harden the Kata and Assessment content pipeline: schema edge-case tests, unified validation, duplicate-ID detection, assessment kataId cross-checks, and a single production load path via `loadKatas` / `loadAssessments`.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-P2-1 | Reuse `problemSchema` / `testCaseSchema` from `problemSchema.ts` | Single source of truth for Zod rules |
| AD-P2-2 | Duplicate kata `id` throws with both file paths | Fail fast for authors |
| AD-P2-3 | `loadAssessments` validates every `kataId` against loaded kata map | No silent drops |
| AD-P2-4 | **Option B** for #29: drop Astro `problems` collection; validate via `loadKatas` at build | Pages already use `loadKatas`; `getCollection` unused |

## Interface Registry

| Symbol | Module | Contract |
|--------|--------|----------|
| `problemSchema` | `src/lib/problemSchema.ts` | Zod schema; `tests.min(1)`, `estimatedMinutes` positive int |
| `assessmentSchema` | `src/lib/problemSchema.ts` | Zod schema; `kataIds.min(1)` |
| `loadAllKatas()` | `src/lib/loadKatas.ts` | Throws on duplicate id; validates frontmatter |
| `loadAssessments()` | `src/lib/loadAssessments.ts` | Validates kataIds exist; throws with file + missing id |

## Dependency Graph

```text
#8  Schema edge-case tests (parallel start)
#22 Reuse problemSchema in content collection ← #7 done
#24 Duplicate kata ID throws ← #22
#25 Assessment kataId validation ← #24
#29 Consolidate to single pipeline ← #22, #24, #25
```

## Sub-unit Registry

| Issue | Title | Status | Notes |
|-------|-------|--------|-------|
| #8 | Add schema edge-case unit tests | IN-PROGRESS | No blockers |
| #22 | Reuse problemSchema in Astro content collection | PENDING | |
| #24 | Fail build on duplicate Kata IDs | PENDING | |
| #25 | Validate Assessment kataIds | PENDING | |
| #29 | Consolidate to single Kata load pipeline | PENDING | Option B pending feedback |

## Integration Log

_(updated per slice)_
