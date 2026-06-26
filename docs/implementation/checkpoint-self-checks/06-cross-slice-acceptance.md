# Cross-slice Workflow Acceptance Test

This workflow proves `KF-CHK-01` through `KF-CHK-05` connect into a coherent learner path.

1. Author configures a Checkpoint directory, writes a Checkpoint Markdown file with `attachedKataId`, and lists it as an explicit `checkpoint` Step immediately after that Kata in a Cursus.
2. System loads the Cursus with Lesson, Kata, and Checkpoint Steps in order, validating all references.
3. Learner opens the Cursus, completes the attached Kata, and sees the following Step labeled as `Self-check`.
4. Learner answers each MCQ one at a time, receives immediate explanations, completes the Soft Gate, sees compact local score, and continues.
5. Edge condition: learner reloads during a partially completed Self-check, then later retakes a completed Self-check.
6. System restores the partial latest attempt on reload, overwrites latest attempt on retake, and never mutates Assessment score storage.
7. Invariant: every Checkpoint remains explicitly attached to an existing Kata, every Self-check follows its attached Kata in the authored Cursus, and Cursus progress stays completion-based rather than grade-based.
