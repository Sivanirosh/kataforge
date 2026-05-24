# KataForge

A local coding-kata practice environment where problems are authored as Markdown and solutions run in the browser.

## Language

**Kata**:
A single coding problem with a prompt, starter code, and test cases.
_Avoid_: Problem, challenge, exercise (use only in generic prose)

**Assessment**:
A timed or untimed session grouping one or more Katas in a defined order.
_Avoid_: Exam, quiz, contest

**TestCase**:
One invocation of the candidate function with arguments, an expected result, and a hidden flag.
_Avoid_: Test, case (ambiguous without qualifier)

**RunSamples**:
Execute only visible TestCases and show full pass/fail details including expected vs actual.
_Avoid_: Run tests, run code

**Submit**:
Execute all TestCases including hidden ones; show pass/fail only for hidden TestCases.
_Avoid_: Final submit, grade

**Judge**:
The execution engine that runs candidate code against TestCases and returns structured results.
_Avoid_: Runner, executor, sandbox (too implementation-specific)

**Draft**:
Persisted editor state for a Kata, restored when navigating back to that Kata.
_Avoid_: Autosave, cache

**ProblemPack**:
A local overlay of Katas and Assessments outside the public repository (see CONTEXT-MAP.md).
_Avoid_: Plugin, extension

## Resolved design decisions

- Assessments are JSON-defined (variable number of Katas); generic repo ships a single-Kata quick practice.
- The Judge re-executes candidate code for each TestCase (maximum isolation).
- Per-TestCase timeouts: 2000 ms for RunSamples, 3000 ms for Submit; worker is terminated and recreated on timeout.
- Committed UI branding is "KataForge"; ProblemPack overlays may customize locally.

## Example dialogue

**Author:** I added a hidden TestCase to the fizzbuzz Kata.

**Dev:** RunSamples will skip it; Submit will run it and show pass/fail only in the TestPanel.

**Author:** If I start the quick-practice Assessment, is that one Kata or four?

**Dev:** One. The four-Kata timed Assessment lives in your private ProblemPack config, not in the generic repo.
