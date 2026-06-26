# Applied Algorithms Coding Round Roadmap

- **Audience:** KataForge learners
- **Pack:** Applied Algorithms
- **Format:** Live coding algorithmic practice
- **Language:** Python
- **Current level:** Comfortable with easy problems; goal is to build solid algorithmic foundations fast
- **Main objective:** Pattern recognition, structured problem solving, clean Python implementation, spoken reasoning, and Big-O complexity explanation.

---

## 0. Strategic Goal

This interview is not about becoming a perfect competitive programmer in one week. The realistic target is to become **reliable on core algorithmic patterns** and to communicate like a structured engineer during a live coding exercise.

By interview day, you should be able to:

- Recognize the likely pattern quickly.
- Restate the problem clearly.
- Create small examples before coding.
- Explain a brute-force approach first.
- Improve toward a better algorithm when needed.
- Write clean Python without AI assistance.
- Test edge cases explicitly.
- Explain time and space complexity using Big-O notation.
- Stay calm if the problem is unfamiliar.

Your target interview identity:

> “I may not instantly know every trick, but I reason clearly, start from first principles, communicate my assumptions, build a correct solution, test it, and understand its complexity.”

---

## 1. Interview Constraints

Assume the live-coding session does **not** allow LLMs or AI-assisted coding tools.

During preparation, use AI only as a tutor after you have already attempted a problem. In the final 48 hours, prioritize solving without assistance to simulate the real interview.

Recommended rule:

- First attempt: no help, 25–40 minutes.
- If stuck: write down where you got stuck.
- Then read a hint or solution.
- Re-solve from scratch later without looking.

---

## 2. The Live Coding Protocol

Use the same sequence on every problem.

### Step 1 — Restate the problem

Say:

> “Let me first restate the problem to make sure I understood it.”

Then clarify:

- Input type.
- Output type.
- Constraints.
- Whether input is sorted.
- Whether duplicates are possible.
- Whether negative numbers are possible.
- What to return if no solution exists.

### Step 2 — Work through examples

Say:

> “Before coding, I’ll test the idea on a small example.”

Create:

- One normal example.
- One edge case.

### Step 3 — Explain brute force

Say:

> “A straightforward solution would be... The complexity would be... It may be acceptable if the constraints are small, but if not, we can improve it.”

This shows that you understand correctness before optimization.

### Step 4 — Identify the pattern

Say:

> “This looks like a [hash map / sliding window / interval / graph / DP / binary search] problem because...”

### Step 5 — Code cleanly

Write readable Python. Prefer clarity over cleverness.

### Step 6 — Test deliberately

Test:

- Empty input.
- One element.
- Duplicates.
- Boundary cases.
- Impossible case.
- Normal case.

### Step 7 — Complexity

End with:

> “The time complexity is O(...), and the space complexity is O(...).”

---

## 3. Spoken Reasoning Scripts

You should not go silent. Use concise verbal reasoning.

### Opening script

> “I’ll first clarify the input and output, then try a simple example, propose a brute-force approach, and optimize from there.”

### When you need constraints

> “The constraints are important here because they determine whether the brute-force approach is acceptable.”

### When you recognize a pattern

> “This looks like a sliding-window problem because we are looking for a contiguous segment with a condition.”

> “This looks like an interval problem because we need to reason about overlapping ranges.”

> “This looks like binary search on the answer because if a candidate value is feasible, then smaller values are also feasible.”

> “This looks like BFS because we need the minimum number of steps in an unweighted graph or grid.”

### When stuck

> “Let me step back and test the logic on a smaller example.”

> “I do not immediately see the optimal solution, but I can start with a correct brute-force version and then improve it.”

### Before coding

> “I think the algorithm is clear now. I’ll implement the clean version first, then test edge cases.”

### After coding

> “Let me walk through the code with the example.”

### Closing

> “The time complexity is..., and the space complexity is... The main trade-off is...”

---

## 4. Pattern Recognition Map

