# Living Spec — PRD-1: Repository foundation & content separation

## Objective

Establish a dual-layer KataForge repo: committed generic framework plus gitignored ProblemPack overlay. Bootstrap Astro + pnpm with config merge via `kataforge.local.json`, domain glossary, CI, and config-loader tests.

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-1 | JSON overlay (`kataforge.local.json`), not `.ts` | Simple merge at build/dev; no compile step for local paths |
| AD-2 | `private/`, overlay JSON, `sources/repos/` gitignored | Employer-neutral public repo |
| AD-3 | `loadConfig` shallow-merges branding/judge; replaces dir arrays when provided | Predictable overlay semantics |
| AD-4 | CI runs `pnpm test`, `pnpm build`, and `pnpm test:e2e` without private folder | Examples-only path for OSS contributors |

## Interface Registry

| Symbol | Module | Contract |
|--------|--------|----------|
| `loadKataForgeConfigSync()` | `src/lib/loadConfig.ts` | Returns merged `KataForgeConfig`; missing overlay → base config |
| `loadKataForgeConfig()` | `src/lib/loadConfig.ts` | Async alias of sync loader |
| `KataForgeConfig` | `src/lib/configTypes.ts` | problemDirs, assessmentDirs, branding, judge |
| `kataforge.config.ts` | repo root | Committed defaults |
| `kataforge.local.json` | repo root (gitignored) | Optional ProblemPack path overlay |

## Dependency Graph

```text
#7 Commit scaffold
 ├── #18 Align docs to JSON overlay
 ├── #19 GitHub Actions CI
 ├── #20 MIT LICENSE
 └── #21 Expand config overlay merge tests
      └── #23 Fail loudly on malformed overlay JSON (human decision)
```

## Sub-unit Registry

| Issue | Title | Status | Notes |
|-------|-------|--------|-------|
| #7 | Commit generic KataForge scaffold | **done** | Commit `815da12`, pushed to `origin/main` |
| #18 | Align docs to kataforge.local.json overlay | **done** | Commit `78c6985` |
| #19 | Add GitHub Actions CI | **done** | Commit `2b6d5f8`, `.github/workflows/ci.yml` |
| #20 | Add MIT LICENSE file | **done** | Commit `8af238e` |
| #21 | Expand config overlay merge tests | **done** | Commit `40fba82`, 5 tests |
| #23 | Fail loudly on malformed local overlay JSON | **done** | Warn + base config by default; `KATAFORGE_STRICT_CONFIG=1` throws |

## Scout Dialogue Log

### #7 — Commit scaffold
- **Scout**: Scaffold already committed as `815da12`; tree includes src/, examples/, docs/, config; no private/ tracked.
- **Validation**: `pnpm test` (10 passed), `pnpm build` succeeded.
- **Integration**: Pushed to `origin/main`.

### #18 — Doc alignment
- **Scout**: Updated `docs/architecture.md`, `CONTEXT-MAP.md`, `.gitignore`; removed stale `kataforge.local.ts`.
- **Validation**: Grep confirms no committed `.ts` overlay references.
- **Integration**: Commit `78c6985`, pushed.

### #20 — MIT LICENSE
- **Scout**: Added standard MIT LICENSE; README links to file.
- **Validation**: File present at repo root.
- **Integration**: Commit `8af238e`, pushed.

### #19 — CI
- **Scout**: Added `.github/workflows/ci.yml` with pnpm, Node 22, test + build.
- **Validation**: Workflow matches issue acceptance criteria.
- **Integration**: Commit `2b6d5f8`, pushed.

### #21 — Config overlay tests
- **Scout**: Expanded `loadConfig.test.ts` with fs mocks for overlay merge cases.
- **Validation**: `pnpm test` — 14 passed (5 loadConfig tests).
- **Integration**: Commit `40fba82`, pushed.

### #23 — Malformed overlay JSON (escalation)
- **Scout**: Current `loadConfig` silently returns `{}` on parse error (line 11–13).
- **Blocker**: Issue requires human to choose: (A) console warning, (B) build failure, or (C) opt-in strict flag.
- **Recommendation**: Default to console warning in dev + documented strict mode flag for CI-sensitive builds.
