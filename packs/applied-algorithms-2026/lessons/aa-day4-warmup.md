---
id: aa-day4-warmup
title: Day 4 Warmup — Graphs, BFS/DFS, Backtracking
---

**Theme:** Graphs, BFS/DFS, recursion, backtracking.

**Goal:** Handle connected regions, shortest paths, and search over choices.

---

## Block 1 — Template Recall (45 min)

Write each of the following from memory:

### BFS Using deque

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

### DFS Recursive

```python
def dfs(node, seen):
    seen.add(node)
    for nei in graph[node]:
        if nei not in seen:
            dfs(nei, seen)
```

### Grid Directions

```python
directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

for dr, dc in directions:
    nr, nc = r + dr, c + dc
    if 0 <= nr < rows and 0 <= nc < cols:
        # valid neighbor
```

### Backtracking Skeleton

```python
result = []

def backtrack(path, start):
    result.append(path[:])  # or check completion condition

    for i in range(start, len(candidates)):
        if not is_valid(candidates[i], path):
            continue
        path.append(candidates[i])
        backtrack(path, i + 1)  # i+1 for no-reuse, i for reuse
        path.pop()

backtrack([], 0)
return result
```

---

## Day 4 Problem Stack

**BFS/DFS on grids:**
- Number of Islands (re-solve without notes)
- Max Area of Island (re-solve without notes)
- Rotting Oranges
- Shortest Path in Binary Matrix
- Flood Fill

**Graph and backtracking:**
- Clone Graph
- Course Schedule
- Subsets
- Permutations
- Combination Sum
- Word Search

---

## Review Questions for Each Problem

- Why BFS or DFS (not both)?
- What is the visited state?
- What are the neighbors?
- What is the complexity?

---

## When to Choose BFS vs DFS

| Use BFS when | Use DFS when |
|---|---|
| Shortest path / minimum steps | All paths / all solutions |
| Level-by-level traversal | Connected components |
| Unweighted graph distance | Cycle detection |
| Multi-source spreading (e.g. rotting oranges) | Backtracking search |

---

## Applied Algorithms Drill — Mesh Connected Components

**Input:**

```python
nodes = [0, 1, 2, 3, 4]
edges = [(0, 1), (1, 2), (3, 4)]
```

**Task:** Build adjacency list, count connected components, return nodes in each component.

**Patterns:** graph construction, BFS/DFS, visited set.

---

## End-of-Day Standard

By end of Day 4, you should know:

- **BFS** → shortest path, minimum steps, layer-by-layer traversal.
- **DFS** → exploration, components, recursion.
- **Backtracking** → enumerate valid choices with choose-explore-undo.

---

## Graph Construction Checklist

Most graph bugs happen before traversal. Build the graph deliberately:

1. Decide whether edges are directed or undirected.
2. Decide whether nodes are integers, coordinates, or objects.
3. Initialize missing nodes if isolated nodes matter.
4. Add both directions only for undirected graphs.
5. Print or mentally inspect one tiny adjacency list before traversal.

Say:

> "The traversal is simple once the adjacency representation is correct."

## BFS vs DFS Decision Table

| Goal | Use | Reason |
|---|---|---|
| shortest path in unweighted graph | BFS | first time reached is minimum distance |
| count connected components | BFS or DFS | visit every reachable node once |
| detect cycle / dependency ordering | DFS or topological BFS | need state or indegree |
| enumerate all valid combinations | backtracking | need choose/explore/undo |
| flood fill region | BFS or DFS | grid cells behave like graph nodes |

## Backtracking Guardrails

Before coding, define:

- `path`: what partial answer contains.
- `choices`: what can still be chosen.
- `is_done`: when to record an answer.
- `undo`: exactly what state must be restored.

If a recursive solution duplicates answers, check whether the next recursive call should start at `i` or `i + 1`.

## Day 4 Exit Criteria

You are ready to continue when you can:

- Build an adjacency list from edge pairs in under two minutes.
- Write grid BFS with `deque` and `seen`.
- Explain why BFS gives shortest distance only for unweighted edges.
- Name the mutable state in a backtracking problem before writing recursion.
