---
id: aa-cp-search-insert
title: Self-check — Search Insert Position
attachedKataId: aa-search-insert
questions:
  - id: q1
    prompt: >-
      In Search Insert Position, the target is not found. Why does `left` point
      to the insertion index when the loop ends?
    choices:
      - id: a
        text: >-
          It is the first index whose value could be greater than or equal to
          the target
      - id: b
        text: It always points to the last checked midpoint
      - id: c
        text: It always equals len(nums) - 1
      - id: d
        text: It stores the count of values greater than target
    correctChoiceId: a
    explanation: >-
      Binary search has moved every value less than target to the left of
      `left`, and every remaining candidate position at or after `left` is where
      target could go. That is the lower-bound insertion point.
reflections: []
---

