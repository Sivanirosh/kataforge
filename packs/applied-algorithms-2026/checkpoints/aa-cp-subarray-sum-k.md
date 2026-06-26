---
id: aa-cp-subarray-sum-k
title: Self-check — Subarray Sum Equals K
attachedKataId: aa-subarray-sum-k
questions:
  - id: q1
    prompt: >-
      While scanning Subarray Sum Equals K, current prefix is P. What value do
      you look up in the prefix-count map?
    choices:
      - id: a
        text: P - k
      - id: b
        text: P + k
      - id: c
        text: k - P
      - id: d
        text: P * k
    correctChoiceId: a
    explanation: >-
      A previous prefix Q forms a subarray sum k ending here when P - Q = k, so
      Q = P - k. The map count tells how many such starts exist.
  - id: q2
    prompt: >-
      Why initialize the prefix-count map with `{0: 1}` before reading the
      array?
    choices:
      - id: a
        text: It counts subarrays that start at index 0
      - id: b
        text: It prevents negative numbers from appearing
      - id: c
        text: It makes every prefix sum unique
      - id: d
        text: It sorts the prefix sums implicitly
    correctChoiceId: a
    explanation: >-
      If the current prefix itself equals k, then P - k is 0. The initial zero
      prefix represents the empty prefix before the array starts.
reflections: []
---

