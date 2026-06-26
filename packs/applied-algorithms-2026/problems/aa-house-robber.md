---
id: aa-house-robber
title: House Robber
difficulty: easy-medium
estimatedMinutes: 15
functionName: rob
tags:
  - dynamic-programming
  - day5
starterCode: |
  def rob(nums):
      pass
solutionCode: |
  def rob(nums):
      if not nums:
          return 0
      if len(nums) == 1:
          return nums[0]
      prev2, prev1 = nums[0], max(nums[0], nums[1])
      for i in range(2, len(nums)):
          prev2, prev1 = prev1, max(prev1, prev2 + nums[i])
      return prev1
solutionExplanation: |
  For each house i, the maximum money is: max(rob(i-1), rob(i-2) + nums[i]).
  Either skip house i (take the previous best), or rob it (add to best from
  two houses ago).

  dp[0] = nums[0]
  dp[1] = max(nums[0], nums[1])
  dp[i] = max(dp[i-1], dp[i-2] + nums[i])

  Space-optimize to O(1) by keeping only prev1 and prev2.

  Time: O(n). Space: O(1).
tests:
  - id: aa-hr-1
    name: basic example
    hidden: false
    args:
      - [1, 2, 3, 1]
    expected: 4
  - id: aa-hr-2
    name: longer example
    hidden: false
    args:
      - [2, 7, 9, 3, 1]
    expected: 12
  - id: aa-hr-3
    name: single house
    hidden: true
    args:
      - [5]
    expected: 5
  - id: aa-hr-4
    name: two houses
    hidden: true
    args:
      - [1, 2]
    expected: 2
  - id: aa-hr-5
    name: uniform values
    hidden: true
    args:
      - [3, 3, 3, 3, 3]
    expected: 9
---

# House Robber

You are a robber planning to rob houses along a street. You cannot rob two adjacent houses. Given a list of non-negative integers representing money in each house, return the maximum amount you can rob.

## Examples

```
Input: nums = [1, 2, 3, 1]
Output: 4    # rob houses 1 and 3: 1 + 3

Input: nums = [2, 7, 9, 3, 1]
Output: 12   # rob houses 0, 2, 4: 2 + 9 + 1
```

## Constraints

- `1 <= len(nums) <= 100`
- `0 <= nums[i] <= 400`

## Pattern

DP with two-state rolling window. State: `dp[i]` = max money robbing houses `0..i`. Recurrence: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.
