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
---

# Design System: QuantumBlack Design System

> Source: [mckinsey/quantumblack-design-system](https://github.com/mckinsey/quantumblack-design-system). Validate with `npx @google/design.md lint docs/DESIGN.md`. Token utilities: [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md).

## Overview

**Creative North Star: "Data-Dense and Composed"**

**Audience:** Practitioners building and using internal analytics, ML, and data products — people who spend hours in dense dashboards, tables, and configuration flows. The UI should feel like professional tooling: precise, quiet, and structural. Not consumer, not marketing, not playful.

**Emotional target:** Composed confidence. The interface earns trust through clarity and consistency, not ornament. Users should scan hierarchy in seconds, operate controls without hesitation, and switch between light and dark mode without broken contrast.

Every screen is flat by default, sharp by default, and semantically coloured. Neutral slate and mist palettes dominate. Brand cyan appears sparingly. Interaction feedback uses opacity overlays, not saturated hover colours. Material Symbols in **sharp** geometry reinforce the right-angled posture.

**Key Characteristics:**
- Geometry-first — sharp corners are the brand default; rounded mode is opt-in at the app level
- Dark-capable — semantic tokens swap under `.dark`; never hardcode light-mode primitives
- Opacity-based state layers — hover and pressed feel like subtle tints, not colour shifts
- Typography-driven hierarchy — class-based utilities, three weights only (300 / 400 / 600)
- Material Symbols **sharp** @ 300–400 weight — never rounded or outlined variants

### Constraints for Generation

Do not generate UI until these assets exist. Surface missing assets as blockers.

**Fonts:** Inter (all UI text) and Roboto Mono (code only). Weights: 300, 400, 600 — no 500 or 700.

**Tokens:** Semantic CSS variables from [`src/styles/globals.css`](https://github.com/mckinsey/quantumblack-design-system/blob/main/src/styles/globals.css). Consumer projects install via `npx shadcn add theme`. Use semantic Tailwind utilities (`bg-surface-primary`, `text-fg-primary`) — not raw hex or primitives. Full utility mapping: [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md).

**Icons:** Material Symbols **sharp** only, via `<Icon icon="search" />` wrapped in `<IconShell>`. Ligature names in snake_case. Never Lucide, Heroicons, Font Awesome, emoji, or non-sharp Material variants.

**Components:** Prefer registry primitives from [`registry.json`](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) (`npx shadcn add <name>`). Do not reimplement controls that exist in the registry.

**Theme switches** (independent, compose on `<html>`):

| Mode | Class | Default | Effect |
| ---- | ----- | ------- | ------ |
| Light / dark | `.dark` | Light | Remaps semantic colour tokens |
| Sharp / rounded | `.radius-mode` | Sharp (0 px radii) | Sets sm/reg/md/lg to 4/8/12/16 px |

## Colors

A restrained semantic system. **Primary** is slate-950 — high-contrast fills and active states. **Secondary** is slate-900 — body text anchor. **Tertiary / accent** is QB cyan — decorative highlights only, not the default action colour. **Neutral** is mist-100 — base canvas. **Surface** is mist-50 — panels and cards. Never hardcode primitives in component code; semantic tokens swap under `.dark`.

### Palette

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

### Named Rules

**The Semantic Token Rule.** Reach for `text-fg-primary`, `bg-surface-primary`, `bg-fill-muted` before any primitive. Primitives do not swap under `.dark`.

**The Inverse Pairing Rule.** On primary fills or accent surfaces, use `-inverse` tokens so content stays legible in both themes.

**The Restrained Accent Rule.** Primary actions use primary (slate-950) fills. Reserve tertiary/accent for highlight buttons, badges, and tags — one accent focal point per view at most.

**The Status Text Rule.** `text-error|success|warning|information` for readable copy. `status-*` for fills and borders only.

## Typography

**UI Font:** Inter — display, headings, labels, paragraphs, buttons.
**Code Font:** Roboto Mono — inline code and monospaced data.

Inter at tight negative tracking carries data-dense interfaces. Displays are light (300); body is regular (400); buttons and emphasis are semibold (600). Use class-based utilities from `globals.css` — never compose size, weight, line-height, and tracking manually.

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

### Named Rules

**The Hierarchy Rule.** Hierarchy comes from size and weight, not colour alone. Body text stays `fg-primary`; de-emphasis uses `fg-secondary` or `fg-tertiary`, not a fourth weight.

**The Weight Ceiling Rule.** Only 300, 400, 600 exist. Need more emphasis? Step up a heading size, not a weight.

## Layout

Built on a **4px base grid**. All padding, margin, and gap values are multiples of 4 px.

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

### Named Rules

**The Grid Purity Rule.** Write `gap-4`, not `gap-[16px]`. Off-grid values (5 px, 7 px, 13 px) are prohibited.

**The Flat Separation Rule.** Separate surfaces with background contrast and divider borders — not shadows. Shadows imply floating layers.

## Elevation & Depth

Depth is structural, not decorative. Most surfaces are **flat at rest**. Five elevation levels exist for floating UI only:

| Level | Use for |
| ----- | ------- |
| 0 | Input resting state, hairline lift |
| 1 | Elevated cards, tooltips |
| 2 | Popovers, dropdowns, toasts |
| 3 | Dialogs, modals |
| 4 | Full-screen overlays, drawers |

Light-mode shadows use slate-tinted opacity (8–38%). Dark-mode shadows deepen (60–88%) to read against slate backgrounds. No coloured shadows.

### Named Rules

**The Flat Default Rule.** Static cards, page regions, and headers carry no shadow. Separation comes from `surface-primary` contrast and optional tertiary borders.

## Shapes

**Architectural precision.** Sharp corners (0 px) are the brand default — reflected in the YAML `rounded` tokens above. When `.radius-mode` is enabled on an ancestor, radii become:

| Scale | Sharp (default) | Rounded mode | Use for |
| ----- | --------------- | ------------ | ------- |
| sm | 0 px | 4 px | Buttons, inputs |
| reg | 0 px | 8 px | Default components |
| md | 0 px | 12 px | Cards, panels |
| lg | 0 px | 16 px | Modals, dialogs |
| full | 9999 px | 9999 px | Pills, avatars, radio dots |

### Named Rules

**The Sharp Default Rule.** Set `.radius-mode` on `<html>` or not at all. Never mix sharp and rounded within one surface.

**The No Pill Buttons Rule.** Buttons are sharp (or 4 px in rounded mode). Full rounding is for tags, badges, avatars, and radio indicators only.

**The Radius Hierarchy Rule.** Smaller components get tighter radii. Never put a larger radius on a smaller element.

## Components

Style guidance for common atoms. Install implementations from the [registry](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) — do not rebuild primitives that already exist.

### Buttons

- **Primary:** Primary fill, on-primary text. 36 px default height, 48 px large. Hover and pressed apply a **subtle opacity overlay** on the same fill — not a colour change.
- **Accent:** Tertiary/accent fill, primary (dark) text. Decorative highlight actions only — not the main CTA per screen.
- **Secondary:** Neutral/muted fill, on-surface text.
- **Outline / Ghost:** Transparent or bordered; hover uses state-layer tint.
- **Focus:** Sky-blue focus ring — 1 px on small controls, 2 px on default/large. Always `focus-visible`, never on mouse click alone.
- **Disabled:** Muted fill, disabled text colour, not-allowed cursor.

### Inputs / Fields

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

### Radio Buttons

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

### Tables

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

Opacity: primary 88%, secondary 60%, disabled 30%. Interactive icons brighten on hover (60% → 88%).

## Iconography

Icons are a brand-defining element, not an afterthought.

- **Set:** Material Symbols **sharp** variable font — never rounded, outlined, or filled variants.
- **Pattern:** `<IconShell size="default" variant="secondary"><Icon icon="search" /></IconShell>`
- **Naming:** Google ligature snake_case (`keyboard_arrow_down`, `check_circle`, `close`)
- **Colour:** Inherited from parent via `currentColor` and semantic text/fill tokens. Use `neutral-inverse` on dark fills, `accent` type for brand highlights.
- **Accessibility:** Decorative icons are `aria-hidden`. Interactive icons live inside labelled buttons or links — the icon alone is never the accessible name.

## Do's and Don'ts

### Do

- Use semantic tokens for all styling. Reference [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) when unsure.
- Default to sharp geometry. Opt into `.radius-mode` at the app root only.
- Separate surfaces with borders and background contrast in light mode. Reserve elevation for floating UI.
- Apply opacity-based state layers for hover and pressed — not saturated colour shifts.
- Use typography utility classes (`paragraph-regular-primary`, `cta-button-02`).
- Ship visible `focus-visible` rings on every interactive element.
- Associate every form control with a label via `Field` or `Form`.
- Handle empty, loading, and error states on async surfaces.
- Pair status colours with icons and text — never colour alone.
- Respect `prefers-reduced-motion`.

### Don't

- Hardcode primitives (`bg-slate-900`) or raw hex in components.
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
