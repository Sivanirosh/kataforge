# KataForge

Build and practice custom coding assessments locally.

KataForge is an open-source coding challenge simulator for interview preparation,
technical training, and custom assessment design. Define problems with Markdown,
configure visible and hidden tests, run timed sessions, and execute solutions in
a browser-based coding environment.

## Quick start

```bash
pnpm install
pnpm dev
```

Open http://localhost:4321

## Private ProblemPack (optional)

To load personal katas and assessments from a gitignored overlay:

```bash
cp kataforge.local.example.json kataforge.local.json
```

Place private content under `private/problems/` and `private/assessments/`. See [CONTEXT-MAP.md](./CONTEXT-MAP.md).

If `kataforge.local.json` contains invalid JSON, KataForge logs a warning and falls back to the committed base config.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run Playwright smoke tests (requires build) |
| `pnpm lint` | Typecheck |

## Adding a Kata

1. Create a Markdown file in `examples/problems/` (see [docs/problem-format.md](./docs/problem-format.md))
2. Restart dev server if needed — invalid frontmatter fails at build time

## Known limitations

- Python runs in the browser via Pyodide (first load is slow)
- Hidden tests bundled for browser execution are not secret
- No authentication or multi-user support in MVP

## Security

- **Browser execution:** Python runs locally via [Pyodide](https://pyodide.org/) inside a Web Worker. Code never leaves the browser during MVP practice.
- **Hidden tests are inspectable:** Submit TestCases ship in the client bundle and saved results live in `localStorage`. Treat browser-side hidden tests as obscured, not secret.
- **No unsandboxed server execution:** Do not run candidate code in a plain server process. For multi-user or production deployments, use a sandboxed remote judge (see [docs/judge-engine.md](./docs/judge-engine.md) and [ADR 0001](./docs/adr/0001-browser-pyodide-judge.md)).

## Documentation

- [Problem format](./docs/problem-format.md)
- [Judge engine](./docs/judge-engine.md)
- [UI requirements](./docs/ui-requirements.md)
- [Architecture](./docs/architecture.md)
- [Domain glossary](./CONTEXT.md)

## License

MIT — see [LICENSE](./LICENSE).
