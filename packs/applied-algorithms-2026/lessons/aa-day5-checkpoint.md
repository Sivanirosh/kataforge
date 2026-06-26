---
id: aa-day5-checkpoint
title: Day 5 Recap — DP, Stacks & Heaps
---

Day 5 was about *building answers from smaller answers*: dynamic programming reuses overlapping subproblems, monotonic stacks resolve "next greater / unresolved candidates," and heaps surface the running min/max or top-k.

This recap is not scored — the pointed questions now live in each Kata's Self-check, right after you solve it. What stays here is the consolidated model for the mock and interview days ahead.

---

## The four-step DP recipe

1. **Define the state** — what exactly does `dp[i]` (or `dp[i][j]`) represent for input up to index `i` (and `j`)?
2. **Write the recurrence** — how does `dp[i]` depend on smaller subproblems?
3. **Handle base cases** — the smallest valid inputs and their values.
4. **Identify the answer** — is it `dp[n]`, `max(dp)`, `dp[n][m]`, or something else?

| Signal | Pattern | State shape |
|---|---|---|
| "Number of ways to reach X" | Additive DP | 1D |
| "Minimum cost to reach X" | Min DP | 1D |
| "Maximum length / value over a sequence" | Max DP | 1D |
| "Optimal over two sequences" | LCS / Edit Distance | 2D |
| "Next greater element / unresolved candidates" | Monotonic stack | Stack |
| "Top-k / repeated min or max extraction" | Heap | Heap |

---

## Tradeoffs

| Approach | Time | Space | Pros | Cons |
|---|---|---|---|---|
| Top-down (memoization) | O(states) | O(states) + call stack | Natural recursion; lazy — only needed states | Stack overflow on deep inputs; call overhead |
| Bottom-up (tabulation) | O(states) | O(states) | No call stack; cache-friendly; easy to space-optimize | Computes all states even if unused |
| Space-optimized (rolling array) | O(states) | O(one row) / O(1) | Minimal memory | Can't reconstruct the solution path |

Both monotonic stacks and heaps win by *amortization*: each element is pushed and popped at most once (stack) or moved O(log k) times (heap), so a nested-looking loop is still near-linear.

---

## Bridge to Mock & Interview Day

You now have a pattern for every major family. The mock sessions test *selection under time* — naming the pattern from the problem's signal words, stating the invariant or recurrence aloud, then coding. That narration is what the recaps have been rehearsing all week.
