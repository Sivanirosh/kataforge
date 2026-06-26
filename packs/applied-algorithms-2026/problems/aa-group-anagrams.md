---
id: aa-group-anagrams
title: Group Anagrams
difficulty: easy-medium
estimatedMinutes: 20
functionName: group_anagrams
tags:
  - strings
  - hash-map
  - day1
starterCode: |
  def group_anagrams(strs):
      pass
solutionCode: |
  from collections import defaultdict

  def group_anagrams(strs):
      groups = defaultdict(list)
      for s in strs:
          key = tuple(sorted(s))
          groups[key].append(s)
      result = [sorted(g) for g in groups.values()]
      result.sort(key=lambda g: g[0])
      return result
solutionExplanation: |
  Canonical key: sort each string to get its anagram signature.
  All strings with the same sorted form belong to the same group.

  Return format (required for deterministic test comparison):
  - Sort each group alphabetically.
  - Sort the list of groups by the first element of each group.

  Time: O(n * k log k) where k is the max string length.
  Space: O(n * k) for the groups dict.
tests:
  - id: aa-ga-1
    name: three groups
    hidden: false
    args:
      - ["eat", "tea", "tan", "ate", "nat", "bat"]
    expected: [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]
  - id: aa-ga-2
    name: no anagram pairs
    hidden: false
    args:
      - ["abc", "def", "ghi"]
    expected: [["abc"], ["def"], ["ghi"]]
  - id: aa-ga-3
    name: single string
    hidden: true
    args:
      - ["a"]
    expected: [["a"]]
  - id: aa-ga-4
    name: all in one group
    hidden: true
    args:
      - ["ab", "ba", "ab"]
    expected: [["ab", "ab", "ba"]]
  - id: aa-ga-5
    name: empty string
    hidden: true
    args:
      - [""]
    expected: [[""]]
---

# Group Anagrams

Given an array of strings `strs`, group the anagrams together.

**Return format:** Sort each group alphabetically, then sort the groups by their first element. This ensures a deterministic, testable output.

## Examples

```
Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]
```

## Constraints

- `1 <= len(strs) <= 10^4`
- `0 <= len(strs[i]) <= 100`
- `strs[i]` consists of lowercase English letters.

## Pattern

Sort each string to produce its canonical "anagram key" and group by that key using `defaultdict(list)`.
