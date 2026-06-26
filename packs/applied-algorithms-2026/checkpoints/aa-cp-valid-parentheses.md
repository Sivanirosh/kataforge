---
id: aa-cp-valid-parentheses
title: Self-check — Valid Parentheses
attachedKataId: aa-valid-parentheses
questions:
  - id: q1
    prompt: >-
      Why does Valid Parentheses need a stack instead of just counting opening
      and closing brackets?
    choices:
      - id: a
        text: The stack enforces the most-recent opening bracket must close first
      - id: b
        text: Counts are faster but use too much memory
      - id: c
        text: A stack sorts brackets by type
      - id: d
        text: 'Counting works for nested order like `([)]`'
    correctChoiceId: a
    explanation: >-
      Counts can say the number of opens and closes match, but they cannot
      verify nesting order. A stack catches cases like `([)]` because `]` does
      not match the most recent open `(`.
reflections: []
---

