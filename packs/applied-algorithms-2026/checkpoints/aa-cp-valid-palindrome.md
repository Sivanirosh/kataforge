---
id: aa-cp-valid-palindrome
title: Self-check — Valid Palindrome
attachedKataId: aa-valid-palindrome
questions:
  - id: q1
    prompt: >-
      For Valid Palindrome, how do two pointers handle spaces and punctuation
      while keeping O(1) extra space?
    choices:
      - id: a
        text: Advance each pointer past non-alphanumeric characters before comparing
      - id: b
        text: Build a cleaned copy of the full string and reverse it
      - id: c
        text: Sort the characters and compare neighbors
      - id: d
        text: Use a stack containing every character
    correctChoiceId: a
    explanation: >-
      The two-pointer version skips irrelevant characters in place. It compares
      only normalized alphanumeric characters and does not allocate a cleaned
      string.
reflections: []
---

