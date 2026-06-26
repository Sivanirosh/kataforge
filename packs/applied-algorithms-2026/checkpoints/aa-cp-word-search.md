---
id: aa-cp-word-search
title: Self-check — Word Search
attachedKataId: aa-word-search
questions:
  - id: q1
    prompt: >-
      In Word Search, why must DFS unmark a cell when backtracking out of a
      path?
    choices:
      - id: a
        text: >-
          Visited means unavailable only for the current path; other paths may
          need that cell
      - id: b
        text: Unmarking frees Python memory immediately
      - id: c
        text: Unmarking converts the search from DFS to BFS
      - id: d
        text: The word must be searched backward after every failed path
    correctChoiceId: a
    explanation: >-
      The same board cell cannot be reused inside one candidate path, but it can
      be part of a different path starting elsewhere. Backtracking restores the
      board state for those other branches.
  - id: q2
    prompt: >-
      What does the branching factor in the worst-case time `O(rows * cols *
      4^L)` represent?
    choices:
      - id: a
        text: 'From each character position, DFS may try up to four neighboring cells'
      - id: b
        text: The board always has exactly four rows
      - id: c
        text: Each cell stores four characters
      - id: d
        text: There are four possible starting positions total
    correctChoiceId: a
    explanation: >-
      You may start from every cell. For a word of length L, each recursive step
      can branch to up to four directions before pruning by bounds, visited, and
      character match.
reflections: []
---

