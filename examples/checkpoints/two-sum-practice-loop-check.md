---
id: two-sum-practice-loop-check
title: Two Sum Practice Loop Check
attachedKataId: two-sum
questions:
  - id: feedback-source
    prompt: Which action should you use when you want the full Two Sum result, including hidden tests?
    choices:
      - id: run-samples
        text: Run Samples, because it only checks the visible examples while you iterate.
      - id: submit
        text: Submit, because it records the practice result and includes hidden tests.
      - id: import-userkata
        text: Import UserKata, because importing automatically grades the current kata.
    correctChoiceId: submit
    explanation: Submit is the full practice result path. Run Samples is the quick visible-feedback loop while you are still editing.
reflections:
  - id: next-step
    prompt: What would you inspect first if your submitted solution passed samples but missed a hidden case?
    expectedAnswer: Compare the failed result with the prompt constraints, then adjust the local draft and run samples again before resubmitting.
---
