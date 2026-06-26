---
id: aa-lcs
title: Longest Common Subsequence
difficulty: medium
estimatedMinutes: 25
functionName: longest_common_subsequence
tags:
  - dynamic-programming
  - day5
starterCode: |
  def longest_common_subsequence(text1, text2):
      pass
solutionCode: |
  def longest_common_subsequence(text1, text2):
      m, n = len(text1), len(text2)
      dp = [[0] * (n + 1) for _ in range(m + 1)]

      for i in range(1, m + 1):
          for j in range(1, n + 1):
              if text1[i-1] == text2[j-1]:
                  dp[i][j] = dp[i-1][j-1] + 1
              else:
                  dp[i][j] = max(dp[i-1][j], dp[i][j-1])

      return dp[m][n]
solutionExplanation: |
  dp[i][j] = length of LCS of text1[0..i-1] and text2[0..j-1].

  Recurrence:
  - If text1[i-1] == text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1 (extend)
  - Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (skip one character)

  Base cases: dp[i][0] = 0, dp[0][j] = 0.

  Time: O(m * n). Space: O(m * n), reducible to O(min(m,n)).
tests:
  - id: aa-lcs-1
    name: standard example
    hidden: false
    args:
      - "abcde"
      - "ace"
    expected: 3
  - id: aa-lcs-2
    name: no common characters
    hidden: false
    args:
      - "abc"
      - "def"
    expected: 0
  - id: aa-lcs-3
    name: identical strings
    hidden: true
    args:
      - "abc"
      - "abc"
    expected: 3
  - id: aa-lcs-4
    name: partial overlap
    hidden: true
    args:
      - "abcdef"
      - "aef"
    expected: 3
  - id: aa-lcs-5
    name: empty string
    hidden: true
    args:
      - ""
      - "abc"
    expected: 0
---

# Longest Common Subsequence

Given two strings `text1` and `text2`, return the length of their **longest common subsequence**.

A subsequence is derived from a string by deleting some (or no) characters without changing the relative order of the remaining characters.

## Examples

```
Input: text1 = "abcde", text2 = "ace"
Output: 3    # LCS = "ace"

Input: text1 = "abc", text2 = "def"
Output: 0    # no common characters
```

## Constraints

- `1 <= len(text1), len(text2) <= 1000`

## Pattern

2D DP. State: `dp[i][j]` = LCS length of the first `i` chars of text1 and first `j` chars of text2. Recurrence branches on character match.
