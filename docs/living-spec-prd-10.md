# Living Spec — PRD-10: Workspace panes polish

## Objective

Improve in-pane UX during Kata work: sticky problem title/meta in the prompt pane and a sticky test-panel summary with pass/fail pill counts plus 3px left accent bars on test rows.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-V10-1 | Sticky headers use pane scroll containers | `.pane-prompt` and `.test-panel` already overflow |
| AD-V10-2 | TestPanel.tsx gains header wrapper only | Loading/error empty branches unchanged per spec |
| AD-V10-3 | ProblemStatement.tsx unchanged | `.problem-header` already exists |

## Dependency Graph

```text
PRD-7 (#43)
 ├── #54 Test panel sticky header and accent bars
 └── #55 Problem statement sticky header
```

## Sub-unit Registry

| Issue | Title | Spec tasks | Status |
|-------|-------|------------|--------|
| #54 | Test panel sticky header and accent bars | Task 12 | **done** |
| #55 | Problem statement sticky header in prompt pane | Task 13 | **done** |

## Reference

Detailed coding instructions: `docs/visual-refresh-spec.md` (Tasks 12, 13).

## Out of Scope

Assessment header, landing, results hero, testPanelMessages.ts.
