---
id: aa-interview-protocol
title: The Live Coding Protocol
---

Master this seven-step protocol and apply it **on every problem, without exception**. Consistency under pressure is the goal.

---

## The Seven Steps

### Step 1 — Restate the problem

Say:

> "Let me first restate the problem to make sure I understood it."

Then clarify:

- Input type and output type.
- Constraints (array length, value range).
- Whether the input is sorted.
- Whether duplicates are possible.
- Whether negative numbers are possible.
- What to return if no solution exists.

---

### Step 2 — Work through examples

Say:

> "Before coding, I'll test the idea on a small example."

Create one normal example and one edge case. Write them down — do not hold them in your head.

---

### Step 3 — Explain brute force

Say:

> "A straightforward solution would be... The complexity would be... It may be acceptable if constraints are small, but if not, we can improve it."

This proves you understand correctness before optimization.

---

### Step 4 — Identify the pattern

Say:

> "This looks like a [hash map / sliding window / interval / graph / DP / binary search] problem because..."

Do not jump straight to implementation. Pattern identification is the critical skill being tested.

---

### Step 5 — Code cleanly

Write readable Python. Prefer clarity over cleverness. Name variables meaningfully. Keep functions short.

---

### Step 6 — Test deliberately

Test in this order:

1. Empty input.
2. One element.
3. Two elements.
4. Duplicates.
5. Boundary cases.
6. Impossible case.
7. Normal case.

---

### Step 7 — Complexity

End with:

> "The time complexity is O(...), and the space complexity is O(...)."

Never skip this step. It signals engineering maturity.

---

## Spoken Scripts

Use these when you need them. Never go silent.

**Opening:**

> "I'll first clarify the input and output, then try a simple example, propose a brute-force approach, and optimize from there."

**When you recognize a pattern:**

> "This looks like a sliding-window problem because we are looking for a contiguous segment with a condition."

> "This looks like an interval problem because we need to reason about overlapping ranges."

> "This looks like binary search on the answer because if a candidate value is feasible, then smaller values are also feasible."

> "This looks like BFS because we need the minimum number of steps in an unweighted graph or grid."

**When stuck:**

> "Let me step back and test the logic on a smaller example."

> "I do not immediately see the optimal solution, but I can start with a correct brute-force version and then improve it."

**Before coding:**

> "I think the algorithm is clear now. I'll implement the clean version first, then test edge cases."

**After coding:**

> "Let me walk through the code with the example."

**Closing:**

> "The time complexity is..., and the space complexity is... The main trade-off is..."

---

## Edge Case Checklist

Before saying you are done, verify:

- [ ] Empty input.
- [ ] One element.
- [ ] Two elements.
- [ ] Duplicates.
- [ ] Negative values, if relevant.
- [ ] Already sorted input.
- [ ] Reverse sorted input.
- [ ] No valid answer.
- [ ] All values valid.
- [ ] Boundary values.
- [ ] Very small grid.
- [ ] Single row or single column grid.

---

## Common Mistakes

**Coding too early.**
Do not say "I think I know it, let me code." Instead: "I'll first define the approach and test it on a small example."

**Going silent.**
Long silence looks bad. Narrate your reasoning even when thinking.

**Skipping brute force.**
Always say "The brute-force solution is O(n²)..." before jumping to the optimal approach.

**Ignoring constraints.**
Ask for input size. It determines whether O(n²) is acceptable.

**No tests.**
Always test the provided example and then one edge case.

---

## Minimum Viable Interview Performance

Even if the problem is hard, you pass if you do this:

1. Restate correctly.
2. Ask useful clarifying questions.
3. Produce a correct brute-force approach.
4. Explain complexity.
5. Identify why it may be too slow.
6. Move toward a better pattern.
7. Code at least a partial clean solution.
8. Test thoughtfully.

If stuck, say:

> "I do not immediately see the optimal version, but I can implement a correct baseline and then discuss how to improve it."

---

## Protocol in Action: Two Sum

Use this as the target rhythm for an easy problem:

1. Restate: "Given numbers and a target, return indices of two values that sum to target."
2. Clarify: "Can I assume exactly one answer? May I use the same element twice? Does index order matter?"
3. Example: `[2, 7, 11, 15]`, target `9`, output `[0, 1]`.
4. Brute force: "Check every pair, O(n²) time, O(1) space."
5. Pattern: "I can store previously seen values in a map from value to index."
6. Code: scan once, compute `need = target - x`, check `need in seen`, then store current value.
7. Test: first pair, later pair, duplicate values like `[3, 3]`, no mutation of input.

The important part is not Two Sum. The important part is that every problem gets this same visible structure.

## What the Interviewer Should Hear

Good narration is short and technical:

- "I am using a dictionary because lookup is the repeated operation."
- "The invariant is that `seen` contains only indices before the current index."
- "This avoids using the same element twice."
- "The loop is O(n); dictionary storage is O(n)."

Avoid vague narration:

- "I think this should work."
- "I saw this before."
- "Let me just code it."

## Hint Handling

If the interviewer nudges you, do not defend the old approach. Convert the hint into a decision:

> "That hint makes me think the sorted order matters. I will check whether a two-pointer invariant applies."

> "That suggests repeated range queries, so a prefix sum may remove repeated work."

> "If all edges have equal cost, BFS is safer than DFS for shortest path."

## Protocol Failure Modes

Watch for these and self-correct immediately:

- You start coding before defining output shape.
- You optimize without knowing constraints.
- You cannot explain why the chosen pattern is correct.
- You pass the sample but skip edge cases.
- You describe complexity without naming the input variable.
