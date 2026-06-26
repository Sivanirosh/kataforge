---
id: aa-cp-permutations
title: Self-check — Permutations
attachedKataId: aa-permutations
questions:
  - id: q1
    prompt: >-
      Subsets and Permutations are both backtracking. What choice makes
      permutations produce n! arrangements instead of 2^n subsets?
    choices:
      - id: a
        text: 'At each position, choose one unused element to place next'
      - id: b
        text: 'At each element, decide only include or exclude'
      - id: c
        text: Sort the input and stop after the first branch
      - id: d
        text: Use a sliding window over adjacent values
    correctChoiceId: a
    explanation: >-
      A permutation fills positions. For each position you can choose any unused
      element, so the branching sizes are n, n-1, n-2, and so on, giving n!
      outputs.
reflections: []
---

