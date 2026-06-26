---
id: aa-cp-longest-no-repeat
title: Self-check — Longest Substring Without Repeating Characters
attachedKataId: aa-longest-no-repeat
questions:
  - id: q1
    prompt: >-
      For Longest Substring Without Repeating Characters, what invariant must
      the sliding window maintain?
    choices:
      - id: a
        text: The current window contains no repeated character
      - id: b
        text: The current window is sorted alphabetically
      - id: c
        text: The current window always has length k
      - id: d
        text: The current window contains only vowels
    correctChoiceId: a
    explanation: >-
      The answer is the longest valid window seen so far. Each time a repeat
      would enter the window, left must move far enough to restore the no-repeat
      invariant.
  - id: q2
    prompt: >-
      Why store each character's last seen index instead of moving left one step
      at a time?
    choices:
      - id: a
        text: >-
          You can jump left directly to one position after the previous
          occurrence
      - id: b
        text: It lets you ignore uppercase characters
      - id: c
        text: It turns the substring into a subsequence
      - id: d
        text: It makes the window fixed-size
    correctChoiceId: a
    explanation: >-
      When s[right] repeats, every start before or at the previous occurrence is
      invalid. Jumping left with max(left, last_seen + 1) restores validity in
      one move.
reflections: []
---

