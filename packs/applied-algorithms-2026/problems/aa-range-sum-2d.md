---
id: aa-range-sum-2d
title: Range Sum Query 2D
difficulty: medium
estimatedMinutes: 30
functionName: sum_region
tags:
  - prefix-sum
  - matrix
  - day3
starterCode: |
  def sum_region(matrix, queries):
      """
      queries: list of [r1, c1, r2, c2] (inclusive, 0-indexed)
      return: list of rectangular sums for each query
      """
      pass
solutionCode: |
  def sum_region(matrix, queries):
      if not matrix or not matrix[0]:
          return []
      rows, cols = len(matrix), len(matrix[0])
      prefix = [[0] * (cols + 1) for _ in range(rows + 1)]

      for r in range(rows):
          for c in range(cols):
              prefix[r+1][c+1] = (
                  matrix[r][c]
                  + prefix[r][c+1]
                  + prefix[r+1][c]
                  - prefix[r][c]
              )

      result = []
      for r1, c1, r2, c2 in queries:
          total = (
              prefix[r2+1][c2+1]
              - prefix[r1][c2+1]
              - prefix[r2+1][c1]
              + prefix[r1][c1]
          )
          result.append(total)
      return result
solutionExplanation: |
  2D prefix sum. prefix[r][c] = sum of rectangle from (0,0) to (r-1,c-1).

  Build: prefix[r+1][c+1] = matrix[r][c] + prefix[r][c+1] + prefix[r+1][c] - prefix[r][c]
  (inclusion-exclusion: add top and left, subtract double-counted corner)

  Query [r1,c1,r2,c2]: use the 4-cell inclusion-exclusion formula.

  Time: O(rows*cols + q). Space: O(rows*cols).
tests:
  - id: aa-rs2d-1
    name: three queries
    hidden: false
    args:
      - [[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]
      - [[2,1,4,3],[1,1,2,2],[1,2,2,4]]
    expected: [8, 11, 12]
  - id: aa-rs2d-2
    name: smaller matrix
    hidden: true
    args:
      - [[1,2],[3,4]]
      - [[0,0,1,1],[0,0,0,1],[1,1,1,1]]
    expected: [10, 3, 4]
  - id: aa-rs2d-3
    name: single row
    hidden: true
    args:
      - [[1,2,3,4,5]]
      - [[0,1,0,3]]
    expected: [9]
---

# Range Sum Query 2D

Given a 2D matrix and a list of rectangular queries `[r1, c1, r2, c2]` (inclusive), return the sum of elements in each rectangle.

## Examples

```
Matrix:
  3 0 1 4 2
  5 6 3 2 1
  1 2 0 1 5
  4 1 0 1 7
  1 0 3 0 5

Query [2,1,4,3]: rows 2-4, cols 1-3
  Row 2: 2+0+1 = 3
  Row 3: 1+0+1 = 2
  Row 4: 0+3+0 = 3
  Total: 8
```

## Constraints

- `1 <= rows, cols <= 200`
- Queries fit within the matrix bounds.

## Pattern

2D prefix sum. Build the prefix table in O(rows*cols), answer each query in O(1) using four-cell inclusion-exclusion.
