---
id: agent-loop-read-grep
title: Tool Registry Read and Grep
difficulty: easy-medium
estimatedMinutes: 15
functionName: run_tool
tags:
  - agents
  - tools
starterCode: |
  def run_tool(name, filesystem, path=None, pattern=None):
      """Dispatch read_file or grep_lines from filesystem dict."""
      pass
solutionCode: |
  def run_tool(name, filesystem, path=None, pattern=None):
      if name == "read_file":
          if path not in filesystem:
              raise KeyError(path)
          return filesystem[path]
      if name == "grep_lines":
          matches = []
          for file_path, content in filesystem.items():
              for line in content.splitlines():
                  if pattern in line:
                      matches.append(f"{file_path}:{line}")
          return matches
      raise ValueError(name)
solutionExplanation: |
  Use a filesystem dict for isolation. read_file returns one file; grep_lines scans all files and returns matching lines prefixed with their path.
tests:
  - id: sample-1
    name: read file
    hidden: false
    args:
      - "read_file"
      - {"README.md": "hello", "app.py": "print(1)"}
      - "README.md"
      - null
    expected: hello
  - id: sample-2
    name: grep lines
    hidden: false
    args:
      - "grep_lines"
      - {"a.txt": "TODO fix", "b.txt": "done"}
      - null
      - "TODO"
    expected: ["a.txt:TODO fix"]
  - id: hidden-1
    name: grep no matches
    hidden: true
    args:
      - "grep_lines"
      - {"a.txt": "done"}
      - null
      - "TODO"
    expected: []
---

# Tool Registry Read and Grep

Given a `filesystem` dict mapping paths to file contents, implement `run_tool(name, filesystem, path=None, pattern=None)`:

- `read_file` — return contents for `path`, or raise `KeyError` if missing
- `grep_lines` — return a list of `"path:line"` strings containing `pattern`

Unknown tool names should raise `ValueError`.
