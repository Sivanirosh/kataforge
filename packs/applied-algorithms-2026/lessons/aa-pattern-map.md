---
id: aa-pattern-map
title: Pattern Recognition Map and Big-O Reference
---

The single most important skill in a live coding interview is **recognizing the pattern quickly**. Study this table until the signal-to-pattern mapping is automatic.

---

## Pattern Recognition Map

| Problem signal | Likely pattern | Recognition phrase |
|---|---|---|
| Fast lookup, duplicates, frequency counting | Hash map / set / Counter | "I can store seen values or counts." |
| Contiguous subarray or substring with a condition | Sliding window or prefix sum | "The window expands and shrinks based on validity." |
| Sorted array, pair search, reverse-end traversal | Two pointers | "I can move the pointer that gives a worse value." |
| Ranges, schedules, overlapping intervals | Sort + merge intervals | "Sorting by start time gives a natural merge order." |
| Largest or smallest feasible value | Binary search on answer | "The feasibility condition is monotonic." |
| Matrix, image, connected region, blob | Grid BFS/DFS or grid DP | "Each cell is a node with neighboring cells." |
| Shortest number of steps in unweighted graph | BFS | "BFS explores by distance layers." |
| All combinations, permutations, valid choices | Backtracking | "We choose, explore, then undo." |
| Optimal value over a sequence or grid | Dynamic programming | "Each state depends on smaller subproblems." |
| Next greater/smaller, parentheses, histogram | Stack / monotonic stack | "The stack stores unresolved candidates." |
| Top-k, repeated min/max extraction | Heap | "A heap gives efficient access to the current best item." |
| Multi-objective candidates, dominated designs | Sorting / Pareto frontier | "A candidate is dominated if another is better in all objectives." |

---

## How to Use This Table

1. **Read the problem signal column first.** Match what you observe in the problem to the left column.
2. **Say the pattern out loud.** This buys thinking time and signals structured reasoning to the interviewer.
3. **If uncertain, list two candidates.** "This could be a sliding window or a prefix sum — let me check the constraint."

---

## Big-O Cheat Sheet

| Code shape | Complexity |
|---|---:|
| One loop over `n` | O(n) |
| Two independent loops over `n` | O(n) |
| Nested loop over `n × n` | O(n²) |
| Sorting | O(n log n) |
| Binary search | O(log n) |
| Binary search + linear feasibility check | O(n log R) |
| Hash map lookup/insert (average) | O(1) |
| BFS/DFS on graph | O(V + E) |
| BFS/DFS on grid | O(rows × cols) |
| DP table with `m × n` states | O(mn) |
| Heap push/pop | O(log n) |
| Backtracking permutations | O(n!) |
| Backtracking subsets | O(2ⁿ) |

---

## Complexity Phrases to Memorize

> "Sorting dominates, so the time complexity is O(n log n)."

> "Each element enters and leaves the window at most once, so the time complexity is O(n)."

> "BFS visits each node and edge once, so the complexity is O(V + E)."

> "The DP table has `rows × cols` states and each transition is O(1), so the complexity is O(rows × cols)."

> "The binary search performs O(log R) iterations, and each feasibility check costs O(n), so the total is O(n log R)."

> "The heap has at most `n` elements, so each push/pop costs O(log n). With `n` operations the total is O(n log n)."

---

## Constraint → Acceptable Complexity

Use this to decide whether brute force is good enough:

| `n` | Acceptable complexity |
|---|---|
| ≤ 20 | O(2ⁿ) or O(n!) |
| ≤ 500 | O(n²) |
| ≤ 5 000 | O(n² log n) |
| ≤ 100 000 | O(n log n) |
| ≤ 1 000 000 | O(n) |

Say: "If `n` is around 10⁵, we need O(n log n) or O(n). O(n²) would time out."

---

## Pattern Arbitration Drills

Some prompts contain signals for multiple patterns. Use these tie-breakers:

| Competing patterns | Choose this when | Example signal |
|---|---|---|
| sliding window vs prefix sum | window validity changes monotonically as it grows/shrinks | longest substring with at most k distinct chars |
| prefix sum vs hash map | you need past prefix values, not just range totals | subarray sum equals k |
| BFS vs DFS | shortest steps in unweighted graph | minimum moves in grid |
| DFS vs union find | many offline connectivity merges | connected components after all edges known |
| binary search vs two pointers | answer is a value with monotonic feasibility | minimum speed/capacity |
| heap vs sorting | you repeatedly need current best before seeing all data | streaming top k |

When uncertain, say both options and pick one based on the invariant:

> "This could look like sliding window, but negative numbers break the shrink invariant. I will use prefix sums with a hash map instead."

## Applied Algorithms Translation Examples

Domain language often maps to standard patterns:

| Domain phrase | Algorithmic interpretation |
|---|---|
| feasible design under a threshold | filter plus min/max, or binary search on answer |
| connected mesh regions | graph/grid BFS or DFS |
| repeated simulation case IDs | hash map grouping |
| largest valid square/region | grid DP or binary search feasibility |
| schedule of compute jobs | intervals or heap by end time |
| nearest design points | heap or sorting by distance |

## Big-O Sanity Questions

Ask these before finalizing complexity:

1. Did sorting dominate the scan?
2. Is each pointer moved at most `n` times?
3. Can a node enter the queue more than once?
4. How many states are in the DP table?
5. How expensive is each heap operation?
6. Does the recursion enumerate combinations, permutations, or subsets?

If you can answer those, your complexity statement will usually be correct.
