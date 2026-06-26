---
id: aa-coin-change
title: Coin Change
difficulty: medium
estimatedMinutes: 25
functionName: coin_change
tags:
  - dynamic-programming
  - day5
starterCode: |
  def coin_change(coins, amount):
      pass
solutionCode: |
  def coin_change(coins, amount):
      dp = [float('inf')] * (amount + 1)
      dp[0] = 0

      for a in range(1, amount + 1):
          for coin in coins:
              if coin <= a:
                  dp[a] = min(dp[a], dp[a - coin] + 1)

      return dp[amount] if dp[amount] != float('inf') else -1
solutionExplanation: |
  dp[a] = minimum coins to make amount a.
  Base case: dp[0] = 0.
  Recurrence: dp[a] = min(dp[a - coin] + 1) for each coin <= a.

  This is the "unbounded knapsack" pattern — each coin can be used
  any number of times.

  Time: O(amount * len(coins)). Space: O(amount).
tests:
  - id: aa-cc-1
    name: basic three coins
    hidden: false
    args:
      - [1, 2, 5]
      - 11
    expected: 3
  - id: aa-cc-2
    name: impossible
    hidden: false
    args:
      - [2]
      - 3
    expected: -1
  - id: aa-cc-3
    name: zero amount
    hidden: false
    args:
      - [1]
      - 0
    expected: 0
  - id: aa-cc-4
    name: exact coin
    hidden: true
    args:
      - [1, 2, 5]
      - 5
    expected: 1
  - id: aa-cc-5
    name: large amount
    hidden: true
    args:
      - [1, 2, 5]
      - 100
    expected: 20
---

# Coin Change

Given a list of coin denominations and an `amount`, return the **fewest number of coins** needed to make up the amount. Return `-1` if it is impossible.

## Examples

```
Input: coins = [1, 2, 5], amount = 11
Output: 3    # 5 + 5 + 1

Input: coins = [2], amount = 3
Output: -1
```

## Constraints

- `1 <= len(coins) <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

## Pattern

Unbounded knapsack DP. `dp[a] = min(dp[a - coin] + 1)` for each coin. The DP table grows bottom-up from `dp[0] = 0`.
