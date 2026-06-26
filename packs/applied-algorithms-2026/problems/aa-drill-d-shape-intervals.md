---
id: aa-drill-d-shape-intervals
title: "Applied Algorithms Drill D — Shape from Intervals"
difficulty: hard
estimatedMinutes: 45
functionName: largest_square_from_intervals
tags:
  - intervals
  - dynamic-programming
  - grid
  - applied-algorithms
  - day6
starterCode: |
  def largest_square_from_intervals(rows):
      """
      rows: dict mapping row_index (int) to list of [start, end] intervals
            (inclusive column range). Each row has exactly one interval.
      Return the side length of the largest square that fits entirely within
      the filled region.
      """
      pass
solutionCode: |
  def largest_square_from_intervals(rows):
      if not rows:
          return 0

      min_col = min(ivs[0][0] for ivs in rows.values())
      max_col = max(ivs[0][1] for ivs in rows.values())
      min_row = min(rows.keys())
      max_row = max(rows.keys())

      num_rows = max_row - min_row + 1
      num_cols = max_col - min_col + 1

      grid = [[0] * num_cols for _ in range(num_rows)]
      for row_idx, intervals in rows.items():
          r = row_idx - min_row
          for start, end in intervals:
              for c in range(start - min_col, end - min_col + 1):
                  grid[r][c] = 1

      dp = [[0] * (num_cols + 1) for _ in range(num_rows + 1)]
      best = 0

      for r in range(1, num_rows + 1):
          for c in range(1, num_cols + 1):
              if grid[r-1][c-1] == 1:
                  dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1])
                  best = max(best, dp[r][c])

      return best
solutionExplanation: |
  Two-phase approach:
  1. Convert the interval representation to a binary grid.
     - Find the bounding box (min/max row and column).
     - For each row, mark filled columns as 1.
  2. Run maximal square DP on the binary grid.
     - dp[r][c] = side length of largest all-1 square with corner at (r-1,c-1).
     - Return the maximum dp value.

  Complexity discussion:
  - Small input (grid <= 1000×1000): grid conversion + DP = O(rows × cols). Use this.
  - Large sparse input (rows up to 10^6, sparse intervals): skip grid conversion.
    For each row, compute the overlap width with a hypothetical square of side k.
    Binary search on k with a feasibility check. O(n log R) where R = max side length.

  The interview goal: show you can convert an unusual problem representation into
  a known tool (maximal square DP), and discuss the trade-off for large inputs.
tests:
  - id: aa-dsd-1
    name: 3x3 solid block
    hidden: false
    args:
      - {0: [[0,2]], 1: [[0,2]], 2: [[0,2]]}
    expected: 3
  - id: aa-dsd-2
    name: original roadmap example
    hidden: false
    args:
      - {0: [[1,5]], 1: [[1,5]], 2: [[2,6]], 3: [[2,6]]}
    expected: 4
  - id: aa-dsd-3
    name: narrow overlap region
    hidden: true
    args:
      - {0: [[0,1]], 1: [[0,2]], 2: [[0,2]]}
    expected: 2
  - id: aa-dsd-4
    name: single row single cell
    hidden: true
    args:
      - {0: [[3,3]]}
    expected: 1
  - id: aa-dsd-5
    name: no feasible square larger than 1
    hidden: true
    args:
      - {0: [[0,4]], 1: [[2,2]], 2: [[0,4]]}
    expected: 1
---

# Applied Algorithms Drill D — Shape from Intervals

**Engineering context:** A CAD tool represents filled regions as row intervals. Each row has a list of `[start, end]` column ranges that are occupied. You need to find the largest square sub-region that fits entirely within the filled area.

Given a dict `rows` mapping row index to a list of `[start, end]` column intervals (inclusive), return the **side length** of the largest all-filled square.

## Examples

```python
# Original roadmap example
rows = {
    0: [[1, 5]],    # cols 1-5 filled
    1: [[1, 5]],    # cols 1-5 filled
    2: [[2, 6]],    # cols 2-6 filled
    3: [[2, 6]],    # cols 2-6 filled
}
# Overlap region (cols 2-5) × (rows 0-3) = 4×4 block → answer: 4
```

## Discussion path

1. Clarify: how large are row/column indices? One interval per row or multiple?
2. If small: convert to binary grid, then maximal square DP. O(rows × cols).
3. If large/sparse: binary search on side length k with interval feasibility check. O(n log R).
4. Explain the trade-off between approaches.

This problem is about converting an unusual domain representation into a known algorithmic tool — not about memorizing the solution.
