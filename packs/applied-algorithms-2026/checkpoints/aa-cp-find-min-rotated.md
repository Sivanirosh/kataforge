---
id: aa-cp-find-min-rotated
title: Self-check — Find Minimum in Rotated Sorted Array
attachedKataId: aa-find-min-rotated
questions:
  - id: q1
    prompt: >-
      For Find Minimum in Rotated Sorted Array, why compare nums[mid] with
      nums[right] instead of treating nums[left] as the anchor?
    choices:
      - id: a
        text: >-
          nums[right] tells you whether mid is in the rotated high segment or
          the sorted low segment containing the minimum
      - id: b
        text: 'nums[left] is never sorted after rotation'
      - id: c
        text: right is always the minimum index
      - id: d
        text: Comparing to right avoids all duplicate values
    correctChoiceId: a
    explanation: >-
      If nums[mid] > nums[right], mid is in the high segment, so the minimum is
      strictly to the right. Otherwise mid is in the low segment, and mid itself
      may be the minimum, so move right to mid.
reflections: []
---

