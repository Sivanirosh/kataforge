---
id: aa-cp-search-rotated
title: Self-check — Search in Rotated Sorted Array
attachedKataId: aa-search-rotated
questions:
  - id: q1
    prompt: >-
      Search in Rotated Sorted Array still runs in O(log n). What property lets
      you discard half the array each step?
    choices:
      - id: a
        text: >-
          At least one side of mid is sorted, so you can tell whether the target
          belongs in that side
      - id: b
        text: The smallest value is always at index 0
      - id: c
        text: Rotation makes both halves unsorted in the same way
      - id: d
        text: The target must be near the pivot
    correctChoiceId: a
    explanation: >-
      Even after rotation, one half around mid remains sorted. Check which half
      is sorted, then use its endpoints to decide whether the target can be
      there.
reflections: []
---

