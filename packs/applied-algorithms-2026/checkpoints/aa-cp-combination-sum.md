---
id: aa-cp-combination-sum
title: Self-check — Combination Sum
attachedKataId: aa-combination-sum
questions:
  - id: q1
    prompt: >-
      Combination Sum allows reusing a candidate, but the output must not
      contain duplicate orderings like [2,3] and [3,2]. What recursion rule
      gives both properties?
    choices:
      - id: a
        text: >-
          When taking candidates[i], recurse with i again; when skipping it,
          move to i + 1
      - id: b
        text: Always recurse from index 0 so every order is explored
      - id: c
        text: Remove the candidate after using it once
      - id: d
        text: Sort the current combination before appending it to the answer
    correctChoiceId: a
    explanation: >-
      Keeping the same index on the take branch allows unlimited reuse. Moving
      forward on the skip branch enforces a nondecreasing candidate order, so
      the same combination is not rediscovered in a different order.
  - id: q2
    prompt: Why sort candidates before the backtracking search?
    choices:
      - id: a
        text: >-
          Once candidates[i] exceeds the remaining target, later candidates can
          be stopped too
      - id: b
        text: Sorting changes the target into a prefix sum problem
      - id: c
        text: Sorting is required because the answer must be lexicographic
      - id: d
        text: Sorting removes every duplicate candidate automatically
    correctChoiceId: a
    explanation: >-
      With sorted candidates, candidate values only get larger. If one is
      already greater than the remaining target, no later candidate can fit, so
      the loop can break early.
reflections: []
---

