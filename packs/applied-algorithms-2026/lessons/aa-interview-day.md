---
id: aa-interview-day
title: Interview Day — Stay Sharp and Structured
---

**Goal:** Stay sharp, calm, and structured. Do not exhaust yourself.

Do a **60–90 minute warmup only**. Do not grind hard problems on interview day.

---

## Warmup Checklist

- [ ] Write binary search from memory.
- [ ] Write merge intervals from memory.
- [ ] Write BFS grid from memory.
- [ ] Write sliding window from memory.
- [ ] Solve one easy hash-map problem.
- [ ] Solve one easy or medium interval or grid problem.
- [ ] Review the Big-O cheat sheet.
- [ ] Review the spoken scripts.

---

## Mental Checklist Before the Call

> Restate.
> Example.
> Brute force.
> Optimize.
> Code.
> Test.
> Complexity.

Print this out or write it on paper. Glance at it if you go blank.

---

## First Sentence in the Interview

Memorize this and say it at the start:

> "I'll first clarify the problem and work through an example, then I'll propose a straightforward solution and improve it if needed."

This sentence is your anchor. It resets your mindset and signals structure to the interviewer.

---

## If You Get Stuck

Use one of these:

> "Let me step back and test the logic on a smaller example."

> "I do not immediately see the optimal version, but I can implement a correct baseline and then discuss how to improve it."

> "I'm checking whether this condition is monotonic. If it is, binary search on the answer may work."

Do not go silent. Even "I'm thinking about X because..." is better than silence.

---

## The Final Mantra

> "Clarify the problem. Build examples. Start with correctness. Improve with a known pattern. Code cleanly. Test edge cases. Explain complexity."

And:

> "I do not need to be perfect. I need to be structured, calm, and technically honest."

---

## 90-Minute Interview-Day Plan

Use this exact sequence and then stop:

| Time | Action |
|---|---|
| 0-10 min | Write the seven-step protocol from memory. |
| 10-25 min | Write binary search, BFS grid, and merge intervals templates. |
| 25-45 min | Solve one easy hash-map kata without notes. |
| 45-70 min | Solve one medium from your weakest pattern. |
| 70-80 min | Review common edge cases and Big-O phrases. |
| 80-90 min | Walk away, reset, and do no more coding. |

The goal is readiness, not exhaustion.

## During the Call

Keep this loop active:

1. Restate before coding.
2. Ask about constraints before optimizing.
3. Narrate the invariant or state definition.
4. Code in small, testable chunks.
5. Run the sample mentally before claiming done.
6. Give complexity in terms of the input variables.

If the interviewer gives a hint, acknowledge it and integrate it:

> "That suggests the sorted order is important. I will revisit whether two pointers fits better than a hash map here."

## Recovery Scripts

When you hit a bug:

> "The structure is right, so I am going to inspect the boundary update and run it on the smallest failing example."

When you chose the wrong pattern:

> "The condition is not actually contiguous, so sliding window is not safe. I am switching to prefix sums/hash map because it preserves the needed history."

When time is short:

> "I will finish the correct baseline first, then describe the optimization path clearly."
