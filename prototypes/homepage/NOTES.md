# Homepage redesign — UI prototype

**Question:** What should the KataForge practice-hub homepage look like?

**Round 1** (deleted) explored three structures: command console, editorial journey,
bento dashboard. **Verdict: the dashboard direction won**, and "library by difficulty"
was the standout feature — but the bento layout was too dense, not intuitive, not
well designed (11 tiles, no reading order).

**Round 2 (current):** three refined takes on the *dashboard*, all keeping the
metrics feel and making "library by difficulty" prominent, each fixing density a
different way.

## Status

THROWAWAY. Not wired into the app. Delete this folder once the winning features are
folded into `src/pages/index.astro` + `src/styles/kiro.css`.

## How to view

Open any file in a browser (`file://…`), no build. Floating bar at the bottom (or
← / → keys) cycles the three. Geist fonts load from jsdelivr CDN (view online for
real type; offline falls back to system fonts, layout unchanged). Real kiro tokens
+ real data (63 katas: 17 easy / 24 easy-med / 20 med / 2 hard; 2 paths; 2 sets).

## The three (round 2)

| File | Idea | How it fixes density |
|---|---|---|
| **`v2-focus.html`** — Focus column | Calm centered single column, strong vertical sections. Difficulty = a 2×2 of big tier cards (samples + progress). | One focal point per band, lots of whitespace, obvious top-to-bottom order |
| **`v2-rail.html`** — Main + rail | Two columns: left = act on (resume, difficulty lanes, today's focus); right sticky rail = context (stats, paths, sets, import). | Separates "do" from "glance" so nothing competes |
| **`v2-lanes.html`** — Difficulty lanes | Difficulty *is* the layout: 4 kanban-style columns w/ progress rings + sample katas. Slim resume+stats banner on top. | Difficulty becomes the single spatial metaphor; secondary stuff demoted to a footer row |

## Verdict (fill in after review)

- Winning structure: _TBD_
- Difficulty treatment preferred: _big tier cards (focus) / horizontal lanes (rail) / kanban columns (lanes)?_
- Features to steal across variants: _TBD_
- Notes: the "today's focus" recommendation and per-difficulty "solved" progress need
  real logic if kept (activity.ts / kataPractice.ts).
