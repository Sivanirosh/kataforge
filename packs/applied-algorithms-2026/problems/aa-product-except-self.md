---
id: aa-product-except-self
title: Product of Array Except Self
difficulty: easy-medium
estimatedMinutes: 25
functionName: product_except_self
tags:
  - arrays
  - prefix-product
  - day1
starterCode: |
  def product_except_self(nums):
      pass
solutionCode: |
  def product_except_self(nums):
      n = len(nums)
      result = [1] * n

      prefix = 1
      for i in range(n):
          result[i] = prefix
          prefix *= nums[i]

      suffix = 1
      for i in range(n - 1, -1, -1):
          result[i] *= suffix
          suffix *= nums[i]

      return result
solutionExplanation: |
  result[i] = product of all elements to the left of i  ×  product of all
  elements to the right of i.

  Pass 1 (left to right): accumulate the prefix product into result[i].
  Pass 2 (right to left): multiply result[i] by the suffix product.

  No division used. The constraint "do not use division" is a key hint that
  prefix/suffix products are the intended approach.

  Time: O(n). Space: O(1) output (not counting the result array).
tests:
  - id: aa-pes-1
    name: basic four elements
    hidden: false
    args:
      - [1, 2, 3, 4]
    expected: [24, 12, 8, 6]
  - id: aa-pes-2
    name: contains zero
    hidden: false
    args:
      - [-1, 1, 0, -3, 3]
    expected: [0, 0, 9, 0, 0]
  - id: aa-pes-3
    name: two elements
    hidden: true
    args:
      - [2, 3]
    expected: [3, 2]
  - id: aa-pes-4
    name: two zeros
    hidden: true
    args:
      - [0, 0]
    expected: [0, 0]
  - id: aa-pes-5
    name: negative numbers
    hidden: true
    args:
      - [-1, -2, -3, -4]
    expected: [-24, -12, -8, -6]
---

# Product of Array Except Self

Given an integer array `nums`, return an array `result` such that `result[i]` is the product of all elements of `nums` **except** `nums[i]`.

**Constraint:** Do not use division. Solve in O(n) time.

## Examples

```
Input: nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
# result[0] = 2*3*4 = 24
# result[1] = 1*3*4 = 12

Input: nums = [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]
# result[2] = (-1)*1*(-3)*3 = 9; all others include the zero
```

## Constraints

- `2 <= len(nums) <= 10^5`
- `-30 <= nums[i] <= 30`
- The product of any prefix or suffix fits in a 32-bit integer.

## Pattern

Two-pass prefix/suffix product. This is a classic "how do you avoid division" interview question.
