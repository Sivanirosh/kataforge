# ADR 0001: Browser Pyodide Judge

## Status

Accepted

## Context

KataForge must run Python solutions locally without requiring candidates to install Python or run untrusted code on a server.

## Decision

Use Pyodide in a dedicated Web Worker for MVP execution.

## Consequences

- No backend required for basic use
- First Pyodide load is slow (~seconds)
- Hidden tests shipped to the browser are inspectable
- Acceptable for personal practice; not suitable as a hiring platform without a remote judge

## Alternatives considered

- **Judge0 / Piston** — deferred to optional post-MVP adapter
- **Node child_process** — rejected (unsafe for untrusted code)
