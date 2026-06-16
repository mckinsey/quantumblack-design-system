---
version: alpha
name: QuantumBlack Design System
description: Dark-capable, geometry-first interface language for QuantumBlack analytical tools.
colors:
  primary: "#10121B"
  secondary: "#141721"
  tertiary: "#00A9F4"
  neutral: "#FAFAFB"
  surface: "#FFFFFF"
  on-surface: "#141721"
  on-primary: "#FFFFFF"
  accent: "#00A9F4"
  focus: "#38BDF8"
  success: "#16A34A"
  error: "#DC2626"
  warning: "#D97706"
  information: "#0891B2"
typography:
  display-d1:
    fontFamily: "Inter, sans-serif"
    fontSize: "56px"
    fontWeight: 300
    lineHeight: 1.07
    letterSpacing: "-0.28px"
  display-d2:
    fontFamily: "Inter, sans-serif"
    fontSize: "48px"
    fontWeight: 300
    lineHeight: 1.17
    letterSpacing: "-0.96px"
  display-d3:
    fontFamily: "Inter, sans-serif"
    fontSize: "40px"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "-0.8px"
  heading-h1:
    fontFamily: "Inter, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.128px"
  heading-h2:
    fontFamily: "Inter, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "-0.096px"
  heading-h3:
    fontFamily: "Inter, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0px"
  heading-h4:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.016px"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "-0.028px"
  body-large:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.032px"
  body-small:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "0.024px"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "-0.112px"
  label-small:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.33
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.43
    letterSpacing: "-0.056px"
  code:
    fontFamily: "Roboto Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.33
rounded:
  reg: "0px"
  sm: "0px"
  md: "0px"
  lg: "0px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "96px"
  gutter: "24px"
  margin: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "8px"
    height: "36px"
    typography: "{typography.button}"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "8px"
    height: "36px"
    typography: "{typography.button}"
  button-primary-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "8px"
    height: "36px"
    typography: "{typography.button}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "8px"
    height: "36px"
    typography: "{typography.button}"
  button-accent-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "8px"
    height: "36px"
    typography: "{typography.button}"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "8px"
    height: "36px"
    typography: "{typography.button}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.gutter}"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "8px"
    height: "36px"
    typography: "{typography.body}"
  input-focus:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "8px"
    height: "36px"
    typography: "{typography.body}"
  input-error:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.error}"
    rounded: "{rounded.sm}"
    padding: "8px"
    height: "36px"
    typography: "{typography.body}"
  checkbox:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    size: "16px"
  checkbox-checked:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    size: "16px"
  radio:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: "16px"
  radio-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: "8px"
  tooltip:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "8px"
    typography: "{typography.body-small}"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
    height: "28px"
    typography: "{typography.label-small}"
  tag-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
    height: "28px"
    typography: "{typography.label-small}"
  alert-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  alert-information:
    backgroundColor: "{colors.information}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
    typography: "{typography.label-small}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
    typography: "{typography.label-small}"
  focus-ring:
    backgroundColor: "{colors.focus}"
    size: "2px"
---

# Design System: QuantumBlack Design System

