# Design Language: Build Your Own AI Coding Agent Harness | Vercel Academy

> Extracted from `https://vercel.com/academy/build-ai-agent-harness` on May 24, 2026
> 6343 elements analyzed across 4 pages

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#0052cc` | rgb(0, 82, 204) | hsl(216, 100%, 40%) | 1 |
| Secondary | `#52aeff` | rgb(82, 174, 255) | hsl(208, 100%, 66%) | 4 |
| Accent | `#0072f5` | rgb(0, 114, 245) | hsl(212, 100%, 48%) | 34 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#171717` | hsl(0, 0%, 9%) | 5972 |
| `#ebebeb` | hsl(0, 0%, 92%) | 5006 |
| `#4d4d4d` | hsl(0, 0%, 30%) | 1196 |
| `#ffffff` | hsl(0, 0%, 100%) | 193 |
| `#666666` | hsl(0, 0%, 40%) | 134 |
| `#a8a8a8` | hsl(0, 0%, 66%) | 109 |
| `#000000` | hsl(0, 0%, 0%) | 94 |
| `#7d7d7d` | hsl(0, 0%, 49%) | 20 |
| `#8f8f8f` | hsl(0, 0%, 56%) | 19 |
| `#ebf5ff` | hsl(210, 100%, 96%) | 4 |
| `#fffaf0` | hsl(40, 100%, 97%) | 1 |

### Background Colors

Used on large-area elements: `#ffffff`, `#fafafa`

### Text Colors

Text color palette: `#171717`, `#0072f5`, `#000000`, `#ffffff`, `#888888`, `#4d4d4d`, `#0068d6`, `#52aeff`, `#e5484d`, `#ffb224`

### Gradients

```css
background-image: conic-gradient(from 180deg at 50% 70%, rgba(250, 250, 250, 0) 0deg, rgb(238, 195, 45) 72deg, rgb(236, 75, 75) 144deg, rgb(112, 154, 185) 216deg, rgb(77, 255, 191) 288deg, rgba(250, 250, 250, 0) 360deg);
```

```css
background-image: linear-gradient(to right, rgb(235, 235, 235), rgb(235, 235, 235) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(rgb(235, 235, 235), rgb(235, 235, 235) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(to right, rgb(212, 238, 247), rgb(212, 238, 247) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(rgb(212, 238, 247), rgb(212, 238, 247) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(to right, rgb(255, 232, 224), rgb(255, 232, 224) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(rgb(255, 232, 224), rgb(255, 232, 224) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(to right, rgb(199, 245, 226), rgb(199, 245, 226) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(rgb(199, 245, 226), rgb(199, 245, 226) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(to right, rgb(247, 234, 212), rgb(247, 234, 212) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(rgb(247, 234, 212), rgb(247, 234, 212) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#171717` | text, border, background | 5972 |
| `#ebebeb` | border, background | 5006 |
| `#4d4d4d` | text, border | 1196 |
| `#ffffff` | background, text, border | 193 |
| `#666666` | text | 134 |
| `#a8a8a8` | border, text | 109 |
| `#000000` | text, border | 94 |
| `#0072f5` | text, background | 34 |
| `#7d7d7d` | text | 20 |
| `#8f8f8f` | text, background | 19 |
| `#0068d6` | text, background | 4 |
| `#ebf5ff` | background | 4 |
| `#52aeff` | background, text | 4 |
| `#e5484d` | background, text | 3 |
| `#45dec5` | background, text | 3 |
| `#bd2864` | text | 3 |
| `#ffb224` | text | 2 |
| `#297a3a` | text | 2 |
| `#7820bc` | text, background | 2 |
| `#cce6ff` | background | 1 |
| `#bf89ec` | background | 1 |
| `#398e4a` | background | 1 |
| `#067a6e` | background | 1 |
| `#ff990a` | background | 1 |
| `#ffc96b` | background | 1 |
| `#6cda75` | background | 1 |
| `#ea3e83` | background | 1 |
| `#fffaf0` | background | 1 |
| `#24292e` | background | 1 |
| `#6b4fbb` | background | 1 |

## Typography

### Font Families

