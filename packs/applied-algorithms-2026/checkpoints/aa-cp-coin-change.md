---
id: aa-cp-coin-change
title: Self-check — Coin Change
attachedKataId: aa-coin-change
questions:
  - id: q1
    prompt: >-
      After Coin Change, the interviewer asks why greedy is not enough. Which
      counterexample explains the need for DP?
    choices:
      - id: a
        text: >-
          coins = [1, 3, 4], amount = 6: greedy takes 4 + 1 + 1, but 3 + 3 is
          better
      - id: b
        text: 'coins = [1, 5, 10], amount = 10: greedy takes 10'
      - id: c
        text: 'coins = [2], amount = 3: greedy returns impossible, which is correct'
      - id: d
        text: 'coins = [1], amount = 0: greedy returns zero coins'
    correctChoiceId: a
    explanation: >-
      Greedy only sees the next locally largest coin. DP tries every coin as the
      last coin of amount a and keeps the minimum over dp[a - coin] + 1, so it
      handles non-canonical coin systems.
  - id: q2
    prompt: >-
      What is the cleanest way to represent amounts that are still unreachable
      while filling dp?
    choices:
      - id: a
        text: >-
          Initialize them to infinity, keep dp[0] = 0, and return -1 if
          dp[amount] is still infinity
      - id: b
        text: Initialize every value to 0 and treat 0 as impossible
      - id: c
        text: Initialize every value to -1 and use min directly on -1
      - id: d
        text: Skip the base case and infer it from the first coin
    correctChoiceId: a
    explanation: >-
      Infinity is a sentinel that loses to any real coin count in a min
      operation. dp[0] = 0 anchors the recurrence. If the target stays infinity,
      no combination can form it.
reflections: []
---

