---
id: aa-cp-koko-bananas
title: Self-check — Koko Eating Bananas
attachedKataId: aa-koko-bananas
questions:
  - id: q1
    prompt: >-
      Koko is not searching an array index; she is searching an eating speed.
      What makes binary search on that answer valid?
    choices:
      - id: a
        text: >-
          Feasibility is monotonic: if speed k works, every faster speed also
          works
      - id: b
        text: Pile sizes are sorted by default
      - id: c
        text: The answer is always the middle pile size
      - id: d
        text: Every speed takes the same number of hours
    correctChoiceId: a
    explanation: >-
      The predicate "can finish within h hours" switches from false to true as
      speed increases. That monotonic boundary is exactly what binary search
      needs.
  - id: q2
    prompt: >-
      For one pile of size p and speed k, what expression gives the hours spent
      on that pile?
    choices:
      - id: a
        text: 'ceil(p / k), commonly `(p + k - 1) // k` with integers'
      - id: b
        text: 'p // k, because partial hours do not count'
      - id: c
        text: 'p % k, because only leftovers matter'
      - id: d
        text: 'k // p, because speed is divided by pile size'
    correctChoiceId: a
    explanation: >-
      If a pile does not divide evenly by k, Koko still needs one more hour for
      the remainder. Integer ceiling division captures that.
reflections: []
---

