# Repo Survey — initial-001

Ranked references for KataForge MVP implementation. Ingest rows approved for code-first lookup during build.

| Rank | Repo / Package | Tool | Code hook | Ingest | Rationale |
|------|----------------|------|-----------|--------|-----------|
| 1 | `microsoft/monaco-editor` | opensrc | Editor SSR guard, Python language config | opensrc | MIT; primary editor component |
| 2 | `pyodide/pyodide` | opensrc | `loadPyodide`, worker execution, JS↔Py conversion | opensrc | Browser Python for MVP judge |
| 3 | `withastro/astro` | opensrc | Content collections, `glob` loader, React islands | opensrc | Static shell + MD problem bank |
| 4 | `colinhacks/zod` | opensrc | Problem/assessment schema validation | opensrc | Build-time frontmatter validation |
| 5 | `coderscreen/coderscreen` | vendor | Assessment flow, editor layout, session UX | vendor | GPL-3.0 — study only, no code copy |
| 6 | `engineer-man/piston` | vendor | REST execute API for future remote judge | vendor | MIT; post-MVP hidden tests |
| 7 | `judge0/judge0` | vendor | Sandbox execution API contract | vendor | GPL-3.0 — study only |

## Bibliography (no ingest)

- DMOJ/online-judge — mature but AGPL and heavy for personal practice tool
- DOMjudge — ICPC jury system, overkill for MVP
- OpenRank — immature reference

## Search patterns used during implementation

```bash
rg "client:only" sources/opensrc/links/withastro_astro
rg "loadPyodide" sources/opensrc/links/pyodide_pyodide
rg "defineCollection" sources/opensrc/links/withastro_astro
```

## License note

Do not copy GPL/AGPL source into the MIT KataForge tree. Use vendored repos for architecture and API shape only.
