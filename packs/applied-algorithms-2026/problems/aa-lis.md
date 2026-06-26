---
id: aa-lis
title: Longest Increasing Subsequence
difficulty: medium
estimatedMinutes: 25
functionName: length_of_lis
tags:
  - dynamic-programming
  - day5
starterCode: |
  def length_of_lis(nums):
      pass
solutionCode: |
  def length_of_lis(nums):
      dp = [1] * len(nums)

      for i in range(1, len(nums)):
          for j in range(i):
              if nums[j] < nums[i]:
                  dp[i] = max(dp[i], dp[j] + 1)

      return max(dp)
solutionExplanation: |
  dp[i] = length of the longest increasing subsequence ending at index i.
  For each i, look back at all j < i: if nums[j] < nums[i], we can extend
  the LIS ending at j by including nums[i].

  Time: O(n²). Space: O(n).

  Optimal O(n log n) approach: maintain a list `tails` where tails[k] is the
  smallest tail element of all increasing subsequences of length k+1. Use
  bisect_left to find the correct position to update tails.
tests:
  - id: aa-lis-1
    name: basic example
    hidden: false
    args:
      - [10, 9, 2, 5, 3, 7, 101, 18]
    expected: 4
  - id: aa-lis-2
    name: all decreasing
    hidden: false
    args:
      - [3, 2, 1]
    expected: 1
  - id: aa-lis-3
    name: non-trivial
    hidden: false
    args:
      - [0, 1, 0, 3, 2, 3]
    expected: 4
  - id: aa-lis-4
    name: single element
    hidden: true
    args:
      - [7]
    expected: 1
  - id: aa-lis-5
    name: all duplicates
    hidden: true
    args:
      - [2, 2, 2, 2]
    expected: 1
---

# Longest Increasing Subsequence

Given an integer array `nums`, return the length of the longest **strictly increasing** subsequence.

## Examples

```
Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]
Output: 4    # [2, 5, 7, 101] or [2, 3, 7, 101]

Input: nums = [0, 1, 0, 3, 2, 3]
Output: 4    # [0, 1, 2, 3]
```

## Constraints

- `1 <= len(nums) <= 2500`

## Pattern

DP. State: `dp[i]` = LIS length ending at index `i`. Answer: `max(dp)`. O(n²) is acceptable for n ≤ 2500. The O(n log n) approach uses patience sorting with binary search.
