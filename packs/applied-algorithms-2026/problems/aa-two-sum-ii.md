---
id: aa-two-sum-ii
title: Two Sum II — Input Array is Sorted
difficulty: easy
estimatedMinutes: 12
functionName: two_sum_ii
tags:
  - arrays
  - two-pointers
  - day2
starterCode: |
  def two_sum_ii(numbers, target):
      pass
solutionCode: |
  def two_sum_ii(numbers, target):
      left, right = 0, len(numbers) - 1
      while left < right:
          s = numbers[left] + numbers[right]
          if s == target:
              return [left + 1, right + 1]
          elif s < target:
              left += 1
          else:
              right -= 1
      return []
solutionExplanation: |
  Because the array is sorted, two pointers work optimally:
  - If sum < target: move left pointer right (need larger value).
  - If sum > target: move right pointer left (need smaller value).
  - If sum == target: found the answer.

  Return 1-indexed positions as required by the problem.

  Time: O(n). Space: O(1).

  Why not a hash map? The sorted property enables O(1) space two-pointer.
  The interviewer may ask you to compare both approaches.
tests:
  - id: aa-ts2-1
    name: basic
    hidden: false
    args:
      - [2, 7, 11, 15]
      - 9
    expected: [1, 2]
  - id: aa-ts2-2
    name: not first pair
    hidden: false
    args:
      - [2, 3, 4]
      - 6
    expected: [1, 3]
  - id: aa-ts2-3
    name: negative numbers
    hidden: false
    args:
      - [-1, 0]
      - -1
    expected: [1, 2]
  - id: aa-ts2-4
    name: duplicate values at answer
    hidden: true
    args:
      - [1, 2, 3, 4, 4, 9, 56, 90]
      - 8
    expected: [4, 5]
  - id: aa-ts2-5
    name: large array
    hidden: true
    args:
      - [1, 3, 4, 5, 7, 10, 11]
      - 9
    expected: [3, 5]
---

# Two Sum II — Input Array is Sorted

Given a **1-indexed** array of integers `numbers` that is sorted in non-decreasing order, find two numbers such that they add up to a specific target.

Return the indices of the two numbers as `[index1, index2]` where `1 <= index1 < index2 <= len(numbers)`. Exactly one solution exists.

## Examples

```
Input: numbers = [2, 7, 11, 15], target = 9
Output: [1, 2]    # numbers[0] + numbers[1] = 2 + 7 = 9

Input: numbers = [2, 3, 4], target = 6
Output: [1, 3]    # 2 + 4 = 6
```

## Constraints

- `2 <= len(numbers) <= 3 × 10^4`
- `-1000 <= numbers[i] <= 1000`
- Exactly one valid answer exists.

## Pattern

Two pointers exploit the sorted order. Move the pointer that makes the sum worse. The interviewer may ask: "Why not use a hash map?" — the sorted property eliminates the need for extra space.
