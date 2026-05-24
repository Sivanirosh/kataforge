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

**UserKata**:
A Kata imported at runtime via JSON and stored in the browser; appears on the hub alongside built-in Katas.
_Avoid_: Custom problem, imported problem

**Cursus**:
An ordered learning path of Modules mixing Lessons and Kata drills; progress is tracked per step, not as a single Assessment score.
_Avoid_: Course, track (use in generic prose only)

**Module**:
A chapter within a Cursus containing an ordered list of Steps.
_Avoid_: Section, unit (ambiguous)

**Step**:
An atomic unit inside a Module; either a Lesson (read) or a Kata reference (code drill).
_Avoid_: Page, slide

**Lesson**:
Read-only markdown content step within a Cursus Module.
_Avoid_: Article, doc

**CursusProgress**:
Persisted completion state for a Cursus (completed steps, last visited step).
_Avoid_: Enrollment, checkpoint

## Resolved design decisions

- Assessments are JSON-defined (variable number of Katas); generic repo ships a single-Kata quick practice.
- The Judge re-executes candidate code for each TestCase (maximum isolation).
- Per-TestCase timeouts: 2000 ms for RunSamples, 3000 ms for Submit; worker is terminated and recreated on timeout.
- Committed UI branding is "KataForge"; ProblemPack overlays may customize locally.
- Cursus routes share the same vanilla CSS design system as assessments and landing (see `global.css`).

## Example dialogue

**Author:** I added a hidden TestCase to the fizzbuzz Kata.

**Dev:** RunSamples will skip it; Submit will run it and show pass/fail only in the TestPanel.

**Author:** If I start practice for Two Sum, is that one kata or a full assessment?

**Dev:** One kata at `/problem/two-sum`. Results and progress use the kata id (`/results/two-sum`). Multi-kata timed assessments live in assessment JSON (e.g. `private/assessments/nc-60min.json`).

**Author:** I generated a kata with ChatGPT — how do I add it?

**Dev:** Paste the JSON on the Practice hub (**Import kata**) to import a **UserKata** (instant, browser-only). For git-tracked content, add Markdown under a **ProblemPack** directory and rebuild.
