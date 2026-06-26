---
id: aa-cp-group-anagrams
title: Self-check — Group Anagrams
attachedKataId: aa-group-anagrams
questions:
  - id: q1
    prompt: >-
      For Group Anagrams, what must be true about the key you put in the hash
      map?
    choices:
      - id: a
        text: >-
          Two words get the same key if and only if they have the same character
          multiset
      - id: b
        text: Two words get the same key if they have the same first letter
      - id: c
        text: The key must be the original string object
      - id: d
        text: The key must be unique for every input word
    correctChoiceId: a
    explanation: >-
      The grouping works only if the key captures exactly the information that
      defines an anagram: character counts, not order. Sorted characters and
      fixed-length count tuples are two common ways to encode that.
  - id: q2
    prompt: >-
      For a word of length k over lowercase English letters, what is the real
      tradeoff between a sorted-string key and a 26-count tuple key?
    choices:
      - id: a
        text: >-
          Sorted key is O(k log k) and simple; count tuple is O(k + 26) and
          avoids sorting
      - id: b
        text: Sorted key is O(1); count tuple is O(k log k)
      - id: c
        text: Both keys require comparing every word with every other word
      - id: d
        text: Count tuple only works if the input is already sorted
    correctChoiceId: a
    explanation: >-
      Sorting is concise and often fine. A count tuple is faster asymptotically
      for a fixed alphabet because you count characters once and use the counts
      as the canonical key.
reflections: []
---

