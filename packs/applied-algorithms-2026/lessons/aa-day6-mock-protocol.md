---
id: aa-day6-mock-protocol
title: Day 6 — Mock Interview Protocol
---

**Theme:** Full mock interview day.

**Goal:** Simulate the real interview. No tutorials first. No AI. No hints before 25 minutes.

---

## Block 1 — Warmup from Memory (45 min)

Write these from memory before any mock session:

1. Merge intervals
2. Sliding window
3. Binary search
4. BFS grid
5. Backtracking skeleton
6. Maximal square DP

If any template feels slow or uncertain, that is the one to drill again today.

---

## Mock Session Rules

Each session is 45 minutes, one problem:

1. **Talk out loud** throughout.
2. **Use the live-coding protocol** (restate → example → brute force → pattern → code → test → complexity).
3. **Test edge cases** before saying you are done.
4. **Explain complexity** at the end.

Do not look anything up during the session.

**Topic rotation:**
- Session 1: Arrays / hash maps / strings
- Session 2: Intervals / sliding window
- Session 3: Binary search or prefix sums
- Session 4: Grid / BFS / DFS
- Session 5: DP / backtracking / stack

---

## Error Log Template

After each session, fill in this table:

| Problem | Pattern missed | Bug | Edge case missed | Correct idea | Re-solve? |
|---|---|---|---|---|---|
| | | | | | |

Re-solve any problem you could not complete within 40 minutes — **from scratch, no notes.**

---

## Applied Algorithms Final Mock — Shape from Intervals

This is the hardest problem of the week. It combines interval reasoning with grid DP.

**Input:**

```python
rows = {
    0: [(1, 5)],
    1: [(1, 5)],
    2: [(2, 6)],
    3: [(2, 6)],
}
```

Each entry `rows[r] = [(start, end)]` means row `r` has filled columns from `start` to `end` (inclusive).

**Task:** Find the side length of the largest square that fits entirely within the filled region.

**Discussion path:**

1. Clarify constraints: how large are the row and column indices? Is there one interval per row?
2. If small: convert to binary grid, then run maximal square DP. O(rows × cols).
3. If large or sparse: consider interval feasibility and binary search on side length. O(n log n × log R).
4. Explain the trade-off between the two approaches.

This problem is not about memorizing the solution. It is about showing that you can convert an unusual domain problem into a known algorithmic tool.

---

## Mock Interview Rules

Run each mock as if another engineer is watching:

1. Set a 45-minute timer.
2. Spend the first 3 minutes on restatement, examples, and constraints.
3. State a brute-force approach even if it is too slow.
4. Commit to a pattern by minute 10.
5. Have runnable code by minute 30.
6. Use the final 10 minutes for tests, fixes, and complexity.

Do not pause the timer to look up templates. If a template is missing, write the best version from memory and repair it after the mock.

## Scoring Rubric

Score each mock from 0 to 2 in each category:

| Category | 0 | 1 | 2 |
|---|---|---|---|
| clarification | silent or wrong assumptions | asks some constraints | crisp restatement plus useful constraints |
| pattern choice | random or memorized | plausible but weakly justified | justified by signal and invariant |
| implementation | incomplete or tangled | mostly working | clean, runnable, edge-aware |
| testing | no manual tests | example only | example plus edge case and failure case |
| communication | long silence | intermittent narration | calm, continuous reasoning |

Target score: at least 7/10 before the real interview.

## Reset Loop After Each Mock

Immediately after a mock, write three lines:

```text
missed signal:
bug pattern:
one rep to fix:
```

Then do exactly one focused repair drill. Do not turn the review into another full grind session.

## Red Flags to Eliminate

- Coding before defining input/output shape.
- Switching patterns without explaining why.
- Getting stuck silently for more than 20 seconds.
- Skipping edge cases because the sample passed.
- Over-optimizing before a correct baseline exists.
