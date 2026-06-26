---
id: aa-cp-insert-interval
title: Self-check — Insert Interval
attachedKataId: aa-insert-interval
questions:
  - id: q1
    prompt: >-
      Insert Interval starts with intervals that are already sorted and
      non-overlapping. How should that shape your solution?
    choices:
      - id: a
        text: >-
          Copy intervals before the new one, merge only the overlapping middle,
          then append the rest
      - id: b
        text: Sort all intervals from scratch and run full Merge Intervals
      - id: c
        text: Binary search every endpoint independently
      - id: d
        text: Compare the new interval with only the first existing interval
    correctChoiceId: a
    explanation: >-
      The input guarantee lets you do one linear pass in three phases. You do
      not need to rediscover order or merge unrelated intervals.
  - id: q2
    prompt: 'While the new interval overlaps existing intervals, how do you update it?'
    choices:
      - id: a
        text: >-
          new_start = min(new_start, current_start), new_end = max(new_end,
          current_end)
      - id: b
        text: >-
          new_start = max(new_start, current_start), new_end = min(new_end,
          current_end)
      - id: c
        text: Keep the new interval unchanged and drop every overlap
      - id: d
        text: Average the two endpoints
    correctChoiceId: a
    explanation: >-
      The merged interval must cover everything covered by either interval, so
      it takes the smallest start and largest end among the overlapping group.
reflections: []
---

