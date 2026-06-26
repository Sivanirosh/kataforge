---
id: aa-day2-checkpoint
title: Day 2 Recap — Two Pointers, Windows & Intervals
---

Day 2 was about *how two indices move through a structure*: two pointers, sliding windows, and interval sweeps. The win comes from never revisiting work, not from extra memory.

This recap is not scored — the pointed questions now live in each Kata's Self-check, right after you solve it. What stays here is the consolidated model to carry into Day 3.

---

## Toolbox

| Signal in the problem | Reach for |
|---|---|
| "Sorted array, find a pair with a target sum/difference" | Two pointers from opposite ends |
| "Maximum/minimum over all subarrays or substrings with a condition" | Sliding window |
| "Overlapping ranges, schedules, merging" | Sort by start, then linear merge scan |
| "Shortest/longest contiguous block satisfying a constraint" | Sliding window with expand/shrink logic |

Two mental moves worth memorizing:

> Two pointers: "Which pointer, if moved, is provably eliminated? Move that one."

> Sliding window: "State the invariant. Extend right. If the invariant breaks, shrink from left until it holds again."

---

## Tradeoffs

| Approach | Time | Space | Use when |
|---|---|---|---|
| Hash map (unsorted) | O(n) | O(n) | Input is not sorted, pairs have no directional ordering |
| Two pointers (sorted) | O(n) | O(1) | Input is sorted or can be sorted; monotonic elimination applies |
| Sliding window | O(n) | O(k) window state | Contiguous subarray/substring with a running condition |
| Sort + merge scan | O(n log n) | O(n) output | Interval problems; sorting is the unlock |

A recurring amortized fact: in a sliding window, `left` only moves forward, so the nested shrink loop is bounded globally — the whole scan stays O(n), not O(n²).

---

## Bridge to Day 3

Day 2 exploited *order you create or already have* (sorted ends, a moving window, sorted intervals). Day 3 leans on order even harder: binary search halves a sorted space, and prefix sums precompute order so each query is O(1).
