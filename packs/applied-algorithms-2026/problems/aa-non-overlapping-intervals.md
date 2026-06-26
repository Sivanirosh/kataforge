---
id: aa-non-overlapping-intervals
title: Non-overlapping Intervals
difficulty: easy-medium
estimatedMinutes: 20
functionName: erase_overlap_intervals
tags:
  - intervals
  - greedy
  - day2
starterCode: |
  def erase_overlap_intervals(intervals):
      pass
solutionCode: |
  def erase_overlap_intervals(intervals):
      if not intervals:
          return 0
      intervals.sort(key=lambda x: x[1])
      count = 0
      last_end = intervals[0][1]

      for i in range(1, len(intervals)):
          if intervals[i][0] < last_end:
              count += 1
          else:
              last_end = intervals[i][1]

      return count
solutionExplanation: |
  Greedy: sort by end time. Keep intervals that start no earlier than
  the last kept interval's end. When there is a conflict, remove the one
  that ends later — keeping the one that ends earlier leaves more room
  for future intervals.

  This is equivalent to the classic "activity selection" problem.

  Time: O(n log n). Space: O(1).

  Common mistake: sorting by start time. The correct greedy is by end time.
tests:
  - id: aa-noi-1
    name: remove one
    hidden: false
    args:
      - [[1,2],[2,3],[3,4],[1,3]]
    expected: 1
  - id: aa-noi-2
    name: no removal needed
    hidden: false
    args:
      - [[1,2],[2,3]]
    expected: 0
  - id: aa-noi-3
    name: all overlap same slot
    hidden: false
    args:
      - [[1,2],[1,2],[1,2]]
    expected: 2
  - id: aa-noi-4
    name: empty input
    hidden: true
    args:
      - []
    expected: 0
  - id: aa-noi-5
    name: nested and crossing intervals
    hidden: true
    args:
      - [[1,100],[11,22],[1,11],[2,12]]
    expected: 2
---

# Non-overlapping Intervals

Given an array of intervals, return the **minimum number of intervals** you need to remove to make the rest non-overlapping.

## Examples

```
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1    # remove [1,3]

Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2    # keep one, remove two
```

## Constraints

- `1 <= len(intervals) <= 10^5`
- `intervals[i].length == 2`
- `-5 × 10^4 <= start_i < end_i <= 5 × 10^4`

## Pattern

Greedy: sort by end time and greedily keep the interval that ends earliest at each conflict. This is the activity selection problem.
