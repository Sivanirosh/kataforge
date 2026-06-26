---
id: aa-climbing-stairs
title: Climbing Stairs
difficulty: easy
estimatedMinutes: 10
functionName: climb_stairs
tags:
  - dynamic-programming
  - day5
starterCode: |
  def climb_stairs(n):
      pass
solutionCode: |
  def climb_stairs(n):
      if n <= 2:
          return n
      prev2, prev1 = 1, 2
      for _ in range(3, n + 1):
          prev2, prev1 = prev1, prev1 + prev2
      return prev1
solutionExplanation: |
  Classic Fibonacci DP. To reach step n, you came from step n-1 (one step)
  or step n-2 (two steps). So ways(n) = ways(n-1) + ways(n-2).

  Base cases: ways(1) = 1, ways(2) = 2.
  Optimize to O(1) space by keeping only the last two values.

  Time: O(n). Space: O(1).
tests:
  - id: aa-cs-1
    name: two steps
    hidden: false
    args:
      - 2
    expected: 2
  - id: aa-cs-2
    name: three steps
    hidden: false
    args:
      - 3
    expected: 3
  - id: aa-cs-3
    name: one step
    hidden: true
    args:
      - 1
    expected: 1
  - id: aa-cs-4
    name: five steps
    hidden: true
    args:
      - 5
    expected: 8
  - id: aa-cs-5
    name: ten steps
    hidden: true
    args:
      - 10
    expected: 89
---

# Climbing Stairs

You are climbing a staircase with `n` steps. Each time you can climb 1 or 2 steps. Return the number of distinct ways to reach the top.

## Examples

```
Input: n = 2
Output: 2    # [1+1, 2]

Input: n = 3
Output: 3    # [1+1+1, 1+2, 2+1]
```

## Constraints

- `1 <= n <= 45`

## Pattern

DP. State: `dp[i]` = number of ways to reach step `i`. Recurrence: `dp[i] = dp[i-1] + dp[i-2]`. This is the Fibonacci sequence — the entry-level DP problem.