> Source: [mckinsey/quantumblack-design-system](https://github.com/mckinsey/quantumblack-design-system). Validate with `npx @google/design.md lint docs/DESIGN.md`. Token utilities: [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md). Spec: [DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/specification).

## Overview

**Creative North Star: "Data-Dense and Composed"**

The UI evokes professional analytical tooling — precise, quiet, and structural. Practitioners spend hours in dense dashboards, tables, and configuration flows; the interface should feel like engineered infrastructure, not consumer marketing. Every screen is flat by default, sharp by default, and semantically coloured. Neutral slate and mist palettes dominate. Brand cyan appears sparingly. Interaction feedback uses opacity overlays, not saturated hover colours. Material Symbols in **sharp** geometry reinforce the right-angled posture.

**Audience:** Teams building and using internal analytics, ML, and data products.

**Emotional target:** Composed confidence. The interface earns trust through clarity and consistency, not ornament. Users scan hierarchy in seconds, operate controls without hesitation, and switch between light and dark mode without broken contrast.

**Key characteristics:**

- Geometry-first — sharp corners are the brand default; rounded mode is opt-in at the app level
- Dark-capable — semantic tokens swap under `.dark`; default to dark mode; always ship a theme toggle
- Opacity-based state layers — hover and pressed feel like subtle tints, not colour shifts
- Typography-driven hierarchy — class-based utilities, three weights only (300 / 400 / 600)
- Material Symbols **sharp** @ 300–400 weight — never rounded or outlined variants

### Generation constraints

Do not generate UI until these assets exist. Surface missing assets as blockers.

**Fonts:** Inter (all UI text) and Roboto Mono (code only). Weights: 300, 400, 600 — no 500 or 700.

**Tokens:** Semantic CSS variables from [`src/styles/globals.css`](https://github.com/mckinsey/quantumblack-design-system/blob/main/src/styles/globals.css). Consumer projects install via `npx shadcn add theme`. Use semantic Tailwind utilities (`bg-surface-primary`, `text-fg-primary`) — not raw hex or primitives. Full utility mapping: [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md).

**Icons:** Material Symbols **sharp** only, via `<Icon icon="search" />` wrapped in `<IconShell>`. Ligature names in snake_case. Never Lucide, Heroicons, Font Awesome, emoji, or non-sharp Material variants.

**Components:** Prefer registry primitives from [`registry.json`](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) (`npx shadcn add <name>`). Do not reimplement controls that exist in the registry.

**Theme switches** (independent, compose on `<html>`):

| Mode | Class | Default | Effect |
| ---- | ----- | ------- | ------ |
| Light / dark | `.dark` | **Dark** | Remaps semantic colour tokens and chart plot tokens |
| Sharp / rounded | `.radius-mode` | Sharp (0 px radii) | Sets sm/reg/md/lg to 4/8/12/16 px |

**Theme toggle (required).** Every generated app, dashboard, and demo must expose a visible light/dark toggle. Do not ship a single-theme UI.

- **Default:** dark mode on first visit — add `.dark` to `<html>` when no saved preference exists.
- **Persistence:** store the choice in `localStorage` under the key `theme` (`"dark"` | `"light"`).
- **Implementation:** prefer the registry `ModeToggle` (`npx shadcn add theme-toggle` or `@/components/registry/theme-toggle`). Place it in the app chrome (header, navbar, or settings).
- **Sync:** toggling must add/remove `.dark` on `<html>` and re-apply chart plot tokens for any embedded visualizations.

## Colors

The palette is rooted in high-contrast slate neutrals with a single brand accent. **Primary** is slate-950 — high-contrast fills and active states. **Secondary** is slate-900 — the body text anchor. **Tertiary / accent** is QB cyan — decorative highlights only, not the default action colour. **Neutral** is mist-100 — base canvas. **Surface** is mist-50 — panels and cards. Semantic tokens swap under `.dark`; never hardcode light-mode primitives in component code.

### UI palette

- **Primary (#10121B):** Button fills, active states, tooltip backgrounds, selected filter chips. The default interactive anchor on light surfaces.
- **Secondary (#141721):** Core text and icon fill at full contrast. Headings and data entries resolve here via opacity ramps in implementation.
- **Tertiary / Accent (#00A9F4):** Brand-accent decorative use — accent badges, brand tags, focal icons. Not a status colour. Not the default primary CTA.
- **Neutral (#FAFAFB):** Base page canvas in light mode (`surface-base`). Separates content zones.
- **Surface (#FFFFFF):** Primary panels, cards, and floating content backgrounds in light mode.
- **On-surface (#141721):** Default text and icon colour on light surfaces (88% opacity in implementation).
- **On-primary (#FFFFFF):** Text and icons on primary/accent fills.

### Feedback

- **Success (#16A34A):** Confirmations, positive states. Readable text: `text-success`. Fills/borders: `status-success`.
- **Error (#DC2626):** Destructive actions, validation failures. Readable text: `text-error`. Fills/borders: `status-error`.
- **Warning (#D97706):** Caution, non-blocking alerts. Readable text: `text-warning`. Fills/borders: `status-warning`.
- **Information (#0891B2):** Info banners, tips. Readable text: `text-information`. Fills/borders: `status-information`.
- **Focus (#38BDF8):** Focus rings — identical in light and dark. Never remove focus outlines.

Dark mode remaps the same semantic roles: surfaces shift to slate-800/900, foreground to mist-50 opacity ramps, status colours lighten one step. See [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) for the full light/dark utility table.

### Chart colours

QBDS chart palettes for **Chart.js, D3, Vega-Lite, Recharts**, and other non-ECharts libraries. For **Apache ECharts**, register the bundled theme JSON — the hex values below are the same palettes that theme encodes.

Never invent chart hex. Qualitative and continuous palettes are identical in dark and light mode; only plot/axis tokens swap on theme toggle. Chart labels, legends, tooltips, and titles use **Inter**.

**Qualitative (discrete / categorical series)** — default for bar, line, and pie series with distinct categories. Order matches `theme.color` in the bundled ECharts themes.

| # | Hex |
|---|-----|
| 1 | `#097DFE` |
| 2 | `#6F39E3` |
| 3 | `#05D0F0` |
| 4 | `#0F766E` |
| 5 | `#8C8DE9` |
| 6 | `#11B883` |
| 7 | `#E77EC2` |
| 8 | `#C84189` |
| 9 | `#C0CA33` |
| 10 | `#3E495B` |

**Continuous — default scales.** Stops run **light (low) → dark (high)** unless noted.

| Key | Use | Stops |
|-----|-----|-------|
| **sequential** | Default continuous / heatmap | `#DBEBFE` → `#BDDCFE` → `#8CC6FF` → `#4BA5FF` → `#097DFE` → `#0063F6` → `#004DE0` → `#0B40B4` → `#163B8B` |
| **sequential_plus** | Positive / "good" sentiment | `#D0FAF3` → `#A1F4E8` → `#64E9D9` → `#1BD0C1` → `#00B5A9` → `#00918A` → `#0F766E` → `#0F5B59` → `#144B49` |
| **sequential_minus** | Reversed negative scale | `#782921` → `#922A20` → `#B22F20` → `#D63A28` → `#EA5748` → `#F1766C` → `#F7AAA3` → `#FACDC9` → `#FBE4E2` |
| **diverging** | Data with a midpoint | `#782921` → `#B22F20` → `#EA5748` → `#F7AAA3` → `#C9D0D9` → `#8CC6FF` → `#097DFE` → `#004DE0` → `#163B8B` |

Anchor the diverging centre stop (`#C9D0D9`) at the data's neutral value (often zero).

**Semantic chart colours** — single-value tokens for KPIs, status badges, candlesticks, and annotations. Same in dark and light.

| Role | Hex |
|------|-----|
| Positive / success / candlestick up | `#00B5A9` |
| Negative / error / candlestick down | `#EA5748` |
| Neutral | `#3E495B` |

**Mode-specific plot tokens** — swap when the theme toggle changes.

| Token | Dark | Light |
|-------|------|-------|
| Plot background | `#141721` | `#FAFAFB` |
| Title | `rgba(255,255,255,0.878)` | `rgba(20,23,33,0.878)` |
| Subtitle | `rgba(255,255,255,0.6)` | `rgba(20,23,33,0.6)` |
| Axis line / tick | `rgba(255,255,255,0.380)` | `rgba(20,23,33,0.380)` |
| Axis labels / legend | `rgba(255,255,255,0.5)` | `rgba(20,23,33,0.5)` |
| Grid lines | `rgba(255,255,255,0.078)` | `rgba(20,23,33,0.078)` |
| Crosshair / hover line | `rgba(255,255,255,0.380)` | `rgba(20,23,33,0.380)` |

**Axis behaviour:**

| Axis type | Axis line | Ticks | Grid lines |
|-----------|-----------|-------|------------|
| **Category** | show + ticks | same as axis (38% ink) | **no** grid lines |
| **Value / log** | hide | — | **show** (8% ink) |
| **Time** | show + ticks | same as axis (38% ink) | **no** grid lines |

## Typography

The typography strategy uses **Inter** for all UI text and **Roboto Mono** for code. Inter at tight negative tracking carries data-dense interfaces. Displays are light (300); body is regular (400); buttons and emphasis are semibold (600). Use class-based utilities from `globals.css` — never compose size, weight, line-height, and tracking manually.

### Hierarchy

| Level | Spec | Use for |
| ----- | ---- | ------- |
| Display D1 | 56px / Light 300 | KPI numerals, hero stats |
| Display D2 | 48px / Light 300 | Secondary display numbers |
| Display D3 | 40px / Light 300 | Smallest display tier |
| H1 | 32px / Regular 400 | Page title — one per page |
| H2 | 24px / Regular or Semibold | Major section headers |
| H3 | 20px / Regular or Semibold | Card titles, form sections |
| H4 | 16px / Regular or Semibold | Sub-section headings |
| Body | 14px / Regular 400 | Default paragraph and table text |
| Body Large | 16px / Regular 400 | Intro copy, chat content |
| Body Small | 12px / Regular 400 | Tooltips, helper text, captions |
| Label | 14px / Regular 400 | Form labels, list captions |
| Button | 14px / Semibold 600 | Default CTA text (32–36 px controls) |
| Code | 12px / Roboto Mono | Inline code |

Utility classes: `display-d1-regular`, `headings-h1-regular`, `paragraph-regular-primary`, `label-regular-primary`, `cta-button-02`, `paragraph-small-primary`, `paragraph-code-text`. Link variants append `-link`.

## Layout

The layout follows a **4px base grid**. All padding, margin, and gap values are multiples of 4 px.

Related items group inside cards or panels with **24 px internal padding** (`p-6`, `{spacing.gutter}`). Sibling elements within a group: **12 px** (`gap-3`). Between groups: **24–32 px**. Between major page sections: **48–96 px**.

### Spacing scale

| Token / Tailwind | px | Typical use |
| ---------------- | -- | ----------- |
| xs / `gap-1` | 4 | Tight inline gaps |
| sm / `gap-2` | 8 | Button padding, compact gaps |
| md / `gap-4` | 16 | Form spacing, small table cells |
| gutter / `gap-6`, `p-6` | 24 | Card padding, section gaps |
| margin / `gap-8`, `p-8` | 32 | Major section separation |
| 2xl / `gap-12` | 48 | Page-level breathing room |

### Responsive behaviour

Tailwind v4 defaults apply. On narrow viewports, **simplify rather than squeeze** — collapse sidebars to off-canvas, stack columns, hide secondary content. Minimum touch target: **36 × 36 px**; prefer **48 × 48 px** for primary mobile actions. Do not drop body text below 12 px on mobile.

## Elevation & Depth

Depth is structural, not decorative. Most surfaces are **flat at rest**. Five elevation levels exist for floating UI only:

| Level | Use for |
| ----- | ------- |
| 0 | Input resting state, hairline lift |
| 1 | Elevated cards, tooltips |
| 2 | Popovers, dropdowns, toasts |
| 3 | Dialogs, modals |
| 4 | Full-screen overlays, drawers |

Light-mode shadows use slate-tinted opacity (8–38%). Dark-mode shadows deepen (60–88%) to read against slate backgrounds. No coloured shadows. Static cards, page regions, and headers carry no shadow — separation comes from `surface-primary` contrast and optional tertiary borders.

## Shapes

The shape language is defined by **architectural precision**. Sharp corners (0 px) are the brand default — reflected in the YAML `rounded` tokens above. When `.radius-mode` is enabled on an ancestor, radii become:

| Scale | Sharp (default) | Rounded mode | Use for |
| ----- | --------------- | ------------ | ------- |
| sm | 0 px | 4 px | Buttons, inputs |
| reg | 0 px | 8 px | Default components |
| md | 0 px | 12 px | Cards, panels |
| lg | 0 px | 16 px | Modals, dialogs |
| full | 9999 px | 9999 px | Pills, avatars, radio dots |

Set `.radius-mode` on `<html>` or not at all. Never mix sharp and rounded within one surface. Buttons are sharp (or 4 px in rounded mode). Full rounding is for tags, badges, avatars, and radio indicators only.

## Components

Style guidance for common atoms. Install implementations from the [registry](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) — do not rebuild primitives that already exist.

### Buttons

- **Primary:** Primary fill, on-primary text. 36 px default height, 48 px large. Hover and pressed apply a **subtle opacity overlay** on the same fill — not a colour change.
- **Accent:** Tertiary/accent fill, primary (dark) text. Decorative highlight actions only — not the main CTA per screen.
- **Secondary:** Neutral/muted fill, on-surface text.
- **Outline / Ghost:** Transparent or bordered; hover uses state-layer tint.
- **Focus:** Sky-blue focus ring — 1 px on small controls, 2 px on default/large. Always `focus-visible`, never on mouse click alone.
- **Disabled:** Muted fill, disabled text colour, not-allowed cursor.

### Input fields

- **Default:** Neutral fill-on-surface background, on-surface text, hairline elevation at rest. 36 px height.
- **Focus:** Inverse active overlay + focus ring. Inline variant uses bottom-border focus instead.
- **Error:** Error-coloured border; error message below in readable error text. Set `aria-invalid`.
- **Disabled:** Disabled overlay, disabled text, not-allowed cursor.
- **Placeholder:** Tertiary text colour — never the same contrast as entered values.

Always wrap inputs in a `Field` with an associated `Label`.

### Cards / Containers

- **Background:** Surface colour, on-surface text.
- **Padding:** 24 px (`gutter`), 12 px gap between slots.
- **Shadow:** None by default. Optional tertiary border. Elevation 1 only when the card truly floats.

### Checkboxes

- **Unchecked:** Transparent fill, primary-stroke border, 16 px visible box (20 px bounding box).
- **Checked / indeterminate:** Primary fill for checkmark or dash; on-primary icon colour.
- **Focus:** Focus ring + active border. Disabled: tertiary border, disabled fill.

### Radio buttons

- **Unselected:** Circular, primary-stroke border, transparent fill.
- **Selected:** Primary-fill dot centred inside the circle.
- **Focus:** Focus ring + active border. 12 px gap between items in a group.

### Tooltips

- **Background:** Primary fill. **Text:** On-primary, body-small size.
- **Elevation:** Level 1. Max width ~140 px single line, ~220 px multi-line.
- **Delay:** Immediate show on focus/hover for accessibility.

### Tags / Chips

- **Default:** Surface background, on-surface text, sharp corners (or sm radius in rounded mode). 28 px height.
- **Selected (filter):** Primary fill, on-primary text.
- **Accent variant:** Tertiary border with muted fill — not a filled accent body.
- **Dismiss:** Icon at secondary opacity; full rounding only for the close affordance if circular.

### Lists / Tables

- **Header:** Semibold 14 px, primary surface background. Sticky on scroll.
- **Body:** Regular 14 px, ~60 px row height, tertiary dividers.
- **Interactive rows:** Subtle fill tint on hover.

### Dialogs / Overlays

- **Overlay:** Base surface with backdrop blur.
- **Content:** Primary surface, elevation 3, sharp corners.
- Focus trap via Radix; focus returns to trigger on close.

### Icons

Material Symbols **sharp** via `<IconShell>` + `<Icon>`:

| Size | Optical spec | Use for |
| ---- | ------------ | ------- |
| sm | 20 dp @ wght 400 | Inline, compact controls |
| default | 24 dp @ wght 300 | Standard UI |
| lg | 40 dp @ wght 300 | Feature callouts |

- **Set:** Material Symbols **sharp** variable font — never rounded, outlined, or filled variants.
- **Pattern:** `<IconShell size="default" variant="secondary"><Icon icon="search" /></IconShell>`
- **Naming:** Google ligature snake_case (`keyboard_arrow_down`, `check_circle`, `close`)
- **Colour:** Inherited from parent via `currentColor` and semantic text/fill tokens. Use `neutral-inverse` on dark fills, `accent` type for brand highlights.
- **Opacity:** primary 88%, secondary 60%, disabled 30%. Interactive icons brighten on hover (60% → 88%).
- **Accessibility:** Decorative icons are `aria-hidden`. Interactive icons live inside labelled buttons or links — the icon alone is never the accessible name.

## Do's and Don'ts

### Do

- Use semantic tokens for all styling. Reference [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) when unsure.
- Ship a visible theme toggle on every app; default to dark mode and persist the choice in `localStorage`.
- Use QBDS chart palettes (qualitative, sequential, sequential_minus, diverging) for data visualizations — never invent series hex.
- Default to sharp geometry. Opt into `.radius-mode` at the app root only.
- Separate surfaces with borders and background contrast in light mode. Reserve elevation for floating UI.
- Apply opacity-based state layers for hover and pressed — not saturated colour shifts.
- Use typography utility classes (`paragraph-regular-primary`, `cta-button-02`).
- Ship visible `focus-visible` rings on every interactive element.
- Associate every form control with a label via `Field` or `Form`.
- Handle empty, loading, and error states on async surfaces.
- Pair status colours with icons and text — never colour alone.
- Use `-inverse` tokens on primary or accent fills so content stays legible in both themes.
- Respect `prefers-reduced-motion`.

### Don't

- Hardcode primitives (`bg-slate-900`) or raw hex in components.
- Ship light-only or dark-only UIs without a theme toggle.
- Invent chart colours or hardcode plot chrome that ignores dark/light plot tokens.
- Mix sharp and rounded corners in the same view.
- Use pill-shaped buttons — pills are for tags, badges, and avatars.
- Exceed three font weights (300 / 400 / 600) on a page.
- Apply default drop-shadows to cards or page regions.
- Import Lucide, Heroicons, or non-sharp Material Symbols.
- Use `status-*` tokens for readable text — they are not AA-compliant.
- Set manual z-index on portalled surfaces (popover, dialog, tooltip).
- Use gradients, glassmorphism, bounce easing, or decorative animation.
- Drop body text below 12 px on mobile.
- Reimplement registry components when `npx shadcn add` can install them.
- Use tertiary/accent as the default primary CTA — reserve it for one focal highlight per view.
