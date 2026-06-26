---
id: aa-binary-search
title: Binary Search
difficulty: easy
estimatedMinutes: 12
functionName: search
tags:
  - arrays
  - binary-search
  - day3
starterCode: |
  def search(nums, target):
      pass
solutionCode: |
  def search(nums, target):
      left, right = 0, len(nums) - 1
      while left <= right:
          mid = (left + right) // 2
          if nums[mid] == target:
              return mid
          elif nums[mid] < target:
              left = mid + 1
          else:
              right = mid - 1
      return -1
solutionExplanation: |
  Classic binary search. The invariant: the target, if it exists, is in
  nums[left..right]. Each iteration halves the search space.

  Loop condition: left <= right (not left < right) — the single-element
  subarray must still be checked.
  Mid formula: (left + right) // 2 — avoids overflow in Python (not an
  issue, but good habit).

  Time: O(log n). Space: O(1).
tests:
  - id: aa-bs-1
    name: target in middle
    hidden: false
    args:
      - [-1, 0, 3, 5, 9, 12]
      - 9
    expected: 4
  - id: aa-bs-2
    name: target not present
    hidden: false
    args:
      - [-1, 0, 3, 5, 9, 12]
      - 2
    expected: -1
  - id: aa-bs-3
    name: single element found
    hidden: true
    args:
      - [5]
      - 5
    expected: 0
  - id: aa-bs-4
    name: single element not found
    hidden: true
    args:
      - [5]
      - 3
    expected: -1
  - id: aa-bs-5
    name: first element
    hidden: true
    args:
      - [1, 2, 3, 4, 5]
      - 1
    expected: 0
  - id: aa-bs-6
    name: last element
    hidden: true
    args:
      - [1, 2, 3, 4, 5]
      - 5
    expected: 4
---

# Binary Search

Given a sorted array `nums` of distinct integers and a target, return the index of `target` in the array, or `-1` if it is not present.

## Examples

```
Input: nums = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4

Input: nums = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1
```

## Constraints

- `1 <= len(nums) <= 10^4`
- All values are distinct and sorted in ascending order.
- `-10^4 <= nums[i], target <= 10^4`

## Pattern

This is the template binary search. Know it cold: `left <= right`, `mid = (left + right) // 2`, move `left = mid + 1` or `right = mid - 1`.
