---
id: aa-find-min-rotated
title: Find Minimum in Rotated Sorted Array
difficulty: easy-medium
estimatedMinutes: 20
functionName: find_min
tags:
  - arrays
  - binary-search
  - day3
starterCode: |
  def find_min(nums):
      pass
solutionCode: |
  def find_min(nums):
      left, right = 0, len(nums) - 1
      while left < right:
          mid = (left + right) // 2
          if nums[mid] > nums[right]:
              left = mid + 1
          else:
              right = mid
      return nums[left]
solutionExplanation: |
  The minimum is at the rotation point. Key observation: if nums[mid] >
  nums[right], the minimum is in the right half (mid+1..right). Otherwise
  the minimum is in the left half including mid (left..mid).

  Loop ends when left == right, which is the minimum's index.

  Time: O(log n). Space: O(1).
tests:
  - id: aa-fmr-1
    name: rotated 3 times
    hidden: false
    args:
      - [3, 4, 5, 1, 2]
    expected: 1
  - id: aa-fmr-2
    name: rotated 4 times
    hidden: false
    args:
      - [4, 5, 6, 7, 0, 1, 2]
    expected: 0
  - id: aa-fmr-3
    name: not rotated
    hidden: false
    args:
      - [11, 13, 15, 17]
    expected: 11
  - id: aa-fmr-4
    name: single element
    hidden: true
    args:
      - [1]
    expected: 1
  - id: aa-fmr-5
    name: two elements rotated
    hidden: true
    args:
      - [2, 1]
    expected: 1
---

# Find Minimum in Rotated Sorted Array

Given a sorted array that was rotated between 1 and n times, return the minimum element. All values are unique.

## Examples

```
Input: nums = [3, 4, 5, 1, 2]
Output: 1

Input: nums = [4, 5, 6, 7, 0, 1, 2]
Output: 0

Input: nums = [11, 13, 15, 17]
Output: 11    # no rotation
```

## Constraints

- `1 <= len(nums) <= 5000`
- All values are unique.
- Must run in O(log n).

## Pattern

Binary search where the pivot (minimum) is found by comparing `nums[mid]` with `nums[right]`. If `nums[mid] > nums[right]`, the minimum is to the right of mid.
