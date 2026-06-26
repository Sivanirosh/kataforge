---
id: aa-meeting-rooms-ii
title: Meeting Rooms II
difficulty: medium
estimatedMinutes: 25
functionName: min_meeting_rooms
tags:
  - intervals
  - heap
  - sorting
  - day2
starterCode: |
  def min_meeting_rooms(intervals):
      pass
solutionCode: |
  import heapq

  def min_meeting_rooms(intervals):
      if not intervals:
          return 0
      intervals.sort()
      heap = []
      for start, end in intervals:
          if heap and heap[0] <= start:
              heapq.heapreplace(heap, end)
          else:
              heapq.heappush(heap, end)
      return len(heap)
solutionExplanation: |
  Sort meetings by start time. Maintain a min-heap of end times of all
  active rooms. For each new meeting: if the earliest-ending room finishes
  before or at the new meeting's start, reuse it (replace its end time).
  Otherwise, open a new room (push a new end time).

  The heap size at the end equals the number of rooms required.

  Time: O(n log n). Space: O(n).

  Alternative: count overlapping intervals at any point using sweep line.
tests:
  - id: aa-mr2-1
    name: two rooms needed
    hidden: false
    args:
      - [[0,30],[5,10],[15,20]]
    expected: 2
  - id: aa-mr2-2
    name: one room sufficient
    hidden: false
    args:
      - [[7,10],[2,4]]
    expected: 1
  - id: aa-mr2-3
    name: all concurrent
    hidden: true
    args:
      - [[1,10],[2,11],[3,12]]
    expected: 3
  - id: aa-mr2-4
    name: empty
    hidden: true
    args:
      - []
    expected: 0
  - id: aa-mr2-5
    name: sequential meetings
    hidden: true
    args:
      - [[1,5],[5,10],[10,15]]
    expected: 1
---

# Meeting Rooms II

Given an array of meeting time intervals `intervals[i] = [start_i, end_i]`, return the minimum number of conference rooms required.

## Examples

```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2

Input: intervals = [[7,10],[2,4]]
Output: 1
```

## Constraints

- `1 <= len(intervals) <= 10^4`
- `0 <= start_i < end_i <= 10^6`

## Pattern

Sort by start time + min-heap of end times. The heap represents currently active rooms. Reuse a room if its current meeting ends before the next one starts.
