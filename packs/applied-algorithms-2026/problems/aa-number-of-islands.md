---
id: aa-number-of-islands
title: Number of Islands
difficulty: medium
estimatedMinutes: 25
functionName: num_islands
tags:
  - grid
  - bfs
  - dfs
  - day3
starterCode: |
  def num_islands(grid):
      pass
solutionCode: |
  from collections import deque

  def num_islands(grid):
      if not grid or not grid[0]:
          return 0
      rows, cols = len(grid), len(grid[0])
      seen = set()
      count = 0

      def bfs(r, c):
          queue = deque([(r, c)])
          seen.add((r, c))
          while queue:
              row, col = queue.popleft()
              for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                  nr, nc = row + dr, col + dc
                  if 0 <= nr < rows and 0 <= nc < cols and (nr,nc) not in seen and grid[nr][nc] == 1:
                      seen.add((nr, nc))
                      queue.append((nr, nc))

      for r in range(rows):
          for c in range(cols):
              if grid[r][c] == 1 and (r, c) not in seen:
                  bfs(r, c)
                  count += 1

      return count
solutionExplanation: |
  BFS (or DFS) flood fill. For each unvisited land cell (1), start a BFS
  that marks the entire connected island as visited. Each BFS call
  corresponds to one island.

  Time: O(rows * cols). Space: O(rows * cols) for the seen set.

  DFS alternative: replace the BFS with recursive DFS or iterative DFS
  with a stack. The BFS approach avoids Python's recursion limit for
  large grids.
tests:
  - id: aa-noi-1
    name: one big island
    hidden: false
    args:
      - [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]
    expected: 1
  - id: aa-noi-2
    name: three islands
    hidden: false
    args:
      - [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]
    expected: 3
  - id: aa-noi-3
    name: all water
    hidden: true
    args:
      - [[0,0],[0,0]]
    expected: 0
  - id: aa-noi-4
    name: diagonal islands not connected
    hidden: true
    args:
      - [[1,0,1],[0,1,0],[1,0,1]]
    expected: 5
  - id: aa-noi-5
    name: single cell island
    hidden: true
    args:
      - [[1]]
    expected: 1
---

# Number of Islands

Given a 2D binary grid (0 = water, 1 = land), return the number of islands. An island is surrounded by water and is formed by connecting adjacent land cells horizontally or vertically.

## Examples

```
Input: grid = [
  [1,1,1,1,0],
  [1,1,0,1,0],
  [1,1,0,0,0],
  [0,0,0,0,0]
]
Output: 1

Input: grid = [
  [1,1,0,0,0],
  [1,1,0,0,0],
  [0,0,1,0,0],
  [0,0,0,1,1]
]
Output: 3
```

## Constraints

- `1 <= rows, cols <= 300`

## Pattern

BFS/DFS flood fill. Count connected components of 1s. The standard Day 3/4 graph traversal kata.
