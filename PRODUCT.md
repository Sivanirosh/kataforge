# Product

## Register

product

## Users

Solo developers preparing for technical interviews. They practice katas repeatedly, often in the evening or at night, at a personal desk, headphones on. They care about tight feedback loops: write code, run samples, see what broke, iterate. The session has a cadence. Time pressure is part of the practice.

Secondary persona: hiring engineers and trainers who author ProblemPacks and run assessment sessions with candidates. They care about control, reproducibility, and staying out of the way of the candidate.

The primary user the design should optimize for: the solo practitioner in a focused state.

## Product Purpose

KataForge is a local, private coding kata practice environment. Problems are authored in Markdown with hidden and visible test cases; Python solutions run in the browser via Pyodide. It supports timed assessments over multiple katas, guided Cursus learning paths mixing lessons and kata drills, and UserKata import for custom problems.

Success looks like a developer finishing a session and feeling they got sharper. Not entertained. Not rewarded with badges. Sharper.

## Brand Personality

Serious · Craft-forward · Dark

The product respects the user's focus. It is a precision tool, not a gamified platform. The visual language should feel like something a senior engineer built for themselves, then decided to share.

## Anti-references

- **LeetCode / HackerRank**: dense, corporate, gamified. Feels like a job board wearing a code editor. Cluttered nav, badge systems, social features bleeding into the workspace.
- **Generic SaaS dashboard**: rounded cards, blue accent, gradient text, hero metric tiles. Everything looks like it came from the same Tailwind component library. No soul.
- **Vercel / Linear aesthetic**: too clean, too restrained. Functional but cold. The minimal-product look that has become its own cliché. This tool needs more character than that.

North star reference: **Zed editor** — dense information design, very high craft, built for professionals who know what they're doing. Nothing is there to impress, everything is there to perform.

## Design Principles

1. **The tool disappears, the code doesn't.** The UI should recede so the problem statement and editor take center stage. Decoration is noise that breaks focus.
2. **Feedback is the product.** The test panel, the score, the diff: these are the core value delivery. Design them for clarity and immediacy, not for visual interest.
3. **Dark serves the focus state.** The darkness is functional: it protects attention during night sessions and reduces eye strain under sustained use. It is not a trend choice.
4. **Density over spaciousness.** This is a workspace, not a marketing surface. Information-dense layouts serve practitioners. Whitespace should create hierarchy, not fill space.
5. **Precision signals craft.** Exact sizing, deliberate weight contrast, consistent alignment. The kind of care a professional tool shows. Not the kind of polish that announces itself.

## Accessibility & Inclusion

WCAG 2.1 AA. Focus states on all interactive elements, keyboard navigability throughout. Respect `prefers-reduced-motion` for any animations. Ensure the code editor and test panel remain usable under screen magnification.
