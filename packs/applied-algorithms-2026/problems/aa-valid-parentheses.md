---
id: aa-valid-parentheses
title: Valid Parentheses
difficulty: easy
estimatedMinutes: 12
functionName: is_valid
tags:
  - stack
  - day5
starterCode: |
  def is_valid(s):
      pass
solutionCode: |
  def is_valid(s):
      stack = []
      mapping = {')': '(', ']': '[', '}': '{'}

      for ch in s:
          if ch in '([{':
              stack.append(ch)
          elif not stack or stack[-1] != mapping[ch]:
              return False
          else:
              stack.pop()

      return len(stack) == 0
solutionExplanation: |
  Use a stack. Push open brackets. On a close bracket, check if the stack
  top is the matching open bracket. If not (or stack is empty), return False.
  After the loop, return True only if the stack is empty (no unmatched opens).

  Time: O(n). Space: O(n).
tests:
  - id: aa-vpar-1
    name: simple pair
    hidden: false
    args:
      - "()"
    expected: true
  - id: aa-vpar-2
    name: mixed valid
    hidden: false
    args:
      - "()[]{}"
    expected: true
  - id: aa-vpar-3
    name: wrong order
    hidden: false
    args:
      - "(]"
    expected: false
  - id: aa-vpar-4
    name: empty string
    hidden: true
    args:
      - ""
    expected: true
  - id: aa-vpar-5
    name: unclosed bracket
    hidden: true
    args:
      - "(("
    expected: false
  - id: aa-vpar-6
    name: nested valid
    hidden: true
    args:
      - "{[()]}"
    expected: true
---

# Valid Parentheses

Given a string `s` containing only `(`, `)`, `{`, `}`, `[`, `]`, determine if the input string is valid.

A string is valid if:
- Every open bracket has a matching close bracket of the same type.
- Open brackets are closed in the correct order.

## Examples

```
Input: s = "()"       Output: True
Input: s = "()[]{}"   Output: True
Input: s = "(]"       Output: False
```

## Constraints

- `1 <= len(s) <= 10^4`

## Pattern

Stack. Push opens, pop and match on closes. The canonical stack kata — master it cold.
