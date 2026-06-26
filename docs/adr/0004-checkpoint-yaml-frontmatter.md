# ADR-0004: Structured YAML frontmatter for scored Checkpoints

## Status

Accepted

## Context

KataForge Checkpoints remain Markdown-authored learning Steps, but scored MCQs need deterministic answer capture and scoring. Parsing scoreable questions from visible Markdown headings, lists, and spoiler blocks would make authoring convenient at first but brittle once copy, ordering, or formatting changes.

## Decision

Keep Checkpoints as `.md` files and encode scoreable MCQs in structured YAML frontmatter. Use the Markdown body for narrative content, toolbox additions, bridges, and non-scored reflection prompts with revealable expected answers.

The Checkpoint frontmatter owns its attached Kata reference. Cursus step data references the Checkpoint and controls ordering; validation checks that the Checkpoint's attached Kata exists and that the Checkpoint appears immediately after that Kata in the Cursus.

The first supported Checkpoint schema is intentionally narrow: single-answer MCQs and optional non-scored reflection prompts. Multi-select questions, free-text grading, partial credit, images, and randomized ordering are out of scope until the basic Checkpoint loop is proven useful.

Checkpoint MCQs are presented one at a time. After the learner answers the current MCQ, the UI immediately reveals correctness and the explanation before moving to the next MCQ. That answer is locked for the current attempt; changing answers requires starting a fresh Checkpoint retake.

Checkpoint scores are local feedback only. They complete the Checkpoint's Soft Gate after all MCQs have been answered, but they do not roll up into an overall Cursus score or Assessment result. Scored Self-checks cannot be skipped. Non-scored reflection spoilers are optional and do not block progression. A Checkpoint with no MCQs completes through a simple acknowledgement action.

Checkpoint retakes overwrite the previous local attempt in v1. Completed Self-checks reopen in review mode showing the latest selected answers, correctness, explanations, optional reflection spoilers, and a Retake action; historical attempt analytics are out of scope.

## Consequences

- Authors keep one file per Checkpoint while giving the UI stable data for scoring.
- Markdown prose can evolve without breaking answer capture.
- Existing Lesson-style content can remain plain Markdown when no scored Checkpoint fields are present.
- Cursus remains a completion-based learning path, while Assessment remains the scored evaluation surface.
- Immediate per-question feedback makes Checkpoints feel like consolidation cards instead of batch quizzes.
- Completed Checkpoints may show a compact local score such as `1/2` in navigation, but not percentages or pass/fail grade badges.
- The main Self-check screen prioritizes the current MCQ card, with a small context line for the attached Kata. Explanations reveal in place after the selected answer locks; large result panels are reserved for final summaries.
- Self-check v1 does not embed the learner's previous code or TestCase results from the attached Kata; it may link back to the Kata for review.
