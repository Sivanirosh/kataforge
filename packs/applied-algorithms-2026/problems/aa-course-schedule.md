---
id: aa-course-schedule
title: Course Schedule
difficulty: medium
estimatedMinutes: 25
functionName: can_finish
tags:
  - graphs
  - topological-sort
  - cycle-detection
  - day4
starterCode: |
  def can_finish(num_courses, prerequisites):
      pass
solutionCode: |
  from collections import deque

  def can_finish(num_courses, prerequisites):
      adj = [[] for _ in range(num_courses)]
      in_degree = [0] * num_courses

      for a, b in prerequisites:
          adj[b].append(a)
          in_degree[a] += 1

      queue = deque(c for c in range(num_courses) if in_degree[c] == 0)
      finished = 0

      while queue:
          node = queue.popleft()
          finished += 1
          for nei in adj[node]:
              in_degree[nei] -= 1
              if in_degree[nei] == 0:
                  queue.append(nei)

      return finished == num_courses
solutionExplanation: |
  Topological sort using Kahn's algorithm (BFS with in-degree tracking).

  If all courses can be completed (finished == num_courses), no cycle exists.
  A cycle means some courses always have an unsatisfied prerequisite and
  their in-degree never reaches 0.

  Alternative: DFS cycle detection with WHITE/GRAY/BLACK coloring.
  Kahn's is usually cleaner and easier to reason about.

  Time: O(V + E). Space: O(V + E).
tests:
  - id: aa-csch-1
    name: can finish
    hidden: false
    args:
      - 2
      - [[1, 0]]
    expected: true
  - id: aa-csch-2
    name: cycle prevents finish
    hidden: false
    args:
      - 2
      - [[1, 0], [0, 1]]
    expected: false
  - id: aa-csch-3
    name: no prerequisites
    hidden: true
    args:
      - 3
      - []
    expected: true
  - id: aa-csch-4
    name: longer cycle
    hidden: true
    args:
      - 4
      - [[1,0],[2,1],[3,2],[1,3]]
    expected: false
  - id: aa-csch-5
    name: complex no cycle
    hidden: true
    args:
      - 5
      - [[1,0],[2,0],[3,1],[4,3]]
    expected: true
---

# Course Schedule

There are `num_courses` courses labeled `0` to `num_courses-1`. `prerequisites[i] = [a, b]` means you must take course `b` before course `a`.

Return `True` if it is possible to finish all courses, `False` if there is a cycle.

## Examples

```
Input: num_courses = 2, prerequisites = [[1, 0]]
Output: True    # take 0 then 1

Input: num_courses = 2, prerequisites = [[1, 0], [0, 1]]
Output: False   # circular dependency
```

## Constraints

- `1 <= num_courses <= 2000`
- `0 <= len(prerequisites) <= 5000`

## Pattern

Cycle detection in a directed graph. Kahn's topological sort: courses with in-degree 0 can be taken immediately. If all courses are processed, no cycle.
