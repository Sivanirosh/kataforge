---
id: aa-day3-checkpoint
title: Day 3 Recap — Binary Search & Prefix Sums
---

Day 3 was about *trading preprocessing or structure for fast queries*: binary search halves a monotonic space; prefix sums precompute so each range query is O(1); grid traversals flood-fill connected regions.

This recap is not scored — the pointed questions now live in each Kata's Self-check, right after you solve it. What stays here is the consolidated model to carry into Day 4.

---

## Toolbox

| Signal in the problem | Reach for |
|---|---|
| "Minimum/maximum feasible value" or "smallest X that satisfies a condition" | Binary search on the answer space |
| "Sorted array, find position or value" | Classic binary search |
| "Sorted array with a rotation, find target or minimum" | Binary search with a sorted-half check |
| "Sum of a subarray" or "range sum query" | Prefix sums |
| "How many subarrays sum to k?" | Prefix sum + hash map (a Two Sum variant) |
| "2D range sum queries" | 2D prefix sum table |

The unlock for "binary search on the answer": the feasibility predicate must be **monotonic** — false below a threshold, true at and above it. Then you binary-search the threshold instead of an index.

---

## Tradeoffs

| Approach | Time | Space | Use when |
|---|---|---|---|
| Naive range sum | O(n) per query | O(1) | One-off query, no preprocessing |
| Prefix sum array | O(n) build + O(1) per query | O(n) | Many range sum queries on a 1D array |
| 2D prefix sum | O(nm) build + O(1) per query | O(nm) | Many rectangle queries on a 2D grid |
| Binary search on sorted array | O(log n) | O(1) | Searching a sorted sequence |
| Binary search on answer space | O(log R × feasibility cost) | O(1) | Optimization with a monotonic predicate, R = range size |

---

## Bridge to Day 4

Day 3 searched ordered structures. Day 4 drops the ordering: graphs and grids where the question is reachability, shortest path, or enumerating choices — BFS, DFS, and backtracking.
