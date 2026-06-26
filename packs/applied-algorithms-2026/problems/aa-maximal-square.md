---
id: aa-maximal-square
title: Maximal Square
difficulty: medium
estimatedMinutes: 30
functionName: maximal_square
tags:
  - grid
  - dynamic-programming
  - day3
starterCode: |
  def maximal_square(grid):
      pass
solutionCode: |
  def maximal_square(grid):
      if not grid or not grid[0]:
          return 0
      rows, cols = len(grid), len(grid[0])
      dp = [[0] * (cols + 1) for _ in range(rows + 1)]
      best = 0

      for r in range(1, rows + 1):
          for c in range(1, cols + 1):
              if grid[r-1][c-1] == 1:
                  dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1])
                  best = max(best, dp[r][c])

      return best * best
solutionExplanation: |
  dp[r][c] = side length of the largest all-1 square with its bottom-right
  corner at grid[r-1][c-1].

  Recurrence: dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1])
  if grid[r-1][c-1] == 1, else 0.

  The min of the three neighbors limits what square can be formed.
  Return dp[r][c]^2 (area), not dp[r][c] (side length).

  Time: O(rows * cols). Space: O(rows * cols), reducible to O(cols).
tests:
  - id: aa-ms-1
    name: standard grid
    hidden: false
    args:
      - [[1,0,1,0,0],[1,0,1,1,1],[1,1,1,1,1],[1,0,0,1,0]]
    expected: 4
  - id: aa-ms-2
    name: single one
    hidden: false
    args:
      - [[0,1]]
    expected: 1
  - id: aa-ms-3
    name: all zeros
    hidden: true
    args:
      - [[0,0],[0,0]]
    expected: 0
  - id: aa-ms-4
    name: all ones 2x2
    hidden: true
    args:
      - [[1,1],[1,1]]
    expected: 4
  - id: aa-ms-5
    name: single zero cell
    hidden: true
    args:
      - [[0]]
    expected: 0
---

# Maximal Square

Given a 2D binary matrix (0/1), find the **area** of the largest square containing only 1s.

## Examples

```
Input: grid = [[1,0,1,0,0],
               [1,0,1,1,1],
               [1,1,1,1,1],
               [1,0,0,1,0]]
Output: 4    # 2×2 square
```

## Constraints

- `1 <= rows, cols <= 300`

## Pattern

Grid DP. The recurrence `dp[r][c] = 1 + min(top, left, diagonal)` is the key insight: the square size is limited by the smallest neighbor. Return `best * best` for the area.