| Problem signal | Likely pattern | Example phrase |
|---|---|---|
| Need fast lookup, duplicates, frequency | Hash map / set / Counter | “I can store seen values or counts.” |
| Contiguous subarray or substring | Sliding window or prefix sum | “The window expands and shrinks based on validity.” |
| Sorted array, pair search, reverse ends | Two pointers | “I can move the pointer that gives a worse value.” |
| Ranges, schedules, overlaps | Sort + intervals | “Sorting by start time gives a natural merge order.” |
| Largest/smallest feasible value | Binary search on answer | “The feasibility condition is monotonic.” |
| Matrix, image, shape, connected region | Grid BFS/DFS or grid DP | “Each cell is a node with neighboring cells.” |
| Need shortest steps in unweighted graph | BFS | “BFS explores by distance layers.” |
| Need all combinations or permutations | Backtracking | “We choose, explore, then undo.” |
| Optimal value over sequence/grid | Dynamic programming | “Each state depends on smaller subproblems.” |
| Next greater/smaller, parentheses, histogram | Stack / monotonic stack | “The stack stores unresolved candidates.” |
| Top-k, repeated min/max extraction | Heap | “A heap gives efficient access to the current best item.” |
| Multi-objective design candidates | Sorting / Pareto frontier | “A candidate is dominated if another is better in all objectives.” |

---

## 5. Big-O Cheat Sheet

| Code shape | Complexity |
|---|---:|
| One loop over `n` | O(n) |
| Two independent loops over `n` | O(n) |
| Nested loop over `n × n` | O(n²) |
| Sorting | O(n log n) |
| Binary search | O(log n) |
| Binary search + linear feasibility check | O(n log R) |
| Hash map lookup/insert average | O(1) |
| BFS/DFS on graph | O(V + E) |
| BFS/DFS on grid | O(rows × cols) |
| DP table with `m × n` states | O(mn) |
| Heap push/pop | O(log n) |
| Backtracking permutations | O(n!) |
| Backtracking subsets | O(2ⁿ) |

Complexity phrases to memorize:

> “Sorting dominates, so the time complexity is O(n log n).”

> “Each element enters and leaves the window at most once, so the time complexity is O(n).”

> “BFS visits each node and edge once, so the complexity is O(V + E).”

> “The DP table has `rows × cols` states and each transition is O(1), so the complexity is O(rows × cols).”

> “The binary search performs O(log R) iterations, and each feasibility check costs O(n), so the total is O(n log R).”

---

## 6. Python Toolkit to Know Cold

```python
from collections import defaultdict, Counter, deque
import heapq
import bisect
from math import inf
```

### Frequency count

```python
from collections import Counter

counts = Counter(items)
```

### Grouping

```python
from collections import defaultdict

groups = defaultdict(list)
for key, value in pairs:
    groups[key].append(value)
```

### Queue for BFS

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

### Heap

```python
import heapq

heap = []
heapq.heappush(heap, value)
smallest = heapq.heappop(heap)
```

### Binary search helper

```python
import bisect

idx = bisect.bisect_left(arr, target)
```

---

## 7. Core Templates

### 7.1 Sliding Window

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

Use when: contiguous subarray/substring with a condition.

---

### 7.2 Merge Intervals

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

Use when: overlapping ranges, schedules, valid regions, time windows.

---

### 7.3 Binary Search

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

Use when: sorted input or monotonic decision space.

---

### 7.4 Binary Search on Answer

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

Use when: “largest possible X”, “minimum feasible X”, “maximize the minimum”, “minimize the maximum”.

---

### 7.5 Grid BFS

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

Use when: connected regions, shortest path, image/blob/grid traversal.

---

### 7.6 DFS for Connected Components

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

Use when: graph connectivity, mesh components, networks.

---

### 7.7 Backtracking

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

Use when: subsets, permutations, combinations, search over choices.

---

### 7.8 1D Prefix Sum

```python
def build_prefix(arr):
    prefix = [0]
    for x in arr:
        prefix.append(prefix[-1] + x)
    return prefix

# sum arr[left:right] where right is exclusive
range_sum = prefix[right] - prefix[left]
```

Use when: repeated subarray sum queries.

---

### 7.9 2D Prefix Sum

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

Use when: matrix region sums, image/blob/shape problems.

---

### 7.10 Maximal Square DP

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

Use when: largest all-1 square in binary matrix.

---

## 8. Six-Day Preparation Plan

Use this as a six-day preparation sprint plus a final warmup block.

---

# Day 1

## Theme

Python speed, arrays, strings, hash maps.

## Goal

