---
id: aa-cp-min-subarray-sum
title: Self-check — Minimum Size Subarray Sum
attachedKataId: aa-min-subarray-sum
questions:
  - id: q1
    prompt: >-
      In Minimum Size Subarray Sum, what shrink condition lets the variable
      window find the shortest valid length?
    choices:
      - id: a
        text: 'While current_sum >= target, record the length and move left forward'
      - id: b
        text: 'While current_sum < target, move left forward'
      - id: c
        text: Shrink only when the window reaches the end of the array
      - id: d
        text: Shrink whenever the right pointer is even
    correctChoiceId: a
    explanation: >-
      Once the sum is large enough, the window is valid. To find the minimum
      length, keep removing from the left while it remains valid, recording
      every candidate length.
  - id: q2
    prompt: Why is the algorithm O(n) despite the inner while-loop?
    choices:
      - id: a
        text: The left and right pointers each move forward at most n times
      - id: b
        text: The while-loop runs only once for the whole algorithm
      - id: c
        text: Array sums are cached by Python automatically
      - id: d
        text: The target limits the number of iterations to a constant
    correctChoiceId: a
    explanation: >-
      The loops are nested syntactically, but pointer movement is monotonic. No
      index is added more than once by right or removed more than once by left.
reflections: []
---

