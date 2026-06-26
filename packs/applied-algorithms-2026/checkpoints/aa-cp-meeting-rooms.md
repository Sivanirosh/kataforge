---
id: aa-cp-meeting-rooms
title: Self-check — Meeting Rooms
attachedKataId: aa-meeting-rooms
questions:
  - id: q1
    prompt: >-
      For Meeting Rooms, after sorting by start time, what single comparison
      detects that one person cannot attend all meetings?
    choices:
      - id: a
        text: current_start < previous_end
      - id: b
        text: current_end < previous_start
      - id: c
        text: current_start == previous_start only
      - id: d
        text: current_duration > previous_duration
    correctChoiceId: a
    explanation: >-
      Once intervals are sorted by start time, any overlap must occur between
      neighbors. If the next meeting starts before the previous one ends, the
      schedule is impossible.
reflections: []
---