Become fast with the most common interview building blocks.

## 8-hour schedule

### Block 1 — 45 min: Python template warmup

Write from memory:

- `Counter`
- `defaultdict(list)`
- `set` for seen values
- dictionary frequency count
- simple loop over list/string

### Block 2 — 2h: easy core problems

Solve:

- [ ] Two Sum
- [ ] Contains Duplicate
- [ ] Valid Anagram
- [ ] Majority Element
- [ ] First Unique Character in a String

### Block 3 — 1h: review

For each problem, write:

- Pattern.
- Complexity.
- Bug made.
- Edge case missed.

### Block 4 — 2h: medium core problems

Solve:

- [ ] Group Anagrams
- [ ] Top K Frequent Elements
- [ ] Product of Array Except Self
- [ ] Longest Consecutive Sequence

### Block 5 — 1h: Applied algorithms drill

**Simulation grouping drill**

Input: list of simulation results.

```python
runs = [
    {"design": "A", "metric": "drag", "value": 0.42},
    {"design": "A", "metric": "mass", "value": 12.5},
    {"design": "B", "metric": "drag", "value": 0.39},
]
```

Task:

- Group metrics by design.
- Filter designs under a maximum mass.
- Return the design with minimum drag.

Patterns:

- dictionary grouping
- filtering
- custom comparison

### Block 6 — 45 min: re-solve one failed problem

Pick the problem that felt least natural and solve it again from scratch.

### Block 7 — 30 min: spoken explanation

Explain one solution out loud:

> “The brute-force approach is...”  
> “The optimized approach uses...”  
> “The complexity is...”

## End-of-day standard

You should solve basic hash-map/string problems in 10–15 minutes.

---

# Day 2

## Theme

Two pointers, sliding window, sorting, intervals.

## Goal

Recognize and solve common contiguous-window and range-overlap problems.

## 8-hour schedule

### Block 1 — 45 min: template warmup

Write from memory:

- two pointers
- sliding window
- merge intervals

### Block 2 — 2h: two pointers and sliding window

Solve:

- [ ] Valid Palindrome
- [ ] Two Sum II
- [ ] Container With Most Water
- [ ] Longest Substring Without Repeating Characters
- [ ] Minimum Size Subarray Sum

### Block 3 — 1h: review

For each problem:

- Why sliding window or two pointers?
- What made the window valid/invalid?
- What was the invariant?

### Block 4 — 2h: intervals

Solve:

- [ ] Merge Intervals
- [ ] Insert Interval
- [ ] Non-overlapping Intervals
- [ ] Meeting Rooms
- [ ] Meeting Rooms II

### Block 5 — 1h: Applied algorithms drill

**Operating range coverage**

Input:

```python
valid_ranges = [(0, 10), (8, 15), (20, 30)]
query = (5, 14)
```

Task:

- Merge valid ranges.
- Determine whether the query range is fully covered.

Patterns:

- sort intervals
- merge
- containment check

### Block 6 — 45 min: re-solve one failed problem

No notes. No hints.

### Block 7 — 30 min: spoken explanation

Explain one interval problem out loud.

## End-of-day standard

You should immediately recognize:

- sorted pair search → two pointers
- contiguous condition → sliding window
- overlapping ranges → sort + merge intervals

---

# Day 3

## Theme

Binary search, prefix sums, grids, matrices.

## Goal

Prepare for engineering/geometry/image-like problems.

## 8-hour schedule

### Block 1 — 45 min: template warmup

Write from memory:

- binary search
- binary search on answer
- 1D prefix sum
- 2D prefix sum
- maximal square DP

### Block 2 — 2h: binary search

Solve:

- [ ] Binary Search
- [ ] Search Insert Position
- [ ] Search in Rotated Sorted Array
- [ ] Find Minimum in Rotated Sorted Array
- [ ] Koko Eating Bananas

### Block 3 — 1h: review

For each problem:

- What was monotonic?
- What did `left`, `right`, and `mid` mean?
- Why did the loop terminate?

### Block 4 — 2h: prefix sums and grids

Solve:

- [ ] Subarray Sum Equals K
- [ ] Range Sum Query — Immutable
- [ ] Range Sum Query 2D
- [ ] Number of Islands
- [ ] Max Area of Island
- [ ] Maximal Square

