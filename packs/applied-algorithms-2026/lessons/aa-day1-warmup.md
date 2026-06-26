---
id: aa-day1-warmup
title: Day 1 Warmup — Python Fundamentals from Memory
---

**Theme:** Python speed, arrays, strings, hash maps.

**Goal:** Become fast with the most common interview building blocks.

---

## Block 1 — Template Recall (45 min)

Before solving any problems today, write each of the following **from memory** without looking at notes:

### 1. Counter

```python
from collections import Counter

counts = Counter(items)
```

When to use: frequency counting, anagram detection, top-k elements.

### 2. defaultdict(list)

```python
from collections import defaultdict

groups = defaultdict(list)
for key, value in pairs:
    groups[key].append(value)
```

When to use: grouping items by a derived key.

### 3. Set for seen values

```python
seen = set()
for item in items:
    if item in seen:
        # handle duplicate
        pass
    seen.add(item)
```

When to use: O(1) duplicate detection without counting.

### 4. Dictionary frequency count

```python
freq = {}
for x in items:
    freq[x] = freq.get(x, 0) + 1
```

When to use: same as Counter, but without the import.

### 5. Simple loop over list or string

```python
for i, x in enumerate(arr):
    # use both index i and value x

for char in s:
    # character-by-character scan
```

---

## Day 1 Problem Stack

Work through these in order. After each problem, fill in the review template.

**Easy core:**
- Two Sum (already solved — re-do from memory as warmup)
- Contains Duplicate
- Valid Anagram
- Majority Element
- First Unique Character in a String

**Medium core:**
- Group Anagrams
- Top K Frequent Elements
- Product of Array Except Self
- Longest Consecutive Sequence

---

## Applied Algorithms Drill — Simulation Grouping

After the core problems, solve this engineering-flavored exercise:

**Input:**

```python
runs = [
    {"design": "A", "metric": "drag", "value": 0.42},
    {"design": "A", "metric": "mass", "value": 12.5},
    {"design": "B", "metric": "drag", "value": 0.39},
    {"design": "B", "metric": "mass", "value": 8.0},
]
max_mass = 15.0
```

**Task:** Return the design ID with the minimum drag among designs whose mass is within `max_mass`.

**Patterns:** hash map grouping, filtering, custom comparison.

---

## End-of-Day Standard

By the end of Day 1, you should:

- Solve basic hash-map and string problems in **10–15 minutes**.
- Instantly reach for `Counter` or `defaultdict` when you see "frequency" or "grouping."
- State the O(n) time and O(n) space complexity without hesitation.

---

## Interview Rehearsal Block

Before each Day 1 kata, say this out loud:

1. "The input is a list or string, and I need a single pass if possible."
2. "I am checking whether the problem is about membership, frequency, or grouping."
3. "If lookup is the bottleneck, I will pay O(n) extra space for a dictionary or set."

Use this short script before coding:

> "A brute-force comparison would be O(n²). I can improve it by storing the information I need as I scan."

## Applied Algorithms Transfer

Expect domain words to hide simple data structures:

| Domain wording | Coding translation |
|---|---|
| repeated simulation ID | frequency count |
| design already evaluated | set membership |
| group results by mesh/case | `defaultdict(list)` |
| best metric per candidate | dictionary from ID to best value |

If the prompt mentions "first", "unique", "duplicate", "most common", or "group by", pause before coding and name the dictionary key and value.

## Exit Checklist

You are ready to continue when you can do all of this without notes:

- Write `Counter`, `defaultdict(list)`, and `seen = set()` from memory.
- Explain why a hash map changes O(n²) pair comparison into O(n).
- Test empty input, one item, duplicate items, and ties.
- Keep variable names concrete: `seen`, `counts`, `groups`, `best_by_design`.
