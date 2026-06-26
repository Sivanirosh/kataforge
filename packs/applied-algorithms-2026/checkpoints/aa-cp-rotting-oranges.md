---
id: aa-cp-rotting-oranges
title: Self-check — Rotting Oranges
attachedKataId: aa-rotting-oranges
questions:
  - id: q1
    prompt: >-
      Rotting Oranges spreads from every rotten orange at the same time. Why
      seed the BFS queue with all initially rotten oranges?
    choices:
      - id: a
        text: It models simultaneous minute-by-minute spread from multiple sources
      - id: b
        text: It makes diagonal spread possible
      - id: c
        text: It guarantees every fresh orange is reachable
      - id: d
        text: It avoids checking grid boundaries
    correctChoiceId: a
    explanation: >-
      Each BFS layer represents one minute. Starting with all rotten oranges in
      the first layer means every source spreads concurrently, which matches the
      problem statement.
  - id: q2
    prompt: 'After BFS finishes, when should the answer be -1?'
    choices:
      - id: a
        text: When at least one fresh orange was never reached and rotted
      - id: b
        text: When the queue was non-empty at any point
      - id: c
        text: >-
          When there were no rotten oranges initially, even if there were no
          fresh oranges
      - id: d
        text: When the grid has more columns than rows
    correctChoiceId: a
    explanation: >-
      If fresh oranges remain, they were isolated from all rotten sources by
      empty cells or boundaries. No amount of time can rot them, so return -1.
reflections: []
---

