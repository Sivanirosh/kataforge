---
id: aa-cp-container-most-water
title: Self-check — Container With Most Water
attachedKataId: aa-container-most-water
questions:
  - id: q1
    prompt: >-
      In Container With Most Water, why is moving the shorter wall the only move
      that can improve the best area?
    choices:
      - id: a
        text: >-
          The width always shrinks, so the only hope is finding a taller
          limiting wall
      - id: b
        text: The taller wall has already been used and cannot appear again
      - id: c
        text: Moving the taller wall keeps the same width
      - id: d
        text: Moving both pointers is required to avoid duplicates
    correctChoiceId: a
    explanation: >-
      Area is width times the shorter wall. Any move reduces width. If you move
      the taller wall, the shorter wall still caps the height, so area cannot
      improve. Moving the shorter wall is the only move that might raise the
      cap.
reflections:
  - id: r1
    prompt: Could a brute-force O(n²) ever be acceptable here? When?
    expectedAnswer: >-
      Yes, as the baseline you state before optimizing: check every pair and
      track the best area. Then explain why the shorter-wall move cuts that
      O(n²) search down to one O(n) pass.
---
