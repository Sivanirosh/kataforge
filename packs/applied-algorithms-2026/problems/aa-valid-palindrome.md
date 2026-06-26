---
id: aa-valid-palindrome
title: Valid Palindrome
difficulty: easy
estimatedMinutes: 12
functionName: is_palindrome
tags:
  - strings
  - two-pointers
  - day2
starterCode: |
  def is_palindrome(s):
      pass
solutionCode: |
  def is_palindrome(s):
      filtered = [c.lower() for c in s if c.isalnum()]
      left, right = 0, len(filtered) - 1
      while left < right:
          if filtered[left] != filtered[right]:
              return False
          left += 1
          right -= 1
      return True
solutionExplanation: |
  Strip the string to alphanumeric characters only (lowercase), then use
  two pointers from both ends moving inward. If any pair mismatches,
  return False. If the pointers cross, return True.

  Time: O(n). Space: O(n) for the filtered list.
  Space-optimal: use index pointers directly on the original string,
  skipping non-alphanumeric characters in place.
tests:
  - id: aa-vp-1
    name: classic palindrome phrase
    hidden: false
    args:
      - "A man, a plan, a canal: Panama"
    expected: true
  - id: aa-vp-2
    name: not a palindrome
    hidden: false
    args:
      - "race a car"
    expected: false
  - id: aa-vp-3
    name: only spaces
    hidden: false
    args:
      - " "
    expected: true
  - id: aa-vp-4
    name: single letter
    hidden: true
    args:
      - "a"
    expected: true
  - id: aa-vp-5
    name: mixed alphanumeric non-palindrome
    hidden: true
    args:
      - "0P"
    expected: false
  - id: aa-vp-6
    name: numeric palindrome
    hidden: true
    args:
      - "Was it a car or a cat I saw?"
    expected: true
---

# Valid Palindrome

A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string `s`, return `True` if it is a palindrome, or `False` otherwise.

## Examples

```
Input: s = "A man, a plan, a canal: Panama"
Output: True

Input: s = "race a car"
Output: False

Input: s = " "
Output: True    # empty after filtering
```

## Constraints

- `1 <= len(s) <= 2 × 10^5`
- `s` consists only of printable ASCII characters.

## Pattern

Two pointers from both ends. The key pre-step: filter to alphanumeric + lowercase.
