---
id: aa-cp-two-sum
title: Self-check — Two Sum
attachedKataId: two-sum
questions:
  - id: q1
    prompt: >-
      In one-pass Two Sum, why check for the complement before inserting the
      current number into the map?
    choices:
      - id: a
        text: >-
          So the complement must come from an earlier index, preventing the
          current element from pairing with itself
      - id: b
        text: Because insertion after lookup changes the time complexity to O(log n)
      - id: c
        text: Because dictionaries cannot store values equal to the target
      - id: d
        text: Because the array is sorted and the map depends on order
    correctChoiceId: a
    explanation: >-
      For a value like 3 with target 6, inserting before checking would let the
      lookup find the same index. Checking first guarantees any found complement
      is from a previous element.
reflections: []
---

