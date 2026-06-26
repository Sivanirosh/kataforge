---
id: aa-shortest-path-binary
title: Shortest Path in Binary Matrix
difficulty: medium
estimatedMinutes: 25
functionName: shortest_path_binary_matrix
tags:
  - grid
  - bfs
  - day4
starterCode: |
  def shortest_path_binary_matrix(grid):
      pass
solutionCode: |
  from collections import deque

  def shortest_path_binary_matrix(grid):
      n = len(grid)
      if grid[0][0] == 1 or grid[n-1][n-1] == 1:
          return -1

      queue = deque([(0, 0, 1)])
      seen = {(0, 0)}
      directions = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]

      while queue:
          r, c, dist = queue.popleft()
          if r == n - 1 and c == n - 1:
              return dist
          for dr, dc in directions:
              nr, nc = r + dr, c + dc
              if 0 <= nr < n and 0 <= nc < n and (nr,nc) not in seen and grid[nr][nc] == 0:
                  seen.add((nr, nc))
                  queue.append((nr, nc, dist + 1))

      return -1
solutionExplanation: |
  BFS on an n×n grid with 8-directional movement. The path length is the
  number of cells (including start and end).

  Check start and end cells first — if either is blocked (value 1), return -1.
  BFS guarantees the first time we reach (n-1, n-1) is via the shortest path.

  Time: O(n²). Space: O(n²).
tests:
  - id: aa-spbm-1
    name: diagonal path 2x2
    hidden: false
    args:
      - [[0,1],[1,0]]
    expected: 2
  - id: aa-spbm-2
    name: path length 4
    hidden: false
    args:
      - [[0,0,0],[1,1,0],[1,1,0]]
    expected: 4
  - id: aa-spbm-3
    name: start blocked
    hidden: true
    args:
      - [[1,0,0],[1,1,0],[1,1,0]]
    expected: -1
  - id: aa-spbm-4
    name: end blocked
    hidden: true
    args:
      - [[0,0,0],[1,1,0],[1,1,1]]
    expected: -1
  - id: aa-spbm-5
    name: single clear cell
    hidden: true
    args:
      - [[0]]
    expected: 1
---

# Shortest Path in Binary Matrix

Given an `n × n` binary matrix `grid` (0 = open, 1 = blocked), find the length of the shortest clear path from top-left `(0,0)` to bottom-right `(n-1,n-1)`. Movement is allowed in all 8 directions. Return `-1` if no path exists.

Path length = number of cells in the path (including start and end).

## Examples

```
Input: [[0,1],[1,0]]
Output: 2    # (0,0) → (1,1) diagonally

Input: [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
```

## Constraints

- `1 <= n <= 100`

## Pattern

BFS with 8-directional movement. BFS guarantees shortest path in unweighted graphs.
