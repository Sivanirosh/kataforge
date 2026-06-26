---
id: aa-rotting-oranges
title: Rotting Oranges
difficulty: medium
estimatedMinutes: 25
functionName: oranges_rotting
tags:
  - grid
  - bfs
  - multi-source
  - day4
starterCode: |
  def oranges_rotting(grid):
      pass
solutionCode: |
  from collections import deque

  def oranges_rotting(grid):
      rows, cols = len(grid), len(grid[0])
      queue = deque()
      fresh = 0

      for r in range(rows):
          for c in range(cols):
              if grid[r][c] == 2:
                  queue.append((r, c, 0))
              elif grid[r][c] == 1:
                  fresh += 1

      if fresh == 0:
          return 0

      minutes = 0
      seen = set((r, c) for r, c, _ in queue)

      while queue:
          r, c, t = queue.popleft()
          for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
              nr, nc = r + dr, c + dc
              if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1 and (nr,nc) not in seen:
                  seen.add((nr, nc))
                  fresh -= 1
                  minutes = t + 1
                  queue.append((nr, nc, t + 1))

      return minutes if fresh == 0 else -1
solutionExplanation: |
  Multi-source BFS: start from ALL rotten oranges simultaneously. Each BFS
  level represents one minute. Track remaining fresh oranges — if any are
  unreachable (fresh > 0 at end), return -1.

  Time: O(rows * cols). Space: O(rows * cols).
tests:
  - id: aa-ro-1
    name: four minutes
    hidden: false
    args:
      - [[2,1,1],[1,1,0],[0,1,1]]
    expected: 4
  - id: aa-ro-2
    name: impossible
    hidden: false
    args:
      - [[2,1,1],[0,1,1],[1,0,1]]
    expected: -1
  - id: aa-ro-3
    name: already done no fresh
    hidden: false
    args:
      - [[0,2]]
    expected: 0
  - id: aa-ro-4
    name: all rotten
    hidden: true
    args:
      - [[2,2],[2,2]]
    expected: 0
  - id: aa-ro-5
    name: isolated fresh
    hidden: true
    args:
      - [[2,0,1]]
    expected: -1
---

# Rotting Oranges

In a grid: 0 = empty, 1 = fresh orange, 2 = rotten orange. Each minute, every fresh orange adjacent (4-directional) to a rotten orange becomes rotten. Return the minimum number of minutes until no fresh orange remains, or `-1` if impossible.

## Examples

```
Input: [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Input: [[2,1,1],[0,1,1],[1,0,1]]
Output: -1    # isolated fresh orange
```

## Constraints

- `1 <= rows, cols <= 10`

## Pattern

Multi-source BFS: seed the queue with all rotten oranges at time 0. BFS naturally propagates in layers = minutes.
