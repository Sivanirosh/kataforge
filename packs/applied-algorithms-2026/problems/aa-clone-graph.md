---
id: aa-clone-graph
title: Clone Graph
difficulty: medium
estimatedMinutes: 25
functionName: clone_graph
tags:
  - graphs
  - bfs
  - day4
starterCode: |
  def clone_graph(adj):
      """
      adj: dict mapping node_id (int) to sorted list of neighbor ids.
      Return a deep copy as a new dict with the same structure.
      Neighbor lists in the result must be sorted.
      """
      pass
solutionCode: |
  from collections import deque

  def clone_graph(adj):
      if not adj:
          return {}
      cloned = {}
      start = min(adj.keys())
      queue = deque([start])

      while queue:
          node = queue.popleft()
          if node in cloned:
              continue
          cloned[node] = sorted(adj.get(node, []))
          for nei in adj.get(node, []):
              if nei not in cloned:
                  queue.append(nei)

      return cloned
solutionExplanation: |
  BFS from any starting node. For each unvisited node, create its clone
  (copy the sorted neighbor list). This demonstrates BFS-based graph
  traversal and the "visited" pattern.

  In the real LeetCode version, the graph uses Node objects with a `val`
  and `neighbors` list. The adjacency list representation used here
  captures the same algorithmic skill.

  Time: O(V + E). Space: O(V).
tests:
  - id: aa-cg-1
    name: four-node cycle
    hidden: false
    args:
      - {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [1, 3]}
    expected: {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [1, 3]}
  - id: aa-cg-2
    name: single node
    hidden: true
    args:
      - {1: []}
    expected: {1: []}
  - id: aa-cg-3
    name: two-node edge
    hidden: true
    args:
      - {1: [2], 2: [1]}
    expected: {1: [2], 2: [1]}
  - id: aa-cg-4
    name: linear chain
    hidden: true
    args:
      - {1: [2], 2: [1, 3], 3: [2]}
    expected: {1: [2], 2: [1, 3], 3: [2]}
---

# Clone Graph

Given a graph represented as an adjacency dict `adj` (mapping node id → sorted list of neighbor ids), return a **deep copy** of the graph as a new dict with the same structure.

The result must have neighbor lists sorted in ascending order.

## Examples

```
Input: adj = {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [1, 3]}
Output: {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [1, 3]}
# Same structure, new object
```

## Constraints

- Node IDs are positive integers.
- The graph is connected.

## Pattern

BFS traversal of the graph. Use a "cloned" dict as the visited set — if a node is in cloned, skip it. This is the standard LeetCode clone-graph traversal pattern, adapted for adjacency lists.
