# Agent instructions — design system

This project follows the design system extracted from https://vercel.com/academy/build-ai-agent-harness.
Any coding agent working here must use the tokens below and avoid inventing new ones.
Source: https://vercel.com/academy/build-ai-agent-harness
Extracted by designlang v7.0.0 on 2026-05-24T18:48:31.578Z

## Semantic tokens (use these)
- color.action.primary: #0052cc
- color.surface.default: #ffffff
- color.text.body: #171717
- radius.control: 2px
- typography.body.fontFamily: Geist

## Regions
- nav
- nav
- nav
- hero
- footer

## How to use
- Prefer `semantic.*` tokens over `primitive.*`.
- Never invent new tokens or hex values; reuse the ones above.
- When a value is missing, pick the closest existing semantic token and flag the gap.
- Reference tokens by their dotted path (e.g. `semantic.color.action.primary`).
