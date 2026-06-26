# ADR-0005: Checkpoint after every Kata

## Status

Accepted

## Context

Checkpoint cadence changes the feel of a Cursus. Clustered or end-of-module Checkpoints preserve uninterrupted drilling, but they let misconceptions sit until several Katas later.

## Decision

Place a Checkpoint after every Kata. Each Checkpoint must be short and focused on consolidating the immediately preceding Kata so it reinforces the drill without breaking the practice flow. The target size is 2-4 minutes: usually 1-2 MCQs plus at most one reflection spoiler when there is a common misconception worth surfacing.

Each Checkpoint must explicitly identify the Kata it reinforces. Step position still controls navigation, but the attachment is part of the authored content so validation and UI labels do not depend on inference.

The Self-check for a Kata unlocks after that Kata is completed successfully. It should not be available before the learner solves the attached Kata because its questions may reveal the consolidation insight.

If a learner directly opens a locked Self-check URL, the UI shows a locked state with an action back to the attached Kata instead of silently redirecting.

## Consequences

- Authors should design Checkpoints as lightweight consolidation, not mini-lessons or Assessments.
- Broad toolbox tables, historical notes, and pattern maps belong in Lessons or summaries unless they are tightly tied to the immediately preceding Kata.
- Day-level Checkpoint drafts should be split into per-Kata Checkpoints; any broader recap material should become Lesson or summary content.
- The Cursus will have more Steps, so navigation and progress UI must make Checkpoints feel like part of the rhythm.
- A Checkpoint can reference earlier related Katas, but its primary anchor is the Kata immediately before it.
- Reordering Cursus Steps must not silently change which Kata a Checkpoint is meant to consolidate.