### Block 5 — 1h: Applied algorithms drill

**Largest feasible square**

Input: binary grid where `1` means feasible design region and `0` means infeasible.

Task:

- Return the side length of the largest all-1 square.

Expected pattern:

- grid DP or 2D prefix sum + binary search on answer

Talk-track:

> “If the grid is moderate, I would use DP. If the grid is huge and many feasibility queries are needed, I would consider 2D prefix sums with binary search.”

### Block 6 — 45 min: re-solve one failed problem

### Block 7 — 30 min: spoken explanation

Explain binary search on answer out loud.

## End-of-day standard

You should be able to say confidently:

> “This is a feasibility problem, so I can binary search the answer if feasibility is monotonic.”

---

# Day 4

## Theme

Graphs, BFS/DFS, recursion, backtracking.

## Goal

Handle connected regions, shortest paths, and search over choices.

## 8-hour schedule

### Block 1 — 45 min: template warmup

Write from memory:

- BFS using `deque`
- DFS recursive
- grid directions
- backtracking skeleton

### Block 2 — 2h: BFS/DFS grids

Solve:

- [ ] Number of Islands — re-solve without notes
- [ ] Max Area of Island — re-solve without notes
- [ ] Rotting Oranges
- [ ] Shortest Path in Binary Matrix
- [ ] Flood Fill

### Block 3 — 1h: review

For each problem:

- Why BFS or DFS?
- What is the visited state?
- What are the neighbors?
- What is the complexity?

### Block 4 — 2h: graph and backtracking

Solve:

- [ ] Clone Graph
- [ ] Course Schedule
- [ ] Subsets
- [ ] Permutations
- [ ] Combination Sum
- [ ] Word Search

### Block 5 — 1h: Applied algorithms drill

**Mesh connected components**

Input:

```python
nodes = [0, 1, 2, 3, 4]
edges = [(0, 1), (1, 2), (3, 4)]
```

Task:

- Build adjacency list.
- Count connected components.
- Return the nodes in each component.

Patterns:

- graph construction
- BFS/DFS
- visited set

### Block 6 — 45 min: re-solve one failed problem

### Block 7 — 30 min: spoken explanation

Explain BFS versus DFS out loud.

## End-of-day standard

You should know:

- BFS → shortest path / minimum steps / layers
- DFS → exploration / components / recursion
- Backtracking → enumerate valid choices

---

# Day 5

## Theme

Dynamic programming, stacks, heaps, Pareto/design-candidate problems.

## Goal

Cover patterns that are less frequent but dangerous if ignored.

## 8-hour schedule

### Block 1 — 45 min: template warmup

Write from memory:

- stack
- heap
- simple DP array
- grid DP
- maximal square

### Block 2 — 2h: basic DP

Solve:

- [ ] Climbing Stairs
- [ ] House Robber
- [ ] Coin Change
- [ ] Longest Increasing Subsequence
- [ ] Longest Common Subsequence

### Block 3 — 1h: review

For each DP problem:

- What is the state?
- What is the recurrence?
- What is the base case?
- What is the final answer?

### Block 4 — 2h: stacks and heaps

Solve:

- [ ] Valid Parentheses
- [ ] Min Stack
- [ ] Daily Temperatures
- [ ] Evaluate Reverse Polish Notation
- [ ] K Closest Points to Origin
- [ ] Top K Frequent Elements — re-solve with heap

### Block 5 — 1h: Applied algorithms drill

**Pareto frontier**

Input:

```python
designs = [
    {"id": "A", "mass": 10, "drag": 0.40, "stress": 100},
    {"id": "B", "mass": 9, "drag": 0.50, "stress": 120},
    {"id": "C", "mass": 11, "drag": 0.35, "stress": 90},
]
```

Task:

- Filter designs with `stress <= max_stress`.
- Return non-dominated designs on mass and drag.

Definition:

A design is dominated if another design is at least as good in all objectives and strictly better in one.

Start with O(n²). Then discuss whether sorting helps for 2D objectives.

### Block 6 — 45 min: re-solve one failed problem

### Block 7 — 30 min: spoken explanation

Explain one DP problem out loud.

## End-of-day standard

You should not fear DP. Even if the optimal solution is hard, you should be able to define states and base cases.

---

