---
id: aa-combination-sum
title: Combination Sum
difficulty: medium
estimatedMinutes: 25
functionName: combination_sum
tags:
  - backtracking
  - day4
starterCode: |
  def combination_sum(candidates, target):
      pass
solutionCode: |
  def combination_sum(candidates, target):
      candidates.sort()
      result = []

      def backtrack(start, path, remaining):
          if remaining == 0:
              result.append(sorted(path[:]))
              return
          for i in range(start, len(candidates)):
              if candidates[i] > remaining:
                  break
              path.append(candidates[i])
              backtrack(i, path, remaining - candidates[i])
              path.pop()

      backtrack(0, [], target)
      result.sort()
      return result
solutionExplanation: |
  Backtracking with reuse (pass i not i+1 to allow the same element again).
  Sort candidates first to enable the early-break pruning: if candidates[i]
  > remaining, no larger candidate can help either.

  Return format: sort each combination, sort the list of combinations.

  Time: O(2^(target/min(candidates))). Space: O(target/min(candidates)) for stack.
tests:
  - id: aa-csum-1
    name: two solutions
    hidden: false
    args:
      - [2, 3, 6, 7]
      - 7
    expected: [[2,2,3],[7]]
  - id: aa-csum-2
    name: three solutions
    hidden: false
    args:
      - [2, 3, 5]
      - 8
    expected: [[2,2,2,2],[2,3,3],[3,5]]
  - id: aa-csum-3
    name: no solution
    hidden: true
    args:
      - [3, 5, 7]
      - 4
    expected: []
  - id: aa-csum-4
    name: single element fills target
    hidden: true
    args:
      - [1]
      - 1
    expected: [[1]]
---

# Combination Sum

Given a list of distinct integers `candidates` and a `target`, return all unique combinations where the chosen numbers sum to `target`. Numbers may be reused.

**Return format:** Each combination sorted, combinations sorted lexicographically.

## Examples

```
Input: candidates = [2, 3, 6, 7], target = 7
Output: [[2,2,3],[7]]

Input: candidates = [2, 3, 5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

## Constraints

- `1 <= len(candidates) <= 30`
- All candidates are distinct.

## Pattern

Backtracking with reuse: pass `i` (not `i+1`) when recursing to allow the same element again. Sort candidates for early-break pruning.
