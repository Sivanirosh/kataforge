# KataForge — Full Visual Refresh (Task Index)

Canonical low-level implementation spec from Sonnet. Living specs (`docs/living-spec-prd-7.md` … `prd-11.md`) map tasks to PRDs and GitHub issues.

## PRD map

| PRD | Scope | Tasks |
|-----|-------|-------|
| PRD-7 | Design system foundation | 1, 2, 3, 4, 5, 16 |
| PRD-8 | Landing page | 6, 7 |
| PRD-9 | Assessment chrome | 8, 9, 10, 11, 14 |
| PRD-10 | Workspace panes | 12, 13 |
| PRD-11 | Results page | 15 |

Cross-cutting: Playwright selector updates after PRD-8/9/10 land (issue #57).

## Task quick reference

| Task | Priority | Primary files | Summary |
|------|----------|---------------|---------|
| 1 | P0 | `index.astro`, `assessment/[id].astro`, `results/[id].astro` | Load Geist Sans + Mono from jsDelivr CDN in all page heads |
| 2 | P0 | `global.css` `:root` | Deepen palette; indigo accent `#7c6df8`; new tokens (`--accent-glow`, `--header-h`, `--font-*`, `--radius-*`) |
| 3 | P0 | `global.css` | Body typography: Geist, font-feature-settings, heading letter-spacing, mono for code/timer |
| 4 | P0 | `global.css` | Button transitions, hover glows, focus-visible, disabled, `.btn-lg` |
| 5 | P1 | `global.css` | Card hover indigo glow; `border-radius: var(--radius-lg)` |
| 6 | P0 | `index.astro`, `global.css` | Full-width hero: dot-grid, radial glow, gradient title, CTA → `#assessments` |
| 7 | P1 | `index.astro`, `global.css` | Section headers: small-caps muted labels + separator |
| 8 | P0 | `AssessmentShell.tsx`, `global.css` | Header left \| center \| right; Submit/Results label shorten |
| 9 | P1 | `global.css` | Nav pills: 999px radius, active indigo dim fill |
| 10 | P1 | `global.css` | Timer pill; expired pulse animation + reduced-motion |
| 11 | P1 | `AssessmentShell.tsx`, `global.css` | Toolbar: group Run Samples + Submit; Reset right |
| 12 | P0 | `TestPanel.tsx`, `global.css` | Sticky header; ✓/✗ pills; 3px left accent bars |
| 13 | P1 | `global.css` | Sticky `.problem-header` in prompt pane |
| 14 | P2 | `global.css` | Slim amber expired banner |
| 15 | P1 | `global.css` | Results score hero card + gradient % + hidden test accents |
| 16 | P2 | `global.css` | Global 6px slim scrollbars |

## Global constraints (all tasks)

- Vanilla CSS only in `src/styles/global.css`; no new npm UI deps
- Do not change Judge, storage keys, routing, scoring logic
- Preserve Monaco shortcuts (Ctrl/Cmd+Enter, Ctrl/Cmd+Shift+Enter)
- Preserve `aria-live`, `role`, `aria-label` semantics
- Keep `@media (max-width: 900px)` breakpoint
- Monaco stays `vs-dark`; `src/pages/problem/[id].astro` out of scope

## Test impact (issue #57)

- `.landing-header h1` → `.hero-title` or `h1`
- `getByText('Submit Assessment')` → `getByRole('button', { name: 'Submit Assessment' })`
- `getByText('View Results')` → `getByText('Results')` in header
- `.test-panel-summary` now inside `.test-panel-header`

## Out of scope

Monaco theme, dark/light toggle, page transitions, global nav on landing, `problem/[id].astro`, npm Geist package.
