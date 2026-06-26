---
id: aa-k-closest-points
title: K Closest Points to Origin
difficulty: easy-medium
estimatedMinutes: 20
functionName: k_closest
tags:
  - heap
  - sorting
  - day5
starterCode: |
  def k_closest(points, k):
      pass
solutionCode: |
  import heapq

  def k_closest(points, k):
      heap = []
      for x, y in points:
          dist2 = x * x + y * y
          heapq.heappush(heap, (dist2, x, y))
      result = []
      for _ in range(k):
          _, x, y = heapq.heappop(heap)
          result.append([x, y])
      result.sort()
      return result
solutionExplanation: |
  Push all points into a min-heap keyed by squared distance (avoid sqrt).
  Pop k times to get the k closest.

  Return format: sort the result by (x, y) for deterministic comparison.

  Time: O(n log n) using a heap. Alternative: O(n log k) using a max-heap
  of size k (pop the largest when heap exceeds k).

  Space: O(n) for the heap.
tests:
  - id: aa-kcp-1
    name: k equals 1
    hidden: false
    args:
      - [[1,3],[-2,2]]
      - 1
    expected: [[-2,2]]
  - id: aa-kcp-2
    name: k equals 2
    hidden: false
    args:
      - [[3,3],[5,-1],[-2,4]]
      - 2
    expected: [[-2,4],[3,3]]
  - id: aa-kcp-3
    name: all points k equals n
    hidden: true
    args:
      - [[0,0],[1,0],[0,1]]
      - 3
    expected: [[0,0],[0,1],[1,0]]
  - id: aa-kcp-4
    name: origin included
    hidden: true
    args:
      - [[1,1],[2,2],[3,3],[0,0]]
      - 1
    expected: [[0,0]]
---

# K Closest Points to Origin

Given an array of 2D points and an integer `k`, return the `k` closest points to the origin `(0, 0)`. Distance uses the Euclidean formula.

**Return format:** Sort the result by `(x, y)` for deterministic comparison. The test cases have no distance ties.

## Examples

```
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]    # distance² of [-2,2] = 4+4 = 8 < 1+9 = 10

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[-2,4],[3,3]]
# [3,3]: 18, [5,-1]: 26, [-2,4]: 20 → take 18 and 20
```

## Constraints

- `1 <= k <= len(points) <= 10^4`
- No distance ties in test cases.

## Pattern

Min-heap (or sort). Heap avoids sorting the full array when `k << n`. Always compare squared distances to avoid floating-point arithmetic.
