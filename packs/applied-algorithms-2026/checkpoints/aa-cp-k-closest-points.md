---
id: aa-cp-k-closest-points
title: Self-check — K Closest Points to Origin
attachedKataId: aa-k-closest-points
questions:
  - id: q1
    prompt: >-
      For K Closest Points, why compare squared distance `x*x + y*y` instead of
      actual distance with `sqrt`?
    choices:
      - id: a
        text: >-
          Sqrt preserves order but adds unnecessary work and floating-point
          noise
      - id: b
        text: Squared distance changes which point is closer
      - id: c
        text: Sqrt is required only for negative coordinates
      - id: d
        text: Squared distance only works when k equals 1
    correctChoiceId: a
    explanation: >-
      Distance is monotonic with squared distance for nonnegative values. If one
      squared distance is smaller, its square root is also smaller. You can rank
      points without computing sqrt.
  - id: q2
    prompt: When is a size-k heap a better interview answer than sorting all n points?
    choices:
      - id: a
        text: When k is much smaller than n or points arrive as a stream
      - id: b
        text: When k equals n
      - id: c
        text: When coordinates can be negative
      - id: d
        text: When the points are already sorted by x coordinate
    correctChoiceId: a
    explanation: >-
      Sorting all points costs O(n log n). A heap of size k keeps only the
      current best k candidates and costs O(n log k), which is better when k is
      small or data is streaming.
reflections: []
---

