---
id: aa-cp-two-sum-ii
title: Self-check — Two Sum II (Sorted Input)
attachedKataId: aa-two-sum-ii
questions:
  - id: q1
    prompt: >-
      In Two Sum II, the array is sorted and the current left/right sum is
      greater than target. Which pointer moves, and why?
    choices:
      - id: a
        text: >-
          Move right leftward, because the only way to reduce the sum is to use
          a smaller right value
      - id: b
        text: 'Move left rightward, because that always reduces the sum'
      - id: c
        text: Move both pointers inward every time
      - id: d
        text: Reset left to zero and keep right fixed
    correctChoiceId: a
    explanation: >-
      With sorted values, increasing left makes the sum larger. If the sum is
      too high, you must decrease the larger endpoint by moving right leftward.
  - id: q2
    prompt: >-
      Why is the two-pointer approach preferred here over the hash-map approach
      from unsorted Two Sum?
    choices:
      - id: a
        text: 'The sorted order gives an O(n), O(1)-space solution'
      - id: b
        text: Hash maps cannot store duplicate values
      - id: c
        text: Two pointers are always O(log n)
      - id: d
        text: The problem forbids returning indices
    correctChoiceId: a
    explanation: >-
      The sorted input is extra structure. Two pointers use it to move
      deterministically toward the target without an auxiliary map.
reflections: []
---

