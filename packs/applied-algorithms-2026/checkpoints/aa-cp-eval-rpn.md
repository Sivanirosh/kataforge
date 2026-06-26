---
id: aa-cp-eval-rpn
title: Self-check — Evaluate Reverse Polish Notation
attachedKataId: aa-eval-rpn
questions:
  - id: q1
    prompt: >-
      In Reverse Polish Notation, you pop two operands for an operator. For `-`
      and `/`, which order is correct?
    choices:
      - id: a
        text: second_popped op first_popped
      - id: b
        text: first_popped op second_popped
      - id: c
        text: Always sort the two operands first
      - id: d
        text: The order does not matter for any RPN operator
    correctChoiceId: a
    explanation: >-
      If the stack has [..., a, b] and you see an operator, b is popped first
      but the expression is a op b. This matters for subtraction and division.
  - id: q2
    prompt: >-
      Why use `int(a / b)` instead of `a // b` for the LeetCode-style RPN
      division rule?
    choices:
      - id: a
        text: '`int(a / b)` truncates toward zero; `//` floors negative results'
      - id: b
        text: '`//` is not allowed on integers in Python'
      - id: c
        text: '`int(a / b)` keeps decimal precision'
      - id: d
        text: They are identical for negative values
    correctChoiceId: a
    explanation: >-
      The expected rule is truncation toward zero. Python floor division rounds
      down, so -3 // 2 is -2, while int(-3 / 2) is -1.
reflections: []
---

