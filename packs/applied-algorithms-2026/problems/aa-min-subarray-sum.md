---
id: aa-min-subarray-sum
title: Minimum Size Subarray Sum
difficulty: easy-medium
estimatedMinutes: 20
functionName: min_sub_array_len
tags:
  - arrays
  - sliding-window
  - day2
starterCode: |
  def min_sub_array_len(target, nums):
      pass
solutionCode: |
  def min_sub_array_len(target, nums):
      left = 0
      total = 0
      best = float('inf')

      for right in range(len(nums)):
          total += nums[right]
          while total >= target:
              best = min(best, right - left + 1)
              total -= nums[left]
              left += 1

      return 0 if best == float('inf') else best
solutionExplanation: |
  Sliding window with a shrink condition. When the current window sum
  meets or exceeds the target, record the window length and shrink from
  the left as long as the sum remains valid. This finds the minimum
  length window in a single pass.

  Time: O(n) — each element is added and removed at most once.
  Space: O(1).
tests:
  - id: aa-mss-1
    name: basic case
    hidden: false
    args:
      - 7
      - [2, 3, 1, 2, 4, 3]
    expected: 2
  - id: aa-mss-2
    name: no valid subarray
    hidden: false
    args:
      - 11
      - [1, 1, 1, 1, 1, 1, 1, 1]
    expected: 0
  - id: aa-mss-3
    name: whole array needed
    hidden: false
    args:
      - 15
      - [1, 2, 3, 4, 5]
    expected: 5
  - id: aa-mss-4
    name: single element satisfies
    hidden: true
    args:
      - 4
      - [1, 4, 4]
    expected: 1
  - id: aa-mss-5
    name: two elements satisfy
    hidden: true
    args:
      - 6
      - [2, 3, 4, 2, 1]
    expected: 2
---

# Minimum Size Subarray Sum

Given an array of positive integers `nums` and a positive integer `target`, return the **minimum length** of a contiguous subarray whose sum is greater than or equal to `target`. Return `0` if no such subarray exists.

## Examples

```
Input: target = 7, nums = [2, 3, 1, 2, 4, 3]
Output: 2    # [4, 3] has sum 7

Input: target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1]
Output: 0    # total sum = 8 < 11
```

## Constraints

- `1 <= target <= 10^9`
- `1 <= len(nums) <= 10^5`
- `1 <= nums[i] <= 10^4`

## Pattern

Sliding window. The window is valid when `sum >= target`. Shrink from the left to minimize length while sum remains valid.
