---
id: aa-range-sum-query
title: Range Sum Query (Multiple Queries)
difficulty: easy
estimatedMinutes: 15
functionName: range_sum_query
tags:
  - prefix-sum
  - day3
starterCode: |
  def range_sum_query(nums, queries):
      """
      queries: list of [left, right] pairs (inclusive, 0-indexed)
      return: list of sums for each query
      """
      pass
solutionCode: |
  def range_sum_query(nums, queries):
      prefix = [0]
      for x in nums:
          prefix.append(prefix[-1] + x)
      return [prefix[r + 1] - prefix[l] for l, r in queries]
solutionExplanation: |
  Build a prefix sum array of length n+1 where prefix[i] = sum(nums[0..i-1]).
  For any range [l, r] (inclusive): sum = prefix[r+1] - prefix[l].

  This answers each query in O(1) after O(n) preprocessing.

  Time: O(n + q) where q = number of queries. Space: O(n).

  In the class-based LeetCode version (NumArray), the prefix sum is built
  in __init__ and queries are answered in sum_range. The same math applies.
tests:
  - id: aa-rsq-1
    name: multiple queries
    hidden: false
    args:
      - [-2, 0, 3, -5, 2, -1]
      - [[0, 2], [2, 5], [0, 5]]
    expected: [1, -1, -3]
  - id: aa-rsq-2
    name: single element queries
    hidden: true
    args:
      - [1, 2, 3, 4, 5]
      - [[0, 0], [4, 4], [2, 4]]
    expected: [1, 5, 12]
  - id: aa-rsq-3
    name: whole array query
    hidden: true
    args:
      - [5, 5, 5]
      - [[0, 2]]
    expected: [15]
---

# Range Sum Query (Multiple Queries)

Given an integer array `nums` and a list of `queries` (each query is `[left, right]`, inclusive), return the sum of elements for each query.

**Optimize:** use prefix sums so each query answers in O(1) after O(n) setup.

## Examples

```
Input: nums = [-2, 0, 3, -5, 2, -1]
       queries = [[0,2], [2,5], [0,5]]
Output: [1, -1, -3]
# [0,2]: -2+0+3 = 1
# [2,5]: 3+(-5)+2+(-1) = -1
# [0,5]: sum of all = -3
```

## Constraints

- `1 <= len(nums) <= 10^4`
- `0 <= left <= right < len(nums)`

## Pattern

Prefix sum. The formula `prefix[r+1] - prefix[l]` answers any range sum query in O(1).
