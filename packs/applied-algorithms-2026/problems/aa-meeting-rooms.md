---
id: aa-meeting-rooms
title: Meeting Rooms
difficulty: easy
estimatedMinutes: 12
functionName: can_attend_meetings
tags:
  - intervals
  - sorting
  - day2
starterCode: |
  def can_attend_meetings(intervals):
      pass
solutionCode: |
  def can_attend_meetings(intervals):
      intervals.sort()
      for i in range(1, len(intervals)):
          if intervals[i][0] < intervals[i-1][1]:
              return False
      return True
solutionExplanation: |
  Sort by start time. If any meeting starts before the previous one ends,
  there is a conflict. Check adjacent pairs after sorting.

  Time: O(n log n). Space: O(1).
tests:
  - id: aa-mr-1
    name: conflict exists
    hidden: false
    args:
      - [[0,30],[5,10],[15,20]]
    expected: false
  - id: aa-mr-2
    name: no conflict
    hidden: false
    args:
      - [[7,10],[2,4]]
    expected: true
  - id: aa-mr-3
    name: empty schedule
    hidden: true
    args:
      - []
    expected: true
  - id: aa-mr-4
    name: adjacent meetings
    hidden: true
    args:
      - [[1,5],[5,10]]
    expected: true
  - id: aa-mr-5
    name: single meeting
    hidden: true
    args:
      - [[1,10]]
    expected: true
---

# Meeting Rooms

Given an array of meeting time intervals `intervals[i] = [start_i, end_i]`, determine if a person could attend all meetings (no two meetings overlap).

A meeting ending at time `t` and another starting at time `t` do **not** overlap.

## Examples

```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: False    # [0,30] conflicts with [5,10]

Input: intervals = [[7,10],[2,4]]
Output: True
```

## Constraints

- `0 <= len(intervals) <= 10^4`
- `0 <= start_i < end_i <= 10^6`

## Pattern

Sort by start time, then check adjacent pairs. This is the entry-level interval problem.
