---
id: aa-cp-non-overlapping-intervals
title: Self-check — Non-overlapping Intervals
attachedKataId: aa-non-overlapping-intervals
questions:
  - id: q1
    prompt: >-
      For Non-overlapping Intervals, why does the greedy strategy sort by end
      time rather than start time?
    choices:
      - id: a
        text: >-
          Keeping the interval that ends earliest leaves the most room for
          future intervals
      - id: b
        text: The earliest start interval is always shortest
      - id: c
        text: Sorting by start automatically removes overlaps
      - id: d
        text: End times are needed only to compute durations
    correctChoiceId: a
    explanation: >-
      This is interval scheduling. When two intervals compete, choosing the one
      that finishes first is safest because it blocks the least future timeline.
reflections:
  - id: r1
    prompt: How does 'minimum removals' relate to 'maximum non-overlapping kept'?
    expectedAnswer: >-
      They are complements: removals = total intervals - maximum number of
      non-overlapping intervals you can keep. Solving the activity-selection
      "keep max" problem directly gives the minimum removals.
---
