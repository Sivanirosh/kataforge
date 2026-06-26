---
id: two-sum
title: Two Sum
difficulty: easy
estimatedMinutes: 15
functionName: two_sum
tags:
  - arrays
  - hash-map
hints:
  - A brute-force nested loop works for small inputs; ask what repeated work it does.
  - As you scan left to right, keep a lookup from each number you have already seen to its index.
starterCode: |
  def two_sum(nums, target):
      # Return indices of two numbers that add up to target
      pass
solutionCode: |
  def two_sum(nums, target):
      seen = {}
      for i, num in enumerate(nums):
          complement = target - num
          if complement in seen:
              return [seen[complement], i]
          seen[num] = i
      return []
solutionExplanation: |
  Use a hash map to remember each value and its index as you scan the array once.

  For each number, check whether `target - num` was seen earlier. If yes, return both indices. Otherwise store the current number.
tests:
  - id: sample-1
    name: basic pair
    hidden: false
    args:
      - [2, 7, 11, 15]
      - 9
    expected: [0, 1]
  - id: sample-2
    name: same indices order
    hidden: false
    args:
      - [3, 2, 4]
      - 6
    expected: [1, 2]
  - id: hidden-1
    name: negative numbers
    hidden: true
    args:
      - [-1, -2, -3, -4, -5]
      - -8
    expected: [2, 4]
  - id: hidden-2
    name: duplicate values
    hidden: true
    args:
      - [3, 3]
      - 6
    expected: [0, 1]
---

# Two Sum

Given an array of integers `nums` and an integer `target`, return **indices** of the two numbers such that they add up to `target`.

You may assume each input has exactly one solution, and you may not use the same element twice.

## Examples

```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
```

## Constraints

- `2 <= len(nums) <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- Exactly one valid answer exists
