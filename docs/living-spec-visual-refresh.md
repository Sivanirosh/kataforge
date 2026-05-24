# Living Spec — Visual Refresh (umbrella)

## Objective

Full visual refresh of KataForge: Geist typography, indigo brand palette, landing hero, assessment chrome, workspace pane polish, and results hero — without changing Judge, storage, routing, or scoring logic.

## PRD registry

| PRD | GitHub | Living spec | Slices |
|-----|--------|-------------|--------|
| PRD-7 | [#37](https://github.com/Sivanirosh/kataforge/issues/37) | [living-spec-prd-7.md](./living-spec-prd-7.md) | #42–#46 |
| PRD-8 | [#38](https://github.com/Sivanirosh/kataforge/issues/38) | [living-spec-prd-8.md](./living-spec-prd-8.md) | #47–#48, #57 |
| PRD-9 | [#39](https://github.com/Sivanirosh/kataforge/issues/39) | [living-spec-prd-9.md](./living-spec-prd-9.md) | #49–#53 |
| PRD-10 | [#40](https://github.com/Sivanirosh/kataforge/issues/40) | [living-spec-prd-10.md](./living-spec-prd-10.md) | #54–#55 |
| PRD-11 | [#41](https://github.com/Sivanirosh/kataforge/issues/41) | [living-spec-prd-11.md](./living-spec-prd-11.md) | #56 |

Task index: [visual-refresh-spec.md](./visual-refresh-spec.md)

## Recommended implementation order

```text
Wave 1 — Foundation (PRD-7)
  #42 Geist fonts
  #43 Tokens + typography
  #44 Buttons ──┬── Wave 2 can start in parallel after #43
  #45 Cards     │
  #46 Scrollbars│

Wave 2 — Surfaces (parallel after #43; #44 for landing CTA)
  PRD-8:  #47 Hero → #48 Section headers
  PRD-9:  #49 Header → #50 Nav pills
          #51 Timer (parallel)
          #52 Toolbar (needs #44, #49)
          #53 Banner (parallel)
  PRD-10: #54 Test panel, #55 Sticky problem (parallel)
  PRD-11: #56 Results (parallel)

Wave 3 — E2E
  #57 Playwright selectors (after #47, #49, #54)
```

## Divide-and-conquer rationale

| Split | Why separate PRD |
|-------|------------------|
| PRD-7 Foundation | Shared tokens/primitives; many slices depend on it; merge-safe CSS-only |
| PRD-8 Landing | Demoable surface; independent of assessment layout |
| PRD-9 Chrome | Header/toolbar/timer — one user session context |
| PRD-10 Panes | In-workspace scroll UX; touches TestPanel TSX |
| PRD-11 Results | Single route; CSS-only; ships after tokens |

## Out of scope (all PRDs)

Monaco theme, `problem/[id].astro`, npm Geist, dark/light toggle, Judge/storage/routing changes.

## Sub-unit status

All slices **done** — visual refresh implemented in commit on `main`.
