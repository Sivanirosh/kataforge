---
id: aa-day5-warmup
title: Day 5 Warmup — DP, Stacks, Heaps
---

**Theme:** Dynamic programming, stacks, heaps, multi-objective optimization.

**Goal:** Cover patterns that are less frequent but dangerous if ignored.

---

## Block 1 — Template Recall (45 min)

Write each of the following from memory:

### Stack

```python
stack = []
stack.append(value)   # push
top = stack[-1]       # peek
value = stack.pop()   # pop
```

When to use: matching brackets, monotonic stack for next-greater, postfix evaluation.

### Min-Heap

```python
import heapq

heap = []
heapq.heappush(heap, value)
smallest = heapq.heappop(heap)
```

When to use: repeated minimum extraction, top-k elements, Dijkstra's.

### Simple 1D DP Array

```python
dp = [0] * (n + 1)
dp[0] = base_case

for i in range(1, n + 1):
    dp[i] = recurrence(dp[i-1], dp[i-2], ...)

return dp[n]
```

### Grid DP

```python
dp = [[0] * cols for _ in range(rows)]

for r in range(rows):
    for c in range(cols):
        dp[r][c] = f(dp[r-1][c], dp[r][c-1], dp[r-1][c-1], grid[r][c])
```

### Maximal Square (as DP reference)

```python
dp = [[0] * (cols+1) for _ in range(rows+1)]
best = 0

for r in range(1, rows+1):
    for c in range(1, cols+1):
        if grid[r-1][c-1] == 1:
            dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1])
            best = max(best, dp[r][c])
```

---

## Day 5 Problem Stack

**Basic DP:**
- Climbing Stairs
- House Robber
- Coin Change
- Longest Increasing Subsequence
- Longest Common Subsequence

**Stacks and heaps:**
- Valid Parentheses
- Min Stack
- Daily Temperatures
- Evaluate Reverse Polish Notation
- K Closest Points to Origin
- Top K Frequent Elements (re-solve with heap)

---

## DP Framework

For every DP problem, answer these four questions before coding:

1. **State:** What does `dp[i]` (or `dp[i][j]`) represent?
2. **Recurrence:** How does `dp[i]` depend on smaller states?
3. **Base case:** What are the smallest valid states?
4. **Final answer:** Which cell (or combination of cells) is the answer?

---

## Applied Algorithms Drills

**Drill A — Best Simulation Candidate:**
Given simulation runs with design metrics, return the design with minimum drag within a mass constraint.

**Drill B — Pareto Frontier:**
Given designs with mass, drag, and stress, return the non-dominated candidates on mass and drag axes.

Definition: design A dominates design B if A is at least as good in all objectives and strictly better in one. Start with O(n²), then discuss whether sorting helps.

---

## End-of-Day Standard

By end of Day 5, you should not fear DP. Even on a hard problem you cannot fully solve, you should be able to:

- Define the state clearly.
- Write the base case.
- Attempt the recurrence.

A partial correct solution with correct reasoning scores much better than a frozen attempt.

---

## DP State Naming Drill

For every DP kata, fill this template before writing code:

```text
state:
  dp[i] means ...
base:
  dp[0] = ...
transition:
  dp[i] = ...
answer:
  return ...
```

If the state sentence is vague, the implementation will be fragile. Prefer concrete names like `best_until_i`, `ways_to_make_amount`, or `longest_ending_at_i`.

## Stack and Heap Recognition

Use a stack when the prompt contains:

- matching or nesting
- next greater / next smaller
- unresolved candidates
- most recent open item

Use a heap when the prompt contains:

- top k
- repeatedly extract minimum or maximum
- keep only the best k candidates
- merge multiple sorted streams

## Applied Algorithms Optimization Talk Track

For multi-objective design problems, start with correctness:

> "I can first compare every pair to find dominated candidates. That is O(n²), but it is easy to verify. If `n` is large, I would look for a sort order that removes one dimension from the comparison."

This is often a better interview answer than inventing a complex optimization too early.

## Day 5 Exit Criteria

You are ready for mock interviews when you can:

- Define a DP state for a sequence problem and a grid problem.
- Explain stack contents at every loop iteration.
- Use `heapq` without forgetting that Python has a min-heap.
- Give a correct baseline for a Pareto-style problem and name the next optimization direction.
