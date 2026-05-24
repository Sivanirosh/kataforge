# ADR-0003: UserKata browser import

## Status

Accepted

## Context

KataForge ships built-in katas as Markdown on disk, loaded at build time via `loadKatas`. Authors who use LLMs to draft katas need a fast path to practice without editing files, configuring ProblemPack, or rebuilding the site.

ProblemPack (`private/` + `kataforge.local.json`) already supports gitignored disk overlays for power users. The hub and static routes, however, only reflect build-time content unless we add a runtime layer.

## Decision

Introduce **UserKata**: JSON-defined katas imported in the browser, validated with the same Zod rules as disk katas (plus `bodyMarkdown`), stored in `localStorage`, merged on the landing hub at runtime, and served through client loaders with a static 404 fallback for `/problem/{id}` and `/results/{id}`.

Provide an in-app `/docs` page with a copy-paste LLM prompt template, schema reference, and import/export/delete UI.

## Consequences

**Positive**

- Instant hub updates after import; works on static deploy (`output: static`).
- LLM-friendly JSON format avoids fragile YAML frontmatter generation.
- Export bundle mitigates cache-clear data loss.

**Negative**

- UserKatas are per-browser, not version-controlled (ProblemPack remains the durable path).
- Direct URLs for UserKata ids rely on the host serving `404.html` for unknown static paths; document this for production deploys.
- Hidden TestCases in UserKatas have the same client-side visibility limits as built-in katas.

## Alternatives considered

1. **ProblemPack only** — Rejected for v1 import UX; requires rebuild and file editing.
2. **Markdown file import** — Rejected; YAML parsing in browser adds complexity; JSON aligns with LLM structured output.
3. **SSR / hybrid routes for dynamic ids** — Rejected; adds deployment adapter requirement for a local practice tool.
