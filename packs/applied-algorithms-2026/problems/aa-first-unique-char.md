---
id: aa-first-unique-char
title: First Unique Character in a String
difficulty: easy
estimatedMinutes: 12
functionName: first_uniq_char
tags:
  - strings
  - hash-map
  - day1
starterCode: |
  def first_uniq_char(s):
      pass
solutionCode: |
  from collections import Counter

  def first_uniq_char(s):
      counts = Counter(s)
      for i, ch in enumerate(s):
          if counts[ch] == 1:
              return i
      return -1
solutionExplanation: |
  Two-pass approach:
  Pass 1: count frequency of every character with Counter.
  Pass 2: scan the string left to right; the first character with count 1
  is the answer. Return its index. If none, return -1.

  Time: O(n). Space: O(1) for fixed alphabet (26 letters).
tests:
  - id: aa-fuc-1
    name: first char is unique
    hidden: false
    args:
      - "leetcode"
    expected: 0
  - id: aa-fuc-2
    name: third char is unique
    hidden: false
    args:
      - "loveleetcode"
    expected: 2
  - id: aa-fuc-3
    name: no unique char
    hidden: false
    args:
      - "aabb"
    expected: -1
  - id: aa-fuc-4
    name: single character
    hidden: true
    args:
      - "z"
    expected: 0
  - id: aa-fuc-5
    name: unique at end
    hidden: true
    args:
      - "aabbc"
    expected: 4
  - id: aa-fuc-6
    name: all same
    hidden: true
    args:
      - "aaaa"
    expected: -1
---

# First Unique Character in a String

Given a string `s`, find the **first non-repeating character** and return its index. If no such character exists, return `-1`.

## Examples

```
Input: s = "leetcode"
Output: 0     # 'l' appears once

Input: s = "loveleetcode"
Output: 2     # 'v' appears once

Input: s = "aabb"
Output: -1    # no unique character
```

## Constraints

- `1 <= len(s) <= 10^5`
- `s` consists only of lowercase English letters.

## Pattern

Count frequencies (one pass), then scan for the first character with count 1 (second pass). The two-pass approach is standard and interview-friendly.
