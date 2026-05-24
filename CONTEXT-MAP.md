# Context Map

## Contexts

- [KataForge](./CONTEXT.md) — generic coding-kata practice platform (committed)
- **ProblemPack** (`private/`, gitignored) — personal problem and assessment overlay; not tracked in git

## Relationships

- **ProblemPack → KataForge**: ProblemPack supplies additional Kata Markdown files and Assessment JSON configs consumed at build/dev time via `kataforge.local.json`
- **KataForge → Judge**: Each Kata's TestCases are executed by the Judge deep module; ProblemPack Katas use the same schema

## Setup

Copy `kataforge.local.example.json` to `kataforge.local.json` (gitignored) to merge `private/problems` and `private/assessments` into the local dev build.
