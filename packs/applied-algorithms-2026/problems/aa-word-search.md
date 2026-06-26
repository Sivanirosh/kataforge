---
id: aa-word-search
title: Word Search
difficulty: medium
estimatedMinutes: 30
functionName: exist
tags:
  - grid
  - backtracking
  - day4
starterCode: |
  def exist(board, word):
      pass
solutionCode: |
  def exist(board, word):
      rows, cols = len(board), len(board[0])

      def dfs(r, c, idx, visited):
          if idx == len(word):
              return True
          if r < 0 or r >= rows or c < 0 or c >= cols:
              return False
          if (r, c) in visited or board[r][c] != word[idx]:
              return False
          visited.add((r, c))
          found = any(dfs(r+dr, c+dc, idx+1, visited) for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)])
          visited.remove((r, c))
          return found

      for r in range(rows):
          for c in range(cols):
              if dfs(r, c, 0, set()):
                  return True
      return False
solutionExplanation: |
  Backtracking DFS. Try starting the word from every cell. At each step,
  check if the current cell matches word[idx], then recursively try all
  4 neighbors for the next character. Use a visited set to avoid reusing
  cells in the same path. Backtrack by removing from visited after the call.

  Time: O(rows * cols * 4^len(word)) worst case. Space: O(len(word)) for stack.
tests:
  - id: aa-ws-1
    name: word exists
    hidden: false
    args:
      - [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
      - "ABCCED"
    expected: true
  - id: aa-ws-2
    name: word exists diagonal workaround
    hidden: false
    args:
      - [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
      - "SEE"
    expected: true
  - id: aa-ws-3
    name: word not found
    hidden: false
    args:
      - [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
      - "ABCB"
    expected: false
  - id: aa-ws-4
    name: single cell match
    hidden: true
    args:
      - [["a"]]
      - "a"
    expected: true
  - id: aa-ws-5
    name: single cell no match
    hidden: true
    args:
      - [["a"]]
      - "b"
    expected: false
---

# Word Search

Given a 2D grid of characters and a string `word`, return `True` if `word` exists in the grid. The word can be constructed by sequentially adjacent cells (horizontally or vertically), and the same cell may not be used more than once.

## Examples

```
Input: board = [["A","B","C","E"],
                ["S","F","C","S"],
                ["A","D","E","E"]], word = "ABCCED"
Output: True

Input: word = "ABCB"
Output: False    # cannot reuse B at (0,1)
```

## Constraints

- `1 <= rows, cols <= 6`
- `1 <= len(word) <= 15`

## Pattern

Backtracking DFS. The classic "choose-explore-undo" pattern: add current cell to visited, recurse, remove from visited. No permanent grid mutation.
