---
id: aa-subarray-sum-k
title: Subarray Sum Equals K
difficulty: medium
estimatedMinutes: 25
functionName: subarray_sum
tags:
  - arrays
  - prefix-sum
  - hash-map
  - day3
starterCode: |
  def subarray_sum(nums, k):
      pass
solutionCode: |
  from collections import defaultdict

  def subarray_sum(nums, k):
      count = 0
      prefix = 0
      seen = defaultdict(int)
      seen[0] = 1

      for n in nums:
          prefix += n
          count += seen[prefix - k]
          seen[prefix] += 1

      return count
solutionExplanation: |
  Prefix sum + hash map. For each position i, the sum of subarray [j+1..i]
  equals prefix[i] - prefix[j]. We want prefix[i] - prefix[j] == k,
  i.e., prefix[j] == prefix[i] - k.

  As we scan, count how many times (prefix_so_far - k) has appeared
  in the prefix sum history. That equals the number of valid subarrays
  ending at the current position.

  Initialize seen[0] = 1 to handle subarrays starting at index 0.

  Time: O(n). Space: O(n).

  Note: works with negative numbers (unlike the sliding window approach).
tests:
  - id: aa-ssk-1
    name: basic
    hidden: false
    args:
      - [1, 1, 1]
      - 2
    expected: 2
  - id: aa-ssk-2
    name: two subarrays
    hidden: false
    args:
      - [1, 2, 3]
      - 3
    expected: 2
  - id: aa-ssk-3
    name: negative numbers
    hidden: true
    args:
      - [1, -1, 1, -1, 1]
      - 0
    expected: 4
  - id: aa-ssk-4
    name: no match
    hidden: true
    args:
      - [1, 2, 3]
      - 10
    expected: 0
  - id: aa-ssk-5
    name: whole array
    hidden: true
    args:
      - [3, 3]
      - 6
    expected: 1
---

# Subarray Sum Equals K

Given an integer array `nums` and an integer `k`, return the total number of subarrays whose sum equals `k`.

## Examples

```
Input: nums = [1, 1, 1], k = 2
Output: 2    # [1,1] at indices 0-1 and 1-2

Input: nums = [1, 2, 3], k = 3
Output: 2    # [3] at index 2, and [1,2] at indices 0-1
```

## Constraints

- `1 <= len(nums) <= 2 × 10^4`
- `-1000 <= nums[i] <= 1000`
- `-10^7 <= k <= 10^7`

## Pattern

Prefix sum + hash map. This works even with negative numbers. The key identity: `sum(j+1..i) = prefix[i] - prefix[j]`.
