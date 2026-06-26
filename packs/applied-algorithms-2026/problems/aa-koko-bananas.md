---
id: aa-koko-bananas
title: Koko Eating Bananas
difficulty: medium
estimatedMinutes: 30
functionName: min_eating_speed
tags:
  - binary-search-on-answer
  - day3
starterCode: |
  def min_eating_speed(piles, h):
      pass
solutionCode: |
  import math

  def min_eating_speed(piles, h):
      def can_finish(k):
          return sum(math.ceil(p / k) for p in piles) <= h

      left, right = 1, max(piles)
      while left < right:
          mid = (left + right) // 2
          if can_finish(mid):
              right = mid
          else:
              left = mid + 1
      return left
solutionExplanation: |
  Binary search on the answer: the eating speed k.

  Feasibility: can_finish(k) = True if eating k bananas/hour allows
  finishing all piles in h hours. Each pile needs ceil(pile/k) hours.

  The feasibility condition is monotonic: if k works, any k' > k also
  works. So binary search finds the minimum feasible k.

  Search range: [1, max(piles)].

  Time: O(n log max(piles)). Space: O(1).
tests:
  - id: aa-kb-1
    name: basic case
    hidden: false
    args:
      - [3, 6, 7, 11]
      - 8
    expected: 4
  - id: aa-kb-2
    name: tight hours
    hidden: false
    args:
      - [30, 11, 23, 4, 20]
      - 5
    expected: 30
  - id: aa-kb-3
    name: extra hours
    hidden: false
    args:
      - [30, 11, 23, 4, 20]
      - 6
    expected: 23
  - id: aa-kb-4
    name: single pile
    hidden: true
    args:
      - [10]
      - 3
    expected: 4
  - id: aa-kb-5
    name: all piles same
    hidden: true
    args:
      - [5, 5, 5]
      - 3
    expected: 5
---

# Koko Eating Bananas

Koko can eat `k` bananas per hour. Given `n` piles of bananas and `h` hours, find the **minimum** eating speed `k` that allows eating all bananas within `h` hours.

When Koko starts a pile, she eats from it until it is empty or the hour ends.

## Examples

```
Input: piles = [3, 6, 7, 11], h = 8
Output: 4
# k=4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 ≤ 8

Input: piles = [30, 11, 23, 4, 20], h = 5
Output: 30
# Minimum speed to eat each pile in at most 1 hour
```

## Constraints

- `1 <= len(piles) <= 10^4`
- `1 <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

## Pattern

Binary search on answer. Recognize the signal: "find the minimum X such that condition(X) is true" where the condition is monotonic. Say: "If speed k works, any speed k' > k also works — so I binary search."
