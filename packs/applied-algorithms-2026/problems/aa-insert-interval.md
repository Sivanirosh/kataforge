---
id: aa-insert-interval
title: Insert Interval
difficulty: easy-medium
estimatedMinutes: 25
functionName: insert
tags:
  - intervals
  - sorting
  - day2
starterCode: |
  def insert(intervals, new_interval):
      pass
solutionCode: |
  def insert(intervals, new_interval):
      result = []
      i = 0
      n = len(intervals)
      start, end = new_interval

      while i < n and intervals[i][1] < start:
          result.append(intervals[i])
          i += 1

      while i < n and intervals[i][0] <= end:
          start = min(start, intervals[i][0])
          end = max(end, intervals[i][1])
          i += 1

      result.append([start, end])

      while i < n:
          result.append(intervals[i])
          i += 1

      return result
solutionExplanation: |
  Three phases:
  1. Add all intervals that end before the new interval starts (no overlap).
  2. Merge all intervals that overlap with the new interval by extending
     the new interval's bounds.
  3. Add all remaining intervals (they start after the merged interval ends).

  The input is already sorted, so no sort is needed.
  Time: O(n). Space: O(n).
tests:
  - id: aa-ii-1
    name: insert in middle with merge
    hidden: false
    args:
      - [[1,3],[6,9]]
      - [2,5]
    expected: [[1,5],[6,9]]
  - id: aa-ii-2
    name: merge multiple
    hidden: false
    args:
      - [[1,2],[3,5],[6,7],[8,10],[12,16]]
      - [4,8]
    expected: [[1,2],[3,10],[12,16]]
  - id: aa-ii-3
    name: empty intervals
    hidden: true
    args:
      - []
      - [5,7]
    expected: [[5,7]]
  - id: aa-ii-4
    name: insert at beginning
    hidden: true
    args:
      - [[3,5],[6,9]]
      - [1,2]
    expected: [[1,2],[3,5],[6,9]]
  - id: aa-ii-5
    name: new interval covers all
    hidden: true
    args:
      - [[1,5]]
      - [0,10]
    expected: [[0,10]]
---

# Insert Interval

Given a sorted list of non-overlapping intervals and a `new_interval`, insert `new_interval` into the list, merging any overlapping intervals. Return the resulting list.

## Examples

```
Input: intervals = [[1,3],[6,9]], new_interval = [2,5]
Output: [[1,5],[6,9]]

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], new_interval = [4,8]
Output: [[1,2],[3,10],[12,16]]
```

## Constraints

- `0 <= len(intervals) <= 10^4`
- Intervals are sorted by start time and non-overlapping.

## Pattern

Three-phase linear scan: skip non-overlapping before, merge overlapping, append non-overlapping after. No sort needed since input is already sorted.
