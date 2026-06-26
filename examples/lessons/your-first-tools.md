---
id: your-first-tools
title: Your First Tools
---

Tools are functions with a **contract**: name, description, and typed inputs. The harness exposes them to the model; the model picks based on descriptions.

## Read and grep

| Tool | Purpose |
|------|---------|
| `read_file(path)` | Return file contents |
| `grep_lines(text, pattern)` | Return matching lines |

Good tool descriptions answer **when to use**, **when not to use**, and **examples**.

## Registry pattern

Keep tools in a dictionary mapping names to callables:

```python
TOOLS = {
    "read_file": read_file,
    "grep_lines": grep_lines,
}
```

Your kata implements this registry against an in-memory filesystem.

## Design tip

Separate **tool contract** (what the agent sees) from **implementation** (how files are read). That split is the factory pattern used in real harnesses.
