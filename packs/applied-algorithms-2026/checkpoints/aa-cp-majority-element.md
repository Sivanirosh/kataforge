---
id: aa-cp-majority-element
title: Self-check — Majority Element
attachedKataId: aa-majority-element
questions:
  - id: q1
    prompt: >-
      Boyer-Moore cancels one candidate occurrence against one different value.
      Why can the final survivor be the majority element?
    choices:
      - id: a
        text: >-
          A value appearing more than n/2 times cannot be fully canceled by all
          other values combined
      - id: b
        text: The first value is always the majority after sorting
      - id: c
        text: The counter stores the exact frequency of every value
      - id: d
        text: The algorithm only works when all numbers are positive
    correctChoiceId: a
    explanation: >-
      Think of pairing each non-majority value with one majority value and
      discarding both. Since the majority outnumbers all others together, at
      least one majority occurrence survives the cancellations.
reflections: []
---

