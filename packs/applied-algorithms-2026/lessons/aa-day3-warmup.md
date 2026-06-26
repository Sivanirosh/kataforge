---
id: aa-day3-warmup
title: Day 3 Warmup — Binary Search, Prefix Sums, Grids
---

**Theme:** Binary search, prefix sums, grids, matrices.

**Goal:** Prepare for engineering and geometry-like problems.

---

## Block 1 — Template Recall (45 min)

Write each of the following from memory:

### Binary Search

```python
left, right = 0, len(arr) - 1

while left <= right:
    mid = (left + right) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        left = mid + 1
    else:
        right = mid - 1

return -1
```

### Binary Search on Answer

```python
def can(x):
    # return True if candidate x is feasible
    pass

left, right = 0, max_possible
answer = 0

while left <= right:
    mid = (left + right) // 2

    if can(mid):
        answer = mid
        left = mid + 1
    else:
        right = mid - 1

return answer
```

### 1D Prefix Sum

```python
prefix = [0]
for x in arr:
    prefix.append(prefix[-1] + x)

range_sum = prefix[right] - prefix[left]  # sum arr[left..right-1]
```

### 2D Prefix Sum

```python
rows, cols = len(grid), len(grid[0])
prefix = [[0] * (cols + 1) for _ in range(rows + 1)]

for r in range(rows):
    for c in range(cols):
        prefix[r+1][c+1] = grid[r][c] + prefix[r][c+1] + prefix[r+1][c] - prefix[r][c]

# rect sum: inclusive (r1,c1) to (r2,c2)
total = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]
```

### Maximal Square DP

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

## Day 3 Problem Stack

**Binary search:**
- Binary Search
- Search Insert Position
- Search in Rotated Sorted Array
- Find Minimum in Rotated Sorted Array
- Koko Eating Bananas

**Prefix sums and grids:**
- Subarray Sum Equals K
- Range Sum Query (Immutable)
- Range Sum Query 2D
- Number of Islands
- Max Area of Island
- Maximal Square

---

## Review Questions for Each Problem

- What was monotonic (binary search)?
- What did `left`, `right`, and `mid` represent?
- Why did the loop terminate correctly?

---

## Applied Algorithms Drill — Largest Feasible Square

**Input:** Binary grid where `1` = feasible region, `0` = infeasible.

**Task:** Return the side length of the largest all-1 square.

**Talk-track:**

> "If the grid is moderate, I would use DP. If the grid is huge and many queries are needed, I would consider 2D prefix sums with binary search on the side length."

---

## End-of-Day Standard

By end of Day 3, you should be able to say:

> "This is a feasibility problem. If feasibility is monotonic, I can binary search the answer."

---

## Monotonicity Check

Before using binary search on the answer, prove the yes/no shape:

| Candidate value | Feasibility behavior |
|---|---|
| smaller side length | usually easier to fit |
| larger side length | usually harder to fit |
| lower capacity | usually harder to satisfy |
| higher capacity | usually easier to satisfy |

Say:

> "If value `x` is feasible, then all easier values are also feasible. That gives me a monotonic predicate."

If this sentence is false, binary search on answer is not valid.

## Prefix Sum Decision Check

Use prefix sums when:

- You need many range-sum queries.
- Brute-force recomputing each range would repeat work.
- The region can be expressed by subtracting earlier accumulated totals.

For 2D prefix sums, rehearse the rectangle formula until it is automatic:

```python
total = ps[r2 + 1][c2 + 1] - ps[r1][c2 + 1] - ps[r2 + 1][c1] + ps[r1][c1]
```

## Grid Debug Checklist

When a grid solution fails, inspect these first:

- Row and column bounds: `0 <= r < rows` and `0 <= c < cols`.
- Whether `seen` is marked before or after enqueueing.
- Whether diagonals are allowed.
- Whether the answer is area, count, distance, or side length.

## Day 3 Exit Criteria

You are ready to continue when you can:

- Write iterative binary search without off-by-one confusion.
- Explain the monotonic predicate in one sentence.
- Build 1D and 2D prefix sums from memory.
- Choose between grid DFS/BFS and grid DP based on whether the task is connectivity or optimal substructure.
