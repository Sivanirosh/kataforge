---
id: aa-drill-e-sensor-anomaly
title: "Applied Algorithms Drill E — Sensor Anomaly Windows"
difficulty: medium
estimatedMinutes: 35
functionName: anomaly_windows
tags:
  - sliding-window
  - intervals
  - applied-algorithms
  - day2
starterCode: |
  def anomaly_windows(signal, threshold, k):
      """
      Given a list of sensor readings, return all intervals [start, end]
      (inclusive, 0-indexed) where the signal is above `threshold` for
      at least `k` consecutive samples.
      """
      pass
solutionCode: |
  def anomaly_windows(signal, threshold, k):
      n = len(signal)
      above = [1 if v > threshold else 0 for v in signal]
      result = []
      i = 0

      while i < n:
          if above[i]:
              j = i
              while j < n and above[j]:
                  j += 1
              run_len = j - i
              if run_len >= k:
                  result.append([i, j - 1])
              i = j
          else:
              i += 1

      return result
solutionExplanation: |
  Build a boolean array marking positions where signal > threshold.
  Scan for consecutive runs of 1s. Each run of length >= k is an anomaly
  window. Record the start and end (inclusive) of qualifying runs.

  Time: O(n). Space: O(n) for the boolean array (can be O(1) in-place).

  Edge cases to test:
  - Signal never exceeds threshold.
  - Entire signal is above threshold.
  - Run length exactly equals k (boundary — include it).
  - Run length exactly equals k-1 (boundary — exclude it).
tests:
  - id: aa-de-1
    name: two anomaly windows
    hidden: false
    args:
      - [3, 8, 9, 6, 2, 7, 8]
      - 5
      - 2
    expected: [[1, 3], [5, 6]]
  - id: aa-de-2
    name: no anomaly
    hidden: false
    args:
      - [1, 2, 3, 1, 2]
      - 5
      - 2
    expected: []
  - id: aa-de-3
    name: whole series qualifies
    hidden: true
    args:
      - [6, 7, 8, 9, 10]
      - 5
      - 3
    expected: [[0, 4]]
  - id: aa-de-4
    name: run exactly k
    hidden: true
    args:
      - [1, 6, 7, 1, 1]
      - 5
      - 2
    expected: [[1, 2]]
  - id: aa-de-5
    name: run shorter than k excluded
    hidden: true
    args:
      - [1, 6, 1, 7, 8, 1]
      - 5
      - 2
    expected: [[3, 4]]
---

# Applied Algorithms Drill E — Sensor Anomaly Windows

**Engineering context:** A physical sensor records a time series of readings. An anomaly is a stretch where the sensor reading exceeds a threshold for at least `k` consecutive samples. Your task is to identify all such anomaly windows.

Given a list `signal`, a numeric `threshold`, and an integer `k`, return a list of `[start, end]` index pairs (inclusive, 0-indexed) for every run where `signal[i] > threshold` for at least `k` consecutive positions.

## Examples

```
Input: signal = [3, 8, 9, 6, 2, 7, 8], threshold = 5, k = 2
Output: [[1, 3], [5, 6]]
# indices 1-3: values [8, 9, 6] — all > 5, run length 3 >= 2
# indices 5-6: values [7, 8] — all > 5, run length 2 >= 2

Input: signal = [1, 2, 3, 1, 2], threshold = 5, k = 2
Output: []
```

## Constraints

- `1 <= len(signal) <= 10^5`
- `threshold` is a number.
- `1 <= k <= len(signal)`

## Spoken reasoning

> "This is a sliding window or run-length scan problem. I'll identify contiguous regions above the threshold and filter those with length at least k."
