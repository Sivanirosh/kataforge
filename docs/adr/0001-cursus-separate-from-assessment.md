# ADR-0001: Cursus as a separate content type from Assessment

## Status

Accepted

## Context

KataForge already has **Assessment** — a scored session of one or more Katas with optional timer, Submit Assessment, and results scoring. The Cursus feature adds **lessons** (read-only markdown) interleaved with **kata** drills in a module sequence inspired by Vercel Academy.

Extending Assessment JSON with lesson steps would overload Submit, timer, and scoring semantics that apply to whole-session evaluation, not step-by-step learning progress.

## Decision

Introduce **Cursus** as a first-class content type with its own schema, loaders, routes (`/cursus/*`), and **CursusProgress** persistence separate from Assessment session storage.

Kata steps inside a Cursus reuse the Judge and editor components but do not create an Assessment session or aggregate score by default.

## Consequences

- Authors maintain `examples/cursus/*.json` plus `examples/lessons/*.md` in addition to assessments and katas.
- Landing page lists Cursus, Assessments, and standalone Katas as three entry points.
- Future work may link a Cursus completion badge without merging storage keys with Assessment results.
