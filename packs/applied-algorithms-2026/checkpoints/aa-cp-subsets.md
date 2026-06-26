---
id: aa-cp-subsets
title: Self-check — Subsets
attachedKataId: aa-subsets
questions:
  - id: q1
    prompt: >-
      In Subsets, what binary decision do you make for each element, and why
      does that produce 2^n results?
    choices:
      - id: a
        text: Include the element or skip it; two choices for each of n elements
      - id: b
        text: Choose one unused element for each output position
      - id: c
        text: Move left or right in a sorted array
      - id: d
        text: Push or pop only when the element is larger than the previous one
    correctChoiceId: a
    explanation: >-
      Every element independently has two possibilities: present or absent.
      Multiplying those choices across n elements gives 2^n subsets.
reflections: []
---

