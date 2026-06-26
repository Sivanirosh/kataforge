---
id: aa-top-k-frequent
title: Top K Frequent Elements
difficulty: easy-medium
estimatedMinutes: 20
functionName: top_k_frequent
tags:
  - arrays
  - hash-map
  - heap
  - day1
starterCode: |
  def top_k_frequent(nums, k):
      pass
solutionCode: |
  from collections import Counter
  import heapq

  def top_k_frequent(nums, k):
      counts = Counter(nums)
      return [elem for elem, _ in counts.most_common(k)]
solutionExplanation: |
  Count element frequencies with Counter. Use most_common(k) which
  internally uses a heap to return the k most frequent elements in
  descending frequency order.

  Time: O(n log k) using a heap of size k.
  Space: O(n) for the frequency dict.

  Alternative with explicit heap:
    heap = []
    for elem, count in counts.items():
        heapq.heappush(heap, (count, elem))
        if len(heap) > k:
            heapq.heappop(heap)
    return [elem for _, elem in heap]

  The test cases have no frequency ties, so output order is deterministic.
tests:
  - id: aa-tkf-1
    name: top 2
    hidden: false
    args:
      - [1, 1, 1, 2, 2, 3]
      - 2
    expected: [1, 2]
  - id: aa-tkf-2
    name: k equals 1
    hidden: false
    args:
      - [1]
      - 1
    expected: [1]
  - id: aa-tkf-3
    name: top 2 with clear winner
    hidden: true
    args:
      - [4, 4, 4, 4, 3, 3, 3, 2, 2, 1]
      - 2
    expected: [4, 3]
  - id: aa-tkf-4
    name: k equals distinct count
    hidden: true
    args:
      - [5, 5, 5, 4, 4, 3]
      - 3
    expected: [5, 4, 3]
---

# Top K Frequent Elements

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements in **descending frequency order**.

The test cases are designed so that all frequencies are distinct — no ties.

## Examples

```
Input: nums = [1, 1, 1, 2, 2, 3], k = 2
Output: [1, 2]    # 1 appears 3 times, 2 appears 2 times
```

## Constraints

- `1 <= len(nums) <= 10^5`
- `k` is in the range `[1, number of unique elements]`
- No frequency ties in test cases.

## Pattern

`Counter.most_common(k)` is the idiomatic one-liner. For the heap-based approach, maintain a min-heap of size `k` — pop the minimum when the heap exceeds `k`.
