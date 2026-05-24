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
| #8 | Add schema edge-case unit tests | **done** | Commit `277243e` |
| #22 | Reuse problemSchema in Astro content collection | **done** | Commit `8851ec6` (interim; removed in #29) |
| #24 | Fail build on duplicate Kata IDs | **done** | Commit `22d36b1` |
| #25 | Validate Assessment kataIds | **done** | Commit `2785597` |
| #29 | Consolidate to single Kata load pipeline | **done** | Option B; commit `2243d9b` |

## Integration Log

- **#8**: Extended `problemSchema.test.ts` — 17 tests total.
- **#22**: Shared `problemSchema` in content collection; Astro JSON schema warning noted.
- **#24**: `loadKatas` throws on duplicate id with both paths; unit test added.
- **#25**: `loadAssessments` cross-checks kataIds against `loadKataMap`.
- **#29**: Removed `content.config.ts`; pages validate via `loadKatas`/`loadAssessments` at build. Decision AD-P2-4 documented in architecture.md.
