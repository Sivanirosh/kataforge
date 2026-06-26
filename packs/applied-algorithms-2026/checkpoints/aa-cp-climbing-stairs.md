---
id: aa-cp-climbing-stairs
title: Self-check — Climbing Stairs
attachedKataId: aa-climbing-stairs
questions:
  - id: q1
    prompt: >-
      After solving Climbing Stairs, you want to justify the recurrence without
      memorizing it. What are the only two ways a valid path can arrive at step
      n?
    choices:
      - id: a
        text: 'From n - 1 by taking one step, or from n - 2 by taking two steps'
      - id: b
        text: 'From any lower step, because you can jump any distance'
      - id: c
        text: 'Only from n - 1, because paths are counted one step at a time'
      - id: d
        text: 'From n - 1 and n - 3, because those are the two previous odd distances'
    correctChoiceId: a
    explanation: >-
      Every path to n has a final move. That final move is either 1 step from n
      - 1 or 2 steps from n - 2. Those sets of paths do not overlap, so the
      total is ways(n - 1) + ways(n - 2).
reflections: []
---

