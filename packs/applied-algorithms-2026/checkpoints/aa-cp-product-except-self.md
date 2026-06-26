---
id: aa-cp-product-except-self
title: Self-check — Product of Array Except Self
attachedKataId: aa-product-except-self
questions:
  - id: q1
    prompt: >-
      Product Except Self forbids division. What structure is that constraint
      steering you toward?
    choices:
      - id: a
        text: Prefix products from the left and suffix products from the right
      - id: b
        text: A hash map from product to index
      - id: c
        text: Sorting the array by absolute value
      - id: d
        text: Trying every pair of indices
    correctChoiceId: a
    explanation: >-
      For each index, the answer is product of everything before it times
      product of everything after it. Prefix and suffix passes compute those
      pieces without dividing.
  - id: q2
    prompt: Why can the two-pass prefix/suffix solution claim O(1) extra space?
    choices:
      - id: a
        text: >-
          The output array is allowed; only the running prefix and suffix
          variables are extra
      - id: b
        text: The prefix array and suffix array are both hidden inside Python
      - id: c
        text: Multiplication does not use memory
      - id: d
        text: Because the input array is sorted first
    correctChoiceId: a
    explanation: >-
      The result array is not counted as extra space by the problem. You write
      prefix products into it, then fold suffix products in with one running
      variable.
reflections: []
---

