# ADR-0002: Tailwind v4 and shadcn theme scoped to Cursus routes only

## Status

Accepted

## Context

KataForge assessment UI uses vanilla CSS in `src/styles/global.css` (visual refresh AD-P7-3). The Cursus shell targets Vercel Academy–like layout and tokens extracted via `designlang` into `sources/evidence/design-extract-vercel-academy/`.

Adopting Tailwind globally would force a large migration of AssessmentShell, TestPanel, and results pages.

## Decision

- Add Tailwind v4 via `@tailwindcss/vite` only where Cursus pages import `src/styles/cursus.css`.
- Base Cursus theme on extracted `vercel-academy-tailwind-v4.css` and `vercel-academy-shadcn-theme.css`.
- Assessment, problem, and results routes continue using `global.css` unchanged.

## Consequences

- Two CSS systems coexist; Cursus Astro layouts must not import `global.css` (except shared font links).
- Embedded kata steps inside Cursus may render Assessment workspace classes inside a Tailwind wrapper; visual seam is acceptable for v1.
- Design drift checks can re-run `designlang` against the academy URL and diff tokens under `sources/evidence/`.
