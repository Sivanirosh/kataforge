---
id: aa-cp-course-schedule
title: Self-check — Course Schedule
attachedKataId: aa-course-schedule
questions:
  - id: q1
    prompt: >-
      Course Schedule is phrased as planning prerequisites. What graph condition
      are you actually testing?
    choices:
      - id: a
        text: Whether the directed prerequisite graph has a cycle
      - id: b
        text: Whether the graph is connected
      - id: c
        text: Whether every course has exactly one prerequisite
      - id: d
        text: Whether the graph has the shortest path from course 0
    correctChoiceId: a
    explanation: >-
      A cycle means a course eventually depends on itself, so no valid ordering
      exists. If the directed graph is acyclic, a topological order gives a
      feasible course plan.
  - id: q2
    prompt: 'Using Kahn''s algorithm, what observable signal tells you a cycle remained?'
    choices:
      - id: a
        text: The queue empties before you process all courses
      - id: b
        text: The first course has no outgoing edges
      - id: c
        text: Two courses have the same in-degree
      - id: d
        text: The adjacency list is longer than the course count
    correctChoiceId: a
    explanation: >-
      Kahn starts with zero-in-degree nodes and removes them. In a cycle, every
      remaining node still depends on another remaining node, so no new
      zero-in-degree node appears and the processed count is too small.
reflections: []
---

