---
id: aa-day4-checkpoint
title: Day 4 Recap — Graph Traversal & Backtracking
---

Day 4 was about *exploring a space of states*: BFS for shortest/layered, DFS for reachability and cycles, backtracking to enumerate choices with undo. Picking the right traversal is the interview, not the coding.

This recap is not scored — the pointed questions now live in each Kata's Self-check, right after you solve it. What stays here is the consolidated model to carry into Day 5.

---

## Toolbox

| Signal | Reach for | Why |
|---|---|---|
| "Minimum steps / shortest path / minimum rounds" | BFS | Explores by layers; first arrival = optimal |
| "Does a path exist / all connected components / detect cycle" | DFS | Depth-first suffices; path existence, not length |
| "Topological order / dependency resolution" | DFS coloring or Kahn's BFS | Cycle detection + ordering in one pass |
| "All combinations / subsets / permutations" | Backtracking | Enumerate choice trees with undo |
| "Multi-source spread (fire, rot, infection)" | Multi-source BFS | Enqueue all sources at time 0 |

Signal words — **BFS**: shortest, minimum steps, layers, rounds, nearest. **DFS**: exists, connected, components, cycle, reachable. **Backtracking**: all combinations, enumerate, generate, valid arrangements.

---

## Tradeoffs

| Approach | Time | Space | Use when |
|---|---|---|---|
| BFS | O(V + E) | O(V) queue | Shortest path, layer-by-layer processing |
| DFS (recursive) | O(V + E) | O(V) call stack | Connectivity, cycle detection, component counting |
| DFS (iterative) | O(V + E) | O(V) explicit stack | Same as recursive; avoids stack overflow on deep graphs |
| Backtracking | O(branching^depth) | O(depth) | Enumerate all valid solutions with pruning |
| Kahn's (topological sort) | O(V + E) | O(V) | Dependency ordering; cycle detection as a side effect |

The backtracking skeleton to internalize: **choose → recurse → unchoose**, and state the pruning condition before you write the loop.

---

## Bridge to Day 5

Day 4 explored states by walking edges. Day 5 builds answers *bottom-up* — dynamic programming reuses overlapping subproblems, while stacks and heaps maintain a running structure (next-greater, running min, top-k) in a single pass.
