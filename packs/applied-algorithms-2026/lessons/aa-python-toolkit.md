---
id: aa-python-toolkit
title: Python Toolkit and Algorithm Templates
---

Know these imports, data structures, and templates cold. Write each one from memory before looking. Speed at this level frees mental bandwidth for the actual problem.

---

## Imports to Know Cold

```python
from collections import defaultdict, Counter, deque
import heapq
import bisect
from math import inf
```

---

## Core Data Structures

### Frequency count

```python
from collections import Counter

counts = Counter(items)
most_common = counts.most_common(k)
```

### Grouping with defaultdict

```python
from collections import defaultdict

groups = defaultdict(list)
for key, value in pairs:
    groups[key].append(value)
```

### Seen set for deduplication

```python
seen = set()
for item in items:
    if item not in seen:
        seen.add(item)
        process(item)
```

### Dictionary frequency count (manual)

```python
freq = {}
for x in items:
    freq[x] = freq.get(x, 0) + 1
```

---

## Template 1 — Sliding Window

```python
def sliding_window(arr):
    left = 0
    best = 0
    state = {}

    for right in range(len(arr)):
        # add arr[right] to state

        while window_is_invalid(state):
            # remove arr[left] from state
            left += 1

        best = max(best, right - left + 1)

    return best
```

**Use when:** contiguous subarray or substring with a validity condition.

---

## Template 2 — Merge Intervals

```python
def merge_intervals(intervals):
    if not intervals:
        return []

    intervals.sort()
    merged = []

    for start, end in intervals:
        if not merged or start > merged[-1][1]:
            merged.append([start, end])
        else:
            merged[-1][1] = max(merged[-1][1], end)

    return merged
```

**Use when:** overlapping ranges, schedules, valid regions, time windows.

---

## Template 3 — Binary Search

```python
def binary_search(arr, target):
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

**Use when:** sorted input, or searching for a specific value.

---

## Template 4 — Binary Search on Answer

```python
def solve():
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

**Use when:** "largest possible X", "minimum feasible X", "maximize the minimum", "minimize the maximum". The feasibility condition must be monotonic.

---

## Template 5 — Grid BFS

```python
from collections import deque

def bfs_grid(grid, start):
    rows, cols = len(grid), len(grid[0])
    queue = deque([start])
    seen = {start}
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    while queue:
        r, c = queue.popleft()

        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in seen:
                if grid[nr][nc] == 1:
                    seen.add((nr, nc))
                    queue.append((nr, nc))

    return seen
```

**Use when:** connected regions, shortest path in unweighted grid, image traversal.

---

## Template 6 — DFS for Connected Components

```python
def count_components(graph):
    seen = set()

    def dfs(node):
        seen.add(node)
        for nei in graph[node]:
            if nei not in seen:
                dfs(nei)

    count = 0
    for node in graph:
        if node not in seen:
            count += 1
            dfs(node)

    return count
```

**Use when:** graph connectivity, mesh components, network analysis.

---

## Template 7 — Backtracking

```python
def backtrack(path, choices):
    if is_complete(path):
        result.append(path[:])
        return

    for choice in choices:
        if not is_valid(choice, path):
            continue

        path.append(choice)
        backtrack(path, choices)
        path.pop()
```

**Use when:** subsets, permutations, combinations, search over choices.

---

## Template 8 — 1D Prefix Sum

```python
def build_prefix(arr):
    prefix = [0]
    for x in arr:
        prefix.append(prefix[-1] + x)
    return prefix

# sum arr[left:right] where right is exclusive
range_sum = prefix[right] - prefix[left]
```

**Use when:** repeated subarray sum queries.

---

## Template 9 — 2D Prefix Sum

