---
id: aa-cp-lis
title: Self-check — Longest Increasing Subsequence
attachedKataId: aa-lis
questions:
  - id: q1
    prompt: >-
      In the O(n^2) LIS DP, why define dp[i] as the best increasing subsequence
      ending at i?
    choices:
      - id: a
        text: >-
          Because nums[i] can only extend subsequences whose last value is
          smaller than nums[i]
      - id: b
        text: Because every LIS must include the final array element
      - id: c
        text: 'Because dp[i] should ignore all values before i'
      - id: d
        text: Because sorting the prefix would lose duplicates
    correctChoiceId: a
    explanation: >-
      To decide whether nums[i] can extend a previous subsequence, you need to
      know that subsequence ends at some j with nums[j] < nums[i]. A prefix-wide
      value would hide its ending value and break the transition.
  - id: q2
    prompt: 'In the O(n log n) tails method, what does tails[length - 1] store?'
    choices:
      - id: a
        text: >-
          The smallest possible tail value of an increasing subsequence with
          that length
      - id: b
        text: The actual final LIS sequence
      - id: c
        text: The largest value seen so far at that length
      - id: d
        text: The number of subsequences with that length
    correctChoiceId: a
    explanation: >-
      Smaller tails are easier to extend later. tails is not necessarily an
      actual subsequence; it is a compact record of the best tail candidates by
      length.
reflections: []
---