- **Geist** — used for all (5466 elements)
- **geistMonoFont** — used for all (877 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 56px | 3.5rem | 600 | 56px | -3.36px | h1 |
| 48px | 3rem | 600 | 48px | -2.28px | h1, h3, span, div |
| 40px | 2.5rem | 600 | 48px | -2.4px | h2 |
| 32px | 2rem | 600 | 40px | -0.96px | h1, span, img, h3 |
| 24px | 1.5rem | 600 | 32px | -0.96px | h3, p, span, div |
| 20px | 1.25rem | 400 | 36px | normal | p, h4 |
| 18px | 1.125rem | 400 | 28px | normal | div, p, li, span |
| 16px | 1rem | 400 | normal | normal | html, head, style, meta |
| 14px | 0.875rem | 500 | 20px | normal | a, span, p, main |
| 13px | 0.8125rem | 500 | 20px | normal | div, ul, li, pre |
| 12px | 0.75rem | 400 | 16px | normal | a, p, span, li |
| 9.5px | 0.5938rem | 400 | 14.25px | normal | span |
| 8px | 0.5rem | 600 | 8px | normal | span |
| 7.75px | 0.4844rem | 400 | 11.625px | normal | span |
| 7px | 0.4375rem | 700 | 7px | normal | span |

### Heading Scale

```css
h1 { font-size: 56px; font-weight: 600; line-height: 56px; }
h1 { font-size: 48px; font-weight: 600; line-height: 48px; }
h2 { font-size: 40px; font-weight: 600; line-height: 48px; }
h1 { font-size: 32px; font-weight: 600; line-height: 40px; }
h3 { font-size: 24px; font-weight: 600; line-height: 32px; }
h4 { font-size: 20px; font-weight: 400; line-height: 36px; }
h5 { font-size: 14px; font-weight: 500; line-height: 20px; }
h2 { font-size: 12px; font-weight: 400; line-height: 16px; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: normal; }
```

### Font Weights in Use

`400` (5787x), `500` (426x), `600` (128x), `700` (2x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-32 | 32px | 2rem |
| spacing-36 | 36px | 2.25rem |
| spacing-40 | 40px | 2.5rem |
| spacing-44 | 44px | 2.75rem |
| spacing-48 | 48px | 3rem |
| spacing-64 | 64px | 4rem |
| spacing-80 | 80px | 5rem |
| spacing-85 | 85px | 5.3125rem |
| spacing-90 | 90px | 5.625rem |
| spacing-96 | 96px | 6rem |
| spacing-120 | 120px | 7.5rem |
| spacing-135 | 135px | 8.4375rem |
| spacing-144 | 144px | 9rem |
| spacing-164 | 164px | 10.25rem |
| spacing-365 | 365px | 22.8125rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 2px | 15 |
| sm | 5px | 1 |
| md | 8px | 28 |
| lg | 12px | 1 |
| lg | 16px | 1 |
| full | 32px | 1 |
| full | 50px | 14 |
| full | 64px | 6 |
| full | 99px | 1 |
| full | 9999px | 21 |

## Box Shadows

**sm** — blur: 0px
```css
box-shadow: rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 114, 245) 0px 0px 0px 4px;
```

**sm** — blur: 0px
```css
box-shadow: rgb(235, 235, 235) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.02) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 4px 8px 0px, rgb(250, 250, 250) 0px 0px 0px 1px, rgb(255, 255, 255) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 114, 245) 0px 0px 0px 4px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(235, 235, 235) 0px 0px 0px 1px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px inset;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px 0px, rgb(250, 250, 250) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px 0px, rgb(250, 250, 250) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgb(250, 250, 250) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgb(235, 235, 235) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.02) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 4px 8px 0px, rgb(250, 250, 250) 0px 0px 0px 1px, rgb(255, 255, 255) 0px 0px 0px 1px;
```

**xs (inset)** — blur: 0px
```css
box-shadow: rgb(234, 234, 234) 0px -1px 0px 0px inset;
```

**xs** — blur: 2px
```css
box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 2px 0px;
```

**sm** — blur: 2px
```css
box-shadow: rgba(0, 0, 0, 0.04) 0px 2px 2px 0px;
```

## CSS Custom Properties

### Colors

```css
--markprompt-primary: #000;
--ds-shadow-border-large: 0 0 0 1px #00000014, 0px 2px 2px #0000000a, 0px 8px 16px -4px #0000000a, 0 0 0 1px hsla(0, 0%, 98%, 1);
--ds-focus-ring-outline: 2px solid hsla(212, 100%, 48%, 1);
--geist-console-text-color-default: #000;
--accents-6: #444;
--geist-secondary-lighter: #eaeaea;
--header-border-bottom: 0 1px 0 0 #0000001a;
--ds-shadow-border: 0 0 0 1px #00000014, 0 0 0 1px hsla(0, 0%, 98%, 1);
--geist-secondary-dark: #333;
--geist-violet-background-secondary: #291c3a;
--ds-focus-ring: 0 0 0 2px hsla(0, 0%, 100%, 1), 0 0 0 4px hsla(212, 100%, 48%, 1);
--ds-overlay-backdrop-color: hsla(0, 0%, 98%, 1);
--ds-shadow-border-base: 0 0 0 1px #00000014;
--accents-3: #999;
--geist-selection-text-color: hsla(0, 0%, 95%, 1);
--accents-8: #111;
--accents-2: #eaeaea;
--ds-shadow-border-inset: inset 0 0 0 1px #00000014;
--ds-shadow-border-small: 0 0 0 1px #00000014, 0px 2px 2px #0000000a, 0 0 0 1px hsla(0, 0%, 98%, 1);
--ds-focus-color: hsla(212, 100%, 48%, 1);
--accents-7: #333;
--ds-shadow-background-border: 0 0 0 1px hsla(0, 0%, 98%, 1);
--geist-foreground-rgb: 0, 0, 0;
--geist-console-text-color-blue: #0070f3;
--geist-console-text-color-purple: #7928ca;
--geist-console-text-color-pink: #eb367f;
--accents-1: #fafafa;
--accents-4: #888;
--geist-secondary: #666;
--geist-secondary-light: #999;
--ds-motion-popover-timing: cubic-bezier(.175, .885, .32, 1.1);
--ds-focus-border: 0 0 0 1px #00000057, 0px 0px 0px 4px #00000029;
--accents-5: #666;
--geist-foreground: #000;
--ds-motion-popover-duration: .2s;
--next-icon-border: #000;
--geist-link-color: hsla(212, 100%, 48%, 1);
--ds-shadow-border-medium: 0 0 0 1px #00000014, 0px 2px 2px #0000000a, 0px 8px 8px -8px #0000000a, 0 0 0 1px hsla(0, 0%, 98%, 1);
--color-orange-600: lab(57.1026% 64.2584 89.8886);
--tw-inset-ring-shadow: 0 0 #0000;
--color-gray-300: hsla(0, 0%, 90%, 1);
--color-zinc-900: lab(8.30603% .618205 -2.16572);
--color-gray-950: lab(1.90334% .278696 -5.48866);
--color-blue-50: lab(96.492% -1.14644 -5.11479);
--color-violet-50: lab(96.2416% 2.28849 -5.51657);
--tw-ring-shadow: 0 0 #0000;
--color-yellow-600: lab(62.7799% 22.4197 86.1544);
--tw-ring-offset-width: 0px;
--color-violet-700: lab(35.2783% 67.9912 -88.793);
--tw-ring-offset-shadow: 0 0 #0000;
--color-background-100: hsla(0, 0%, 100%, 1);
--color-violet-100: lab(93.0838% 4.35197 -9.88284);
--color-zinc-100: lab(96.1634% .0993311 -.364041);
--color-slate-500: lab(48.0876% -2.03595 -16.5814);
--color-slate-300: lab(84.7652% -1.94535 -7.93337);
--color-neutral-700: lab(27.036% 0 0);
--color-gray-alpha-400: #00000014;
--color-zinc-600: lab(35.1166% 1.78212 -6.1173);
--tw-border-style: solid;
--animate-fadeOutPopover: fadeOut cubic-bezier(.175, .885, .32, 1.1) .2s;
--color-gray-50: lab(98.2596% -.247031 -.706708);
--tw-ring-offset-color: #fff;
--color-indigo-600: lab(38.4009% 52.6132 -92.3857);
--color-gray-800: hsla(0, 0%, 49%, 1);
--color-red-50: lab(96.5005% 4.18508 1.52328);
--color-gray-200: hsla(0, 0%, 92%, 1);
--color-neutral-800: lab(15.204% 0 -.00000596046);
--color-amber-50: lab(98.6252% -.635922 8.42309);
```

### Spacing

```css
--geist-space-64x: 256px;
--geist-space-gap: 24px;
--geist-space-small-negative: -32px;
--geist-space-gap-negative: -24px;
--geist-space-4x: 16px;
--geist-space-medium: 40px;
--geist-space-gap-quarter: 8px;
--geist-space-24x-negative: -96px;
--geist-space-48x: 192px;
--geist-space-16x: 64px;
--geist-gap-section: 32px;
--geist-space-large-negative: -48px;
--geist-space-gap-half-negative: -12px;
--geist-gap-half: 12px;
--geist-space-24x: 96px;
--geist-space-2x-negative: -8px;
--geist-space-gap-half: 12px;
--geist-space-gap-quarter-negative: -8px;
--geist-space-large: 48px;
--geist-gap-half-negative: -12px;
--geist-space-32x-negative: -128px;
--geist-space-8x-negative: -32px;
--geist-gap-quarter: 8px;
--omniagent-panel-padding: 16px;
--geist-space-3x: 12px;
--geist-space: 4px;
--geist-gap-negative: -24px;
--geist-space-32x: 128px;
--geist-gap-double-negative: -48px;
--geist-gap-quarter-negative: -8px;
--geist-space-small: 32px;
--geist-gap: 24px;
--geist-page-margin: 24px;
--geist-space-6x: 24px;
--geist-space-8x: 32px;
--geist-space-48x-negative: -192px;
--font-space-grotesk: Space Grotesk, "Geist", Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
--geist-space-4x-negative: -16px;
--geist-space-negative: -4px;
--geist-space-64x-negative: -256px;
--ds-page-width-with-margin: calc(1400px + calc(2 * 24px));
--geist-space-10x: 40px;
--geist-page-width-with-margin: calc(1200px + calc(2 * 24px));
--geist-gap-double: 48px;
--geist-space-16x-negative: -64px;
--omniagent-block-padding: 12px;
--geist-space-medium-negative: -40px;
--geist-space-2x: 8px;
--tw-space-x-reverse: 0;
--spacing-fluid-24-40: clamp(1.5rem, -.2143rem + 2.8571vi, 2.5rem);
--spacing-fluid-16-24: clamp(1rem, .1429rem + 1.4286vi, 1.5rem);
--tw-space-y-reverse: 0;
--spacing: .25rem;
--spacing-fluid-20-24: clamp(1.25rem, .8214rem + .7143vi, 1.5rem);
--spacing-fluid-20-32: clamp(1.25rem, -.0357rem + 2.1429vi, 2rem);
```

### Typography

```css
--ship-text: #ff5b4f;
--preview-text: #de1d8d;
--font-mono: "Geist Mono", Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
--geist-text-gradient: linear-gradient(180deg, #000c 0%, #000 100%);
--geist-form-line-height: 1.25rem;
--font-mono-fallback: "Roboto Mono", Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
--geist-form-font: .875rem;
--geist-form-small-font: .875rem;
--geist-form-large-line-height: 1.5rem;
--geist-form-large-font: 1rem;
--geist-form-small-line-height: .875rem;
--font-sans: "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
--develop-text: #0a72ef;
--font-sans-fallback: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
--text-base--line-height: calc(1.5 / 1);
--tracking-wider: .05em;
--text-fluid-24-32: clamp(1.5rem, .6429rem + 1.4286vi, 2rem);
--text-fluid-24-28: clamp(1.5rem, 1.0714rem + .7143vi, 1.75rem);
--text-fluid-16-28: clamp(1rem, -.2857rem + 2.1429vi, 1.75rem);
--text-sm: .875rem;
--font-weight-thin: 100;
--text-fluid-14-24: clamp(.875rem, -.1964rem + 1.7857vi, 1.5rem);
--text-lg: 1.125rem;
--text-fluid-18-24: clamp(1.125rem, .4821rem + 1.0714vi, 1.5rem);
--default-font-family: "Geist", Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
--tracking-tighter: -.05em;
--text-fluid-14-20: clamp(.875rem, .2321rem + 1.0714vi, 1.25rem);
--font-weight-extrabold: 800;
--text-sm--line-height: calc(1.25 / .875);
--text-3xl--line-height: calc(2.25 / 1.875);
--text-3xl: 1.875rem;
--text-xs: .75rem;
--font-weight-medium: 500;
--font-weight-normal: 400;
--text-base: 1rem;
--default-mono-font-family: "geistMonoFont", "geistMonoFont Fallback", ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New, monospace, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
--text-fluid-32-64: clamp(2rem, -1.4286rem + 5.7143vi, 4rem);
--text-fluid-64-128: clamp(4rem, -2.8571rem + 11.4286vi, 8rem);
--text-fluid-20-28: clamp(1.25rem, .3929rem + 1.4286vi, 1.75rem);
--font-weight-bold: 700;
--text-xs--line-height: calc(1 / .75);
--text-fluid-20-32: clamp(1.25rem, -.0357rem + 2.1429vi, 2rem);
--text-xl: 1.25rem;
--leading-relaxed: 1.625;
--text-2xl--line-height: calc(2 / 1.5);
--text-xl--line-height: calc(1.75 / 1.25);
--leading-tight: 1.25;
--text-fluid-20-80: clamp(1.25rem, -5.1786rem + 10.7143vi, 5rem);
--text-fluid-14-16: clamp(.875rem, .6607rem + .3571vi, 1rem);
--text-4xl--line-height: calc(2.5 / 2.25);
--tracking-tight: -.025em;
--text-2xl: 1.5rem;
--text-fluid-16-20: clamp(1rem, .5714rem + .7143vi, 1.25rem);
--text-fluid-32-80: clamp(2rem, -3.1429rem + 8.5714vi, 5rem);
--text-5xl--line-height: 1;
--leading-normal: 1.5;
--text-lg--line-height: calc(1.75 / 1.125);
--font-weight-light: 300;
--font-weight-semibold: 600;
--font-pixel-square: ;
--text-4xl: 2.25rem;
--tracking-normal: 0em;
--text-5xl: 3rem;
```

### Shadows

```css
--dropdown-box-shadow: 0 4px 4px 0 #00000005;
--ds-shadow-large: 0px 2px 2px #0000000a, 0px 8px 16px -4px #0000000a;
--shadow-smallest: 0px 2px 4px #0000001a;
--shadow-sticky: 0 12px 10px -10px #0000001f;
--ds-shadow-tooltip: 0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 4px 8px #0000000a, 0 0 0 1px hsla(0, 0%, 98%, 1);
--shadow-large: 0 30px 60px #0000001f;
--shadow-small: 0 5px 10px #0000001f;
--ds-shadow-fullscreen: 0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f, 0 0 0 1px hsla(0, 0%, 98%, 1);
--ds-shadow-small: 0px 2px 2px #0000000a;
--shadow-medium: 0 8px 30px #0000001f;
--shadow-extra-small: 0px 4px 8px #0000001f;
--ds-shadow-menu: 0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 4px 8px -4px #0000000a, 0px 16px 24px -8px #0000000f, 0 0 0 1px hsla(0, 0%, 98%, 1);
--ds-shadow-modal: 0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f, 0 0 0 1px hsla(0, 0%, 98%, 1);
--ds-shadow-medium: 0px 2px 2px #0000000a, 0px 8px 8px -8px #0000000a;
--shadow-hover: 0 30px 60px #0000001f;
--tw-inset-shadow: 0 0 #0000;
--tw-shadow-alpha: 100%;
--tw-drop-shadow-alpha: 100%;
--ds-shadow-xl: 0px 1px 1px #00000005, 0px 4px 8px -4px #0000000a, 0px 16px 24px -8px #0000000f;
--tw-shadow: 0 0 #0000;
--tw-inset-shadow-alpha: 100%;
--ds-shadow-2xl: 0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f;
--drop-shadow-lg: 0 4px 4px #00000026;
--ds-shadow-xs: 0px 1px 2px #0000000a;
--ds-shadow-2xs: 0px 1px 1px #0000000a;
```

### Radii

```css
--geist-radius: 6px;
--geist-marketing-radius: 8px;
--omniagent-ui-radius: 12px;
--radius-3xl: 1.5rem;
```

### Other

```css
--header-height: 64px;
--develop-line-end: #019ae9;
--ds-green-1000-value: 128, 29%, 15%;
--ds-teal-100: hsla(169, 70%, 96%, 1);
--ds-blue-600: hsla(208, 100%, 66%, 1);
--geist-cyan-lighter: #aaffec;
--ds-amber-700: hsla(39, 100%, 57%, 1);
--ds-pink-300-value: 340, 82%, 94%;
--ds-green-800-value: 132, 43%, 39%;
--ds-amber-500-value: 38, 100%, 71%;
--geist-success-light: #3291ff;
--geist-error: #e00;
--geist-warning-light: #f7b955;
--geist-cyan-dark: #29bc9b;
--ds-amber-900: hsla(30, 100%, 32%, 1);
--ds-green-200: hsla(120, 60%, 95%, 1);
--geist-success-dark: #0761d1;
--geist-form-small-height: 32px;
--ds-red-800-value: 358, 70%, 52%;
--header-import-flow-background: #fafafacc;
--ds-pink-200-value: 340, 90%, 96%;
--ds-blue-200: hsla(210, 100%, 96%, 1);
--geist-violet-lighter: #d8ccf1;
--ds-green-1000: hsla(128, 29%, 15%, 1);
--ds-red-1000: hsla(355, 49%, 15%, 1);
--omniagent-ui-header-height: 36px;
--wv-orange: #ffa400;
--ds-amber-800-value: 35, 100%, 52%;
--raw-sidebar-width: 256px;
--ds-gray-alpha-600: #00000057;
--ds-pink-300: hsla(340, 82%, 94%, 1);
--develop-start-gradient: #007cf0;
--geist-violet-background-tertiary: #eae5f4;
--ds-pink-600: hsla(341, 75%, 73%, 1);
--ds-gray-800: hsla(0, 0%, 49%, 1);
--ds-gray-alpha-100: #0000000d;
--geist-violet-light: #8a63d2;
--ds-teal-700-value: 173, 80%, 36%;
--ds-gray-300: hsla(0, 0%, 90%, 1);
--ds-teal-1000: hsla(171, 80%, 13%, 1);
--ds-purple-600: hsla(273, 72%, 73%, 1);
--ds-blue-1000: hsla(211, 100%, 15%, 1);
--ds-amber-1000: hsla(20, 79%, 17%, 1);
--ds-amber-200: hsla(44, 100%, 92%, 1);
--ds-teal-300-value: 168, 70%, 90%;
--ds-amber-600: hsla(36, 90%, 62%, 1);
--ds-pink-700-value: 336, 80%, 58%;
--ds-background-200: hsla(0, 0%, 98%, 1);
--ds-gray-1000: hsla(0, 0%, 9%, 1);
--ds-purple-200-value: 277, 87%, 97%;
--ds-red-500-value: 0, 82%, 85%;
--ds-teal-400-value: 170, 70%, 85%;
--ds-green-600-value: 125, 60%, 64%;
--dropdown-triangle-stroke: #fff;
--ds-blue-400: hsla(209, 100%, 90%, 1);
--banner-height: 0px;
--raw-omniagent-panel-width: 420px;
--ds-red-200-value: 0, 100%, 96%;
--ds-teal-700: hsla(173, 80%, 36%, 1);
--ds-green-800: hsla(132, 43%, 39%, 1);
--ds-red-200: hsla(0, 100%, 96%, 1);
--geist-highlight-magenta: #eb367f;
--ds-purple-1000: hsla(276, 100%, 15%, 1);
--vh100-offset: calc(64px + 0px);
--ds-green-100-value: 120, 60%, 96%;
--sidebar-width: 256px;
--ds-blue-900-value: 211, 100%, 42%;
--ds-gray-500: hsla(0, 0%, 79%, 1);
--scroller-start: #fff;
--ds-teal-500-value: 170, 70%, 72%;
--vaul-overlay-background-end: #0006;
--ds-purple-800: hsla(272, 47%, 45%, 1);
--ds-motion-overlay-timing: cubic-bezier(.175, .885, .32, 1.1);
--ds-pink-800-value: 336, 74%, 51%;
--ds-purple-300: hsla(274, 78%, 95%, 1);
--ds-pink-400: hsla(341, 76%, 91%, 1);
--ds-amber-500: hsla(38, 100%, 71%, 1);
--scroller-end: #fff0;
--ds-red-700-value: 358, 75%, 59%;
--geist-background-rgb: 255, 255, 255;
--geist-violet-dark: #4c2889;
--ds-blue-1000-value: 211, 100%, 15%;
--ds-pink-500-value: 340, 75%, 84%;
--ds-blue-200-value: 210, 100%, 96%;
--ship-start-gradient: #ff4d4d;
--ds-gray-100: hsla(0, 0%, 95%, 1);
--header-zindex: 75;
--ds-page-width: 1400px;
--ds-teal-100-value: 169, 70%, 96%;
--omniagent-panel-width: 0px;
--ds-gray-500-value: 0, 0%, 79%;
--ds-purple-500-value: 274, 70%, 82%;
--ds-blue-100: hsla(212, 100%, 97%, 1);
--ds-teal-300: hsla(168, 70%, 90%, 1);
--ds-gray-700: hsla(0, 0%, 56%, 1);
--ds-teal-800-value: 173, 83%, 30%;
--ds-teal-200-value: 167, 70%, 94%;
--ds-amber-700-value: 39, 100%, 57%;
--ds-gray-100-value: 0, 0%, 95%;
--ds-purple-400-value: 276, 71%, 92%;
--ds-gray-alpha-1000: #000000e8;
--ds-contrast-fg: #fff;
--geist-error-lighter: #f7d4d6;
--ds-amber-1000-value: 20, 79%, 17%;
--ds-red-300: hsla(0, 100%, 95%, 1);
--ds-red-700: hsla(358, 75%, 59%, 1);
--ds-purple-900: hsla(274, 71%, 43%, 1);
--ds-background-100: hsla(0, 0%, 100%, 1);
--geist-highlight-purple: #f81ce5;
--ds-gray-alpha-300: #0000001a;
--ds-red-400-value: 0, 90%, 92%;
--ds-red-400: hsla(0, 90%, 92%, 1);
--ds-teal-500: hsla(170, 70%, 72%, 1);
--geist-marketing-gray: #fafbfc;
--geist-code: #000;
--ds-red-600: hsla(359, 90%, 71%, 1);
--ds-blue-300-value: 210, 100%, 94%;
--ds-teal-900-value: 174, 91%, 25%;
--ds-motion-timing-swift: cubic-bezier(.175, .885, .32, 1.1);
--ds-teal-1000-value: 171, 80%, 13%;
--ds-gray-1000-value: 0, 0%, 9%;
--ds-pink-400-value: 341, 76%, 91%;
--ds-blue-800-value: 212, 100%, 41%;
--ds-pink-1000-value: 333, 74%, 15%;
--geist-warning-lighter: #ffefcf;
--ds-purple-400: hsla(276, 71%, 92%, 1);
--ds-blue-800: hsla(212, 100%, 41%, 1);
--ds-amber-900-value: 30, 100%, 32%;
--geist-form-large-height: 48px;
--ds-blue-400-value: 209, 100%, 90%;
--ds-pink-900-value: 336, 65%, 45%;
--geist-warning: #f5a623;
--geist-error-dark: #c50000;
--ds-motion-overlay-duration: .3s;
--geist-page-width: 1200px;
--ds-purple-800-value: 272, 47%, 45%;
--ds-gray-alpha-900: #000000b3;
--wv-red: #ff4e42;
--ds-purple-100: hsla(276, 100%, 97%, 1);
--ds-gray-200-value: 0, 0%, 92%;
--navbar-height: 56px;
--ds-gray-900: hsla(0, 0%, 30%, 1);
--geist-violet: #7928ca;
--ship-line-end: #f9cb28;
--geist-console-header: #efe7ed;
--ds-red-500: hsla(0, 82%, 85%, 1);
--geist-success-lighter: #d3e5ff;
--ds-red-100-value: 0, 100%, 97%;
--ds-blue-600-value: 208, 100%, 66%;
--geist-error-light: #ff1a1a;
--ds-purple-100-value: 276, 100%, 97%;
--preview-end-gradient: #ff0080;
--develop-end-gradient: #00dfd8;
--ds-purple-600-value: 273, 72%, 73%;
--ds-red-800: hsla(358, 70%, 52%, 1);
--ds-purple-300-value: 274, 78%, 95%;
--ds-blue-700: hsla(212, 100%, 48%, 1);
--ds-amber-600-value: 36, 90%, 62%;
--ds-green-100: hsla(120, 60%, 96%, 1);
--ds-purple-700-value: 272, 51%, 54%;
--ds-gray-alpha-800: #00000082;
--ds-amber-300: hsla(43, 96%, 90%, 1);
--ds-gray-900-value: 0, 0%, 30%;
--header-sub-menu-height: 46px;
--ds-green-500: hsla(124, 60%, 75%, 1);
--ds-background-200-value: 0, 0%, 98%;
--ds-gray-200: hsla(0, 0%, 92%, 1);
--geist-highlight-yellow: #fff500;
--ds-green-400-value: 122, 60%, 86%;
--ds-blue-700-value: 212, 100%, 48%;
--ds-pink-100: hsla(330, 100%, 96%, 1);
--ds-overlay-backdrop-opacity: .8;
--ds-blue-500-value: 209, 100%, 80%;
--ds-green-700: hsla(131, 41%, 46%, 1);
--ds-amber-100-value: 39, 100%, 95%;
--ds-teal-600: hsla(170, 70%, 57%, 1);
--geist-success: #0070f3;
--ds-pink-200: hsla(340, 90%, 96%, 1);
--ds-gray-alpha-200: #00000014;
--ds-green-500-value: 124, 60%, 75%;
--ds-pink-700: hsla(336, 80%, 58%, 1);
--ds-blue-300: hsla(210, 100%, 94%, 1);
--ds-gray-400: hsla(0, 0%, 92%, 1);
--collapsed-navbar-height: 56px;
--vaul-overlay-background: 255, 255, 255;
--ds-gray-700-value: 0, 0%, 56%;
--wv-green: #0cce6b;
--ds-gray-alpha-700: #00000070;
--ds-gray-300-value: 0, 0%, 90%;
--ds-gray-600-value: 0, 0%, 66%;
--ds-pink-1000: hsla(333, 74%, 15%, 1);
--ds-red-300-value: 0, 100%, 95%;
--ds-gray-alpha-400: #00000014;
--geist-console-purple: #7928ca;
--preview-start-gradient: #7928ca;
--ds-purple-900-value: 274, 71%, 43%;
--ds-gray-400-value: 0, 0%, 92%;
--ds-teal-900: hsla(174, 91%, 25%, 1);
--ds-amber-100: hsla(39, 100%, 95%, 1);
--ds-red-900-value: 358, 66%, 48%;
--ds-pink-100-value: 330, 100%, 96%;
--ds-red-900: hsla(358, 66%, 48%, 1);
--footer-height: 79px;
--geist-highlight-pink: #ff0080;
--ds-pink-500: hsla(340, 75%, 84%, 1);
--geist-background: #fff;
--geist-cyan-light: #79ffe1;
--ds-green-600: hsla(125, 60%, 64%, 1);
--ds-red-600-value: 359, 90%, 71%;
--ds-background-100-value: 0, 0%, 100%;
--ds-red-1000-value: 355, 49%, 15%;
--vaul-overlay-background-start: #0000;
--geist-selection: hsla(0, 0%, 9%, 1);
--geist-cyan: #50e3c2;
--ds-green-900: hsla(133, 50%, 32%, 1);
--ds-teal-400: hsla(170, 70%, 85%, 1);
--ds-pink-900: hsla(336, 65%, 45%, 1);
--ds-purple-700: hsla(272, 51%, 54%, 1);
--geist-warning-dark: #ab570a;
--ds-purple-1000-value: 276, 100%, 15%;
--ds-amber-800: hsla(35, 100%, 52%, 1);
--ds-gray-800-value: 0, 0%, 49%;
--ds-blue-100-value: 212, 100%, 97%;
--ds-green-700-value: 131, 41%, 46%;
--preview-line-end: #9a1fb8;
--ds-amber-400-value: 42, 100%, 78%;
--ds-gray-alpha-500: #00000036;
--ds-teal-200: hsla(167, 70%, 94%, 1);
--ds-green-300: hsla(120, 60%, 91%, 1);
--ds-green-300-value: 120, 60%, 91%;
--ds-blue-900: hsla(211, 100%, 42%, 1);
--ds-purple-200: hsla(277, 87%, 97%, 1);
--ds-gray-600: hsla(0, 0%, 66%, 1);
--ds-amber-200-value: 44, 100%, 92%;
--ds-purple-500: hsla(274, 70%, 82%, 1);
--ds-pink-800: hsla(336, 74%, 51%, 1);
--ds-green-400: hsla(122, 60%, 86%, 1);
--ds-blue-500: hsla(209, 100%, 80%, 1);
--omniagent-content-max-width: 700px;
--ds-green-900-value: 133, 50%, 32%;
--ds-amber-300-value: 43, 96%, 90%;
--ds-teal-600-value: 170, 70%, 57%;
--ds-amber-400: hsla(42, 100%, 78%, 1);
--ds-green-200-value: 120, 60%, 95%;
--ship-end-gradient: #f9cb28;
--ds-motion-overlay-scale: .96;
--ds-red-100: hsla(0, 100%, 97%, 1);
--geist-violet-background: #fff;
--geist-form-height: 40px;
--ds-pink-600-value: 341, 75%, 73%;
--ds-teal-800: hsla(173, 83%, 30%, 1);
--banner-min-height: 64px;
--blur-lg: 16px;
--ease-in: cubic-bezier(.4, 0, 1, 1);
--tw-enter-scale: 1;
--animate-cmdkScaleIn: cmdkScaleIn .3s cubic-bezier(.175, .885, .32, 1.1);
--tw-exit-translate-y: 0;
--tw-gradient-to-position: 100%;
--animate-sandbox-left-reverse: sandbox-left-reverse .5s ease-in-out forwards;
--ds-white: lab(100% 0 0);
--animate-flip-front: flip-front .5s cubic-bezier(.4, .04, .04, 1) forwards;
--tw-scale-y: 1;
--animate-cmdkFadeIn: cmdkFadeIn .3s cubic-bezier(.175, .885, .32, 1.1);
--tw-exit-translate-x: 0;
--animate-blue-glow: blue-glow 3s ease-in-out infinite;
--animate-sandbox-left: sandbox-left .5s ease-in-out forwards;
--animate-dialogFadeIn: ;
--tw-enter-blur: 0;
--animate-cmdkScaleOut: cmdkScaleOut .3s cubic-bezier(.175, .885, .32, 1.1);
--container-xl: 1200px;
--tw-animation-direction: normal;
--animate-feedbackFadeIn: feedbackFadeIn .1s cubic-bezier(.16, 1, .3, 1);
--tw-divide-x-reverse: 0;
--animate-slide-in: slide-in 1.25s cubic-bezier(.4, .04, .04, 1) forwards;
--tw-exit-rotate: 0;
--container-sm: 401px;
--animate-feedbackAppear: feedbackAppear .5s .1s ease forwards;
--animate-loading-skeleton: loading-skeleton 1.5s ease-in-out infinite reverse;
--animate-flip-back: flip-back .5s cubic-bezier(.4, .04, .04, 1) forwards;
--tw-gradient-from-position: 0%;
--animate-thinking-loader-fast: thinking-loader .85s linear infinite;
--tw-animation-fill-mode: none;
--tw-exit-blur: 0;
--animate-feedbackFadeOut: feedbackFadeOut .2s cubic-bezier(.16, 1, .3, 1) forwards;
--tw-enter-translate-x: 0;
--container-4xl: 56rem;
--animate-fade-in: fade-in 1.25s cubic-bezier(.4, .04, .04, 1) forwards;
--animate-fadeInTooltipFaster: fadeInTooltip .1s ease-in .1s forwards;
--animate-blink: blink 1s infinite;
--tw-enter-opacity: 1;
--container-md: 601px;
--aspect-video: 16 / 9;
--animate-loading: loading 8s ease-in-out infinite;
--tw-animation-delay: 0s;
--animate-marquee: marquee 40s linear infinite;
--tw-outline-style: solid;
--ds-black: lab(0% 0 0);
--tw-gradient-from: rgba(0, 0, 0, 0);
--tw-gradient-to: rgba(0, 0, 0, 0);
--tw-gradient-via-position: 50%;
--default-transition-duration: .15s;
--animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
--container-xs: 20rem;
--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
--tw-animation-iteration-count: 1;
--tw-exit-opacity: 1;
--tw-translate-z: 0;
--tw-gradient-via: rgba(0, 0, 0, 0);
--ai-chat-panel-width: 0px;
--container-3xl: 48rem;
--blur-xs: 4px;
--tw-translate-y: 0;
--ease-out: cubic-bezier(0, 0, .2, 1);
--tw-content: "";
--animate-thinking-loader: thinking-loader 1.5s linear infinite;
--tw-translate-x: 0;
--tw-enter-rotate: 0;
--animate-bounce: bounce 1s infinite;
--animate-fadeInTooltip: fadeInTooltip .1s ease-in .4s forwards;
--animate-ping: ping 1s cubic-bezier(0, 0, .2, 1) infinite;
--blur-xl: 24px;
--animate-accordion-down: accordion-down .2s ease-out;
--tw-scale-z: 1;
--tw-scroll-snap-strictness: proximity;
--container-lg: 961px;
--ease-in-out: cubic-bezier(.4, 0, .2, 1);
--animate-cmdkFadeOut: cmdkFadeOut .3s cubic-bezier(.175, .885, .32, 1.1);
--value: 0;
--animate-accordion-up: accordion-up .2s ease-out;
--animate-sandbox-right: sandbox-right .5s ease-in-out forwards;
--animate-logo-carousel: logo-carousel ease-in-out infinite;
--container-5xl: 64rem;
--animate-sandbox-right-reverse: sandbox-right-reverse .5s ease-in-out forwards;
--perspective-distant: 1200px;
--animate-spin: spin 1s linear infinite;
--tw-divide-y-reverse: 0;
--tw-exit-scale: 1;
--container-2xl: 1400px;
--tw-enter-translate-y: 0;
--tw-scale-x: 1;
--animate-dialogFadeOut: ;
--blur-sm: 8px;
--animate-cmdkLoading: cmdkLoading 1.1s cubic-bezier(.455, .03, .515, .955) infinite;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| xs | 320px | max-width |
| xs | 360px | max-width |
| xs | 370px | max-width |
| xs | 374px | max-width |
| xs | 375px | min-width |
| xs | 380px | max-width |
| 400px | 400px | max-width |
| 401px | 401px | min-width |
| 410px | 410px | max-width |
| sm | 420px | max-width |
| sm | 427px | max-width |
| sm | 428px | min-width |
| sm | 430px | max-width |
| sm | 440px | max-width |
| sm | 450px | max-width |
| sm | 456px | max-width |
| sm | 470px | min-width |
| sm | 480px | max-width |
| sm | 500px | max-width |
| sm | 513px | max-width |
| sm | 514px | min-width |
| sm | 540px | max-width |
| sm | 544px | max-width |
| sm | 600px | min-width |
| sm | 601px | max-width |
| sm | 610px | min-width |
| sm | 640px | max-width |
| sm | 650px | min-width |
| sm | 660px | max-width |
| sm | 670px | max-width |
| sm | 690px | max-width |
| sm | 700px | min-width |
| md | 710px | max-width |
| md | 711px | min-width |
| md | 736px | max-width |
| md | 740px | max-width |
| md | 745px | max-width |
| md | 750px | max-width |
| md | 768px | max-width |
| md | 769px | min-width |
| md | 780px | max-width |
| md | 800px | min-width |
| 860px | 860px | max-width |
| 900px | 900px | max-width |
| lg | 960px | min-width |
| lg | 961px | min-width |
| lg | 992px | min-width |
| lg | 997px | max-width |
| lg | 1000px | max-width |
| lg | 1020px | max-width |
| lg | 1024px | min-width |
| lg | 1036px | min-width |
| lg | 1048px | min-width |
| lg | 1050px | max-width |
| lg | 1060px | min-width |
| lg | 1070px | min-width |
| lg | 1080px | max-width |
| 1100px | 1100px | max-width |
| 1108px | 1108px | max-width |
| 1120px | 1120px | max-width |
| 1150px | 1150px | min-width |
| 1151px | 1151px | min-width |
| 1200px | 1200px | max-width |
| xl | 1240px | max-width |
| xl | 1248px | min-width |
| xl | 1250px | max-width |
| 1400px | 1400px | min-width |
| 2xl | 1480px | min-width |
| 2300px | 2300px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.2s`, `0.15s`, `0.08s`, `0.175s`, `0.13s`, `0.11s`, `0.09s`, `0.3s`, `0.4s`, `0.16s`, `0.1s`, `0.25s`

### Common Transitions

```css
transition: all;
transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), fill 0.2s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.2s cubic-bezier(0.4, 0, 0.2, 1);
transition: box-shadow 0.15s;
transition: border-color 0.15s, box-shadow 0.15s;
transition: border-color 0.15s, background 0.15s, color 0.15s, transform 0.15s, box-shadow 0.15s;
transition: opacity 0.08s ease-out, transform 0.175s ease-in-out, filter 0.08s ease-out;
transition: opacity 0.13s ease-out, transform 0.2s ease-in-out, filter 0.13s ease-out;
transition: opacity 0.11s ease-out, transform 0.175s ease-in-out, filter 0.11s ease-out;
transition: 0.15s cubic-bezier(0.3, 0.57, 0.07, 0.95);
transition: box-shadow 0.2s, background-color 0.2s;
```

### Keyframe Animations

**monorepo-deploy-card-module__jWGO8G__pulse**
```css
@keyframes monorepo-deploy-card-module__jWGO8G__pulse {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  40% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
}
```

**copy-button-module__8qN89q__fadeIn**
```css
@keyframes copy-button-module__8qN89q__fadeIn {
  0% { opacity: 0; scale: 0.5; }
  100% { opacity: 1; scale: 1; }
}
```

**copy-button-module__8qN89q__fadeOut**
```css
@keyframes copy-button-module__8qN89q__fadeOut {
  0% { opacity: 1; scale: 1; }
  100% { opacity: 0; scale: 0.5; }
}
```

**v0-avatar-module__Kz8jga__drawAndErase**
```css
@keyframes v0-avatar-module__Kz8jga__drawAndErase {
  0% { stroke-dashoffset: 2px; }
  30%, 76% { stroke-dashoffset: 1px; }
  96%, 100% { stroke-dashoffset: 0; }
}
```

**v0-avatar-module__Kz8jga__drawAndEraseFirst**
```css
@keyframes v0-avatar-module__Kz8jga__drawAndEraseFirst {
  0%, 9% { stroke-dashoffset: 0; }
  29%, 71% { stroke-dashoffset: 1px; }
  91%, 100% { stroke-dashoffset: 2px; }
}
```

**v0-avatar-module__Kz8jga__drawAndEraseSecond**
```css
@keyframes v0-avatar-module__Kz8jga__drawAndEraseSecond {
  0%, 15% { stroke-dashoffset: 0; }
  35%, 59% { stroke-dashoffset: 1px; }
  79%, 100% { stroke-dashoffset: 2px; }
}
```

**v0-avatar-module__Kz8jga__drawAndEraseThird**
```css
@keyframes v0-avatar-module__Kz8jga__drawAndEraseThird {
  0%, 23% { stroke-dashoffset: 2px; }
  39%, 65% { stroke-dashoffset: 1px; }
  80%, 100% { stroke-dashoffset: 0; }
}
```

**new-dialog-module__nmtR7W__fadeIn**
```css
@keyframes new-dialog-module__nmtR7W__fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**new-dialog-module__nmtR7W__fadeOut**
```css
@keyframes new-dialog-module__nmtR7W__fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

**group-log-rows-module__JxqD1W__flash**
```css
@keyframes group-log-rows-module__JxqD1W__flash {
  50% { background-color: var(--accents-2); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (62 instances)

```css
.button {
  background-color: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  font-size: 14px;
  font-weight: 500;
  padding-top: 0px;
  padding-right: 14px;
  border-radius: 6px;
}
```

### Cards (27 instances)

```css
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 2px 2px 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Inputs (10 instances)

```css
.input {
  background-color: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  border-color: rgb(235, 235, 235);
  border-radius: 0px;
  font-size: 14px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (337 instances)

```css
.link {
  color: rgb(77, 77, 77);
  font-size: 14px;
  font-weight: 400;
}
```

### Navigation (561 instances)

```css
.navigatio {
  background-color: rgb(250, 250, 250);
  color: rgb(77, 77, 77);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
  box-shadow: rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 114, 245) 0px 0px 0px 4px;
}
```

### Footer (19 instances)

```css
.foote {
  background-color: rgb(250, 250, 250);
  color: rgb(23, 23, 23);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 14px;
}
```

### Dropdowns (546 instances)

```css
.dropdown {
  border-radius: 0px;
  border-color: rgb(235, 235, 235);
  padding-top: 0px;
}
```

### Badges (14 instances)

```css
.badge {
  background-color: rgb(235, 245, 255);
  color: rgb(77, 77, 77);
  font-size: 14px;
  font-weight: 500;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Tabs (8 instances)

```css
.tab {
  color: rgb(23, 23, 23);
  font-size: 14px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 16px;
  border-color: rgb(23, 23, 23);
  border-radius: 64px;
}
```

### Tooltips (2 instances)

```css
.tooltip {
  background-color: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  font-size: 16px;
  border-radius: 6px;
  padding-top: 0px;
  padding-right: 0px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.02) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 4px 8px 0px, rgb(250, 250, 250) 0px 0px 0px 1px, rgb(255, 255, 255) 0px 0px 0px 1px;
}
```

### Switches (17 instances)

```css
.switche {
  background-color: rgb(23, 23, 23);
  border-radius: 0px;
  border-color: rgb(235, 235, 235);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(250, 250, 250);
  color: rgb(23, 23, 23);
  padding: 0px 24px 0px 24px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  padding: 0px 6px 0px 6px;
  border-radius: 6px;
  border: 0px none rgb(23, 23, 23);
  font-size: 14px;
  font-weight: 500;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 6px 0px 6px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 14px;
  font-weight: 500;
```

### Input — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  padding: 0px 12px 0px 12px;
  border-radius: 8px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 2 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgb(23, 23, 23);
  color: rgb(255, 255, 255);
  padding: 0px 14px 0px 14px;
  border-radius: 8px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 500;
```

**Variant 2** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 14px 0px 14px;
  border-radius: 8px;
  border: 0px none rgb(23, 23, 23);
  font-size: 16px;
  font-weight: 500;
```

### Button — 4 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 6px 0px 6px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 500;
```

**Variant 2** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 6px 0px 6px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 500;
```

### Button — 5 instances, 1 variant

**Variant 1** (5 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  padding: 0px 14px 0px 14px;
  border-radius: 8px;
  border: 0px none rgb(23, 23, 23);
  font-size: 16px;
  font-weight: 500;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 500;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 500;
```

### Card — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 400;
```

### Card — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 400;
```

## Layout System

**106 grid containers** and **844 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1280px | 0px |
| 1080px | 0px |
| 1448px | 24px |
| 550px | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 1-column | 90x |
| 3-column | 10x |
| 12-column | 4x |
| 6-column | 2x |

### Grid Templates

```css
grid-template-columns: 359.656px 359.656px 359.656px;
grid-template-columns: 359.656px 359.656px 359.656px;
grid-template-columns: 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px;
grid-template-columns: 359.656px 359.656px 359.656px;
grid-template-columns: 359.656px 359.656px 359.656px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 573x |
| column/nowrap | 265x |
| row/wrap | 5x |
| column-reverse/nowrap | 1x |

**Gap values:** `10px`, `12px`, `14px`, `16px`, `20px`, `24px`, `2px`, `32px`, `32px 8px`, `40px`, `4px`, `6px`, `8px`, `8px normal`, `96px`

## Responsive Design

### Viewport Snapshots

| Viewport | Body Font | Nav Visible | Max Columns | Hamburger | Page Height |
|----------|-----------|-------------|-------------|-----------|-------------|
| mobile (375px) | 16px | No | 3 | No | 812px |
| tablet (768px) | 16px | No | 1 | No | 1024px |
| desktop (1280px) | 16px | No | 2 | No | 800px |
| wide (1920px) | 16px | No | 2 | No | 1080px |

### Breakpoint Changes

**375px → 768px** (mobile → tablet):
- H1 size: `30px` → `36px`
- Max grid columns: `3` → `1`
- Page height: `812px` → `1024px`

**768px → 1280px** (tablet → desktop):
- H1 size: `36px` → `48px`
- Max grid columns: `1` → `2`
- Page height: `1024px` → `800px`

**1280px → 1920px** (desktop → wide):
- Page height: `800px` → `1080px`

## Interaction States

### Button States

**""**
```css
/* Focus */
outline: oklab(0 0 0 / 0.0392157) none 3px → oklab(0 0 0 / 0.0392157) auto 1px;
```

**""**
```css
/* Focus */
outline: oklab(0 0 0 / 0.0392157) none 3px → oklab(0 0 0 / 0.0392157) auto 1px;
```

**""**
```css
/* Focus */
outline: oklab(0 0 0 / 0.0392157) none 3px → oklab(0 0 0 / 0.0392157) auto 1px;
```

### Link Hover

```css
background-color: rgba(0, 0, 0, 0) → rgba(0, 0, 0, 0.05);
```

### Input Focus

```css
outline: oklab(0 0 0 / 0.0392157) none 3px → oklab(0 0 0 / 0.0392157) none 1px;
```

## Accessibility (WCAG 2.1)

**Overall Score: 44%** — 4 passing, 5 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#0072f5` | `#ffffff` | 4.44:1 | FAIL | a (4x) |
| `#0068d6` | `#cce6ff` | 4.13:1 | FAIL | span (1x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#4d4d4d` | `#ffffff` | 8.45:1 | AAA |
| `#4d4d4d` | `#fafafa` | 8.1:1 | AAA |

## Dark Mode

The site has a distinct dark mode color scheme:

- **Backgrounds:** `#000000`, `#0a0a0a`
- **Text:** `#ededed`, `#8f8f8f`, `#ffffff`, `#0a0a0a`, `#7d7d7d`

### Dark Mode CSS Variables

```css
--foreground: var(--ds-gray-1000);
--card: var(--ds-background-100);
--card-foreground: var(--ds-gray-1000);
--popover: var(--ds-background-100);
--popover-foreground: var(--ds-gray-1000);
--primary: var(--ds-gray-1000);
--primary-foreground: var(--ds-background-100);
--secondary: var(--ds-gray-alpha-100);
--secondary-foreground: var(--ds-gray-1000);
--muted: var(--ds-gray-alpha-100);
--muted-foreground: var(--ds-gray-700);
--accent: var(--ds-gray-alpha-100);
--accent-foreground: var(--ds-gray-1000);
--destructive: var(--ds-red-700);
--border: var(--ds-gray-alpha-200);
--ring: var(--ds-gray-alpha-400);
--chart-1: var(--ds-blue-700);
--chart-2: var(--ds-teal-700);
--chart-3: var(--ds-purple-700);
--chart-4: var(--ds-amber-700);
--chart-5: var(--ds-pink-700);
--sidebar-foreground: var(--ds-gray-1000);
--sidebar-primary: var(--ds-gray-1000);
--sidebar-primary-foreground: var(--ds-background-100);
--sidebar-accent: var(--ds-gray-alpha-100);
--sidebar-accent-foreground: var(--ds-gray-1000);
--sidebar-border: var(--ds-gray-alpha-200);
--sidebar-ring: var(--ds-gray-alpha-400);
--destructive-foreground: var(--ds-background-100);
--ds-shadow-border-large: 0 0 0 1px #ffffff25,0px 2px 2px #0000000a,0px 8px 16px -4px #0000000a,0 0 0 1px hsla(0,0%,0%,1);
--geist-console-text-color-default: #fff;
--tw-inset-ring-shadow: 0 0 #0000;
--geist-secondary-lighter: #333;
--color-cyan-200: oklch(91.7% .08 205.041);
--header-border-bottom: 0 1px 0 0 #ffffff1a;
--geist-secondary-dark: #eaeaea;
--ds-focus-ring: 0 0 0 2px hsla(0,0%,4%,1),0 0 0 4px hsla(210,100%,66%,1);
--accents-3: #444;
--color-yellow-950: oklch(28.6% .066 53.813);
--geist-selection-text-color: hsla(0,0%,10%,1);
--accents-8: #fafafa;
--color-zinc-900: oklch(21% .006 285.885);
--accents-2: #333;
--color-yellow-50: oklch(98.7% .026 102.212);
--color-gray-950: oklch(13% .028 261.692);
--ds-shadow-border-small: 0 0 0 1px #ffffff25,0px 1px 2px #00000029,0 0 0 1px hsla(0,0%,0%,1);
--color-border: #ffffff17;
--tw-ring-shadow: 0 0 #0000;
--ds-shadow-background-border: 0 0 0 1px hsla(0,0%,0%,1);
--geist-foreground-rgb: 255,255,255;
--geist-console-text-color-blue: #3291ff;
--tw-ring-offset-width: 0px;
--accents-4: #666;
--tw-ring-offset-shadow: 0 0 #0000;
--geist-secondary-light: #444;
--color-green-50: oklch(98.2% .018 155.826);
--ds-motion-popover-timing: cubic-bezier(.175,.885,.32,1.1);
--color-indigo-950: oklch(25.7% .09 281.288);
--color-indigo-200: oklch(87% .065 274.039);
--ds-motion-popover-duration: .2s;
--color-red-950: oklch(25.8% .092 26.042);
--color-indigo-900: oklch(35.9% .144 278.697);
--color-cyan-950: oklch(30.2% .056 229.695);
--color-yellow-500: oklch(79.5% .184 86.047);
--ds-shadow-border-medium: 0 0 0 1px #ffffff25,0px 2px 2px #00000052,0px 8px 8px -8px #00000029,0 0 0 1px hsla(0,0%,0%,1);
--color-zinc-100: oklch(96.7% .001 286.375);
--accents-6: #999;
--color-yellow-400: oklch(85.2% .199 91.936);
--color-slate-300: oklch(86.9% .022 252.894);
--ds-shadow-border: 0 0 0 1px #ffffff25,0 0 0 1px hsla(0,0%,0%,1);
--color-yellow-300: oklch(90.5% .182 98.111);
--color-neutral-700: oklch(37.1% 0 0);
--geist-violet-background-secondary: #211830;
--ds-overlay-backdrop-color: hsla(0,0%,0%,1);
--ds-shadow-border-base: 0 0 0 1px #ffffff25;
--color-cyan-50: oklch(98.4% .019 200.873);
--color-green-950: oklch(26.6% .065 152.934);
--ds-shadow-border-inset: inset 0 0 0 1px #ffffff1a;
--color-zinc-600: oklch(44.2% .017 285.786);
--color-yellow-200: oklch(94.5% .129 101.54);
--tw-border-style: solid;
--color-cyan-900: oklch(39.8% .07 227.392);
--animate-fadeOutPopover: fadeOut cubic-bezier(.175,.885,.32,1.1) .2s;
--ds-focus-color: hsla(210,100%,66%,1);
--accents-7: #eaeaea;
--color-gray-50: oklch(98.5% .002 247.839);
--geist-console-text-color-purple: #7928ca;
--tw-ring-offset-color: #fff;
--geist-console-text-color-pink: #eb367f;
--color-indigo-50: oklch(96.2% .018 272.314);
--accents-1: #111;
--color-purple-950: oklch(29.1% .149 302.717);
--color-indigo-600: oklch(51.1% .262 276.966);
--geist-secondary: #888;
--ds-focus-border: 0 0 0 1px #ffffff82,0px 0px 0px 4px #ffffff3d;
--accents-5: #888;
--color-yellow-900: oklch(42.1% .095 57.708);
--color-purple-50: oklch(97.7% .014 308.299);
--geist-foreground: #fff;
--color-amber-950: oklch(27.9% .077 45.635);
--color-red-50: oklch(97.1% .013 17.38);
--next-icon-border: #fff;
--geist-link-color: hsla(210,100%,66%,1);
--color-neutral-800: oklch(26.9% 0 0);
--color-amber-50: oklch(98.7% .022 95.277);
--geist-space-64x: 256px;
--geist-space-small-negative: -32px;
--tw-space-x-reverse: 0;
--geist-space-16x: 64px;
--geist-space-large-negative: -48px;
--geist-space-gap-half-negative: -12px;
--geist-gap-half: 12px;
--geist-space-24x: 96px;
--geist-space-2x-negative: -8px;
--geist-space-gap-quarter-negative: -8px;
--geist-space-large: 48px;
--geist-gap-half-negative: -12px;
--geist-space-32x-negative: -128px;
--tw-space-y-reverse: 0;
--geist-space-8x-negative: -32px;
--geist-gap-quarter: 8px;
--geist-space-3x: 12px;
--geist-gap-quarter-negative: -8px;
--geist-space-small: 32px;
--geist-gap: 24px;
--geist-space-48x-negative: -192px;
--font-space-grotesk: Space Grotesk,"Geist","Geist Fallback",Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
--geist-space-negative: -4px;
--ds-page-width-with-margin: calc(1400px + calc(2 * 24px));
--geist-page-width-with-margin: calc(1200px + calc(2 * 24px));
--geist-gap-double: 48px;
--geist-space-16x-negative: -64px;
--geist-space-gap: 24px;
--geist-space-gap-negative: -24px;
--geist-space-4x: 16px;
--geist-space-medium: 40px;
--geist-space-gap-quarter: 8px;
--geist-space-24x-negative: -96px;
--geist-space-48x: 192px;
--geist-gap-section: 32px;
--spacing: .25rem;
--geist-space-gap-half: 12px;
--geist-space: 4px;
--geist-gap-negative: -24px;
--geist-space-32x: 128px;
--geist-gap-double-negative: -48px;
--geist-page-margin: 24px;
--geist-space-6x: 24px;
--geist-space-8x: 32px;
--geist-space-4x-negative: -16px;
--geist-space-64x-negative: -256px;
--geist-space-10x: 40px;
--geist-space-medium-negative: -40px;
--geist-space-2x: 8px;
--font-weight-bold: 700;
--ship-text: #ff5b4f;
--text-base--line-height: calc(1.5 / 1);
--font-mono: "Geist Mono",ui-monospace,SFMono-Regular,Roboto Mono,Menlo,Monaco,Liberation Mono,DejaVu Sans Mono,Courier New,monospace,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
--text-sm: .875rem;
--geist-form-small-font: .875rem;
--geist-form-large-font: 1rem;
--text-lg: 1.125rem;
--geist-form-small-line-height: .875rem;
--text-6xl: 3.75rem;
--default-font-family: "Geist","Geist Fallback",Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
--develop-text: #0a72ef;
--font-weight-extrabold: 800;
--text-sm--line-height: calc(1.25 / .875);
--text-3xl--line-height: calc(2.25 / 1.875);
--text-3xl: 1.875rem;
--text-xs: .75rem;
--tracking-widest: .1em;
--font-weight-medium: 500;
--font-weight-normal: 400;
--font-sans-fallback: "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
--text-base: 1rem;
--default-mono-font-family: "Geist Mono",ui-monospace,SFMono-Regular,Roboto Mono,Menlo,Monaco,Liberation Mono,DejaVu Sans Mono,Courier New,monospace,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
--preview-text: #de1d8d;
--geist-text-gradient: linear-gradient(180deg,#fff,#ffffffbf);
--text-xs--line-height: calc(1 / .75);
--text-xl: 1.25rem;
--leading-relaxed: 1.625;
--leading-snug: 1.375;
--geist-form-line-height: 1.25rem;
--text-2xl--line-height: calc(2 / 1.5);
--text-xl--line-height: calc(1.75 / 1.25);
--font-mono-fallback: "Roboto Mono",Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace;
--geist-form-font: .875rem;
--leading-tight: 1.25;
--font-geist-sans: "Geist","Geist Fallback",Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
--geist-form-large-line-height: 1.5rem;
--text-4xl--line-height: calc(2.5 / 2.25);
--tracking-tight: -.025em;
--text-2xl: 1.5rem;
--text-5xl--line-height: 1;
--leading-normal: 1.5;
--text-lg--line-height: calc(1.75 / 1.125);
--font-sans: "Geist","Geist Fallback",Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
--font-geist-mono: "Geist Mono",ui-monospace,SFMono-Regular,Roboto Mono,Menlo,Monaco,Liberation Mono,DejaVu Sans Mono,Courier New,monospace,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
--tracking-wide: .025em;
--font-weight-semibold: 600;
--text-4xl: 2.25rem;
--tracking-normal: 0em;
--text-5xl: 3rem;
--text-6xl--line-height: 1;
--tw-inset-shadow: 0 0 #0000;
--dropdown-box-shadow: 0 0 0 1px #333;
--tw-shadow-alpha: 100%;
--ds-shadow-large: 0px 2px 2px #0000000a,0px 8px 16px -4px #0000000a;
--shadow-sticky: 0 0 0 1px #333;
--tw-drop-shadow-alpha: 100%;
--shadow-large: 0 0 0 1px #333;
--ds-shadow-small: 0px 1px 2px #00000029;
--shadow-medium: 0 0 0 1px #333;
--ds-shadow-xl: 0px 1px 1px #00000005,0px 4px 8px -4px #0000000a,0px 16px 24px -8px #0000000f;
--ds-shadow-modal: 0 0 0 1px #ffffff25,0px 1px 1px #00000005,0px 8px 16px -4px #0000000a,0px 24px 32px -8px #0000000f,0 0 0 1px hsla(0,0%,0%,1);
--ds-shadow-medium: 0px 2px 2px #00000052,0px 8px 8px -8px #00000029;
--tw-shadow: 0 0 #0000;
--shadow-hover: 0 0 0 1px #fff;
--tw-inset-shadow-alpha: 100%;
--ds-shadow-2xl: 0px 1px 1px #00000005,0px 8px 16px -4px #0000000a,0px 24px 32px -8px #0000000f;
--drop-shadow-lg: 0 4px 4px #00000026;
--shadow-smallest: 0 0 0 1px #333;
--ds-shadow-tooltip: 0 0 0 1px #ffffff25,0px 1px 1px #00000005,0px 4px 8px #0000000a,0 0 0 1px hsla(0,0%,0%,1);
--ds-shadow-xs: 0px 1px 2px #00000029;
--ds-shadow-2xs: 0px 1px 1px #00000029;
--shadow-small: 0 0 0 1px #333;
--ds-shadow-fullscreen: 0 0 0 1px #ffffff25,0px 1px 1px #00000005,0px 8px 16px -4px #0000000a,0px 24px 32px -8px #0000000f,0 0 0 1px hsla(0,0%,0%,1);
--shadow-extra-small: 0 0 0 1px #333;
--ds-shadow-menu: 0 0 0 1px #ffffff25,0px 1px 1px #00000005,0px 4px 8px -4px #0000000a,0px 16px 24px -8px #0000000f,0 0 0 1px hsla(0,0%,0%,1);
--radius: var(--geist-radius,.625rem);
--geist-radius: 6px;
--geist-marketing-radius: 8px;
--radius-3xl: 1.5rem;
--background: var(--ds-background-100);
--input: var(--ds-gray-alpha-200);
--sidebar: var(--ds-background-100);
--success: var(--ds-green-700);
--geist-cyan-lighter: #aaffec;
--ds-amber-700: hsla(39,100%,57%,1);
--ds-pink-300-value: 335,47%,21%;
--ease-in: cubic-bezier(.4,0,1,1);
--geist-error: red;
--ds-amber-900: hsla(39,90%,50%,1);
--ds-green-200: hsla(137,50%,12%,1);
--tw-enter-scale: 1;
--ds-red-800-value: 358,69%,52%;
--geist-violet-lighter: #d8ccf1;
--ds-green-1000: hsla(136,73%,94%,1);
--ds-red-1000: hsla(353,90%,96%,1);
--wv-orange: #ffa400;
--ds-amber-800-value: 35,100%,52%;
--ds-gray-alpha-600: #ffffff82;
--animate-cmdkScaleIn: cmdkScaleIn .3s cubic-bezier(.175,.885,.32,1.1);
--ds-pink-300: hsla(335,47%,21%,1);
--develop-start-gradient: #007cf0;
--geist-violet-background-tertiary: #211830;
--ds-gray-alpha-100: #ffffff0f;
--ds-teal-700-value: 173,80%,36%;
--tw-exit-translate-y: 0;
--ds-blue-1000: hsla(206,100%,96%,1);
--tw-gradient-to-position: 100%;
--ds-amber-600: hsla(39,85%,49%,1);
--ds-white: oklch(100% 0 0);
--ds-background-200: hsla(0,0%,0%,1);
--ds-red-500-value: 357,60%,32%;
--dropdown-triangle-stroke: #333;
--ds-blue-400: hsla(212,78%,23%,1);
--ds-teal-700: hsla(173,80%,36%,1);
--geist-highlight-magenta: #eb367f;
--ds-red-200: hsla(357,46%,16%,1);
--ds-green-800: hsla(132,43%,39%,1);
--ds-purple-1000: hsla(281,73%,96%,1);
--vh100-offset: calc(64px + 0px);
--ds-green-100-value: 136,50%,9%;
--ds-gray-500: hsla(0,0%,27%,1);
--scroller-start: #000;
--vaul-overlay-background-end: #0006;
--ds-purple-800: hsla(272,47%,45%,1);
--ds-purple-300: hsla(279,44%,23%,1);
--ds-amber-500: hsla(35,91%,22%,1);
--tw-scale-y: 1;
--animate-cmdkFadeIn: cmdkFadeIn .3s cubic-bezier(.175,.885,.32,1.1);
--scroller-end: #0000;
--ds-red-700-value: 358,75%,59%;
--container-6xl: 72rem;
--geist-background-rgb: 0,0,0;
--tw-exit-translate-x: 0;
--ds-blue-1000-value: 206,100%,96%;
--ds-pink-500-value: 335,57%,27%;
--ds-blue-200-value: 214,59%,15%;
--header-zindex: 75;
--ds-gray-500-value: 0,0%,27%;
--ds-blue-100: hsla(216,50%,12%,1);
--ds-gray-700: hsla(0,0%,56%,1);
--ds-teal-800-value: 173,83%,30%;
--ds-amber-700-value: 39,100%,57%;
--animate-dialogFadeIn: ;
--ds-teal-200-value: 170,74%,9%;
--ds-purple-400-value: 277,46%,28%;
--ds-contrast-fg: #fff;
--tw-enter-blur: 0;
--ds-amber-1000-value: 40,94%,93%;
--animate-cmdkScaleOut: cmdkScaleOut .3s cubic-bezier(.175,.885,.32,1.1);
--ds-red-700: hsla(358,75%,59%,1);
--geist-highlight-purple: #f81ce5;
--ds-red-400-value: 357,55%,26%;
--ds-teal-500: hsla(172,85%,20%,1);
--geist-code: #fff;
--ds-teal-1000-value: 166,71%,93%;
--ds-gray-1000-value: 0,0%,93%;
--ds-blue-800-value: 212,100%,41%;
--geist-warning-lighter: #ffefcf;
--tw-animation-direction: normal;
--ds-blue-400-value: 212,78%,23%;
--ds-pink-900-value: 341,90%,67%;
--animate-feedbackFadeIn: feedbackFadeIn .1s cubic-bezier(.16,1,.3,1);
--geist-page-width: 1200px;
--ds-purple-100: hsla(283,30%,12%,1);
--ds-gray-200-value: 0,0%,12%;
--ds-red-500: hsla(357,60%,32%,1);
--tw-divide-x-reverse: 0;
--ds-blue-600-value: 206,100%,50%;
--preview-end-gradient: #ff0080;
--tw-exit-rotate: 0;
--develop-end-gradient: #00dfd8;
--ds-purple-600-value: 272,51%,54%;
--ds-blue-700: hsla(212,100%,48%,1);
--ds-purple-300-value: 279,44%,23%;
--ds-amber-600-value: 39,85%,49%;
--container-sm: 24rem;
--ds-green-100: hsla(136,50%,9%,1);
--animate-feedbackAppear: feedbackAppear .5s .1s ease forwards;
--ds-gray-alpha-800: #ffffff78;
--animate-loading-skeleton: loading-skeleton 1.5s ease-in-out infinite reverse;
--ds-gray-900-value: 0,0%,63%;
--header-sub-menu-height: 46px;
--ds-gray-200: hsla(0,0%,12%,1);
--ds-overlay-backdrop-opacity: .8;
--ds-blue-500-value: 211,86%,27%;
--ds-green-700: hsla(131,41%,46%,1);
--ds-amber-100-value: 35,100%,8%;
--ds-pink-200: hsla(335,43%,16%,1);
--tw-gradient-from-position: 0px;
--ds-pink-700: hsla(336,80%,58%,1);
--ds-blue-300: hsla(213,71%,20%,1);
--wv-green: #0cce6b;
--ds-gray-700-value: 0,0%,56%;
--ds-gray-alpha-700: #ffffff8a;
--ds-gray-300-value: 0,0%,16%;
--ds-pink-1000: hsla(333,90%,96%,1);
--ds-red-300-value: 356,54%,22%;
--ds-gray-alpha-400: #ffffff24;
--geist-console-purple: #8a63d2;
--ds-purple-900-value: 275,80%,71%;
--ds-gray-400-value: 0,0%,18%;
--tw-animation-fill-mode: none;
--tw-exit-blur: 0;
--animate-feedbackFadeOut: feedbackFadeOut .2s cubic-bezier(.16,1,.3,1) forwards;
--ds-red-900-value: 358,100%,69%;
--ds-pink-500: hsla(335,57%,27%,1);
--ds-pink-100-value: 335,32%,12%;
--geist-highlight-pink: #ff0080;
--geist-cyan-light: #79ffe1;
--ds-green-600: hsla(135,70%,34%,1);
--ds-red-1000-value: 353,90%,96%;
--vaul-overlay-background-start: #0000;
--ds-green-900: hsla(131,43%,57%,1);
--geist-cyan: #50e3c2;
--ds-pink-900: hsla(341,90%,67%,1);
--tw-enter-translate-x: 0;
--container-4xl: 56rem;
--ds-purple-1000-value: 281,73%,96%;
--ds-amber-800: hsla(35,100%,52%,1);
--ds-green-700-value: 131,41%,46%;
--preview-line-end: #9a1fb8;
--ds-amber-400-value: 35,100%,17%;
--ds-gray-alpha-500: #ffffff3d;
--ds-green-300: hsla(136,50%,14%,1);
--animate-fadeInTooltipFaster: fadeInTooltip .1s ease-in .1s forwards;
--ds-green-300-value: 136,50%,14%;
--ds-blue-900: hsla(210,100%,66%,1);
--ds-gray-600: hsla(0,0%,53%,1);
--ds-purple-500: hsla(274,49%,35%,1);
--ds-pink-800: hsla(336,74%,51%,1);
--ds-green-400: hsla(135,70%,16%,1);
--ds-blue-500: hsla(211,86%,27%,1);
--ds-green-900-value: 131,43%,57%;
--ds-amber-300-value: 33,100%,15%;
--animate-blink: blink 1.4s infinite both;
--ds-amber-400: hsla(35,100%,17%,1);
--tw-enter-opacity: 1;
--ds-motion-overlay-scale: .96;
--geist-form-height: 40px;
--container-md: 28rem;
--header-height: 64px;
--aspect-video: 16/9;
--ds-teal-100: hsla(169,78%,7%,1);
--develop-line-end: #019ae9;
--ds-green-1000-value: 136,73%,94%;
--ds-blue-600: hsla(206,100%,50%,1);
--animate-loading: loading 8s ease-in-out infinite;
--tw-animation-delay: 0s;
--ds-green-800-value: 132,43%,39%;
--ds-amber-500-value: 35,91%,22%;
--geist-success-light: #3291ff;
--tw-outline-style: solid;
--geist-warning-light: #f7b955;
--geist-cyan-dark: #29bc9b;
--geist-success-dark: #0761d1;
--geist-form-small-height: 32px;
--header-import-flow-background: #111c;
--ds-black: oklch(0% 0 0);
--ds-pink-200-value: 335,43%,16%;
--ds-blue-200: hsla(214,59%,15%,1);
--tw-gradient-from: rgba(0, 0, 0, 0);
--tw-gradient-to: rgba(0, 0, 0, 0);
--ds-pink-600: hsla(336,75%,40%,1);
--ds-gray-800: hsla(0,0%,49%,1);
--geist-violet-light: #8a63d2;
--ds-teal-1000: hsla(166,71%,93%,1);
--ds-gray-300: hsla(0,0%,16%,1);
--ds-purple-600: hsla(272,51%,54%,1);
--tw-gradient-via-position: 50%;
--ds-amber-1000: hsla(40,94%,93%,1);
--ds-amber-200: hsla(32,100%,10%,1);
--ds-teal-300-value: 171,75%,13%;
--default-transition-duration: .15s;
--animate-pulse: pulse 2s cubic-bezier(.4,0,.6,1) infinite;
--ds-pink-700-value: 336,80%,58%;
--container-xs: 20rem;
--ds-gray-1000: hsla(0,0%,93%,1);
--ds-purple-200-value: 281,38%,16%;
--ds-teal-400-value: 171,85%,13%;
--ds-green-600-value: 135,70%,34%;
--banner-height: 0px;
--ds-red-200-value: 357,46%,16%;
--ds-blue-900-value: 210,100%,66%;
--default-transition-timing-function: cubic-bezier(.4,0,.2,1);
--tw-animation-iteration-count: 1;
--tw-exit-opacity: 1;
--ds-teal-500-value: 172,85%,20%;
--ds-motion-overlay-timing: cubic-bezier(.175,.885,.32,1.1);
--ds-pink-800-value: 336,74%,51%;
--tw-translate-z: 0;
--tw-gradient-via: rgba(0, 0, 0, 0);
--ds-pink-400: hsla(335,51%,22%,1);
--geist-violet-dark: #4c2889;
--tw-translate-y: 0;
--ease-out: cubic-bezier(0,0,.2,1);
--ship-start-gradient: #ff4d4d;
--ds-gray-100: hsla(0,0%,10%,1);
--ds-page-width: 1400px;
--tw-content: "";
--ds-teal-100-value: 169,78%,7%;
--ds-purple-500-value: 274,49%,35%;
--ds-teal-300: hsla(171,75%,13%,1);
--tw-translate-x: 0;
--tw-enter-rotate: 0;
--ds-gray-100-value: 0,0%,10%;
--ds-gray-alpha-1000: #ffffffeb;
--geist-error-lighter: #f7d4d6;
--ds-red-300: hsla(356,54%,22%,1);
--ds-purple-900: hsla(275,80%,71%,1);
--ds-background-100: hsla(0,0%,4%,1);
--ds-gray-alpha-300: #ffffff21;
--animate-fadeInTooltip: fadeInTooltip .1s ease-in .4s forwards;
--ds-red-400: hsla(357,55%,26%,1);
--geist-marketing-gray: #111;
--ds-red-600: hsla(358,75%,59%,1);
--ds-blue-300-value: 213,71%,20%;
--ds-teal-900-value: 174,90%,41%;
--ds-motion-timing-swift: cubic-bezier(.175,.885,.32,1.1);
--ds-pink-400-value: 335,51%,22%;
--ds-pink-1000-value: 333,90%,96%;
--ds-purple-400: hsla(277,46%,28%,1);
--ds-blue-800: hsla(212,100%,41%,1);
--ds-amber-900-value: 39,90%,50%;
--geist-form-large-height: 48px;
--geist-warning: #f5a623;
--geist-error-dark: #e60000;
--ds-motion-overlay-duration: .3s;
--ds-purple-800-value: 272,47%,45%;
--wv-red: #ff4e42;
--ds-gray-alpha-900: #ffffff9c;
--ds-gray-900: hsla(0,0%,63%,1);
--geist-violet: #7928ca;
--ship-line-end: #f9cb28;
--geist-console-header: #0f0310;
--geist-success-lighter: #d3e5ff;
--ds-red-100-value: 357,37%,12%;
--geist-error-light: #f33;
--ds-purple-100-value: 283,30%,12%;
--tw-scale-z: 1;
--ds-red-800: hsla(358,69%,52%,1);
--ds-purple-700-value: 272,51%,54%;
--ds-amber-300: hsla(33,100%,15%,1);
--ds-background-200-value: 0,0%,0%;
--ds-green-500: hsla(135,70%,23%,1);
--container-lg: 32rem;
--geist-highlight-yellow: #fff500;
--ds-green-400-value: 135,70%,16%;
--ds-blue-700-value: 212,100%,48%;
--ds-pink-100: hsla(335,32%,12%,1);
--geist-success: #0070f3;
--ds-teal-600: hsla(172,85%,32%,1);
--ds-green-500-value: 135,70%,23%;
--ds-gray-alpha-200: #ffffff17;
--ds-gray-400: hsla(0,0%,18%,1);
--ease-in-out: cubic-bezier(.4,0,.2,1);
--animate-cmdkFadeOut: cmdkFadeOut .3s cubic-bezier(.175,.885,.32,1.1);
--vaul-overlay-background: 255,255,255;
--ds-gray-600-value: 0,0%,53%;
--preview-start-gradient: #7928ca;
--ds-teal-900: hsla(174,90%,41%,1);
--container-5xl: 64rem;
--ds-amber-100: hsla(35,100%,8%,1);
--footer-height: 79px;
--ds-red-900: hsla(358,100%,69%,1);
--geist-background: #000;
--ds-red-600-value: 358,75%,59%;
--ds-background-100-value: 0,0%,4%;
--geist-selection: hsla(0,0%,93%,1);
--ds-teal-400: hsla(171,85%,13%,1);
--ds-purple-700: hsla(272,51%,54%,1);
--animate-spin: spin 1s linear infinite;
--geist-warning-dark: #ab570a;
--ds-gray-800-value: 0,0%,49%;
--ds-blue-100-value: 216,50%,12%;
--tw-divide-y-reverse: 0;
--ds-teal-200: hsla(170,74%,9%,1);
--container-2xl: 42rem;
--tw-exit-scale: 1;
--ds-purple-200: hsla(281,38%,16%,1);
--ds-amber-200-value: 32,100%,10%;
--tw-enter-translate-y: 0;
--tw-scale-x: 1;
--animate-dialogFadeOut: ;
--ds-teal-600-value: 172,85%,32%;
--ds-green-200-value: 137,50%,12%;
--ship-end-gradient: #f9cb28;
--ds-red-100: hsla(357,37%,12%,1);
--container-7xl: 80rem;
--geist-violet-background: #291d3a;
--ds-teal-800: hsla(173,83%,30%,1);
--blur-sm: 8px;
--animate-cmdkLoading: cmdkLoading 1.1s cubic-bezier(.455,.03,.515,.955) infinite;
--ds-pink-600-value: 336,75%,40%;
--radius: --geist-radius;
--background: --ds-background-100;
--foreground: --ds-gray-1000;
--card: --ds-background-100;
--card-foreground: --ds-gray-1000;
--popover: --ds-background-100;
--popover-foreground: --ds-gray-1000;
--primary: --ds-gray-1000;
--primary-foreground: --ds-background-100;
--secondary: --ds-gray-alpha-100;
--secondary-foreground: --ds-gray-1000;
--muted: --ds-gray-alpha-100;
--muted-foreground: --ds-gray-700;
--accent: --ds-gray-alpha-100;
--accent-foreground: --ds-gray-1000;
--destructive: --ds-red-700;
--border: --ds-gray-alpha-200;
--input: --ds-gray-alpha-200;
--ring: --ds-gray-alpha-400;
--chart-1: --ds-blue-700;
--chart-2: --ds-teal-700;
--chart-3: --ds-purple-700;
--chart-4: --ds-amber-700;
--chart-5: --ds-pink-700;
--sidebar: --ds-background-100;
--sidebar-foreground: --ds-gray-1000;
--sidebar-primary: --ds-gray-1000;
--sidebar-primary-foreground: --ds-background-100;
--sidebar-accent: --ds-gray-alpha-100;
--sidebar-accent-foreground: --ds-gray-1000;
--sidebar-border: --ds-gray-alpha-200;
--sidebar-ring: --ds-gray-alpha-400;
--destructive-foreground: --ds-background-100;
--success: --ds-green-700;
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Design System Score

**Overall: 75/100 (Grade: C)**

| Category | Score |
|----------|-------|
| Color Discipline | 80/100 |
| Typography Consistency | 82/100 |
| Spacing System | 85/100 |
| Shadow Consistency | 78/100 |
| Border Radius Consistency | 80/100 |
| Accessibility | 44/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Well-defined spacing scale, Good CSS variable tokenization

**Issues:**
- 5 WCAG contrast failures
- 490 !important rules — prefer specificity over overrides
- 6142 duplicate CSS declarations

## Gradients

**11 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| conic | from 180deg at 50% 70% | 6 | complex |
| linear | to right | 4 | bold |
| linear | — | 4 | bold |
| linear | to right | 4 | bold |
| linear | — | 4 | bold |
| linear | to right | 4 | bold |
| linear | — | 4 | bold |
| linear | to right | 4 | bold |
| linear | — | 4 | bold |
| linear | to right | 4 | bold |
| linear | — | 4 | bold |

```css
background: conic-gradient(from 180deg at 50% 70%, rgba(250, 250, 250, 0) 0deg, rgb(238, 195, 45) 72deg, rgb(236, 75, 75) 144deg, rgb(112, 154, 185) 216deg, rgb(77, 255, 191) 288deg, rgba(250, 250, 250, 0) 360deg);
background: linear-gradient(to right, rgb(235, 235, 235), rgb(235, 235, 235) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
background: linear-gradient(rgb(235, 235, 235), rgb(235, 235, 235) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
background: linear-gradient(to right, rgb(212, 238, 247), rgb(212, 238, 247) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
background: linear-gradient(rgb(212, 238, 247), rgb(212, 238, 247) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

## Z-Index Map

**14 unique z-index values** across 4 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 1000,999999999 | a.s.k.i.p.-.n.a.v.-.l.i.n.k.-.m.o.d.u.l.e._._.u.w.4.z.X.a._._.s.k.i.p.L.i.n.k, a.f.i.x.e.d. .-.m.-.p.x. .o.v.e.r.f.l.o.w.-.h.i.d.d.e.n. .w.h.i.t.e.s.p.a.c.e.-.n.o.w.r.a.p. .b.o.r.d.e.r.-.0. .t.o.p.-.1.6. .l.e.f.t.-.1.2. .z.-.[.1.0.0.0.]. .h.-.3.2. .f.l.e.x. .i.t.e.m.s.-.c.e.n.t.e.r. .o.u.t.l.i.n.e.-.n.o.n.e. .t.e.x.t.-.[.v.a.r.(.-.-.g.e.i.s.t.-.l.i.n.k.-.c.o.l.o.r.).]. .p.x.-.1.2. .p.y.-.0. .b.g.-.[.v.a.r.(.-.-.g.e.i.s.t.-.b.a.c.k.g.r.o.u.n.d.).]. .s.h.a.d.o.w.-.[.0._.0._.0._.2.p.x._.v.a.r.(.-.-.g.e.i.s.t.-.b.a.c.k.g.r.o.u.n.d.).,.0._.0._.0._.4.p.x._.v.a.r.(.-.-.g.e.i.s.t.-.l.i.n.k.-.c.o.l.o.r.).]. .r.o.u.n.d.e.d.-.[.v.a.r.(.-.-.g.e.i.s.t.-.r.a.d.i.u.s.).]. .o.p.a.c.i.t.y.-.0. .p.o.i.n.t.e.r.-.e.v.e.n.t.s.-.n.o.n.e. .f.o.c.u.s.:.o.p.a.c.i.t.y.-.1.0.0. .f.o.c.u.s.:.[.p.o.i.n.t.e.r.-.e.v.e.n.t.s.:._.a.l.l.], a.s.k.i.p.-.n.a.v.-.l.i.n.k.-.m.o.d.u.l.e._._.u.w.4.z.X.a._._.s.k.i.p.L.i.n.k |
| dropdown | 100,100 | aside.s.h.r.i.n.k.-.0. .z.-.[.1.0.0.]. .s.t.i.c.k.y. .h.-.s.c.r.e.e.n. .t.o.p.-.0. .r.i.g.h.t.-.0. .t.r.a.n.s.i.t.i.o.n.-.t.r.a.n.s.f.o.r.m.a.t.i.o.n. .e.a.s.e.-.i.n.-.o.u.t. .t.r.a.n.s.i.t.i.o.n.-.[.w.i.d.t.h.]. .d.u.r.a.t.i.o.n.-.2.5.0. .w.-.0. .o.v.e.r.f.l.o.w.-.h.i.d.d.e.n, aside.s.h.r.i.n.k.-.0. .z.-.[.1.0.0.]. .s.t.i.c.k.y. .h.-.s.c.r.e.e.n. .t.o.p.-.0. .r.i.g.h.t.-.0. .t.r.a.n.s.i.t.i.o.n.-.t.r.a.n.s.f.o.r.m.a.t.i.o.n. .e.a.s.e.-.i.n.-.o.u.t. .t.r.a.n.s.i.t.i.o.n.-.[.w.i.d.t.h.]. .d.u.r.a.t.i.o.n.-.2.5.0. .w.-.0. .o.v.e.r.f.l.o.w.-.h.i.d.d.e.n |
| sticky | 10,80 | div.d.o.m.a.i.n.s.-.m.o.d.u.l.e._._.k.m.v.S.I.a._._.w.i.n.d.o.w, span.v.e.r.c.e.l.-.l.o.g.o. .l.e.f.t.-.6. .t.o.p.-.[.2.3.p.x.]. .z.-.[.v.a.r.(.-.-.h.e.a.d.e.r.-.z.i.n.d.e.x.).]. .i.n.l.i.n.e.-.f.l.e.x. .s.i.z.e.-.5. .r.o.u.n.d.e.d.-.s.m. .n.o.-.u.n.d.e.r.l.i.n.e. .o.u.t.l.i.n.e.-.o.f.f.s.e.t.-.2. .f.i.x.e.d, div.h.e.a.d.e.r.-.m.o.d.u.l.e._._.6.n.z.V.r.W._._.w.r.a.p.p.e.r. .h.e.a.d.e.r.-.m.o.d.u.l.e._._.6.n.z.V.r.W._._.s.t.i.c.k.y. .h.e.a.d.e.r.-.m.o.d.u.l.e._._.6.n.z.V.r.W._._.c.a.n.G.r.o.w. .h.e.a.d.e.r.-.m.o.d.u.l.e._._.6.n.z.V.r.W._._.t.r.a.n.s.p.a.r.e.n.t.U.n.t.i.l.S.c.r.o.l.l |
| base | 0,9 | div.g.r.i.d.-.m.o.d.u.l.e._._.A.M.T.I.x.G._._.b.l.o.c.k. .h.e.r.o.-.m.o.d.u.l.e._._.p.X.b.8.l.W._._.g.r.a.d.i.e.n.t, div.g.r.i.d.-.m.o.d.u.l.e._._.A.M.T.I.x.G._._.g.u.i.d.e.s, div.g.r.i.d.-.m.o.d.u.l.e._._.A.M.T.I.x.G._._.g.u.i.d.e.s |

**Issues:**
- [object Object]

## SVG Icons

**7 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 1 |
| sm | 2 |
| md | 4 |

**Icon colors:** `var(--geist-foreground)`, `#4285F4`, `#34A853`, `#FBBC05`, `#EA4335`, `rgb(0, 0, 0)`, `currentColor`, `white`, `var(--ds-background-100)`, `var(--context-card-tip-stroke)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Geist | self-hosted | 100 900 | normal |
| geistMonoFont | self-hosted | 100 900 | normal |
| Space Mono | self-hosted | 400 | normal |
| Space Grotesk | cdn | 400, 500 | normal |
| Roboto Mono | cdn | 400, 500, 700 | normal |

## Motion Language

**Feel:** springy · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `instant` | `80ms` | 80 |
| `xs` | `90ms` | 90 |
| `sm` | `160ms` | 160 |
| `md` | `300ms` | 300 |

### Easing Families

- **custom** (20 uses) — `cubic-bezier(0.4, 0, 0.2, 1)`, `cubic-bezier(0.39, 0.18, 0.17, 0.99)`, `cubic-bezier(0.33, 0.12, 0.15, 1)`
- **ease-in-out** (139 uses) — `ease`
- **ease-out** (6 uses) — `cubic-bezier(0.3, 0.57, 0.07, 0.95)`, `cubic-bezier(0.14, 0.55, 0.3, 0.92)`
- **spring** (4 uses) — `cubic-bezier(0.31, 0.05, 0.43, 1.02)`

### Spring / Overshoot Easings

- `cubic-bezier(0.31, 0.05, 0.43, 1.02)`

## Component Anatomy

### button — 22 instances

**Slots:** label, icon
**Variants:** tertiary
**Sizes:** md

| variant | count | sample label |
|---|---|---|
| default | 21 | Sign Up |
| tertiary | 1 | Show other options |

### card — 2 instances

**Slots:** media

## Brand Voice

**Tone:** neutral · **Pronoun:** third-person · **Headings:** Title Case (tight)

### Top CTA Verbs

- **continue** (12)
- **sign** (3)
- **show** (2)

### Button Copy Patterns

- "sign up" (3×)
- "continue with email" (2×)
- "continue with google" (2×)
- "continue with github" (2×)
- "continue with apple" (2×)
- "continue with saml sso" (2×)
- "continue with passkey" (2×)
- "show other options" (2×)

### Sample Headings

> Log in to Vercel

## Page Intent

**Type:** `legal` (confidence 0.4)

## Section Roles

Reading order (top→bottom): cta → nav → nav → hero → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | cta | — | 0.75 |
| 1 | nav | — | 0.9 |
| 2 | nav | — | 0.9 |
| 3 | hero | Log in to Vercel | 0.85 |
| 4 | footer | — | 0.95 |

## Material Language

**Label:** `material-you` (confidence 0.45)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.454 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 9999px |
| backdrop-filter in use | no |
| Gradients | 11 |

## Component Library

**Detected:** `shadcn/ui` (confidence 0.65)

Evidence:
- shadcn css tokens

Also considered: tailwindcss (0.3)

## Multi-Page Map

| Page Type | URL | Status |
|-----------|-----|--------|
| docs | https://vercel.com/docs/functions/sandbox | ok |

## Component Screenshots

12 retina crops written to `screenshots/`. Index: `*-screenshots.json`.

| Cluster | Variant | Size (px) | File |
|---------|---------|-----------|------|
| button--default | 0 | 24 × 24 | `screenshots/button-default-0.png` |
| button--default | 1 | 24 × 24 | `screenshots/button-default-1.png` |
| button--default | 2 | 24 × 24 | `screenshots/button-default-2.png` |
| button--outline--medium | 0 | 240 × 32 | `screenshots/button-outline-medium-0.png` |
| button--outline--medium | 1 | 32 × 32 | `screenshots/button-outline-medium-1.png` |
| button--outline--medium | 2 | 32 × 32 | `screenshots/button-outline-medium-2.png` |
| button--outline--md | 0 | 240 × 32 | `screenshots/button-outline-md-0.png` |
| button--outline--md | 1 | 240 × 32 | `screenshots/button-outline-md-1.png` |
| button--outline--md | 2 | 240 × 32 | `screenshots/button-outline-md-2.png` |
| card--default--xl | 0 | 640 × 152 | `screenshots/card-default-xl-0.png` |
| card--secondary | 0 | 638 × 74 | `screenshots/card-secondary-0.png` |
| input--outline--md | 0 | 325 × 56 | `screenshots/input-outline-md-0.png` |

Full-page: `screenshots/full-page.png`

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Geist` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
