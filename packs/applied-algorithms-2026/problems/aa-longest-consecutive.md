---
id: aa-longest-consecutive
title: Longest Consecutive Sequence
difficulty: easy-medium
estimatedMinutes: 25
functionName: longest_consecutive
tags:
  - arrays
  - hash-set
  - day1
starterCode: |
  def longest_consecutive(nums):
      pass
solutionCode: |
  def longest_consecutive(nums):
      num_set = set(nums)
      best = 0

      for n in num_set:
          if n - 1 not in num_set:
              current = n
              streak = 1

              while current + 1 in num_set:
                  current += 1
                  streak += 1

              best = max(best, streak)

      return best
solutionExplanation: |
  Put all numbers into a set for O(1) lookup.

  For each number n that is the start of a sequence (n-1 is not in the set),
  extend the streak: count how far n+1, n+2, ... are also in the set.

  The key insight: only start counting from sequence beginnings (n-1 not in
  set). This avoids re-counting and gives O(n) total work — each number is
  visited at most twice.

  Time: O(n). Space: O(n) for the set.
tests:
  - id: aa-lc-1
    name: basic sequence
    hidden: false
    args:
      - [100, 4, 200, 1, 3, 2]
    expected: 4
  - id: aa-lc-2
    name: empty array
    hidden: false
    args:
      - []
    expected: 0
  - id: aa-lc-3
    name: longer sequence with duplicates
    hidden: false
    args:
      - [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
    expected: 9
  - id: aa-lc-4
    name: single element
    hidden: true
    args:
      - [5]
    expected: 1
  - id: aa-lc-5
    name: all duplicates
    hidden: true
    args:
      - [1, 1, 1, 1]
    expected: 1
  - id: aa-lc-6
    name: two separate sequences
    hidden: true
    args:
      - [1, 2, 3, 10, 11, 12, 13]
    expected: 4
---

# Longest Consecutive Sequence

Given an unsorted array of integers `nums`, return the length of the **longest consecutive elements sequence**.

Solve in O(n) time.

## Examples

```
Input: nums = [100, 4, 200, 1, 3, 2]
Output: 4      # sequence: [1, 2, 3, 4]

Input: nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9      # sequence: [0, 1, 2, 3, 4, 5, 6, 7, 8]
```

## Constraints

- `0 <= len(nums) <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Pattern

Hash set + "start-of-sequence" trick. The question "why not just sort?" is the key interview probe — sorting is O(n log n); the set approach is O(n).
