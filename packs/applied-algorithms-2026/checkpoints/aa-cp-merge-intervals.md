---
id: aa-cp-merge-intervals
title: Self-check — Merge Intervals
attachedKataId: aa-merge-intervals
questions:
  - id: q1
    prompt: Why is sorting by start time the move that unlocks Merge Intervals?
    choices:
      - id: a
        text: >-
          After sorting, any interval that can overlap the current merged
          interval appears next
      - id: b
        text: Sorting by start makes every interval the same length
      - id: c
        text: Sorting removes all overlaps automatically
      - id: d
        text: Sorting by end time is required for every interval problem
    correctChoiceId: a
    explanation: >-
      Once starts are ordered, you only need to compare the current interval
      with the last merged interval. Overlaps cannot be hiding later behind a
      larger start.
  - id: q2
    prompt: >-
      When the current interval overlaps the last merged interval, how do you
      update the merged end?
    choices:
      - id: a
        text: 'max(last_end, current_end)'
      - id: b
        text: 'min(last_end, current_end)'
      - id: c
        text: last_end + current_end
      - id: d
        text: current_start - last_start
    correctChoiceId: a
    explanation: >-
      The merged interval must cover both original intervals, so its end is
      whichever end reaches farther.
reflections: []
---

