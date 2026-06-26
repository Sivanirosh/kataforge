---
id: aa-cp-range-sum-2d
title: Self-check — Range Sum Query 2D (Immutable)
attachedKataId: aa-range-sum-2d
questions:
  - id: q1
    prompt: >-
      In a 2D prefix-sum query, why do you subtract two rectangles and then add
      one rectangle back?
    choices:
      - id: a
        text: >-
          The top-left outside area is subtracted twice, so inclusion-exclusion
          adds it back once
      - id: b
        text: The matrix is always symmetric
      - id: c
        text: The added rectangle stores only diagonal cells
      - id: d
        text: Addition is used only when the query starts at row 0
    correctChoiceId: a
    explanation: >-
      The prefix at the bottom-right includes too much: rows above and columns
      left of the query. Subtracting both removes their overlap twice, so the
      overlapped top-left region must be added back once.
reflections: []
---

