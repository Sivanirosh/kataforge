# ADR-0006: Checkpoints as a separate content type from Lessons

## Status

Accepted

## Context

KataForge Lessons are read-only instructional Steps. Checkpoints started as Markdown content, but scored MCQs, answer capture, retake semantics, local feedback, and explicit Kata attachment make them behaviorally different from Lessons.

## Decision

Introduce Checkpoints as a separate authored content type with their own configured directories and loader. Cursus Steps explicitly reference Checkpoints separately from Lessons, while non-scored instructional recap content remains a Lesson. Checkpoints are not auto-inserted from attached Kata references; the Cursus file shows the actual learner path.

## Consequences

- Scored Checkpoints do not overload the Lesson loader or Lesson UI.
- Authoring validation can enforce Checkpoint-specific rules such as attached Kata existence and immediate placement after that Kata.
- Plain Markdown recap material stays in Lessons when it does not need answer capture or scoring.
- Curriculum review stays explicit because authors see the Kata and Checkpoint sequence in the Cursus JSON.
- The platform still allows Cursus paths without Checkpoints; "Checkpoint after every Kata" is a curriculum quality rule for deliberate-practice packs, not a universal framework requirement.
