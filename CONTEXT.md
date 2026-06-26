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
A local overlay of authored practice content outside the public repository, such as Katas, Assessments, Lessons, and Checkpoints.
_Avoid_: Plugin, extension

**UserKata**:
A Kata imported at runtime via JSON and stored in the browser; appears on the hub alongside built-in Katas.
_Avoid_: Custom problem, imported problem

**Cursus**:
An ordered learning path of Modules mixing Lessons, Checkpoints, and Kata drills; progress is tracked per Step, not as a single Assessment score.
_Avoid_: Course, track (use in generic prose only)

**Module**:
A chapter within a Cursus containing an ordered list of Steps.
_Avoid_: Section, unit (ambiguous)

**Step**:
An atomic unit inside a Module; either a Lesson, Checkpoint, or Kata reference.
_Avoid_: Page, slide

**Lesson**:
Read-only instructional content Step within a Cursus Module.
_Avoid_: Article, doc, checkpoint (when answer capture or scoring is required)

**Checkpoint**:
A separate authored content type used as a consolidation Step inside a Cursus, explicitly attached to the Kata drill it reinforces without becoming a full Assessment. A Checkpoint can include scored MCQs and non-scored reflection prompts with revealable expected answers.
_Avoid_: Module, quiz, assessment

**Self-check**:
The learner-facing label for a Checkpoint Step in the UI.
_Avoid_: Quiz, test, exam

**Soft Gate**:
A progression rule where the learner must submit or acknowledge a Step before continuing, but no minimum score is required. Checkpoints use a Soft Gate so feedback is required without turning practice into an exam.
_Avoid_: Optional step, hard gate, pass/fail gate, prerequisite

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

**Dev:** One kata at `/problem/two-sum`. Results and progress use the kata id (`/results/two-sum`). Multi-kata timed assessments live in assessment JSON (e.g. `private/assessments/aa-60min.json`).

**Author:** I generated a kata with ChatGPT - how do I add it?

**Dev:** Paste the JSON on the Practice hub (**Import kata**) to import a **UserKata** (instant, browser-only). For git-tracked content, add Markdown under a **ProblemPack** directory and rebuild.

**Author:** I want a scored recap after each Kata, but learners can continue even with mistakes.

**Dev:** Add a **Checkpoint** Step. Its MCQs use a **Soft Gate**: the learner submits, sees feedback, and can continue without a required passing score.
