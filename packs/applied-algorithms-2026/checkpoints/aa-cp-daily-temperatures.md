---
id: aa-cp-daily-temperatures
title: Self-check — Daily Temperatures
attachedKataId: aa-daily-temperatures
questions:
  - id: q1
    prompt: >-
      In Daily Temperatures, the stack holds indices still waiting for a warmer
      day. When today is warmer than the index on top, what should you do?
    choices:
      - id: a
        text: 'Pop that index and set answer[index] to today_index - index'
      - id: b
        text: Push today twice because it resolved another day
      - id: c
        text: Replace the old temperature with today's temperature
      - id: d
        text: Clear the whole stack because one warmer day resolves every prior day
    correctChoiceId: a
    explanation: >-
      An index stays on the stack until the first warmer future day appears.
      When today is warmer, today is exactly that first warmer day for the
      popped index, so the distance is the answer.
  - id: q2
    prompt: >-
      Why is the monotonic-stack solution O(n) even though it has a while-loop
      inside the for-loop?
    choices:
      - id: a
        text: Each index is pushed once and popped at most once
      - id: b
        text: The while-loop can only run on even indices
      - id: c
        text: The stack always has size one
      - id: d
        text: Temperature comparisons are O(0)
    correctChoiceId: a
    explanation: >-
      The total number of pops across the whole algorithm is at most n. The
      while-loop may pop several items in one iteration, but each item can only
      be popped once, so the total work is linear.
reflections: []
---

