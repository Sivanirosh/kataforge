---
id: aa-drill-b-pareto
title: "Applied Algorithms Drill B — Pareto Frontier"
difficulty: medium
estimatedMinutes: 40
functionName: pareto_frontier
tags:
  - sorting
  - multi-objective
  - applied-algorithms
  - day5
starterCode: |
  def pareto_frontier(designs, max_stress):
      """
      designs: list of {"id": str, "mass": float, "drag": float, "stress": float}
      max_stress: filter threshold (inclusive)
      Return sorted list of IDs of non-dominated designs on mass and drag
      (both lower = better), among those with stress <= max_stress.
      A design is dominated if another feasible design is <= in both objectives
      and strictly < in at least one.
      """
      pass
solutionCode: |
  def pareto_frontier(designs, max_stress):
      feasible = [d for d in designs if d["stress"] <= max_stress]
      pareto = []

      for candidate in feasible:
          dominated = False
          for other in feasible:
              if other["id"] == candidate["id"]:
                  continue
              if (other["mass"] <= candidate["mass"] and other["drag"] <= candidate["drag"] and
                  (other["mass"] < candidate["mass"] or other["drag"] < candidate["drag"])):
                  dominated = True
                  break
          if not dominated:
              pareto.append(candidate["id"])

      return sorted(pareto)
solutionExplanation: |
  Step 1: Filter designs with stress <= max_stress.
  Step 2: For each feasible design, check if any other feasible design dominates it.
    Domination: other is at least as good in BOTH mass and drag, and strictly
    better in at least one.
  Step 3: Return IDs of non-dominated designs, sorted.

  O(n²) approach — start with this, then discuss the O(n log n) sort-based
  improvement for 2D objectives.

  For 2D Pareto front after sorting by mass: a design is non-dominated if no
  earlier design (lower mass) has also lower drag. This reduces to a single pass.

  Time: O(n²) naive. O(n log n) with sort. Space: O(n).
tests:
  - id: aa-dpf-1
    name: B dominated by A
    hidden: false
    args:
      - [{"id": "A", "mass": 9, "drag": 0.40, "stress": 100}, {"id": "B", "mass": 10, "drag": 0.50, "stress": 120}, {"id": "C", "mass": 11, "drag": 0.35, "stress": 90}]
      - 130
    expected: ["A", "C"]
  - id: aa-dpf-2
    name: stress filter leaves two non-dominated
    hidden: false
    args:
      - [{"id": "A", "mass": 10, "drag": 0.40, "stress": 100}, {"id": "B", "mass": 9, "drag": 0.50, "stress": 90}, {"id": "C", "mass": 11, "drag": 0.35, "stress": 80}]
      - 95
    expected: ["B", "C"]
  - id: aa-dpf-3
    name: one design dominates all
    hidden: true
    args:
      - [{"id": "A", "mass": 5, "drag": 0.30, "stress": 50}, {"id": "B", "mass": 10, "drag": 0.60, "stress": 100}, {"id": "C", "mass": 8, "drag": 0.50, "stress": 70}]
      - 200
    expected: ["A"]
  - id: aa-dpf-4
    name: all on pareto front
    hidden: true
    args:
      - [{"id": "A", "mass": 5, "drag": 0.60, "stress": 50}, {"id": "B", "mass": 7, "drag": 0.40, "stress": 70}, {"id": "C", "mass": 9, "drag": 0.20, "stress": 90}]
      - 200
    expected: ["A", "B", "C"]
---

# Applied Algorithms Drill B — Pareto Frontier

**Engineering context:** In multi-objective design optimization, a design is on the Pareto frontier if no other design is better in all objectives simultaneously. Non-dominated designs represent the optimal trade-off candidates.

Given a list of `designs` with `mass`, `drag`, and `stress` attributes, and a `max_stress` filter, return the IDs of non-dominated designs on the `mass` and `drag` objectives (both lower = better).

Design A **dominates** design B if:
- A.mass ≤ B.mass AND A.drag ≤ B.drag
- AND at least one is strictly less

## Examples

```
# After filtering stress <= 130:
# A: mass=9, drag=0.40  B: mass=10, drag=0.50  C: mass=11, drag=0.35
# Does A dominate B? A.mass=9 < 10, A.drag=0.40 < 0.50 → yes, B is dominated
# Does A dominate C? A.mass=9 < 11 (A better), A.drag=0.40 > 0.35 (C better) → no
# Pareto: [A, C]
```

## Spoken reasoning

> "Start with O(n²): for each design, check if any other dominates it. Then discuss the O(n log n) single-pass approach: sort by mass ascending, then scan and keep designs with decreasing drag."
