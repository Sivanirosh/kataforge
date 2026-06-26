---
id: aa-cp-range-sum-query
title: Self-check — Range Sum Query (Immutable)
attachedKataId: aa-range-sum-query
questions:
  - id: q1
    prompt: >-
      With prefix[i] = sum(nums[0..i-1]), how do you answer the inclusive range
      sum from l to r?
    choices:
      - id: a
        text: 'prefix[r + 1] - prefix[l], in O(1) per query'
      - id: b
        text: 'prefix[r] - prefix[l], in O(1) per query'
      - id: c
        text: 'prefix[l] - prefix[r + 1], in O(log n) per query'
      - id: d
        text: 'sum(nums[l:r]), in O(1) per query'
    correctChoiceId: a
    explanation: >-
      The prefix array has a leading zero. prefix[r + 1] includes nums[r], while
      prefix[l] stops just before nums[l]. Their difference is exactly
      nums[l..r].
reflections: []
---

