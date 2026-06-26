---
id: aa-cp-first-unique-char
title: Self-check — First Unique Character
attachedKataId: aa-first-unique-char
questions:
  - id: q1
    prompt: >-
      Why does First Unique Character usually use two passes: count first, then
      scan for the first count of 1?
    choices:
      - id: a
        text: >-
          A character that looks unique early can be invalidated by a later
          duplicate
      - id: b
        text: The second pass is only for sorting the answer
      - id: c
        text: Python cannot update a dictionary and return from the same loop
      - id: d
        text: 'The first pass finds the last unique character, not the first'
    correctChoiceId: a
    explanation: >-
      During the first pass you do not yet know whether a later copy will
      appear. Once all counts are known, scanning the original string preserves
      order and finds the first index whose count is exactly 1.
reflections:
  - id: r1
    prompt: >-
      The strings contain only lowercase a-z and you used a dictionary to count.
      What fixed-size structure could replace it, and at what space complexity?
    expectedAnswer: >-
      A 26-cell integer array indexed by ord(ch) - ord('a'). Increment on the
      counting pass, read on the scanning pass. Space is O(1): a constant 26
      cells regardless of input length.
---
