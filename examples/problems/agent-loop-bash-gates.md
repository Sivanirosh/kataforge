---
id: agent-loop-bash-gates
title: Safe Command Allowlist
difficulty: easy-medium
estimatedMinutes: 15
functionName: safe_run
tags:
  - agents
  - safety
starterCode: |
  def safe_run(command, allowlist):
      """Run allowed commands; raise PermissionError if blocked."""
      pass
solutionCode: |
  def safe_run(command, allowlist):
      if not any(command == allowed or command.startswith(allowed + " ") for allowed in allowlist):
          raise PermissionError(command)
      if command == "echo ok":
          return "ok"
      if command.startswith("echo "):
          return command[5:]
      return "ran"
solutionExplanation: |
  Check the full command against an allowlist before executing. Match exact commands or allowed prefixes (e.g. echo with arguments).
tests:
  - id: sample-1
    name: allowed echo
    hidden: false
    args:
      - "echo ok"
      - ["echo ok", "pwd"]
    expected: ok
  - id: sample-2
    name: allowed pwd
    hidden: false
    args:
      - "pwd"
      - ["echo ok", "pwd"]
    expected: ran
  - id: hidden-1
    name: echo with argument
    hidden: true
    args:
      - "echo hello"
      - ["echo"]
    expected: hello
---

# Safe Command Allowlist

Implement `safe_run(command, allowlist)`:

- If `command` is not exactly in `allowlist` and does not start with an allowed entry followed by a space, raise `PermissionError`
- For this kata, simulate execution:
  - `"echo ok"` → return `"ok"`
  - commands starting with `"echo "` → return the text after `"echo "`
  - other allowed commands → return `"ran"`

The sample test for blocked commands expects a `PermissionError` (Judge reports as error/failed).