# Day 6

## Theme

Full mock interview day.

## Goal

Simulate the real interview. No tutorials first. No AI. No hints before 25 minutes.

## 8-hour schedule

### Block 1 — 45 min: warmup from memory

Write these from memory:

- merge intervals
- sliding window
- binary search
- BFS grid
- backtracking skeleton
- maximal square DP

### Block 2 — 45 min mock #1

Topic: arrays/hash maps/strings.

Rules:

- Talk out loud.
- Use live-coding protocol.
- Test edge cases.
- Explain complexity.

### Block 3 — 45 min mock #2

Topic: intervals/sliding window.

### Block 4 — 45 min mock #3

Topic: binary search or prefix sums.

### Block 5 — 45 min mock #4

Topic: grid/BFS/DFS.

### Block 6 — 45 min mock #5

Topic: DP/backtracking/stack.

### Block 7 — 1h: review all mocks

Create an error log:

| Problem | Pattern missed | Bug | Edge case | Correct idea | Re-solve? |
|---|---|---|---|---|---|

### Block 8 — 1h: re-solve two failed problems

No notes. No hints.

### Block 9 — 1h: Applied algorithms final mock

**Shape from intervals**

Input:

```python
rows = {
    0: [(1, 5)],
    1: [(1, 5)],
    2: [(2, 6)],
    3: [(2, 6)],
}
```

Task:

- Find the largest square that fits entirely inside the filled intervals.

Discussion path:

1. Clarify constraints.
2. If small: convert to grid and use maximal square DP.
3. If large/sparse: consider interval feasibility and binary search on answer.
4. Explain trade-offs.

This is not about memorizing the solution. It is about showing that you can convert an unusual problem into known algorithmic tools.

## End-of-day standard

You should be comfortable doing a 45-minute live coding simulation without panicking.

---

# Final Warmup Day

## Goal

Stay sharp, calm, and structured. Do not exhaust yourself.

## 60–90 minute warmup only

Do not grind hard problems on interview day.

### Warmup checklist

- [ ] Write binary search from memory.
- [ ] Write merge intervals from memory.
- [ ] Write BFS grid from memory.
- [ ] Write sliding window from memory.
- [ ] Solve one easy hash-map problem.
- [ ] Solve one easy/medium interval or grid problem.
- [ ] Review Big-O cheat sheet.
- [ ] Review spoken scripts.

## Mental checklist before the call

> Restate.  
> Example.  
> Brute force.  
> Optimize.  
> Code.  
> Test.  
> Complexity.

## First sentence in the interview

> “I’ll first clarify the problem and work through an example, then I’ll propose a straightforward solution and improve it if needed.”

---

## 9. Must-Solve Problem Stack

Prioritize these before anything else.

### Arrays / hash maps / strings

- [ ] Two Sum
- [ ] Contains Duplicate
- [ ] Valid Anagram
- [ ] Group Anagrams
- [ ] Top K Frequent Elements
- [ ] Product of Array Except Self
- [ ] Longest Consecutive Sequence
- [ ] First Unique Character in a String

### Two pointers / sliding window

- [ ] Valid Palindrome
- [ ] Two Sum II
- [ ] Container With Most Water
- [ ] Longest Substring Without Repeating Characters
- [ ] Minimum Size Subarray Sum

### Intervals

- [ ] Merge Intervals
- [ ] Insert Interval
- [ ] Non-overlapping Intervals
- [ ] Meeting Rooms
- [ ] Meeting Rooms II

### Binary search / prefix sums

- [ ] Binary Search
- [ ] Search Insert Position
- [ ] Search in Rotated Sorted Array
- [ ] Find Minimum in Rotated Sorted Array
- [ ] Koko Eating Bananas
- [ ] Capacity to Ship Packages Within D Days
- [ ] Subarray Sum Equals K
- [ ] Range Sum Query 2D

### Grids / graphs

- [ ] Number of Islands
- [ ] Max Area of Island
- [ ] Flood Fill
- [ ] Rotting Oranges
- [ ] Shortest Path in Binary Matrix
- [ ] Clone Graph
- [ ] Course Schedule

### Backtracking

- [ ] Subsets
- [ ] Permutations
- [ ] Combination Sum
- [ ] Word Search

### DP / stack / heap

