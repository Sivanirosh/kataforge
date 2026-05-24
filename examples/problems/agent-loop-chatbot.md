---
id: agent-loop-chatbot
title: Route Messages to Tools
difficulty: easy
estimatedMinutes: 10
functionName: route_message
tags:
  - agents
  - routing
starterCode: |
  def route_message(message: str):
      """Return a tool call dict or None if no tool is needed."""
      pass
solutionCode: |
  def route_message(message: str):
      lowered = message.lower()
      if "read" in lowered or "file" in lowered:
          return {"tool": "read", "path": "README.md"}
      if "search" in lowered or "grep" in lowered:
          return {"tool": "grep", "pattern": "TODO"}
      return None
solutionExplanation: |
  Inspect keywords in the user message. Return a structured tool dict when the intent matches read or search; otherwise return None for a plain chat reply.
tests:
  - id: sample-1
    name: read intent
    hidden: false
    args:
      - "Please read the config file"
    expected:
      tool: read
      path: README.md
  - id: sample-2
    name: no tool
    hidden: false
    args:
      - "Hello there"
    expected: null
  - id: hidden-1
    name: grep intent
    hidden: true
    args:
      - "search for TODO comments"
    expected:
      tool: grep
      pattern: TODO
---

# Route Messages to Tools

Implement `route_message(message)` returning:

- `{"tool": "read", "path": "README.md"}` when the message mentions reading or files
- `{"tool": "grep", "pattern": "TODO"}` when the message mentions search or grep
- `None` otherwise
