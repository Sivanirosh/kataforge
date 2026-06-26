---
id: aa-permutations
title: Permutations
difficulty: easy-medium
estimatedMinutes: 20
functionName: permutations
tags:
  - backtracking
  - day4
starterCode: |
  def permutations(nums):
      pass
solutionCode: |
  def permutations(nums):
      result = []

      def backtrack(path, remaining):
          if not remaining:
              result.append(path[:])
              return
          for i in range(len(remaining)):
              path.append(remaining[i])
              backtrack(path, remaining[:i] + remaining[i+1:])
              path.pop()

      backtrack([], nums)
      result.sort()
      return result
solutionExplanation: |
  Backtracking: at each step, pick any unused element, append it to the
  path, and recurse with the remaining elements. When remaining is empty,
  record the permutation.

  Return format (required for deterministic comparison): sort the list of
  permutations lexicographically.

  Time: O(n! * n). Space: O(n) for the recursion stack.
tests:
  - id: aa-perm-1
    name: three elements
    hidden: false
    args:
      - [1, 2, 3]
    expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
  - id: aa-perm-2
    name: two elements
    hidden: true
    args:
      - [0, 1]
    expected: [[0,1],[1,0]]
  - id: aa-perm-3
    name: single element
    hidden: true
    args:
      - [1]
    expected: [[1]]
---

# Permutations

Given an array `nums` of distinct integers, return all possible permutations.

**Return format:** Sort the list of permutations lexicographically for deterministic comparison.

## Examples

```
Input: nums = [1, 2, 3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

## Constraints

- `1 <= len(nums) <= 6`
- All elements are distinct.

## Pattern

Backtracking with a `remaining` list. At each call, pick one unused element, recurse, then undo. When remaining is empty, record the permutation.
