# Living Spec — PRD-7: Design system foundation

## Objective

Establish the shared visual foundation for the full UI refresh: Geist fonts, deepened dark palette, indigo accent, typography, interactive button/card primitives, and global scrollbars. All surface-specific PRDs depend on this layer.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-V7-1 | Geist via jsDelivr CDN, no npm dep | Spec constraint; font-display swap in CDN stylesheet |
| AD-V7-2 | Extend `:root` tokens; keep `--accent-2`, `--danger`, `--warning` | Semantic pass/fail colors unchanged |
| AD-V7-3 | Vanilla CSS only in `global.css` | Matches existing stack; no Tailwind/CSS modules |
| AD-V7-4 | `--header-h: 52px` as layout constant | Shared by assessment header and pane-code min-height |

## Interface Registry

| Symbol | Module | Contract |
|--------|--------|----------|
| `:root` tokens | `src/styles/global.css` | `--bg`, `--surface`, `--accent`, `--font-sans`, `--font-mono`, `--radius-*`, `--accent-glow`, `--header-h` |
| `.btn` + variants | `global.css` | Transitions, focus-visible, disabled, hover glows |
| `.btn-lg` | `global.css` | Hero CTA sizing |
| `.card:hover` | `global.css` | Indigo border glow + drop shadow |
| Font `<link>` tags | Astro page heads | index, assessment, results routes |

## Dependency Graph

```text
#42 Load Geist fonts
 └── #43 Tokens + typography
      ├── #44 Button system
      ├── #45 Card hover polish
      └── #46 Global scrollbars
```

## Sub-unit Registry

| Issue | Title | Spec tasks | Status |
|-------|-------|------------|--------|
| #42 | Load Geist fonts in all page heads | Task 1 | **done** |
| #43 | Update design tokens and typography | Tasks 2, 3 | **done** |
| #44 | Button interaction system | Task 4 | **done** |
| #45 | Card hover and radius polish | Task 5 | **done** |
| #46 | Global slim scrollbar styling | Task 16 | **done** |

## Reference

Detailed coding instructions: `docs/visual-refresh-spec.md` (Tasks 1–5, 16).

## Out of Scope

Landing hero, assessment layout, test panel, results hero — see PRD-8 through PRD-11.
