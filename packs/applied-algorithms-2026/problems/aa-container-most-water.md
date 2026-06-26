---
id: aa-container-most-water
title: Container With Most Water
difficulty: easy-medium
estimatedMinutes: 20
functionName: max_area
tags:
  - arrays
  - two-pointers
  - day2
starterCode: |
  def max_area(height):
      pass
solutionCode: |
  def max_area(height):
      left, right = 0, len(height) - 1
      best = 0
      while left < right:
          area = min(height[left], height[right]) * (right - left)
          best = max(best, area)
          if height[left] < height[right]:
              left += 1
          else:
              right -= 1
      return best
solutionExplanation: |
  Two pointers start at the widest possible container. At each step, the
  area is limited by the shorter wall. Shrinking the wider wall can only
  make things worse (narrower AND same or shorter). So we always shrink
  the shorter wall — it is the only side that could possibly give a
  larger area.

  Time: O(n). Space: O(1).

  The greedy argument is what interviewers test: can you justify why
  moving the shorter wall is always correct?
tests:
  - id: aa-cmw-1
    name: classic example
    hidden: false
    args:
      - [1, 8, 6, 2, 5, 4, 8, 3, 7]
    expected: 49
  - id: aa-cmw-2
    name: two elements
    hidden: false
    args:
      - [1, 1]
    expected: 1
  - id: aa-cmw-3
    name: same height walls
    hidden: true
    args:
      - [3, 3, 3, 3]
    expected: 9
  - id: aa-cmw-4
    name: ascending heights
    hidden: true
    args:
      - [1, 2, 3, 4, 5]
    expected: 6
  - id: aa-cmw-5
    name: large walls at edges
    hidden: true
    args:
      - [4, 3, 2, 1, 4]
    expected: 16
---

# Container With Most Water

You have `n` vertical lines on an x-axis at positions `0` to `n-1`. The height of line `i` is `height[i]`. Choose two lines that together with the x-axis form a container that holds the most water.

Return the maximum amount of water the container can store.

## Examples

```
Input: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49    # lines at index 1 (h=8) and index 8 (h=7): min(8,7) * 7 = 49

Input: height = [1, 1]
Output: 1
```

## Constraints

- `2 <= len(height) <= 10^5`
- `0 <= height[i] <= 10^4`

## Pattern

Two pointers. The key invariant: always move the pointer at the shorter wall. Any other move is guaranteed not to improve the area.
