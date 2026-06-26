---
id: aa-contains-duplicate
title: Contains Duplicate
difficulty: easy
estimatedMinutes: 10
functionName: contains_duplicate
tags:
  - arrays
  - hash-set
  - day1
starterCode: |
  def contains_duplicate(nums):
      pass
solutionCode: |
  def contains_duplicate(nums):
      seen = set()
      for n in nums:
          if n in seen:
              return True
          seen.add(n)
      return False
solutionExplanation: |
  Use a set to track values seen so far. On each iteration, check whether
  the current value is already in the set. If yes, return True immediately.
  If the loop completes without a hit, return False.

  Time: O(n) — one pass, O(1) set lookup per element.
  Space: O(n) — the set holds up to n distinct values.

  Alternative: sort and check adjacent pairs in O(n log n) / O(1) space.
  The set approach is faster in time at the cost of extra space.
tests:
  - id: aa-cd-1
    name: has duplicate
    hidden: false
    args:
      - [1, 2, 3, 1]
    expected: true
  - id: aa-cd-2
    name: no duplicate
    hidden: false
    args:
      - [1, 2, 3, 4]
    expected: false
  - id: aa-cd-3
    name: empty array
    hidden: false
    args:
      - []
    expected: false
  - id: aa-cd-4
    name: single element
    hidden: true
    args:
      - [7]
    expected: false
  - id: aa-cd-5
    name: all duplicates
    hidden: true
    args:
      - [1, 1, 1, 1]
    expected: true
  - id: aa-cd-6
    name: duplicate at end of large array
    hidden: true
    args:
      - [1, 2, 3, 4, 5, 6, 7, 8, 9, 1]
    expected: true
---

# Contains Duplicate

Given an integer array `nums`, return `True` if any value appears **at least twice**, and `False` if every element is distinct.

## Examples

```
Input: nums = [1, 2, 3, 1]
Output: True

Input: nums = [1, 2, 3, 4]
Output: False
```

## Constraints

- `0 <= len(nums) <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Pattern

Hash set for O(1) membership check. Ask yourself: "Do I need the count, or just presence?" If presence is enough, use a plain `set`.
