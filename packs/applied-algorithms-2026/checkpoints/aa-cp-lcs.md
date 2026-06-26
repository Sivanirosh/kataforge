---
id: aa-cp-lcs
title: Self-check — Longest Common Subsequence
attachedKataId: aa-lcs
questions:
  - id: q1
    prompt: >-
      In LCS, when text1[i-1] equals text2[j-1], why does the transition use
      `dp[i-1][j-1] + 1`?
    choices:
      - id: a
        text: >-
          The matching characters are consumed from both strings, extending the
          best LCS before both of them
      - id: b
        text: Only text1 consumes a character; text2 stays at j
      - id: c
        text: The match resets the subsequence length to 1
      - id: d
        text: The diagonal cell always stores zero
    correctChoiceId: a
    explanation: >-
      A matched pair can be appended to any common subsequence from the prefixes
      that exclude both characters. That is the diagonal subproblem plus one.
reflections: []
---

