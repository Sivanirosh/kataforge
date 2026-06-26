---
id: aa-flood-fill
title: Flood Fill
difficulty: easy
estimatedMinutes: 15
functionName: flood_fill
tags:
  - grid
  - bfs
  - dfs
  - day4
starterCode: |
  def flood_fill(image, sr, sc, color):
      pass
solutionCode: |
  from collections import deque

  def flood_fill(image, sr, sc, color):
      original = image[sr][sc]
      if original == color:
          return image
      rows, cols = len(image), len(image[0])
      queue = deque([(sr, sc)])

      while queue:
          r, c = queue.popleft()
          if image[r][c] == original:
              image[r][c] = color
              for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                  nr, nc = r + dr, c + dc
                  if 0 <= nr < rows and 0 <= nc < cols and image[nr][nc] == original:
                      queue.append((nr, nc))

      return image
solutionExplanation: |
  BFS from (sr, sc). Change each connected cell of the original color to
  the new color. Early return if old color equals new color (avoids infinite loop).

  Time: O(rows * cols). Space: O(rows * cols).
tests:
  - id: aa-ff-1
    name: standard fill
    hidden: false
    args:
      - [[1,1,1],[1,1,0],[1,0,1]]
      - 1
      - 1
      - 2
    expected: [[2,2,2],[2,2,0],[2,0,1]]
  - id: aa-ff-2
    name: color already matches
    hidden: false
    args:
      - [[0,0,0],[0,0,0]]
      - 0
      - 0
      - 0
    expected: [[0,0,0],[0,0,0]]
  - id: aa-ff-3
    name: single cell
    hidden: true
    args:
      - [[1]]
      - 0
      - 0
      - 5
    expected: [[5]]
  - id: aa-ff-4
    name: diagonal not connected
    hidden: true
    args:
      - [[1,0],[0,1]]
      - 0
      - 0
      - 3
    expected: [[3,0],[0,1]]
---

# Flood Fill

Given an `image` (2D integer array), a starting pixel `(sr, sc)`, and a new `color`, perform a flood fill: change the color of the starting pixel and all 4-directionally connected pixels of the same original color to `color`.

## Examples

```
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2
Output: [[2,2,2],[2,2,0],[2,0,1]]
```

## Constraints

- `1 <= rows, cols <= 50`
- `0 <= image[i][j], color <= 65535`

## Pattern

BFS/DFS from the starting cell. The simplest grid traversal problem — good warmup before harder graph problems.
