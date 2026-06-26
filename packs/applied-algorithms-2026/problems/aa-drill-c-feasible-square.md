---
id: aa-drill-c-feasible-square
title: "Applied Algorithms Drill C — Largest Feasible Square"
difficulty: medium
estimatedMinutes: 35
functionName: largest_feasible_square
tags:
  - grid
  - dynamic-programming
  - applied-algorithms
  - day3
starterCode: |
  def largest_feasible_square(grid):
      """
      grid: 2D list of 0/1 where 1 = feasible region, 0 = infeasible.
      Return the side length of the largest all-1 square.
      """
      pass
solutionCode: |
  def largest_feasible_square(grid):
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

      return best
solutionExplanation: |
  Identical to Maximal Square DP, but return the side length (best)
  rather than the area (best * best). This is the variant used in
  engineering contexts where "largest feasible square" describes a
  design region.

  Talk-track:
  "If the grid is moderate, I use DP: O(rows × cols). If the grid is
  huge and queries are repeated, I would build a 2D prefix sum and
  binary search on the side length, giving O(rows × cols × log(min(rows,cols)))
  per query but faster multi-query throughput."

  Time: O(rows * cols). Space: O(rows * cols).
tests:
  - id: aa-dcs-1
    name: standard grid
    hidden: false
    args:
      - [[1,0,1,0,0],[1,0,1,1,1],[1,1,1,1,1],[1,0,0,1,0]]
    expected: 2
  - id: aa-dcs-2
    name: all zeros
    hidden: false
    args:
      - [[0,0],[0,0]]
    expected: 0
  - id: aa-dcs-3
    name: single feasible cell
    hidden: true
    args:
      - [[1]]
    expected: 1
  - id: aa-dcs-4
    name: entire grid feasible
    hidden: true
    args:
      - [[1,1,1],[1,1,1],[1,1,1]]
    expected: 3
  - id: aa-dcs-5
    name: single feasible column
    hidden: true
    args:
      - [[1,0],[1,0],[1,0]]
    expected: 1
---

# Applied Algorithms Drill C — Largest Feasible Square in Design Grid

**Engineering context:** In a computational design tool, a binary grid marks which cells are feasible (1) and which are infeasible constraints (0). You need to find the side length of the largest square region that is entirely feasible.

Given a 2D binary grid, return the **side length** of the largest all-1 square.

## Examples

```
Input: grid = [[1,0,1,0,0],
               [1,0,1,1,1],
               [1,1,1,1,1],
               [1,0,0,1,0]]
Output: 2    # largest all-1 square has side 2

Input: grid = [[1,1,1],
               [1,1,1],
               [1,1,1]]
Output: 3    # entire 3×3 grid is feasible
```

## Constraints

- Grid dimensions 1–300.

## Spoken reasoning

> "This is a 2D grid DP problem. dp[r][c] represents the side length of the largest feasible square with its bottom-right corner at (r-1, c-1). The recurrence is dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1]) if the cell is 1."
