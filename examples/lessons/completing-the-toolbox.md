---
id: completing-the-toolbox
title: Completing the Toolbox
---

Adding **`bash`** (or `run_command`) gives the agent real power — and real danger. Production harnesses use **execute-level safety gates**.

## Allowlists

Only permit commands that match a safe prefix list:

```python
ALLOWLIST = ["ls", "pwd", "python -m pytest"]
```

Reject everything else before spawning a shell.

## Failure modes

- **Too open**: `rm -rf`, credential exfiltration, fork bombs.
- **Too tight**: agent cannot run tests or linters.

Start strict; loosen with explicit approval flows later.

## Your kata

Implement `safe_run(command, allowlist)` that returns stdout for allowed commands and raises `PermissionError` otherwise.
