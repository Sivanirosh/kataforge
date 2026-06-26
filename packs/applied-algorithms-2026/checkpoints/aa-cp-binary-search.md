---
id: aa-cp-binary-search
title: Self-check — Binary Search
attachedKataId: aa-binary-search
questions:
  - id: q1
    prompt: >-
      After writing exact binary search, the hidden tests include target at
      index 0 and a one-element array. Which loop condition keeps those cases
      inside the search?
    choices:
      - id: a
        text: >-
          while left <= right, because the final single-element window still
          needs to be checked
      - id: b
        text: >-
          while left < right, because the midpoint is undefined when left ==
          right
      - id: c
        text: >-
          while left != right, because equality always means the target was
          found
      - id: d
        text: 'while right > 0, because the first index is the only risky boundary'
    correctChoiceId: a
    explanation: >-
      Exact search owns a closed interval [left, right]. When left == right,
      there is exactly one candidate left. Exiting before checking it misses
      targets at the first index, last index, and one-element arrays.
  - id: q2
    prompt: >-
      Before moving left or right, what invariant should you be able to say out
      loud?
    choices:
      - id: a
        text: 'If the target exists, it is somewhere in nums[left..right]'
      - id: b
        text: 'nums[mid] is always the target unless the array is empty'
      - id: c
        text: left and right always move by exactly one index
      - id: d
        text: The target must be in the larger half of the array
    correctChoiceId: a
    explanation: >-
      The comparison at mid is only safe because it discards a half that
      provably cannot contain the target. The invariant is: if the target
      exists, it remains inside the current closed window.
reflections: []
---

