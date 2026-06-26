---
id: aa-eval-rpn
title: Evaluate Reverse Polish Notation
difficulty: easy-medium
estimatedMinutes: 20
functionName: eval_rpn
tags:
  - stack
  - day5
starterCode: |
  def eval_rpn(tokens):
      pass
solutionCode: |
  def eval_rpn(tokens):
      stack = []
      operators = {'+', '-', '*', '/'}

      for token in tokens:
          if token in operators:
              b = stack.pop()
              a = stack.pop()
              if token == '+':
                  stack.append(a + b)
              elif token == '-':
                  stack.append(a - b)
              elif token == '*':
                  stack.append(a * b)
              else:
                  stack.append(int(a / b))
          else:
              stack.append(int(token))

      return stack[0]
solutionExplanation: |
  Postfix evaluation with a stack. Push numbers. On an operator, pop two
  numbers, apply the operator, push the result.

  Division: use int(a / b) for truncation toward zero (not // which floors).
  For positive numbers they are the same; for negatives:
  int(-7/2) = -3, but -7//2 = -4.

  Time: O(n). Space: O(n).
tests:
  - id: aa-erpn-1
    name: multiply then add
    hidden: false
    args:
      - ["2","1","+","3","*"]
    expected: 9
  - id: aa-erpn-2
    name: division then add
    hidden: false
    args:
      - ["4","13","5","/","+"]
    expected: 6
  - id: aa-erpn-3
    name: complex expression
    hidden: false
    args:
      - ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
    expected: 22
  - id: aa-erpn-4
    name: single number
    hidden: true
    args:
      - ["42"]
    expected: 42
  - id: aa-erpn-5
    name: subtraction chain
    hidden: true
    args:
      - ["5","1","2","+","4","*","+","3","-"]
    expected: 14
---

# Evaluate Reverse Polish Notation

Given a list of tokens representing an arithmetic expression in Reverse Polish Notation, evaluate and return the result as an integer.

Division truncates toward zero.

## Examples

```
Input: tokens = ["2","1","+","3","*"]
Output: 9     # (2+1)*3 = 9

Input: tokens = ["4","13","5","/","+"]
Output: 6     # 4 + (13/5) = 4 + 2 = 6
```

## Constraints

- Valid RPN expression guaranteed.
- `2 <= len(tokens) <= 10^4`

## Pattern

Stack: push numbers, pop two and push result on operators. The division edge case (truncate toward zero, not floor) is the interviewer's trap.
