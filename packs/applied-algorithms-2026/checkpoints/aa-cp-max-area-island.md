---
id: aa-cp-max-area-island
title: Self-check — Max Area of Island
attachedKataId: aa-max-area-island
questions:
  - id: q1
    prompt: >-
      Max Area of Island reuses the flood-fill skeleton from Number of Islands.
      What is the key change?
    choices:
      - id: a
        text: Return the size of each connected component and keep the maximum
      - id: b
        text: Stop after finding the first island
      - id: c
        text: Count water cells instead of land cells
      - id: d
        text: Search diagonals before cardinal neighbors
    correctChoiceId: a
    explanation: >-
      The traversal is the same connected-component walk. Instead of
      incrementing island count once per component, the DFS/BFS returns how many
      land cells it consumed, and the answer is the largest such size.
reflections: []
---

