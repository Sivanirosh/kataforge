---
id: fizzbuzz
title: FizzBuzz
difficulty: easy
estimatedMinutes: 10
functionName: fizzbuzz
tags:
  - strings
  - conditionals
starterCode: |
  def fizzbuzz(n):
      # Return a list of strings from 1 to n (inclusive)
      pass
tests:
  - id: sample-1
    name: n equals 5
    hidden: false
    args:
      - 5
    expected: ["1", "2", "Fizz", "4", "Buzz"]
  - id: sample-2
    name: n equals 15
    hidden: false
    args:
      - 15
    expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]
  - id: hidden-1
    name: n equals 1
    hidden: true
    args:
      - 1
    expected: ["1"]
  - id: hidden-2
    name: n equals 3
    hidden: true
    args:
      - 3
    expected: ["1", "2", "Fizz"]
---

# FizzBuzz

Given an integer `n`, return a list of strings representing the numbers from `1` to `n` inclusive.

Replace multiples of 3 with `"Fizz"`, multiples of 5 with `"Buzz"`, and multiples of both with `"FizzBuzz"`.

## Examples

```
Input: n = 5
Output: ["1", "2", "Fizz", "4", "Buzz"]
```

## Constraints

- `1 <= n <= 10^4`
