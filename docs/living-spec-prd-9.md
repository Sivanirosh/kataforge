# Living Spec — PRD-9: Assessment workspace chrome

## Objective

Restructure assessment shell chrome: left | center | right header (brand / nav pills / timer + actions), pill-shaped problem navigator, timer polish, grouped toolbar, and slim expired-time banner.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-V9-1 | Header three-zone flex layout | Brand fixed left, nav centered, actions `margin-left: auto` |
| AD-V9-2 | Shorten visible labels: Submit, Results | Preserve `aria-label="Submit Assessment"` |
| AD-V9-3 | `<900px` header stacks: brand, nav row, actions row | Extends existing breakpoint |
| AD-V9-4 | ProblemNavigator.tsx unchanged | CSS-only pill polish |

## Dependency Graph

```text
PRD-7 (#43, #44)
 └── #49 Assessment header layout
      ├── #50 Problem navigator pill polish
      └── #52 Toolbar grouping
 #51 Timer pill polish (parallel after #43)
 #53 Banner polish (parallel after #43)
```

## Sub-unit Registry

| Issue | Title | Spec tasks | Status |
|-------|-------|------------|--------|
| #49 | Assessment header left-center-right layout | Task 8 | **done** |
| #50 | Problem navigator pill polish | Task 9 | **done** |
| #51 | Timer pill and expired pulse animation | Task 10 | **done** |
| #52 | Toolbar grouping for Run/Submit vs Reset | Task 11 | **done** |
| #53 | Timer-expired banner polish | Task 14 | **done** |

## Reference

Detailed coding instructions: `docs/visual-refresh-spec.md` (Tasks 8–11, 14).

## Out of Scope

Test panel, problem sticky header, Monaco theme, Judge/storage logic.
