# Architecture

## Stack

- **Astro** — routing, content collections, static build
- **React islands** — interactive assessment UI
- **Monaco Editor** — code editing
- **Pyodide Web Worker** — Python execution
- **LocalStorage** — drafts, timer, results

## App structure

```text
src/
  pages/                 # index, assessment, problem, results
  components/            # React islands
  lib/                   # schema, compare, storage, scoring, config, loadKatas
  workers/               # pyodideJudge.worker.ts
examples/
  problems/              # generic sample katas
  assessments/           # generic assessment configs
```

## Content pipeline

Katas and assessments load through `loadKatas` / `loadAssessments` in `src/lib/`, validated by shared Zod schemas in `problemSchema.ts`. Astro pages call these loaders at build time, so invalid frontmatter or unknown assessment `kataIds` fail `pnpm build`. There is no separate Astro content collection for problems.

## Config overlay

- `kataforge.config.ts` — committed defaults
- `kataforge.local.json` — gitignored ProblemPack path overlay (copy from `kataforge.local.example.json`)

## Deep modules

1. **Judge** — worker protocol, Pyodide lifecycle
2. **Problem schema** — Zod validation at build time
3. **Compare** — strict deep equality
4. **Session store** — localStorage persistence

## Optional future: remote judge

Pluggable backend for server-side hidden tests (Piston or Judge0). Out of MVP scope.
