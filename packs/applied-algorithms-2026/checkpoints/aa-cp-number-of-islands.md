---
id: aa-cp-number-of-islands
title: Self-check — Number of Islands
attachedKataId: aa-number-of-islands
questions:
  - id: q1
    prompt: >-
      In Number of Islands, why does launching one flood fill from an unvisited
      land cell correspond to exactly one island?
    choices:
      - id: a
        text: >-
          The flood fill consumes all land connected to that cell, and no land
          outside that component
      - id: b
        text: Every land cell is its own island
      - id: c
        text: The first flood fill always reaches the entire grid
      - id: d
        text: Water cells are counted as separators only after sorting rows
    correctChoiceId: a
    explanation: >-
      An island is a connected component of land. Starting from one unvisited
      land cell, DFS/BFS visits precisely that component, so incrementing once
      per launch counts islands.
  - id: q2
    prompt: >-
      For very large grids, why might iterative BFS be safer than recursive DFS
      in Python?
    choices:
      - id: a
        text: >-
          It avoids hitting Python's recursion-depth limit on a huge connected
          island
      - id: b
        text: It changes the answer from count to area
      - id: c
        text: It visits diagonal cells automatically
      - id: d
        text: It reduces time complexity below O(rows * cols)
    correctChoiceId: a
    explanation: >-
      Both DFS and BFS are valid traversals. The practical issue is call-stack
      depth: a large island can create too many recursive calls, while an
      explicit queue stays on the heap.
reflections: []
---

