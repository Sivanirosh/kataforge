---
id: aa-majority-element
title: Majority Element
difficulty: easy
estimatedMinutes: 12
functionName: majority_element
tags:
  - arrays
  - hash-map
  - day1
starterCode: |
  def majority_element(nums):
      pass
solutionCode: |
  from collections import Counter

  def majority_element(nums):
      counts = Counter(nums)
      return max(counts, key=counts.get)
solutionExplanation: |
  The majority element appears more than n/2 times (guaranteed). Build a
  frequency count with Counter, then return the element with the highest
  count.

  Time: O(n). Space: O(n).

  Optimal follow-up: Boyer-Moore voting algorithm in O(n) time, O(1) space.
  Maintain a candidate and a count: increment count if the current element
  matches the candidate, decrement otherwise. When count hits 0, replace
  the candidate. The majority element always survives.
tests:
  - id: aa-me-1
    name: basic case
    hidden: false
    args:
      - [3, 2, 3]
    expected: 3
  - id: aa-me-2
    name: longer array
    hidden: false
    args:
      - [2, 2, 1, 1, 1, 2, 2]
    expected: 2
  - id: aa-me-3
    name: single element
    hidden: true
    args:
      - [1]
    expected: 1
  - id: aa-me-4
    name: all same
    hidden: true
    args:
      - [5, 5, 5]
    expected: 5
  - id: aa-me-5
    name: majority at end
    hidden: true
    args:
      - [1, 2, 3, 3, 3]
    expected: 3
---

# Majority Element

Given an array `nums` of size `n`, return the **majority element** — the element that appears more than `n / 2` times.

A majority element always exists in the input.

## Examples

```
Input: nums = [3, 2, 3]
Output: 3

Input: nums = [2, 2, 1, 1, 1, 2, 2]
Output: 2
```

## Constraints

- `1 <= len(nums) <= 5 × 10^4`
- `-10^9 <= nums[i] <= 10^9`
- The majority element always exists.

## Pattern

Hash map frequency count is the straightforward O(n) / O(n) approach. For the O(1) space follow-up, Boyer-Moore voting is the key insight.
