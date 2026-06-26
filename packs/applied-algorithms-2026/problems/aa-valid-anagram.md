---
id: aa-valid-anagram
title: Valid Anagram
difficulty: easy
estimatedMinutes: 10
functionName: is_anagram
tags:
  - strings
  - hash-map
  - day1
starterCode: |
  def is_anagram(s, t):
      pass
solutionCode: |
  from collections import Counter

  def is_anagram(s, t):
      return Counter(s) == Counter(t)
solutionExplanation: |
  Two strings are anagrams if and only if they have the same character
  frequencies. Counter builds a frequency dict in O(n). Comparing two
  Counter objects is O(k) where k is the alphabet size (bounded constant
  for ASCII).

  Time: O(n) where n = len(s) + len(t).
  Space: O(1) for fixed alphabet, O(k) in general.

  You can also sort both strings and compare: O(n log n) / O(n).
tests:
  - id: aa-va-1
    name: basic anagram
    hidden: false
    args:
      - "anagram"
      - "nagaram"
    expected: true
  - id: aa-va-2
    name: not an anagram
    hidden: false
    args:
      - "rat"
      - "car"
    expected: false
  - id: aa-va-3
    name: different lengths
    hidden: false
    args:
      - "ab"
      - "abc"
    expected: false
  - id: aa-va-4
    name: single character match
    hidden: true
    args:
      - "a"
      - "a"
    expected: true
  - id: aa-va-5
    name: repeated chars anagram
    hidden: true
    args:
      - "aab"
      - "baa"
    expected: true
  - id: aa-va-6
    name: empty strings
    hidden: true
    args:
      - ""
      - ""
    expected: true
---

# Valid Anagram

Given two strings `s` and `t`, return `True` if `t` is an anagram of `s`, and `False` otherwise.

An anagram uses all the characters of the original string exactly once, in any order.

## Examples

```
Input: s = "anagram", t = "nagaram"
Output: True

Input: s = "rat", t = "car"
Output: False
```

## Constraints

- `1 <= len(s), len(t) <= 5 × 10^4`
- `s` and `t` consist of lowercase English letters.

## Pattern

Frequency comparison via `Counter`. The key insight: anagram ↔ same character counts.
