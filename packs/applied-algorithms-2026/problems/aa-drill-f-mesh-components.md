---
id: aa-drill-f-mesh-components
title: "Applied Algorithms Drill F — Mesh Connected Components"
difficulty: easy-medium
estimatedMinutes: 30
functionName: mesh_components
tags:
  - graphs
  - bfs
  - applied-algorithms
  - day4
starterCode: |
  def mesh_components(nodes, edges):
      """
      nodes: list of node ids (ints)
      edges: list of [u, v] pairs (undirected)
      Return a sorted list of components. Each component is a sorted list
      of node ids. The list of components is sorted by its first element.
      """
      pass
solutionCode: |
  from collections import deque, defaultdict

  def mesh_components(nodes, edges):
      adj = defaultdict(list)
      for u, v in edges:
          adj[u].append(v)
          adj[v].append(u)

      seen = set()
      components = []

      for node in sorted(nodes):
          if node not in seen:
              component = []
              queue = deque([node])
              seen.add(node)
              while queue:
                  n = queue.popleft()
                  component.append(n)
                  for nei in adj[n]:
                      if nei not in seen:
                          seen.add(nei)
                          queue.append(nei)
              components.append(sorted(component))

      components.sort(key=lambda c: c[0])
      return components
solutionExplanation: |
  Build an undirected adjacency list from the edge list. Then run BFS
  from every unvisited node. Each BFS call explores one connected component.

  Engineering context: in mesh simulation, nodes are mesh cells and edges
  are shared faces/edges. Connected components are isolated mesh regions.

  Return format: each component sorted, components sorted by first element.

  Time: O((V + E) log V) for sorted traversal. Space: O(V + E).
tests:
  - id: aa-dff-1
    name: two components
    hidden: false
    args:
      - [0, 1, 2, 3, 4]
      - [[0,1],[1,2],[3,4]]
    expected: [[0,1,2],[3,4]]
  - id: aa-dff-2
    name: fully connected
    hidden: false
    args:
      - [0, 1, 2]
      - [[0,1],[1,2],[0,2]]
    expected: [[0,1,2]]
  - id: aa-dff-3
    name: all isolated nodes
    hidden: true
    args:
      - [0, 1, 2]
      - []
    expected: [[0],[1],[2]]
  - id: aa-dff-4
    name: single node
    hidden: true
    args:
      - [0]
      - []
    expected: [[0]]
  - id: aa-dff-5
    name: three separate pairs
    hidden: true
    args:
      - [0, 1, 2, 3, 4, 5]
      - [[0,1],[2,3],[4,5]]
    expected: [[0,1],[2,3],[4,5]]
---

# Applied Algorithms Drill F — Mesh Connected Components

**Engineering context:** In a finite element mesh, nodes represent vertices and edges represent structural connections. Isolated mesh regions (connected components) may indicate disconnected geometry that needs merging before simulation.

Given a list of `nodes` and `edges` (undirected), return the connected components as a sorted list of sorted node lists.

## Examples

```
Input: nodes = [0, 1, 2, 3, 4], edges = [[0,1],[1,2],[3,4]]
Output: [[0,1,2],[3,4]]

Input: nodes = [0, 1, 2], edges = []
Output: [[0],[1],[2]]    # all isolated
```

## Constraints

- `1 <= len(nodes) <= 1000`
- No self-loops or duplicate edges.

## Spoken reasoning

> "Build an adjacency list from the edge list. Run BFS from every unvisited node. Each BFS call discovers one connected component."
