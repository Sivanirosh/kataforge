---
id: aa-cp-flood-fill
title: Self-check — Flood Fill
attachedKataId: aa-flood-fill
questions:
  - id: q1
    prompt: >-
      Before starting Flood Fill, what guard prevents wasted recursion and
      possible looping behavior?
    choices:
      - id: a
        text: >-
          If the starting color is already the new color, return the image
          unchanged
      - id: b
        text: 'If the image has more than one row, return immediately'
      - id: c
        text: 'If the new color is smaller than the old color, sort the pixels first'
      - id: d
        text: 'If the start pixel is on an edge, skip it'
    correctChoiceId: a
    explanation: >-
      Flood fill spreads from pixels with the original color. If old color
      equals new color, changing a pixel does not mark progress, so neighbors
      can keep satisfying the same condition. Returning early is both correct
      and safer.
reflections: []
---

