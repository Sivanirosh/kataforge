---
id: aa-subsets
title: Subsets
difficulty: easy-medium
estimatedMinutes: 20
functionName: subsets
tags:
  - backtracking
  - day4
starterCode: |
  def subsets(nums):
      pass
solutionCode: |
  def subsets(nums):
      result = []

      def backtrack(start, path):
          result.append(path[:])
          for i in range(start, len(nums)):
              path.append(nums[i])
              backtrack(i + 1, path)
              path.pop()

      backtrack(0, [])
      result.sort(key=lambda s: (len(s), s))
      return result
solutionExplanation: |
  Backtracking: at each step, choose to include nums[i] or not.
  The path at every recursive call is a valid subset.

  Return format (required for deterministic test comparison):
  Sort subsets by (length, lexicographic order).

  Time: O(2^n * n) to generate and copy all subsets.
  Space: O(n) for the recursion stack.
tests:
  - id: aa-sub-1
    name: three elements
    hidden: false
    args:
      - [1, 2, 3]
    expected: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
  - id: aa-sub-2
    name: single element
    hidden: true
    args:
      - [1]
    expected: [[], [1]]
  - id: aa-sub-3
    name: two elements
    hidden: true
    args:
      - [1, 2]
    expected: [[], [1], [2], [1,2]]
  - id: aa-sub-4
    name: empty input
    hidden: true
    args:
      - []
    expected: [[]]
---

# Subsets

Given an integer array `nums` of unique elements, return all possible subsets.

**Return format:** Sort each subset (elements in ascending order), then sort the list of subsets by `(length, elements)`. This ensures deterministic output.

## Examples

```
Input: nums = [1, 2, 3]
Output: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
```

## Constraints

- `1 <= len(nums) <= 10`
- All elements are unique.

## Pattern

Backtracking: append the current path at every call (not just leaves). Pass `start = i + 1` to avoid reuse.
