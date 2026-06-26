---
id: aa-cp-top-k-frequent
title: Self-check — Top K Frequent Elements
attachedKataId: aa-top-k-frequent
questions:
  - id: q1
    prompt: >-
      For Top K Frequent Elements, when is maintaining a size-k min-heap better
      than sorting all frequency counts?
    choices:
      - id: a
        text: When k is much smaller than the number of distinct values
      - id: b
        text: When k equals the number of distinct values
      - id: c
        text: When every value appears once
      - id: d
        text: When the input is already sorted numerically
    correctChoiceId: a
    explanation: >-
      Sorting all distinct counts costs O(m log m). A size-k min-heap keeps only
      the best k candidates and costs O(m log k), where m is the number of
      distinct values.
  - id: q2
    prompt: >-
      If you use `Counter(nums).most_common(k)`, what should you remember about
      its return value?
    choices:
      - id: a
        text: >-
          It returns (value, count) pairs, so you still extract just the values
          if the problem asks for elements
      - id: b
        text: 'It returns only the counts, not the values'
      - id: c
        text: It mutates nums into frequency order
      - id: d
        text: It fails whenever k is smaller than the number of distinct values
    correctChoiceId: a
    explanation: >-
      most_common(k) is concise Python, but it returns pairs. The final answer
      usually needs the element from each pair, not the count.
reflections: []
---

