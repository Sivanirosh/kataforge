---
id: aa-search-rotated
title: Search in Rotated Sorted Array
difficulty: medium
estimatedMinutes: 25
functionName: search_rotated
tags:
  - arrays
  - binary-search
  - day3
starterCode: |
  def search_rotated(nums, target):
      pass
solutionCode: |
  def search_rotated(nums, target):
      left, right = 0, len(nums) - 1
      while left <= right:
          mid = (left + right) // 2
          if nums[mid] == target:
              return mid
          if nums[left] <= nums[mid]:
              if nums[left] <= target < nums[mid]:
                  right = mid - 1
              else:
                  left = mid + 1
          else:
              if nums[mid] < target <= nums[right]:
                  left = mid + 1
              else:
                  right = mid - 1
      return -1
solutionExplanation: |
  In a rotated sorted array, at least one half of [left..mid] or [mid..right]
  is always sorted. Check which half is sorted (using nums[left] <= nums[mid]).
  If the target falls inside the sorted half, search there. Otherwise search
  the other half.

  Time: O(log n). Space: O(1).
tests:
  - id: aa-sr-1
    name: target in right segment
    hidden: false
    args:
      - [4, 5, 6, 7, 0, 1, 2]
      - 0
    expected: 4
  - id: aa-sr-2
    name: target not found
    hidden: false
    args:
      - [4, 5, 6, 7, 0, 1, 2]
      - 3
    expected: -1
  - id: aa-sr-3
    name: single element no match
    hidden: false
    args:
      - [1]
      - 0
    expected: -1
  - id: aa-sr-4
    name: no rotation
    hidden: true
    args:
      - [1, 2, 3, 4, 5]
      - 3
    expected: 2
  - id: aa-sr-5
    name: target at rotation pivot
    hidden: true
    args:
      - [6, 7, 1, 2, 3, 4, 5]
      - 1
    expected: 2
---

# Search in Rotated Sorted Array

An integer array `nums` sorted in ascending order has been rotated at some pivot. Given `nums` and a target, return the index of target or `-1` if not present.

## Examples

```
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4

Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1
```

## Constraints

- `1 <= len(nums) <= 5000`
- All values are distinct.
- Must run in O(log n).

## Pattern

Modified binary search. Key insight: one half of every split is always sorted. Use that to decide which half to search.
