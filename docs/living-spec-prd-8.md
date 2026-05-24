# Living Spec — PRD-8: Landing page visual refresh

## Objective

Upgrade the landing first impression: full-width hero (dot-grid, indigo glow, gradient wordmark, scroll CTA) and small-caps section headers for Assessments and Practice a Kata.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-V8-1 | Hero `<h1>` replaces `landing-header` h1 | Single h1 per page; no heading regression |
| AD-V8-2 | CTA anchors to `#assessments` | No routing change; in-page scroll |
| AD-V8-3 | Hero lives outside `<main.landing>` | Full viewport width treatment |

## Dependency Graph

```text
PRD-7 (#43 tokens, #44 buttons)
 └── #47 Landing hero section
      └── #48 Landing section header labels
```

## Sub-unit Registry

| Issue | Title | Spec tasks | Status |
|-------|-------|------------|--------|
| #47 | Landing hero section with dot-grid and CTA | Task 6 | **done** |
| #48 | Landing section header labels | Task 7 | **done** |

## Reference

Detailed coding instructions: `docs/visual-refresh-spec.md` (Tasks 6, 7).

## Out of Scope

Assessment cards content, AssessmentStartActions logic, `/problem/[id]` route.
