# Living Spec — PRD-11: Results page visual refresh

## Objective

Polish the Assessment results experience: indigo-glow score hero card, gradient Geist Mono percentage, mono score values, and left-accent hidden test rows.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-V11-1 | CSS-only; ResultsPage/ResultSummary JSX unchanged | Spec constraint |
| AD-V11-2 | Reuse hero gradient pattern from landing | Visual consistency (#edecf4 → #b8affc) |

## Dependency Graph

```text
PRD-7 (#43 tokens + typography)
 └── #56 Results score hero and breakdown polish
```

## Sub-unit Registry

| Issue | Title | Spec tasks | Status |
|-------|-------|------------|--------|
| #56 | Results score hero and breakdown polish | Task 15 | **done** |

## Reference

Detailed coding instructions: `docs/visual-refresh-spec.md` (Task 15).

## Out of Scope

Scoring logic, persistAssessmentScore, retry flow, hidden test data shape.
