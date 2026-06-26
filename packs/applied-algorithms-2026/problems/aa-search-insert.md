---
id: aa-search-insert
title: Search Insert Position
difficulty: easy
estimatedMinutes: 12
functionName: search_insert
tags:
  - arrays
  - binary-search
  - day3
starterCode: |
  def search_insert(nums, target):
      pass
solutionCode: |
  def search_insert(nums, target):
      left, right = 0, len(nums) - 1
      while left <= right:
          mid = (left + right) // 2
          if nums[mid] == target:
              return mid
          elif nums[mid] < target:
              left = mid + 1
          else:
              right = mid - 1
      return left
solutionExplanation: |
  Standard binary search. The only change from plain binary search is the
  return value when not found: return left (not -1).

  When the loop ends without a match, left > right and left points to the
  first position where target would be inserted to maintain sorted order.
  This is the bisect_left result.

  Time: O(log n). Space: O(1).
tests:
  - id: aa-si-1
    name: target found
    hidden: false
    args:
      - [1, 3, 5, 6]
      - 5
    expected: 2
  - id: aa-si-2
    name: insert in middle
    hidden: false
    args:
      - [1, 3, 5, 6]
      - 2
    expected: 1
  - id: aa-si-3
    name: insert at end
    hidden: false
    args:
      - [1, 3, 5, 6]
      - 7
    expected: 4
  - id: aa-si-4
    name: insert at beginning
    hidden: true
    args:
      - [1, 3, 5, 6]
      - 0
    expected: 0
  - id: aa-si-5
    name: single element array target found
    hidden: true
    args:
      - [1]
      - 1
    expected: 0
---

# Search Insert Position

Given a sorted array of distinct integers and a target value, return the index where the target is found, or where it would be inserted to keep the array sorted.

## Examples

```
Input: nums = [1, 3, 5, 6], target = 5
Output: 2

Input: nums = [1, 3, 5, 6], target = 2
Output: 1    # would be inserted between 1 and 3

Input: nums = [1, 3, 5, 6], target = 7
Output: 4    # would be inserted at the end
```

## Constraints

- `1 <= len(nums) <= 10^4`
- All values are distinct and sorted.

## Pattern

Plain binary search with `return left` instead of `return -1` when not found. `left` always points to the insertion position after the loop.