```python
def build_prefix_2d(grid):
    rows, cols = len(grid), len(grid[0])
    prefix = [[0] * (cols + 1) for _ in range(rows + 1)]

    for r in range(rows):
        for c in range(cols):
            prefix[r + 1][c + 1] = (
                grid[r][c]
                + prefix[r][c + 1]
                + prefix[r + 1][c]
                - prefix[r][c]
            )

    return prefix


def rect_sum(prefix, r1, c1, r2, c2):
    # inclusive rectangle from (r1, c1) to (r2, c2)
    return (
        prefix[r2 + 1][c2 + 1]
        - prefix[r1][c2 + 1]
        - prefix[r2 + 1][c1]
        + prefix[r1][c1]
    )
```

**Use when:** matrix region sums, image/blob/shape area queries.

---

## Template 10 — Maximal Square DP

```python
def maximal_square(grid):
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    dp = [[0] * (cols + 1) for _ in range(rows + 1)]
    best = 0

    for r in range(1, rows + 1):
        for c in range(1, cols + 1):
            if grid[r - 1][c - 1] == 1:
                dp[r][c] = 1 + min(
                    dp[r - 1][c],
                    dp[r][c - 1],
                    dp[r - 1][c - 1]
                )
                best = max(best, dp[r][c])

    return best
```

**Use when:** largest all-1 square in binary matrix, feasibility region problems.

---

## Problem Review Template

Use this **after every problem** during practice:

```
Pattern:

Brute-force idea:

Optimized idea:

Key invariant:

Time complexity:

Space complexity:

Bugs I made:

Edge cases:

What I should recognize next time:
```

---

## Heap Patterns

```python
import heapq

# Min-heap (default)
heap = []
heapq.heappush(heap, value)
smallest = heapq.heappop(heap)

# Max-heap (negate values)
heapq.heappush(heap, -value)
largest = -heapq.heappop(heap)

# K smallest
k_smallest = heapq.nsmallest(k, items)

# K largest
k_largest = heapq.nlargest(k, items)
```

---

## Queue for BFS

```python
from collections import deque

queue = deque([start])
seen = {start}

while queue:
    node = queue.popleft()
    for nei in graph[node]:
        if nei not in seen:
            seen.add(nei)
            queue.append(nei)
```

---

## Binary Search with bisect

```python
import bisect

# Index of leftmost value >= target
idx = bisect.bisect_left(arr, target)

# Index of leftmost value > target
idx = bisect.bisect_right(arr, target)
```

---

## Memory Rep Schedule

Use this schedule for the first 15 minutes of every practice day:

| Minute | Rep |
|---|---|
| 0-3 | Write imports and hash-map templates. |
| 3-6 | Write two pointers and sliding window. |
| 6-9 | Write binary search and prefix sum. |
| 9-12 | Write BFS grid and adjacency-list BFS. |
| 12-15 | Write one DP state template and one heap snippet. |

Do not read the answer first. The value is in recall speed.

## Template Mutation Drills

A memorized template is not enough. Mutate each one:

- Hash map: store index, count, list of values, and best metric.
- Sliding window: longest valid, shortest valid, and exact-count variants.
- Binary search: search index, insertion point, and answer feasibility.
- BFS: return distance, count components, and reconstruct visited region.
- DP: count ways, maximize value, and boolean feasibility.
- Heap: smallest k, largest k using negative values, and bounded heap of size k.

## Python Interview Traps

Check these before submitting:

- `defaultdict(list)` needs `.append`, not assignment.
- `heapq` is a min-heap; use negative values for max behavior.
- Do not use a mutable default argument like `path=[]`.
- Mark grid cells seen before enqueueing to avoid duplicates.
- `bisect_right` returns the first index greater than the target.
- Slicing inside a loop can accidentally add O(n) work per iteration.

## Minimal Debug Routine

When code fails, do this in order:

1. Run the smallest input by hand.
2. Print or inspect the loop invariant variables.
3. Check boundary updates and off-by-one conditions.
4. Check whether you mutated a list or set that recursion still needs.
5. Re-state complexity after the fix, because the fix may change it.
