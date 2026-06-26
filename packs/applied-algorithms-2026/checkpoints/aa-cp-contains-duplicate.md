---
id: aa-cp-contains-duplicate
title: Self-check — Contains Duplicate
attachedKataId: aa-contains-duplicate
questions:
  - id: q1
    prompt: >-
      Right after Contains Duplicate, what exact question is the set answering
      on each iteration?
    choices:
      - id: a
        text: Have I seen this value before?
      - id: b
        text: How many times has this value appeared?
      - id: c
        text: Where is the first copy of this value?
      - id: d
        text: What is the next larger value?
    correctChoiceId: a
    explanation: >-
      Contains Duplicate only needs membership. A set is the right tool because
      it answers presence in O(1) expected time without storing counts or
      positions.
  - id: q2
    prompt: >-
      If the interviewer changes the constraint to O(1) extra space and allows
      modifying the input, which final answer should you discuss?
    choices:
      - id: a
        text: 'Sort in place, then scan adjacent values for equality'
      - id: b
        text: Keep the hash set and call it O(1) because lookups are constant time
      - id: c
        text: Use a dictionary from value to count
      - id: d
        text: Return false unless the array is already sorted
    correctChoiceId: a
    explanation: >-
      Hashing is O(n) extra space. Sorting in place brings equal values next to
      each other, then one adjacent scan detects duplicates. It costs O(n log n)
      time but satisfies the space constraint.
reflections: []
---

