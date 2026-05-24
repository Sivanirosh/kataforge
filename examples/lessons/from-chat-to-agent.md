---
id: from-chat-to-agent
title: From Chat to Agent
---

A **chatbot** only returns text. An **agent** can decide to call **tools** when the user request requires action outside pure conversation.

## The loop

1. User sends a message.
2. The model (or your router) decides: reply directly **or** invoke a tool.
3. If a tool runs, its result is fed back into context for the next turn.

## Python analog

In this Cursus you will implement small Python functions that stand in for harness pieces — not a full LLM, but the same decision shape:

```python
{"tool": "read", "path": "README.md"}
```

When no tool is needed, return `None`.

## Why it matters

One tool (`read`) turns a static chatbot into something that can inspect a project. The next lessons add search and command execution — each step increases capability **and** risk.
