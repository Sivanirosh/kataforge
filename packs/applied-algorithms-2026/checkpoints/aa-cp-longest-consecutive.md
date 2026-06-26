---
id: aa-cp-longest-consecutive
title: Self-check — Longest Consecutive Sequence
attachedKataId: aa-longest-consecutive
questions:
  - id: q1
    prompt: >-
      The O(n) Longest Consecutive solution only starts counting from x when x -
      1 is not in the set. Why is that guard the whole trick?
    choices:
      - id: a
        text: 'It ensures each streak is counted exactly once, from its first value'
      - id: b
        text: It removes all duplicates from the input array
      - id: c
        text: It proves every number is positive
      - id: d
        text: It makes the set sorted
    correctChoiceId: a
    explanation: >-
      If x - 1 exists, x is in the middle of a streak and counting from it would
      duplicate work. Starting only at heads makes the total number of
      membership checks linear.
  - id: q2
    prompt: Why not just sort and scan for consecutive runs?
    choices:
      - id: a
        text: 'Sorting is O(n log n), while the set approach can meet the O(n) target'
      - id: b
        text: Sorting cannot handle negative numbers
      - id: c
        text: Sorting changes the values in the array
      - id: d
        text: Sorting requires a graph traversal afterward
    correctChoiceId: a
    explanation: >-
      Sorting is a valid simpler alternative, but it misses the linear-time
      goal. The set gives O(1) expected membership checks without ordering the
      array.
reflections: []
---

