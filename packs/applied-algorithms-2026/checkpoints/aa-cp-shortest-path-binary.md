---
id: aa-cp-shortest-path-binary
title: Self-check — Shortest Path in Binary Matrix
attachedKataId: aa-shortest-path-binary
questions:
  - id: q1
    prompt: >-
      Why does plain BFS, not Dijkstra, give the shortest path in Shortest Path
      in Binary Matrix?
    choices:
      - id: a
        text: >-
          Every valid move has the same cost, so BFS layers are increasing path
          lengths
      - id: b
        text: Diagonal moves have negative cost
      - id: c
        text: The grid is sorted by distance already
      - id: d
        text: Dijkstra cannot run on a matrix
    correctChoiceId: a
    explanation: >-
      When all edges have unit weight, the first time BFS reaches a cell is
      through the fewest moves. Dijkstra is only needed when edge costs vary.
reflections: []
---

