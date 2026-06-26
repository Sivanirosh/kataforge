---
id: aa-cp-valid-anagram
title: Self-check — Valid Anagram
attachedKataId: aa-valid-anagram
questions:
  - id: q1
    prompt: 'For Valid Anagram, why does comparing `sorted(s)` and `sorted(t)` work?'
    choices:
      - id: a
        text: Sorting puts equal character multisets into the same canonical order
      - id: b
        text: Sorting removes duplicate characters
      - id: c
        text: Sorting checks only the first and last characters
      - id: d
        text: Sorting changes both strings to lowercase
    correctChoiceId: a
    explanation: >-
      Anagrams contain the same characters with the same counts. Sorting erases
      original order but preserves multiplicity, so equal sorted lists mean
      equal character multisets.
  - id: q2
    prompt: >-
      When would a count-array or hash-map solution be a better follow-up than
      sorting?
    choices:
      - id: a
        text: When you want O(n) time and the alphabet is fixed or manageable
      - id: b
        text: When the strings are already sorted and very short
      - id: c
        text: When you need to return all permutations
      - id: d
        text: When duplicate letters should be ignored
    correctChoiceId: a
    explanation: >-
      Sorting costs O(n log n). Counting characters can be O(n), especially with
      a fixed alphabet such as lowercase English letters.
reflections: []
---

