---
id: aa-day2-warmup
title: Day 2 Warmup — Two Pointers, Sliding Window, Intervals
---

**Theme:** Two pointers, sliding window, sorting, intervals.

**Goal:** Recognize and solve common contiguous-window and range-overlap problems.

---

## Block 1 — Template Recall (45 min)

Write each of the following from memory before today's problems:

### Two Pointers

```python
left, right = 0, len(arr) - 1

while left < right:
    # evaluate condition using arr[left] and arr[right]
    if condition_met:
        # record result
        left += 1
    elif arr[left] + arr[right] < target:
        left += 1
    else:
        right -= 1
```

When to use: sorted array, pair search, palindrome check.

### Sliding Window

```python
left = 0
best = 0
state = {}

for right in range(len(arr)):
    # expand: add arr[right] to state

    while window_is_invalid(state):
        # shrink: remove arr[left] from state
        left += 1

    best = max(best, right - left + 1)

return best
```

When to use: contiguous subarray or substring with a condition on the window.

### Merge Intervals

```python
intervals.sort()
merged = []

for start, end in intervals:
    if not merged or start > merged[-1][1]:
        merged.append([start, end])
    else:
        merged[-1][1] = max(merged[-1][1], end)

return merged
```

When to use: any problem involving overlapping ranges.

---

## Day 2 Problem Stack

**Two pointers and sliding window:**
- Valid Palindrome
- Two Sum II
- Container With Most Water
- Longest Substring Without Repeating Characters
- Minimum Size Subarray Sum

**Intervals:**
- Merge Intervals
- Insert Interval
- Non-overlapping Intervals
- Meeting Rooms
- Meeting Rooms II

---

## Applied Algorithms Drill — Operating Range Coverage

**Input:**

```python
valid_ranges = [(0, 10), (8, 15), (20, 30)]
query = (5, 14)
```

**Task:** Merge the valid ranges. Determine whether the query range is fully covered.

**Patterns:** sort intervals, merge, containment check.

---

## Review Questions for Each Problem

- Why sliding window or two pointers (not a hash map)?
- What made the window valid or invalid?
- What was the invariant that held throughout?

---

## End-of-Day Standard

By end of Day 2, you should instantly recognize:

- Sorted pair search → **two pointers**
- Contiguous condition → **sliding window**
- Overlapping ranges → **sort + merge intervals**

---

## Invariant Rehearsal

For each kata today, write one invariant before coding:

- Two pointers: "All pairs outside the current pointers have already been ruled out."
- Sliding window: "The window `[left, right]` is the current candidate, and I shrink it only when it violates the condition."
- Intervals: "The merged list is sorted and contains no overlapping ranges."

If you cannot state the invariant in one sentence, do not code yet.

## Pattern Split Tests

Use these quick questions to avoid choosing the wrong tool:

| Question | If yes | If no |
|---|---|---|
| Is the input sorted or can sorting preserve the answer? | Try two pointers or intervals. | Try hash map or window. |
| Is the answer a contiguous substring/subarray? | Try sliding window or prefix sum. | Do not force a window. |
| Are ranges overlapping or adjacent? | Sort by start and merge. | Consider heap or simple scan. |

## Common Failure Modes

- Moving both pointers when only one side should move.
- Forgetting to update the best answer before shrinking the window.
- Treating interval endpoints inconsistently as inclusive vs exclusive.
- Sorting intervals but then losing the original value the output needs.

## Day 2 Exit Criteria

You should be able to solve one two-pointer kata, one sliding-window kata, and one interval kata while narrating:

1. Why the pattern applies.
2. What each pointer means.
3. Why the loop cannot miss a valid answer.
4. The time and space complexity after sorting, if sorting is used.
