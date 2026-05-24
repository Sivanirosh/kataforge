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

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run unit tests |
| `pnpm lint` | Typecheck |

## Adding a Kata

1. Create a Markdown file in `examples/problems/` (see [docs/problem-format.md](./docs/problem-format.md))
2. Restart dev server if needed — invalid frontmatter fails at build time

## Known limitations

- Python runs in the browser via Pyodide (first load is slow)
- Hidden tests bundled for browser execution are not secret
- No authentication or multi-user support in MVP

## Documentation

- [Problem format](./docs/problem-format.md)
- [Judge engine](./docs/judge-engine.md)
- [UI requirements](./docs/ui-requirements.md)
- [Architecture](./docs/architecture.md)
- [Domain glossary](./CONTEXT.md)

## License

MIT
