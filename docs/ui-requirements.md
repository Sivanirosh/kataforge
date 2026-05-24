# UI Requirements

## Feel

Clean coding-assessment layout: prompt left, editor right, test output below the editor.

## Pages

### Landing

- Product title and tagline (from config)
- List of available Assessments
- Links to practice individual Katas

### Assessment

- Timer (when `durationMinutes` set)
- Problem navigator
- Per-Kata completion status
- Submit Assessment action

### Kata workspace

- Title, difficulty, estimated time, tags
- Markdown prompt body
- Monaco Python editor
- Run Samples, Submit, Reset
- Test result panel

### Results

- Total score and elapsed time
- Per-Kata pass counts
- Hidden TestCases: pass/fail only

## Layout (desktop)

```
┌──────────────────────────────────────────────────────────────┐
│ Header: title | timer | progress | submit assessment          │
├───────────────────────────┬──────────────────────────────────┤
│ Problem statement          │ Monaco editor                    │
│                            ├──────────────────────────────────┤
│                            │ Test panel                        │
└───────────────────────────┴──────────────────────────────────┘
```

Mobile: stacked columns.

## Keyboard shortcuts

- Cmd/Ctrl + Enter: Run Samples
- Cmd/Ctrl + Shift + Enter: Submit
