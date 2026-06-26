---
id: aa-cp-clone-graph
title: Self-check — Clone Graph
attachedKataId: aa-clone-graph
questions:
  - id: q1
    prompt: >-
      In Clone Graph, why is the original-node-to-clone map not just an
      optimization?
    choices:
      - id: a
        text: >-
          It preserves object identity and stops cycles from recursively cloning
          forever
      - id: b
        text: It sorts neighbors so the cloned graph is deterministic
      - id: c
        text: It converts the graph into an adjacency matrix
      - id: d
        text: It lets you avoid copying neighbors at all
    correctChoiceId: a
    explanation: >-
      A graph may revisit the same node through multiple paths or cycles. The
      map says: if this original node was already cloned, reuse that clone.
      Without it you duplicate shared nodes and can recurse forever on cycles.
reflections: []
---

