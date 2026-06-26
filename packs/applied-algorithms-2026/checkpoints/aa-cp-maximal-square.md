---
id: aa-cp-maximal-square
title: Self-check — Maximal Square
attachedKataId: aa-maximal-square
questions:
  - id: q1
    prompt: >-
      For Maximal Square, dp[r][c] stores the side length of the largest all-1
      square ending at (r, c). Why use the minimum of top, left, and top-left?
    choices:
      - id: a
        text: >-
          A square can expand only as far as its weakest neighboring square
          allows
      - id: b
        text: The maximum would double-count the current cell
      - id: c
        text: The top-left value is always the answer by itself
      - id: d
        text: The minimum is used only to handle zeros in the first row
    correctChoiceId: a
    explanation: >-
      To form a larger square at (r, c), the top edge, left edge, and top-left
      interior must all support that side length. If any one is smaller, the
      square is blocked there.
  - id: q2
    prompt: >-
      The DP stores side lengths, but the problem asks for area. What should the
      final return value be?
    choices:
      - id: a
        text: max_side * max_side
      - id: b
        text: max_side
      - id: c
        text: rows * cols
      - id: d
        text: the number of dp cells greater than zero
    correctChoiceId: a
    explanation: >-
      A square with side length s has area s^2. Track the largest side seen
      while filling dp, then square it at the end.
reflections: []
---