- [ ] Climbing Stairs
- [ ] House Robber
- [ ] Coin Change
- [ ] Longest Increasing Subsequence
- [ ] Maximal Square
- [ ] Valid Parentheses
- [ ] Daily Temperatures
- [ ] Evaluate Reverse Polish Notation
- [ ] K Closest Points to Origin

---

## 10. Applied Algorithms Drills

These are custom exercises aligned with engineering data, geometry, grids, and optimization.

### Drill A — Best simulation candidate

Given designs with metrics, return the best feasible design.

Skills:

- hash maps
- filtering
- sorting
- custom comparison

### Drill B — Pareto frontier

Given mass, drag, and stress for each design, return non-dominated candidates.

Skills:

- O(n²) reasoning
- sorting optimization
- multi-objective thinking

### Drill C — Largest feasible square in grid

Given a binary grid, find the largest all-1 square.

Skills:

- grid DP
- 2D prefix sums
- binary search on answer

### Drill D — Shape from intervals

Given row intervals representing a filled shape, find the largest square inside it.

Skills:

- interval reasoning
- grid conversion
- constraints discussion
- DP or feasibility checking

### Drill E — Sensor anomaly windows

Given a time series and threshold, return intervals where the signal is above threshold for at least `k` consecutive samples.

Skills:

- sliding window
- intervals
- edge cases

### Drill F — Mesh connected components

Given nodes and edges, return connected components.

Skills:

- graph construction
- BFS/DFS
- visited set

---

## 11. Problem Review Template

Use this after every problem.

```markdown
## Problem: <name>

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

## 12. Edge Case Checklist

Before saying you are done, test:

- [ ] Empty input.
- [ ] One element.
- [ ] Two elements.
- [ ] Duplicates.
- [ ] Negative values, if relevant.
- [ ] Already sorted input.
- [ ] Reverse sorted input.
- [ ] No valid answer.
- [ ] All values valid.
- [ ] Boundary values.
- [ ] Very small grid.
- [ ] Single row / single column grid.

---

## 13. Common Mistakes to Avoid

### Mistake 1 — Coding too early

Bad:

> “I think I know it, let me code.”

Better:

> “I’ll first define the approach and test it on a small example.”

### Mistake 2 — Going silent

Bad: long silence while thinking.

Better:

> “I’m checking whether this condition is monotonic. If it is, binary search on the answer may work.”

### Mistake 3 — Skipping brute force

Bad: jumping to an optimized idea you cannot explain.

Better:

> “The brute-force solution is O(n²). I think we can improve it using a hash map.”

### Mistake 4 — Ignoring constraints

Bad: proposing O(n²) without asking input size.

Better:

> “If `n` is around 10³, O(n²) may be okay. If it is 10⁵, we need O(n log n) or O(n).”

### Mistake 5 — No tests

Bad:

> “I think this works.”

Better:

> “Let me test the provided example and then test an edge case.”

---

## 14. The Minimum Viable Interview Performance

Even if the problem is hard, you can still perform well if you do this:

1. Restate correctly.
2. Ask useful clarifying questions.
3. Produce a correct brute-force approach.
4. Explain complexity.
5. Identify why it may be too slow.
6. Move toward a better pattern.
7. Code at least a partial clean solution.
8. Test thoughtfully.

If stuck, say:

> “I do not immediately see the optimal version, but I can implement a correct baseline and then discuss how to improve it.”

This is much better than freezing.

---

## 15. Final Interview Mantra

Memorize this:

> “Clarify the problem. Build examples. Start with correctness. Improve with a known pattern. Code cleanly. Test edge cases. Explain complexity.”

And this:

> “I do not need to be perfect. I need to be structured, calm, and technically honest.”

---

## 16. Source Notes

Useful public signals for this roadmap:

- Engineering interview loops commonly include coding, take-home projects, online technical interviews, and assessment days.
- Applied engineering role descriptions often emphasize Python, customer engineering projects, CAD/CAE/manufacturing workflows, machine-learning tools, and technical communication.
- Public candidate feedback for similar roles often mentions Python coding tests, basic list/string/loop tasks, Coderbyte-style questions, time-complexity discussion, backtracking, and geometry/blob-style problems.

Treat public candidate feedback as directional signal, not guaranteed truth.

