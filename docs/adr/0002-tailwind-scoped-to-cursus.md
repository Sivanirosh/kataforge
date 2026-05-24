# ADR-0002: Cursus UI harmonized with core app styles

## Status

Accepted (supersedes Tailwind-scoped Cursus styling)

## Context

Initial Cursus implementation used Tailwind v4 and tokens extracted from Vercel Academy (`sources/evidence/design-extract-vercel-academy/`). The core KataForge app uses indigo/vanilla CSS in `global.css` for landing, assessments, and results.

Two parallel CSS systems caused visual inconsistency (blue Vercel primary vs indigo accent, different cards, headers, and buttons).

## Decision

- Cursus pages import `global.css` and reuse existing patterns: `app-header`, `btn`, `card`, `landing-section`, `markdown-body`.
- Cursus-specific layout (sidebar, step list, lesson chrome) lives in namespaced rules under `.cursus-*` in `global.css`.
- Design-extract evidence remains for reference; it is not applied directly at runtime.
- Remove Tailwind from the build.

## Consequences

- One theme toggle and light/dark tokens apply everywhere.
- Cursus kata steps still embed `AssessmentShell` without style conflicts.
- Future UI polish updates `global.css` once for all surfaces.
