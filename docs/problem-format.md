# Problem Format

Katas are authored as Markdown files with YAML frontmatter.

## Required frontmatter

```yaml
---
id: two-sum
title: Two Sum
difficulty: easy
estimatedMinutes: 15
functionName: two_sum
tags:
  - arrays
starterCode: |
  def two_sum(nums, target):
      pass
tests:
  - id: sample-1
    name: basic pair
    hidden: false
    args:
      - [2, 7, 11, 15]
      - 9
    expected: [0, 1]
---
```

## Schema fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | URL slug, unique across all problem dirs |
| `title` | string | Display title |
| `difficulty` | enum | `easy`, `easy-medium`, `medium`, `hard` |
| `estimatedMinutes` | number | Suggested time |
| `functionName` | string | Python function the candidate implements |
| `tags` | string[] | Topic labels |
| `starterCode` | string | Initial editor content |
| `tests` | TestCase[] | Visible and hidden test cases |

## TestCase

```yaml
- id: unique-id
  name: human-readable label
  hidden: false
  args: [...]
  expected: ...
```

- `hidden: false` — runs on RunSamples; full details on failure
- `hidden: true` — runs only on Submit; pass/fail only in UI

## Function convention

The Judge calls `functionName(*args)`. Candidates do not parse stdin.

## Comparison

Default is strict deep equality (strings, numbers, arrays, objects).
