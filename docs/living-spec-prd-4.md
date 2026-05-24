# Living Spec — PRD-4: Problem workspace UI

## Objective

Polish the assessment workspace: difficulty badges, Monaco-scoped shortcuts, judge error surfacing, and Pyodide first-load feedback.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-P4-1 | Distinct CSS badge classes per difficulty | Classes already exist; add dark-theme colors |
| AD-P4-2 | **Monaco-only** shortcuts for #12 | Avoid global Cmd+Enter conflicts |
| AD-P4-3 | `TestPanel` receives `error` + `loadingPhase` from shell | Single panel owns run/error/result states |
| AD-P4-4 | `runtimeReady` session flag after first judge response | Warm worker skips runtime message |

## Sub-unit Registry

| Issue | Title | Status |
|-------|-------|--------|
| #11 | Style difficulty badges | **done** |
| #12 | Scope keyboard shortcuts to Monaco | **done** |
| #27 | Surface Judge failures in TestPanel | **done** |
| #31 | Pyodide first-load indicator | **done** |

## Integration Log

- **#11**: Added `badge-easy`, `badge-easy-medium`, `badge-medium`, `badge-hard` styles in `global.css`.
- **#12**: Monaco `addCommand` for shortcuts; removed window listener; updated `docs/ui-requirements.md`.
- **#27**: `AssessmentShell` sets `panelError` on worker failures; `TestPanel` shows alert banner.
- **#31**: `runtimeReady` flag drives `Loading Python runtime…` vs normal run message; `testPanelMessages` unit tests.
