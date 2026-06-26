---
id: aa-longest-no-repeat
title: Longest Substring Without Repeating Characters
difficulty: easy-medium
estimatedMinutes: 20
functionName: length_of_longest_substring
tags:
  - strings
  - sliding-window
  - day2
starterCode: |
  def length_of_longest_substring(s):
      pass
solutionCode: |
  def length_of_longest_substring(s):
      char_idx = {}
      left = 0
      best = 0

      for right, ch in enumerate(s):
          if ch in char_idx and char_idx[ch] >= left:
              left = char_idx[ch] + 1
          char_idx[ch] = right
          best = max(best, right - left + 1)

      return best
solutionExplanation: |
  Sliding window where we track the last seen index of each character.
  When we encounter a character already in the window (its last index >= left),
  we jump left past that occurrence rather than shrinking one step at a time.
  This makes the solution O(n) with at most one pass.

  Alternative (simpler but slightly slower in practice): use a set as the
  window state and shrink one step at a time:
    seen = set()
    left = 0
    for right in range(len(s)):
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        seen.add(s[right])
        best = max(best, right - left + 1)

  Both are O(n).
tests:
  - id: aa-lnr-1
    name: repeated characters
    hidden: false
    args:
      - "abcabcbb"
    expected: 3
  - id: aa-lnr-2
    name: all same character
    hidden: false
    args:
      - "bbbbb"
    expected: 1
  - id: aa-lnr-3
    name: non-contiguous repeats
    hidden: false
    args:
      - "pwwkew"
    expected: 3
  - id: aa-lnr-4
    name: empty string
    hidden: true
    args:
      - ""
    expected: 0
  - id: aa-lnr-5
    name: all unique
    hidden: true
    args:
      - "abcdef"
    expected: 6
  - id: aa-lnr-6
    name: tricky jump
    hidden: true
    args:
      - "dvdf"
    expected: 3
---

# Longest Substring Without Repeating Characters

Given a string `s`, find the length of the longest substring without repeating characters.

## Examples

```
Input: s = "abcabcbb"
Output: 3    # "abc"

Input: s = "pwwkew"
Output: 3    # "wke"
```

## Constraints

- `0 <= len(s) <= 5 × 10^4`
- `s` consists of English letters, digits, symbols, and spaces.

## Pattern

Sliding window with a "last seen index" map. The window invariant: all characters in `s[left..right]` are unique.
