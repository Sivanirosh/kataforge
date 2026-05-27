# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm** (pinned via `packageManager`; Node ≥ 22.12). CI uses `--frozen-lockfile`.

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Astro dev server on http://localhost:4321 |
| `pnpm build` | Generate `public/builtin-kata-ids.json` then `astro build` |
| `pnpm preview` | Serve the production build (used by Playwright) |
| `pnpm test` | Run all Vitest suites (`unit` + `components` projects) |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm test:e2e` | Build, then run Playwright smoke specs in `e2e/` |
| `pnpm lint` | Typecheck via `astro check` |

Run a single Vitest file: `pnpm vitest run src/lib/judgeHarness.test.ts` (add `-t "pattern"` for a single case). The two projects are split by extension — `*.test.ts` → node, `*.test.tsx` → happy-dom — so target the right one.

Run a single Playwright spec: `pnpm exec playwright test e2e/smoke.spec.ts -g "landing page loads"`. Playwright starts `pnpm preview` itself; do not run a dev server in parallel on port 4321.

## Big-picture architecture

KataForge is an Astro static site with React islands. Three product surfaces share `src/styles/global.css`:

- **Assessment / Kata practice** — timed or untimed sessions over one or more Katas (`/assessment/[id]`, `/problem/[id]`)
- **Results** — per-Kata score breakdown read from `localStorage` (`/results/[id]`)
- **Cursus** — Vercel Academy–style learning paths mixing Lesson and Kata steps (`/cursus/[id]/step/[n]`)

### Content pipeline (build-time)

Content is loaded by plain functions in `src/lib/load*.ts`, not Astro content collections. Pages call `loadAllKatas`, `loadAllAssessments`, `loadAllCursus`, `loadAllLessons` during the build. Validation is Zod (`problemSchema.ts`, `cursusSchema.ts`, `userKataSchema.ts`); invalid frontmatter or unknown `kataIds` fail `pnpm build`.

Directories are resolved through a two-layer config:

1. `kataforge.config.ts` — committed defaults pointing at `examples/*`
2. `kataforge.local.json` — gitignored ProblemPack overlay (replaces array fields wholesale; merges branding/judge). Malformed JSON warns by default; set `KATAFORGE_STRICT_CONFIG=1` to fail.

The `private/` tree is gitignored — it's the personal overlay target referenced by `kataforge.local.example.json`.

`scripts/generate-builtin-kata-ids.mjs` runs in `pnpm build` and writes `public/builtin-kata-ids.json` so the browser knows which kata ids are reserved when importing **UserKatas**.

### Judge engine (runtime, browser)

- `src/workers/pyodideJudge.worker.ts` is a thin shell around `src/lib/judgeHarness.ts` (`executeJudgeRequest`). The harness logic is tested with a mocked Pyodide runner.
- The Judge **re-executes candidate code in a fresh namespace for every TestCase** — this is the only supported isolation model.
- The client (`judgeClient.ts`) owns worker lifecycle + safety timeout, terminates and recreates the worker on hangs.
- Cross-origin isolation (`COOP: same-origin`, `COEP: credentialless`) is required so a `SharedArrayBuffer` can be posted as Pyodide's interrupt buffer. Headers are set in `astro.config.mjs` for dev/preview and in `public/_headers` for static deploys. Static hosts must mirror these or runaway Python cannot be interrupted promptly.
- Per-TestCase timeouts default to 2000 ms (RunSamples) / 3000 ms (Submit), configurable via `kataforge.config.ts` `judge.*TimeoutMs`.

### Two kata pathways

- **Built-in / ProblemPack katas** — Markdown with YAML frontmatter under `examples/problems/` or `private/problems/`; bundled at build time.
- **UserKatas** — JSON imported in the browser via the Practice hub, validated with the same schema plus `bodyMarkdown`, stored in `localStorage` (`kataforge:user-katas`). Hub list merges them at runtime. Direct routes (`/problem/{id}`, `/results/{id}`) rely on the static host serving `404.html` for unknown paths — the SPA fallback hydrates the UserKata client-side. Document this for any new deploy target.

### LocalStorage contract

All keys live under the `kataforge:` namespace (see `src/lib/storage.ts`): `draft:{kataId}`, `results:{kataId}`, `session:{assessmentId}`, `score:{assessmentId}`, `cursus-progress:{cursusId}`, `user-katas`. There is a legacy-id migration (`practice-two-sum`, `quick-practice` → `two-sum`) — keep it in mind when renaming assessments. The e2e suite seeds these keys directly to bypass slow Pyodide runs.

### Cursus

- Step URLs use a **flat global index** (`/cursus/{id}/step/{n}`); progress is keyed by `{moduleId}:{stepIndex}` so renumbering steps within a module doesn't invalidate progress (ADR-0001/AD-C2 in `docs/living-spec-cursus.md`).
- Cursus shares `global.css` — Tailwind was removed (ADR-0002 `docs/adr/0002-tailwind-scoped-to-cursus.md`). Cursus-specific rules live under `.cursus-*` classes. Don't reintroduce a parallel CSS system.
- Step navigation is client-side to avoid the white-flash on cross-document view transitions (see e2e checks `cursus step navigation avoids full page reload` and `cursus step pages do not opt into cross-document view transitions`).

## Conventions worth knowing

- **Domain vocabulary is normative** — see `CONTEXT.md` (Kata, Assessment, TestCase, RunSamples, Submit, Judge, Draft, ProblemPack, UserKata, Cursus/Module/Step/Lesson). Don't introduce synonyms in code or UI copy.
- **No backend.** Hidden TestCases ship to the browser and are inspectable — treat them as obscured, not secret. Any "production hiring platform" use case requires a remote judge, which is out of scope (ADR-0001 in `docs/adr/`).
- **Living specs live in `docs/`** — `living-spec-prd-*.md` and `living-spec-cursus.md` capture in-flight scope. Check them before assuming a behavior is final.
- **Acceptance checklist** at `docs/acceptance-tests.md` enumerates which items are covered by unit/e2e vs. manual smoke.
