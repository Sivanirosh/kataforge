---
id: aa-daily-temperatures
title: Daily Temperatures
difficulty: easy-medium
estimatedMinutes: 20
functionName: daily_temperatures
tags:
  - stack
  - monotonic-stack
  - day5
starterCode: |
  def daily_temperatures(temperatures):
      pass
solutionCode: |
  def daily_temperatures(temperatures):
      n = len(temperatures)
      result = [0] * n
      stack = []

      for i, temp in enumerate(temperatures):
          while stack and temperatures[stack[-1]] < temp:
              j = stack.pop()
              result[j] = i - j
          stack.append(i)

      return result
solutionExplanation: |
  Monotonic stack (decreasing). The stack stores indices of temperatures
  that haven't found a warmer day yet.

  For each new temperature: while it is warmer than the stack's top, pop
  the top index j and record result[j] = i - j (distance to warmer day).

  Time: O(n) — each index is pushed and popped at most once.
  Space: O(n) for the stack.
tests:
  - id: aa-dt-1
    name: classic example
    hidden: false
    args:
      - [73, 74, 75, 71, 69, 72, 76, 73]
    expected: [1, 1, 4, 2, 1, 1, 0, 0]
  - id: aa-dt-2
    name: ascending temperatures
    hidden: false
    args:
      - [30, 40, 50, 60]
    expected: [1, 1, 1, 0]
  - id: aa-dt-3
    name: all same
    hidden: true
    args:
      - [50, 50, 50, 50]
    expected: [0, 0, 0, 0]
  - id: aa-dt-4
    name: single day
    hidden: true
    args:
      - [100]
    expected: [0]
  - id: aa-dt-5
    name: descending then spike
    hidden: true
    args:
      - [90, 80, 70, 100]
    expected: [3, 2, 1, 0]
---

# Daily Temperatures

Given a list of daily temperatures, return a list `result` where `result[i]` is the number of days until a warmer temperature. If there is no future warmer day, `result[i] = 0`.

## Examples

```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
# day 0 (73°): 1 day wait for 74°
# day 2 (75°): 4 day wait for 76°
```

## Constraints

- `1 <= len(temperatures) <= 10^5`
- `30 <= temperatures[i] <= 100`

## Pattern

Monotonic decreasing stack. Store indices of "unsatisfied" days. When a warmer day arrives, pop and record distances.
