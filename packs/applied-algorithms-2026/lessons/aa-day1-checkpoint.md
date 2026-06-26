---
id: aa-day1-checkpoint
title: Day 1 Recap — Hashing vs Sorting
---

Every Day 1 kata hid the same structural question: *how do I detect that two values are related without checking every pair?* The answer was always a data structure that makes lookup fast — but which one, and at what cost, is what the per-kata Self-checks drilled into.

This recap is not scored. The pointed questions now live in each Kata's Self-check, immediately after you solve it. What stays here is the consolidated mental model to carry into Day 2.

---

## Toolbox

| Signal in the problem | Reach for |
|---|---|
| "Has this value appeared before?" | `set` — O(1) membership, O(n) space |
| "How many times has this value appeared?" | `dict` / `Counter` — O(1) insert + lookup |
| "Are these two multisets equal?" | `Counter(s) == Counter(t)` or sort both |
| "O(1) extra space required" | Sort in-place, then scan for adjacency |
| "Fixed small alphabet (a–z, digits)" | Fixed-size array as frequency table |

The deeper move:

> "Can I use memory to make lookup fast? If not, can I sort to make comparison local?"

---

## Tradeoffs

| Approach | Time | Space | Use when |
|---|---|---|---|
| Hash set / dict | O(n) | O(n) | Default — no memory constraint |
| Sort + scan | O(n log n) | O(1) extra | Memory is restricted |
| Fixed array (26 chars) | O(n) | O(1) — constant 26 cells | Alphabet is small and bounded |
| Nested loop | O(n²) | O(1) | Never — only valid as a "brute force" baseline |

A few complexity facts worth keeping crisp:

- `sorted(s)` returns a **new** list — O(n) space — while `list.sort()` is in-place with O(log n) Timsort stack.
- List equality (`==`) walks elements one by one: O(n), not free.
- A canonical anagram/grouping key must collide *exactly* for members of the same group and never otherwise.

---

## Bridge to Day 2

Day 1 was about *what structure makes lookup fast*. Day 2 shifts to *how two indices move through a structure* — two pointers, sliding windows, and intervals — where the win comes from never revisiting work rather than from extra memory.
