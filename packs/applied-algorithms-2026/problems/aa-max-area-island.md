---
id: aa-max-area-island
title: Max Area of Island
difficulty: easy-medium
estimatedMinutes: 20
functionName: max_area_of_island
tags:
  - grid
  - bfs
  - dfs
  - day3
starterCode: |
  def max_area_of_island(grid):
      pass
solutionCode: |
  from collections import deque

  def max_area_of_island(grid):
      if not grid or not grid[0]:
          return 0
      rows, cols = len(grid), len(grid[0])
      seen = set()
      best = 0

      def bfs(r, c):
          queue = deque([(r, c)])
          seen.add((r, c))
          area = 0
          while queue:
              row, col = queue.popleft()
              area += 1
              for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                  nr, nc = row + dr, col + dc
                  if 0 <= nr < rows and 0 <= nc < cols and (nr,nc) not in seen and grid[nr][nc] == 1:
                      seen.add((nr, nc))
                      queue.append((nr, nc))
          return area

      for r in range(rows):
          for c in range(cols):
              if grid[r][c] == 1 and (r, c) not in seen:
                  best = max(best, bfs(r, c))

      return best
solutionExplanation: |
  Same structure as Number of Islands, but instead of counting islands,
  count cells in each island and return the maximum.

  Time: O(rows * cols). Space: O(rows * cols).
tests:
  - id: aa-mai-1
    name: standard grid
    hidden: false
    args:
      - [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
    expected: 6
  - id: aa-mai-2
    name: all water
    hidden: false
    args:
      - [[0,0,0,0,0,0,0,0]]
    expected: 0
  - id: aa-mai-3
    name: single cell
    hidden: true
    args:
      - [[1]]
    expected: 1
  - id: aa-mai-4
    name: two islands different sizes
    hidden: true
    args:
      - [[1,1,0,0,0],[0,0,0,0,0],[0,0,0,1,1,1]]
    expected: 3
---

# Max Area of Island

Given a 2D binary grid (0 = water, 1 = land), return the maximum area of an island (the number of connected land cells).

## Examples

```
Output: 6    # largest island in the standard LeetCode 695 grid
```

## Constraints

- `1 <= rows, cols <= 50`

## Pattern

BFS/DFS flood fill — same as Number of Islands, but accumulate cell count per island and track the maximum.
