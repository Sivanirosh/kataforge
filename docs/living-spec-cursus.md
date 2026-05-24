# Living Spec — Cursus learning paths

## Objective

Add Vercel Academy–style **Cursus** routes with Module 1 (Agent Loop): three lessons and three Python analog katas.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| ADR-0001 | Cursus separate from Assessment | Mixed step types; different progress model |
| ADR-0002 | Cursus UI uses shared `global.css` | Matches landing/assessment visual system |
| AD-C1 | Flat global step index in URLs | `/cursus/{id}/step/{n}` simplifies navigation |
| AD-C2 | Step key `{moduleId}:{stepIndex}` in progress | Stable across content edits within a module |

## Sub-unit Registry

| Issue | Title | Status |
|-------|-------|--------|
| C-1 | Schema + loaders + config dirs | **done** |
| C-2 | Tailwind/shadcn Cursus shell | **done** |
| C-3 | Cursus progress storage + nav | **done** |
| C-4 | Lesson step renderer | **done** |
| C-5 | Kata step embed | **done** |
| C-6 | Module 1 content | **done** |
| C-7 | Landing + e2e | **done** |

## Design reference

- Evidence: `sources/evidence/design-extract-vercel-academy/vercel-academy-design-language.md`
- Vendor: `Manavarya09/design-extract` (repo survey rank 8)
