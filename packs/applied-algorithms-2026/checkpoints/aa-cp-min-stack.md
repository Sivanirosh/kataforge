---
id: aa-cp-min-stack
title: Self-check — Min Stack
attachedKataId: aa-min-stack
questions:
  - id: q1
    prompt: >-
      Min Stack needs get_min in O(1). Why does a second stack of running
      minimums work?
    choices:
      - id: a
        text: >-
          Each push records the minimum after that push, so pop removes the
          matching minimum state
      - id: b
        text: The second stack keeps the values sorted
      - id: c
        text: The second stack stores only positive values
      - id: d
        text: get_min scans the second stack faster than the first
    correctChoiceId: a
    explanation: >-
      The min stack stays synchronized with the value stack. At every depth it
      knows the minimum among values up to that depth, so push, pop, top, and
      get_min are all constant time.
reflections: []
---

