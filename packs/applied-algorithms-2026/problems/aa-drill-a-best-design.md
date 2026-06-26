---
id: aa-drill-a-best-design
title: "Applied Algorithms Drill A — Best Simulation Candidate"
difficulty: easy-medium
estimatedMinutes: 30
functionName: best_design
tags:
  - hash-map
  - filtering
  - applied-algorithms
  - day5
starterCode: |
  def best_design(runs, max_mass):
      """
      runs: list of {"design": str, "metric": str, "value": float}
      Each design has exactly two runs: one for "drag" and one for "mass".
      Return the id (str) of the design with minimum drag among designs
      whose mass <= max_mass. Return None if no design qualifies.
      """
      pass
solutionCode: |
  from collections import defaultdict

  def best_design(runs, max_mass):
      metrics = defaultdict(dict)
      for run in runs:
          metrics[run["design"]][run["metric"]] = run["value"]

      best = None
      best_drag = float('inf')

      for design, m in metrics.items():
          mass = m.get("mass", float('inf'))
          drag = m.get("drag", float('inf'))
          if mass <= max_mass and drag < best_drag:
              best_drag = drag
              best = design

      return best
solutionExplanation: |
  Step 1: Group runs by design and build a dict of metrics for each design.
  Step 2: Filter designs where mass <= max_mass.
  Step 3: Among feasible designs, return the one with minimum drag.

  Patterns: defaultdict grouping, filtering, argmin.

  Time: O(n) where n = number of runs. Space: O(k) where k = number of designs.
tests:
  - id: aa-dad-1
    name: B has better drag and qualifies
    hidden: false
    args:
      - [{"design": "A", "metric": "drag", "value": 0.42}, {"design": "A", "metric": "mass", "value": 12.5}, {"design": "B", "metric": "drag", "value": 0.39}, {"design": "B", "metric": "mass", "value": 8.0}]
      - 15.0
    expected: "B"
  - id: aa-dad-2
    name: mass filter removes best drag
    hidden: false
    args:
      - [{"design": "A", "metric": "drag", "value": 0.42}, {"design": "A", "metric": "mass", "value": 5.0}, {"design": "B", "metric": "drag", "value": 0.39}, {"design": "B", "metric": "mass", "value": 20.0}]
      - 10.0
    expected: "A"
  - id: aa-dad-3
    name: single design qualifies
    hidden: true
    args:
      - [{"design": "X", "metric": "drag", "value": 0.5}, {"design": "X", "metric": "mass", "value": 3.0}]
      - 5.0
    expected: "X"
  - id: aa-dad-4
    name: no design qualifies
    hidden: true
    args:
      - [{"design": "A", "metric": "drag", "value": 0.4}, {"design": "A", "metric": "mass", "value": 20.0}]
      - 10.0
    expected: null
---

# Applied Algorithms Drill A — Best Simulation Candidate

**Engineering context:** A simulation tool produces runs for multiple designs. Each run records one metric (drag or mass) for a given design. You need to find the best feasible design.

Given a list of simulation `runs` and a `max_mass` constraint, return the design ID with the **minimum drag** among designs whose mass is within the constraint. Return `None` if no design qualifies.

## Examples

```python
runs = [
    {"design": "A", "metric": "drag", "value": 0.42},
    {"design": "A", "metric": "mass", "value": 12.5},
    {"design": "B", "metric": "drag", "value": 0.39},
    {"design": "B", "metric": "mass", "value": 8.0},
]
best_design(runs, max_mass=15.0)  # → "B"
```

## Patterns

- `defaultdict` grouping by design ID
- Filtering on mass constraint
- Argmin over drag among feasible designs

## Spoken reasoning

> "I'll group the runs by design, extract the mass and drag for each, filter those within the mass limit, then return the one with minimum drag."
