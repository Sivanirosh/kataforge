---
id: aa-merge-intervals
title: Merge Intervals
difficulty: easy-medium
estimatedMinutes: 20
functionName: merge
tags:
  - intervals
  - sorting
  - day2
starterCode: |
  def merge(intervals):
      pass
solutionCode: |
  def merge(intervals):
      if not intervals:
          return []
      intervals.sort()
      merged = []
      for start, end in intervals:
          if not merged or start > merged[-1][1]:
              merged.append([start, end])
          else:
              merged[-1][1] = max(merged[-1][1], end)
      return merged
solutionExplanation: |
  Sort by start time. Iterate through intervals: if the current interval
  starts after the last merged interval ends (start > merged[-1][1]),
  there is no overlap — append as new. Otherwise merge by extending the
  end to max(current end, last end).

  Time: O(n log n) for sort. Space: O(n) for the result.

  The sort is the key step. Without it, you would need O(n²) to detect
  all overlaps.
tests:
  - id: aa-mi-1
    name: standard merge
    hidden: false
    args:
      - [[1,3],[2,6],[8,10],[15,18]]
    expected: [[1,6],[8,10],[15,18]]
  - id: aa-mi-2
    name: touching intervals
    hidden: false
    args:
      - [[1,4],[4,5]]
    expected: [[1,5]]
  - id: aa-mi-3
    name: no merging needed
    hidden: true
    args:
      - [[1,2],[3,4],[5,6]]
    expected: [[1,2],[3,4],[5,6]]
  - id: aa-mi-4
    name: unsorted input
    hidden: true
    args:
      - [[3,4],[1,2],[2,5]]
    expected: [[1,5]]
  - id: aa-mi-5
    name: single interval
    hidden: true
    args:
      - [[1,5]]
    expected: [[1,5]]
---

# Merge Intervals

Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals.

## Examples

```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
# [1,3] and [2,6] overlap → [1,6]

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
# Touching counts as overlapping
```

## Constraints

- `1 <= len(intervals) <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^4`

## Pattern

Sort by start time, then one pass with a running "last merged" interval. The sort makes overlap detection O(1) per step.
