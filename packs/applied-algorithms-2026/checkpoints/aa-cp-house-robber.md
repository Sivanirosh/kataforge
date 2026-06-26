---
id: aa-cp-house-robber
title: Self-check — House Robber
attachedKataId: aa-house-robber
questions:
  - id: q1
    prompt: >-
      In House Robber, what do the two branches in `max(dp[i-1], dp[i-2] +
      nums[i])` mean?
    choices:
      - id: a
        text: >-
          Skip the current house, or rob it and combine with the best result
          before its neighbor
      - id: b
        text: 'Rob the current house twice, or skip the whole street'
      - id: c
        text: Choose the larger of the two adjacent houses
      - id: d
        text: Compare even-indexed houses with odd-indexed houses only
    correctChoiceId: a
    explanation: >-
      If you skip house i, the best total stays dp[i-1]. If you rob house i, you
      cannot rob i-1, so the compatible previous best is dp[i-2] plus nums[i].
reflections: []
---

