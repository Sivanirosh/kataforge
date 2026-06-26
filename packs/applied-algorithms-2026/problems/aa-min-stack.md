---
id: aa-min-stack
title: Min Stack
difficulty: easy-medium
estimatedMinutes: 20
functionName: min_stack_ops
tags:
  - stack
  - design
  - day5
starterCode: |
  def min_stack_ops(operations):
      """
      operations: list of ["push", val], ["pop"], ["top"], or ["get_min"]
      return: list where push/pop return None, top/get_min return the value
      """
      pass
solutionCode: |
  def min_stack_ops(operations):
      stack = []
      min_stack = []
      result = []

      for op in operations:
          if op[0] == "push":
              val = op[1]
              stack.append(val)
              if not min_stack or val <= min_stack[-1]:
                  min_stack.append(val)
              result.append(None)
          elif op[0] == "pop":
              val = stack.pop()
              if min_stack and val == min_stack[-1]:
                  min_stack.pop()
              result.append(None)
          elif op[0] == "top":
              result.append(stack[-1])
          elif op[0] == "get_min":
              result.append(min_stack[-1])

      return result
solutionExplanation: |
  Maintain a secondary min_stack that tracks the current minimum at each
  level. Push to min_stack when the new value is <= current minimum.
  Pop from min_stack when the popped value equals the current minimum.

  This ensures get_min is O(1) while all other operations remain O(1).

  The key insight: we don't need to store the minimum for every element —
  only track when the minimum changes.
tests:
  - id: aa-mst-1
    name: standard operations
    hidden: false
    args:
      - [["push",-2],["push",0],["push",-3],["get_min"],["pop"],["top"],["get_min"]]
    expected: [null, null, null, -3, null, 0, -2]
  - id: aa-mst-2
    name: single push then get
    hidden: true
    args:
      - [["push",5],["get_min"],["top"]]
    expected: [null, 5, 5]
  - id: aa-mst-3
    name: increasing values
    hidden: true
    args:
      - [["push",1],["push",2],["push",3],["get_min"],["pop"],["get_min"]]
    expected: [null, null, null, 1, null, 1]
---

# Min Stack

Design a stack that supports `push`, `pop`, `top`, and `get_min` — all in O(1) time.

This kata uses an operation-list interface: given a sequence of operations, return a list of results (push/pop → `None`, top/get_min → the value).

## Examples

```
Input: operations = [["push",-2],["push",0],["push",-3],
                     ["get_min"],["pop"],["top"],["get_min"]]
Output: [None, None, None, -3, None, 0, -2]
```

## Constraints

- At least one element in the stack when `top` or `get_min` is called.

## Pattern

Auxiliary min-stack. Maintain a second stack that tracks the minimum at each level. The trick: only update the min-stack when the pushed value is ≤ the current minimum.
