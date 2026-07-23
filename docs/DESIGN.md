---
version: alpha
name: QuantumBlack Design System
description: Dark-capable, geometry-first interface language for QuantumBlack analytical tools.
colors:
  primary: '#10121B'
  secondary: '#141721'
  tertiary: '#00A9F4'
  neutral: '#FAFAFB'
  surface: '#FFFFFF'
  on-surface: '#141721'
  on-primary: '#FFFFFF'
  accent: '#00A9F4'
  focus-dark: '#38BDF8'
  focus-light: '#0EA5E9'
  success: '#16A34A'
  error: '#DC2626'
  warning: '#D97706'
  information: '#0284C7'
typography:
  display-d1:
    fontFamily: 'Inter, sans-serif'
    fontSize: '56px'
    fontWeight: 300
    lineHeight: 1.07
    letterSpacing: '-0.28px'
  display-d2:
    fontFamily: 'Inter, sans-serif'
    fontSize: '48px'
    fontWeight: 300
    lineHeight: 1.17
    letterSpacing: '-0.96px'
  display-d3:
    fontFamily: 'Inter, sans-serif'
    fontSize: '40px'
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: '-0.8px'
  heading-h1:
    fontFamily: 'Inter, sans-serif'
    fontSize: '32px'
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: '-0.128px'
  heading-h2:
    fontFamily: 'Inter, sans-serif'
    fontSize: '24px'
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: '-0.096px'
  heading-h3:
    fontFamily: 'Inter, sans-serif'
    fontSize: '20px'
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: '0px'
  heading-h4:
    fontFamily: 'Inter, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: '-0.016px'
  body:
    fontFamily: 'Inter, sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: '-0.028px'
  body-large:
    fontFamily: 'Inter, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: '-0.032px'
  body-small:
    fontFamily: 'Inter, sans-serif'
    fontSize: '12px'
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: '0.024px'
  label:
    fontFamily: 'Inter, sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: '-0.112px'
  label-small:
    fontFamily: 'Inter, sans-serif'
    fontSize: '12px'
    fontWeight: 400
    lineHeight: 1.33
  button:
    fontFamily: 'Inter, sans-serif'
    fontSize: '14px'
    fontWeight: 600
    lineHeight: 1.43
    letterSpacing: '-0.056px'
  code:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: '12px'
    fontWeight: 400
    lineHeight: 1.33
rounded:
  reg: '0px'
  sm: '0px'
  md: '0px'
  lg: '0px'
  full: '9999px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  2xl: '48px'
  3xl: '96px'
  gutter: '24px'
  margin: '32px'
focus-ring:
  outlineColor: '{colors.focus-light}'
  outlineWidth: '2px'
  outlineOffset: '2px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.sm}'
    padding: '8px'
    height: '36px'
    typography: '{typography.button}'
  button-primary-hover:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.sm}'
    padding: '8px'
    height: '36px'
    typography: '{typography.button}'
  button-primary-active:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.sm}'
    padding: '8px'
    height: '36px'
    typography: '{typography.button}'
  button-accent:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.primary}'
    rounded: '{rounded.sm}'
    padding: '8px'
    height: '36px'
    typography: '{typography.button}'
  button-accent-hover:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.primary}'
    rounded: '{rounded.sm}'
    padding: '8px'
    height: '36px'
    typography: '{typography.button}'
  button-secondary:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '8px'
    height: '36px'
    typography: '{typography.button}'
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.gutter}'
  input:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '8px'
    height: '36px'
    typography: '{typography.body}'
  input-focus:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '8px'
    height: '36px'
    typography: '{typography.body}'
  input-error:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.error}'
    rounded: '{rounded.sm}'
    padding: '8px'
    height: '36px'
    typography: '{typography.body}'
  checkbox:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    size: '16px'
  checkbox-checked:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.sm}'
    size: '16px'
  radio:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.full}'
    size: '16px'
  radio-selected:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.full}'
    size: '8px'
  tooltip:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.sm}'
    padding: '8px'
    typography: '{typography.body-small}'
  tag:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '4px 8px'
    height: '28px'
    typography: '{typography.label-small}'
  tag-selected:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.sm}'
    padding: '4px 8px'
    height: '28px'
    typography: '{typography.label-small}'
  alert-error:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.error}'
    rounded: '{rounded.md}'
    padding: '{spacing.md}'
  alert-information:
    backgroundColor: '{colors.information}'
    textColor: '{colors.primary}'
    rounded: '{rounded.md}'
    padding: '{spacing.md}'
  badge-success:
    backgroundColor: '{colors.success}'
    textColor: '{colors.primary}'
    rounded: '{rounded.full}'
    padding: '4px 8px'
    typography: '{typography.label-small}'
  badge-warning:
    backgroundColor: '{colors.warning}'
    textColor: '{colors.primary}'
    rounded: '{rounded.full}'
    padding: '4px 8px'
    typography: '{typography.label-small}'
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

**Components:** Prefer registry primitives from [`registry.json`](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) (`npx shadcn add <name>`). Do not reimplement controls that exist in the registry.

**Theme switches** (independent, compose on `<html>`):

| Mode            | Class          | Default            | Effect                                              |
| --------------- | -------------- | ------------------ | --------------------------------------------------- |
| Light / dark    | `.dark`        | **Dark**           | Remaps semantic colour tokens and chart plot tokens |
| Sharp / rounded | `.radius-mode` | Sharp (0 px radii) | Sets sm/reg/md/lg to 4/8/12/16 px                   |

**Theme toggle (required).** Every generated app, dashboard, and demo must expose a visible light/dark toggle. Do not ship a single-theme UI.

- **Default:** dark mode on first visit — add `.dark` to `<html>` when no saved preference exists.
- **Persistence:** store the choice in `localStorage` under the key `theme` (`"dark"` | `"light"`).
- **Implementation:** there is no `@qbds/theme-toggle` registry item. The file at `src/components/registry/theme-toggle.tsx` is the registry site's own toggle — reference only. Hand-build from `Button` (ghost, icon size) + Material Symbols Sharp icons (`light_mode` / `dark_mode`) and place it in the app chrome (header, navbar, or settings).
- **Sync:** toggling must add/remove `.dark` on `<html>` and re-apply chart plot tokens for any embedded visualizations.

## Colour palette, roles & token architecture

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
- **Information (#0284C7 light / sky-400 dark):** Info banners, tips. Readable text: `text-information`. Fills/borders: `status-information`.
- **Focus (sky-500 light / sky-400 dark):** Focus rings — `--border-status-focus` remaps between themes: `#0EA5E9` in light mode, `#38BDF8` in dark mode. Never remove focus outlines.

Dark mode remaps the same semantic roles: surfaces shift to slate-800/900, foreground to mist-50 opacity ramps, status colours lighten one step. See [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) for the full light/dark utility table.

### Token architecture

Tokens have three layers. Always reach for the innermost layer you need — never skip to primitives.

| Layer                | Example                                                | Rule                                                                         |
| -------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| **Primitive**        | `--mist-50`, `--slate-950`                             | Foundation only — feeds semantic tokens. Do not use in components.           |
| **Semantic**         | `--surface-primary`, `--fill-active`, `--text-primary` | Use in all component code. Swaps correctly in light/dark.                    |
| **Composed utility** | `bg-surface-primary`, `text-fg-primary`                | Tailwind class generated from semantic variable. Prefer over inline `var()`. |

**Picking a token (in order):**

1. Identify purpose — background (`surface-*`), component fill (`fill-*`), text (`fg-*`), stroke (`stroke-*`), status (`status-*`), overlay (`stateslayer-overlay-*`), shadow (`shadow-elevation-*`).
2. Pick contrast — `primary > secondary > tertiary > disabled`.
3. Use `-inverse` on dark/accent fills so content stays legible across themes.

Full token reference: [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md). The token palette is browsable at `/tokens` on the registry site.

**What NOT to use:** primitives directly (`bg-slate-900`), raw hex in components, inline `bg-[var(--surface-base)]` where a utility exists, hand-rolled `bg-white/8` hover tints (use `bg-stateslayer-overlay-hover`).

### Frequent utilities

The most common token-to-utility mappings for quick reference:

| Role         | Utility                                             |
| ------------ | --------------------------------------------------- |
| App canvas   | `bg-surface-base`                                   |
| Panel / card | `bg-surface-primary`                                |
| Body text    | `text-fg-primary` + `paragraph-regular-primary`     |
| Muted text   | `text-fg-secondary`                                 |
| Divider      | `border-stroke-divider`                             |
| Card outline | `border-stroke-tertiary`                            |
| Subtle lift  | `shadow-elevation-1`                                |
| Focus ring   | `ring-stroke-status-focus focus-visible:ring-[2px]` |
| Brand accent | `bg-brand-accents-qb-accent` (sparingly)            |

## Typography

The typography strategy uses **Inter** for all UI text and **Roboto Mono** for code. Inter at tight negative tracking carries data-dense interfaces. Displays are light (300); body is regular (400); buttons and emphasis are semibold (600). Use class-based utilities from `globals.css` — never compose size, weight, line-height, and tracking manually.

### Hierarchy

| Level           | Spec                       | Use for                            |
| --------------- | -------------------------- | ---------------------------------- |
| Display D1      | 56px / Light 300           | KPI numerals, hero stats           |
| Display D2      | 48px / Light 300           | Secondary display numbers          |
| Display D3      | 40px / Light 300           | Smallest display tier              |
| H1              | 32px / Regular 400         | Page title — one per page          |
| H2              | 24px / Regular or Semibold | Major section headers              |
| H3              | 20px / Regular or Semibold | Card titles, form sections         |
| H4              | 16px / Regular or Semibold | Sub-section headings               |
| Body            | 14px / Regular 400         | Default paragraph and table text   |
| Body Large      | 16px / Regular 400         | Intro copy, chat content           |
| Body Small      | 12px / Regular 400         | Tooltips, helper text, captions    |
| Label           | 14px / Regular 400         | Form labels, list captions         |
| CTA / Button 01 | 16px / Semibold 600        | ≤40 px button controls             |
| CTA / Button 02 | 14px / Semibold 600        | 32–36 px button controls (default) |
| CTA / Button 03 | 12px / Semibold 600        | Smallest button controls           |
| Code            | 12px / Roboto Mono         | Inline code                        |

Utility classes (representative — full list in [TOKENS.md](TOKENS.md)): `display-d1-regular`, `headings-h2-semibold`, `headings-h3-regular`, `paragraph-regular-primary`, `label-regular-primary`, `cta-button-01`, `cta-button-02`, `cta-button-03`, `paragraph-small-primary`, `paragraph-code-text`. Link variants append `-link`.

## Iconography

Icons use the **Material Symbols Sharp** variable font exclusively. Never use Lucide, Heroicons, Font Awesome, emoji, or non-sharp Material variants.

### Usage

Wrap icons in `<IconShell>` for QBDS size, weight, and opacity. Pass `hoverable` for interactive icons, `disabled` for disabled state.

```tsx
<IconShell size="sm" variant="secondary">
  <Icon icon="search" />
</IconShell>

<IconShell hoverable>
  <Icon icon="edit" />
</IconShell>

<IconShell type="custom" className="text-status-success" variant="primary">
  <Icon icon="check" />
</IconShell>
```

### Size and optical spec

| Size    | Optical spec     | Use for                  |
| ------- | ---------------- | ------------------------ |
| sm      | 20 dp @ wght 400 | Inline, compact controls |
| default | 24 dp @ wght 300 | Standard UI              |
| lg      | 40 dp @ wght 300 | Feature callouts         |

Optical-size contract matches Figma: `sm` → 20dp@wght400, `default` → 24dp@wght300, `lg` → 40dp@wght300 via `fontVariationSettings`. Set `size` on `<Icon>` directly when not using `IconShell`.

### Naming

Ligature names in Google snake_case — `keyboard_arrow_down`, `check_circle`, `close`. Any icon in the Material Symbols Sharp catalog works without additional files or codegen.

### Colour and opacity

Colour inherits via `currentColor` and semantic text/fill tokens. Use `neutral-inverse` on dark fills, `accent` type for brand highlights.

| Variant   | Opacity |
| --------- | ------- |
| primary   | 88%     |
| secondary | 60%     |
| disabled  | 30%     |

Interactive icons brighten on hover (60% → 88%).

### Accessibility

Decorative icons are `aria-hidden="true"`. Interactive icons live inside labelled buttons or links — the icon alone is never the accessible name.

### Installation

`npx shadcn add icon` ships `icon.tsx` and appends the Google Fonts `@import` to the consumer's CSS.

## Shapes

The shape language is defined by **architectural precision**. Sharp corners (0 px) are the brand default — reflected in the YAML `rounded` tokens above. When `.radius-mode` is enabled on an ancestor, radii become:

| Scale | Sharp (default) | Rounded mode | Use for                    |
| ----- | --------------- | ------------ | -------------------------- |
| sm    | 0 px            | 4 px         | Buttons, inputs            |
| reg   | 0 px            | 8 px         | Default components         |
| md    | 0 px            | 12 px        | Cards, panels              |
| lg    | 0 px            | 16 px        | Modals, dialogs            |
| full  | 9999 px         | 9999 px      | Pills, avatars, radio dots |

Set `.radius-mode` on `<html>` or not at all. Never mix sharp and rounded within one surface. Buttons are sharp (or 4 px in rounded mode). Full rounding is for tags, badges, avatars, and radio indicators only.

## Elevation & Depth

Depth is structural, not decorative. Most surfaces are **flat at rest**. Five elevation levels exist for floating UI only:

| Level | Use for                            |
| ----- | ---------------------------------- |
| 0     | Input resting state, hairline lift |
| 1     | Elevated cards, tooltips           |
| 2     | Popovers, dropdowns, toasts        |
| 3     | Dialogs, modals                    |
| 4     | Full-screen overlays, drawers      |

Use composed Tailwind utilities: `shadow-elevation-0` through `shadow-elevation-4`. Light-mode shadows use slate-tinted opacity (8–38%). Dark-mode shadows deepen (60–88%) to read against slate backgrounds. No coloured shadows. Static cards, page regions, and headers carry no shadow — separation comes from `surface-primary` contrast and optional tertiary borders.

## Motion & Animation

QBDS motion is **functional and minimal**. Analytical tools are data-dense — unnecessary animation competes with data and degrades performance. Animate only to communicate state change; never for decoration.

### Current state

No named duration or easing tokens exist yet. Components use ad-hoc Tailwind duration utilities. The only CSS variable is `--accordion-panel-duration: 0.2s` in `globals.css`.

In practice, `duration-200` (200ms) is the most common value across components (accordion, tabs, avatar, dialog). Shorter `duration-100` is used for fast toggles (combobox). Longer values (300–500ms) come from Radix defaults on Sheet and should be reviewed.

### Intent (not yet codified as tokens)

| Pattern           | Target value | Tailwind       |
| ----------------- | ------------ | -------------- |
| Fast state change | ~100ms       | `duration-100` |
| Default           | ~200ms       | `duration-200` |
| Panel / drawer    | ~300ms       | `duration-300` |

Easing in use: `ease-out` (accordion), implicit `ease-in-out` (sheet). No formal easing scale exists.

### What's not allowed (applies now)

- Spring physics or bounce easing
- Rotation or spin (except a loading spinner)
- Colour wipes or gradient sweeps
- Decorative particle or parallax effects
- Staggered entrance sequences in data tables

### `prefers-reduced-motion`

Always add `motion-reduce:transition-none` alongside any transition class. This is currently inconsistent across components — it should be treated as required for new work.

## Accessibility & Focus

Accessibility is not an afterthought — QBDS components are used in professional tools where keyboard-only and screen-reader workflows are common.

### Focus rings

Every interactive element must show a visible focus ring on keyboard focus. Never suppress focus outlines.

- Token: `ring-stroke-status-focus` (`--border-status-focus`)
- Implementation: `ring-stroke-status-focus focus-visible:ring-[2px]` (set `ring-stroke-status-focus` as the ring colour, then conditionally apply width via `focus-visible:ring-[1px]` or `focus-visible:ring-[2px]`)
- Always use `focus-visible:` — not `focus:` — to avoid showing focus rings on mouse click
- On error state: remove the conflicting ring with `ring-0`; the error border communicates state instead
- Light mode: `#0EA5E9` (sky-500); dark mode: `#38BDF8` (sky-400)
- Ring width: 1px on small controls (tag, checkbox); 2px on default and large controls

### Keyboard navigation

| Pattern                | Keys                                           |
| ---------------------- | ---------------------------------------------- |
| Sequential focus       | `Tab` / `Shift+Tab`                            |
| Close overlay          | `Escape`                                       |
| List / menu navigation | `Arrow` keys                                   |
| Activate control       | `Enter` or `Space`                             |
| Radio group            | `Arrow` keys move selection; `Tab` exits group |

Tab order must follow visible reading order. Never use `tabindex > 0`.

### ARIA

- Decorative icons: `aria-hidden="true"`
- Icon-only buttons: `aria-label` required
- Form controls: associate via `htmlFor` / `id` pair (the `Field` component handles this)
- Overlays: focus trap while open; focus returns to trigger on close (Radix handles)
- Status messages: use `role="status"` (polite) or `role="alert"` (assertive) for toasts and inline errors

### Colour contrast

- Normal text (< 18px / < 14px bold): **4.5:1** minimum
- Large text (≥ 18px or ≥ 14px bold): **3:1** minimum
- UI components and focus rings: **3:1** minimum
- `status-*` tokens are **not** AA-compliant for text — use `text-error`, `text-warning`, `text-success`, `text-information` instead

### Motion

See §7 Motion & Animation. All new transition work must include `motion-reduce:transition-none`.

## Data visualisation

QBDS chart palettes for ECharts (default), Chart.js, D3, Vega-Lite, and other libraries. Apply these values **directly in chart configuration** — do not use `echarts.registerTheme()` or pass a theme name to `echarts.init()`. Set `color`, axis options, and `backgroundColor` explicitly on each chart instance so dark/light toggling works correctly.

Never invent chart hex. Qualitative and continuous palettes are identical in dark and light mode; only plot/axis tokens swap on theme toggle. Chart labels, legends, tooltips, and titles use **Inter**.

### Qualitative palette (discrete / categorical series)

Default for bar, line, and pie series with distinct categories. Order matches `theme.color` in the bundled ECharts themes.

| #   | Hex       |
| --- | --------- |
| 1   | `#097DFE` |
| 2   | `#6F39E3` |
| 3   | `#05D0F0` |
| 4   | `#0F766E` |
| 5   | `#8C8DE9` |
| 6   | `#11B883` |
| 7   | `#E77EC2` |
| 8   | `#C84189` |
| 9   | `#C0CA33` |
| 10  | `#3E495B` |

### Continuous scales

Stops run **light (low) → dark (high)** unless noted.

| Key                  | Use                          | Stops                                                                                                     |
| -------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| **sequential**       | Default continuous / heatmap | `#DBEBFE` → `#BDDCFE` → `#8CC6FF` → `#4BA5FF` → `#097DFE` → `#0063F6` → `#004DE0` → `#0B40B4` → `#163B8B` |
| **sequential_plus**  | Positive / "good" sentiment  | `#D0FAF3` → `#A1F4E8` → `#64E9D9` → `#1BD0C1` → `#00B5A9` → `#00918A` → `#0F766E` → `#0F5B59` → `#144B49` |
| **sequential_minus** | Reversed negative scale      | `#782921` → `#922A20` → `#B22F20` → `#D63A28` → `#EA5748` → `#F1766C` → `#F7AAA3` → `#FACDC9` → `#FBE4E2` |
| **diverging**        | Data with a midpoint         | `#782921` → `#B22F20` → `#EA5748` → `#F7AAA3` → `#C9D0D9` → `#8CC6FF` → `#097DFE` → `#004DE0` → `#163B8B` |

Anchor the diverging centre stop (`#C9D0D9`) at the data's neutral value (often zero).

**Compact 3-stop gradient** (for `visualMap.inRange.color` in ECharts or equivalent colour-range API): `#163B8B` → `#097DFE` → `#DBEBFE`.

### Semantic chart colours

Single-value tokens for KPIs, status badges, candlesticks, and annotations. Same in dark and light.

| Role                                | Hex       |
| ----------------------------------- | --------- |
| Positive / success / candlestick up | `#00B5A9` |
| Negative / error / candlestick down | `#EA5748` |
| Neutral                             | `#3E495B` |

### Mode-specific plot tokens

Swap when the theme toggle changes.

| Token                      | Dark                      | Light                  |
| -------------------------- | ------------------------- | ---------------------- |
| Plot background            | `#141721`                 | `#FAFAFB`              |
| Title                      | `rgba(255,255,255,0.878)` | `rgba(20,23,33,0.878)` |
| Subtitle                   | `rgba(255,255,255,0.6)`   | `rgba(20,23,33,0.6)`   |
| Axis line / tick           | `rgba(255,255,255,0.380)` | `rgba(20,23,33,0.380)` |
| Axis labels / legend       | `rgba(255,255,255,0.5)`   | `rgba(20,23,33,0.5)`   |
| Grid lines                 | `rgba(255,255,255,0.078)` | `rgba(20,23,33,0.078)` |
| Crosshair / hover line     | `rgba(255,255,255,0.380)` | `rgba(20,23,33,0.380)` |
| Split area (striped bands) | `rgba(255,255,255,0.04)`  | `rgba(20,23,33,0.04)`  |
| Graph / network edge       | `rgba(255,255,255,0.5)`   | `rgba(20,23,33,0.5)`   |

### Axis behaviour

| Axis type       | Axis line    | Ticks                  | Grid lines        |
| --------------- | ------------ | ---------------------- | ----------------- |
| **Category**    | show + ticks | same as axis (38% ink) | **no** grid lines |
| **Value / log** | hide         | —                      | **show** (8% ink) |
| **Time**        | show + ticks | same as axis (38% ink) | **no** grid lines |

### Line series defaults

| Property      | Value                                        |
| ------------- | -------------------------------------------- |
| Stroke width  | 2px                                          |
| Point markers | Small open circles — size 4, border 1px      |
| Smoothing     | None — straight segments between data points |

For extended palette scales, ECharts inline JS constants, and chart-type / title guidance, see the skill reference files bundled with this project.

## Layout principles

The layout follows a **4px base grid**. All padding, margin, and gap values are multiples of 4 px.

Related items group inside cards or panels with **24 px internal padding** (`p-6`, `{spacing.gutter}`). Sibling elements within a group: **12 px** (`gap-3`). Between groups: **24–32 px**. Between major page sections: **48–96 px**.

### Spacing scale

| Token / Tailwind        | px  | Typical use                     |
| ----------------------- | --- | ------------------------------- |
| xs / `gap-1`            | 4   | Tight inline gaps               |
| sm / `gap-2`            | 8   | Button padding, compact gaps    |
| md / `gap-4`            | 16  | Form spacing, small table cells |
| gutter / `gap-6`, `p-6` | 24  | Card padding, section gaps      |
| margin / `gap-8`, `p-8` | 32  | Major section separation        |
| 2xl / `gap-12`          | 48  | Page-level breathing room       |

### Dashboard layout rules

- **Page sections:** wrap scrollable main content in `flex flex-col gap-8` — use gap on the flex wrapper between page header, KPI banner, chart grid, and table. Do not use isolated `mb-*` on each block.
- **KPI cards:** `min-w-[240px]` on every card so label + value + trend delta stay readable on one unit. Row: `overflow-x-auto` wrapper with `flex flex-nowrap gap-4`; at `sm` and above use `grid grid-cols-2 xl:grid-cols-4`.
- **Chart containers:** explicit height is required — **320 px recommended**, 280 px minimum. Use 480 px for dense time series or scatter. Chart grid: `grid grid-cols-1 xl:grid-cols-2 gap-6`.
- **Filter placement:** use sidebar **or** main toolbar — never both on the same dashboard. Sidebar filters go as the last nav group (vertical fields, `w-full` selects). Toolbar filters are a surfaced horizontal strip (`bg-surface-primary border border-stroke-tertiary p-4`, actions right).

### App layout archetypes

| Archetype                     | Primary content                                                    | Typical filter location                               |
| ----------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------- |
| **A — Doc / multi-section**   | Long-form reading or config spread across `Card` + `Tabs` sections | Main toolbar                                          |
| **B — Analytics / dashboard** | KPI banner + chart grid + table in `flex flex-col gap-8`           | Sidebar (last nav group) or main toolbar — never both |
| **C — Form-centric**          | Dense `Field` / `Form` flow — single column or grouped settings    | N/A                                                   |
| **D — Table-centric**         | Full-width `DataTable` with toolbar (search, density, export)      | Main toolbar                                          |

Shell structure: Navbar `<header>` sits **outside** `SidebarProvider`, which wraps the sidebar and `SidebarInset` (scrollable main).

## Responsive behaviour

Tailwind v4 defaults apply (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px). On narrow viewports, **simplify rather than squeeze** — collapse sidebars to off-canvas, stack columns, hide secondary content.

### Touch targets

- Minimum touch target: **36 × 36 px**
- Preferred for primary mobile actions: **48 × 48 px**
- Do not drop body text below **12 px** on any viewport

### Breakpoint behaviour (current guidance)

| Breakpoint       | Sidebar              | Layout        | KPI grid                          |
| ---------------- | -------------------- | ------------- | --------------------------------- |
| `< sm` (< 640px) | Off-canvas (hidden)  | Single column | Horizontal scroll (`flex-nowrap`) |
| `sm–lg`          | Off-canvas or hidden | 1–2 columns   | `grid-cols-2`                     |
| `≥ lg`           | Persistent rail      | Multi-column  | `grid-cols-2 xl:grid-cols-4`      |

## Copy & tone

QBDS products are professional analytical tools. The voice is **direct, expert, and composed** — never patronising, never casual, never exclamatory.

### Core principles

- **Concise:** say the minimum needed. Delete filler words ("simply", "just", "easily").
- **Direct:** lead with the action or outcome, not the process.
- **Expert:** assume the user knows their domain. Don't over-explain domain concepts.
- **Sentence case everywhere** — headings, labels, button text, tooltips. Title Case only for proper nouns and product names.
- **No emoji** in product UI.
- **No em-dash chains** — use periods or commas to separate clauses instead.
- **No buzzwords** — "streamline", "empower", "supercharge", "leverage", "world-class", "enterprise-grade". Name the specific action or data instead.
- **No manufactured-contrast one-liners** ("Not a feature. A platform.") — state the fact plainly.
- **Pattern descriptions** — third person where it fits: "Displays…", "Shows…", "Filters…".

### Patterns by context

| Context             | Pattern                            | Example                                    | Avoid                             |
| ------------------- | ---------------------------------- | ------------------------------------------ | --------------------------------- |
| CTA / button        | Verb + noun                        | "Save changes", "Add filter", "Export CSV" | "Click here", "Submit"            |
| Form label          | Noun only, sentence case           | "Email address", "Date range"              | "Please enter your email address" |
| Error message       | What failed + how to fix           | "Invalid date. Use DD/MM/YYYY."            | "An error occurred."              |
| Validation hint     | Constraint, present tense          | "Must be 8–64 characters"                  | "Password is too short!"          |
| Loading state       | Present progressive                | "Loading results…"                         | "Please wait…", "Fetching…"       |
| Empty state         | Factual + one actionable next step | "No results. Try adjusting your filters."  | "Oops, nothing here!"             |
| Success feedback    | Confirmation + implication         | "Saved. Changes take effect immediately."  | "Great! You did it!"              |
| Destructive confirm | Verb that states the consequence   | "Delete pipeline" (in a `Dialog`)          | "Are you sure?"                   |

### Punctuation

- End standalone labels and button text without a period.
- End full-sentence helper text and error messages with a period.
- Use `…` (ellipsis character, U+2026) for truncated text and loading copy — never three dots `...`.
- Avoid exclamation marks — they break the composed, professional tone.

## Components

Style guidance for common atoms. Install implementations from the [registry](https://github.com/mckinsey/quantumblack-design-system/blob/main/registry.json) — do not rebuild primitives that already exist.

### Component selection quick-picker

The most common selection confusions resolved:

**Actions**

| Need                           | Use                                                | Not                                |
| ------------------------------ | -------------------------------------------------- | ---------------------------------- |
| Text-labeled action            | `Button`                                           | —                                  |
| Glyph-only, tight space        | `Button` (icon variant) + `aria-label` + `Tooltip` | `Button` without a label           |
| Primary + related alternatives | `Button` + `DropdownMenu`                          | Multiple `Button`s side by side    |
| Related actions together       | `ButtonGroup`                                      | More than one `primary` in a group |
| Exclusive view-mode toggle     | `SegmentedControls`                                | `Tabs`                             |

**Selection controls**

| Need                                  | Use                  | Not                  |
| ------------------------------------- | -------------------- | -------------------- |
| Independent on/off, applied on submit | `Checkbox`           | `Switch`             |
| Instant on/off setting                | `Switch`             | `Checkbox`           |
| One-of-many, always visible           | `RadioGroup`         | `Field/SingleSelect` |
| One-of-many, long list / space-tight  | `Field/SingleSelect` | `RadioGroup`         |
| Many-of-many, searchable              | `Field/MultiSelect`  | `CheckboxGroup`      |

**Tags vs badges**

| Need                              | Use         | Not                 |
| --------------------------------- | ----------- | ------------------- |
| User-applied, removable label     | `Tag`       | `Badge`             |
| User-toggled filter chip          | `TagToggle` | `Checkbox` or `Tag` |
| System status / count (read-only) | `Badge`     | `Tag`               |

**Feedback and overlays**

| Need                                      | Use       | Not            |
| ----------------------------------------- | --------- | -------------- |
| Transient "done" (auto-dismisses)         | `Sonner`  | `Alert`        |
| Persistent message until resolved         | `Alert`   | `Sonner`       |
| Blocking task / decision                  | `Dialog`  | Inline `Alert` |
| Short hover / focus hint                  | `Tooltip` | `Popover`      |
| Interactive / persistent floating content | `Popover` | `Tooltip`      |

**Navigation**

| Need                                       | Use                                 | Not            |
| ------------------------------------------ | ----------------------------------- | -------------- |
| Persistent app-level left nav              | `Sidebar` (rail + expandable panel) | Custom `<nav>` |
| Switch between sibling content panels      | `Tabs`                              | `Accordion`    |
| Progressive disclosure of stacked sections | `Accordion`                         | `Tabs`         |

### State layers

All interactive components use opacity overlays, not colour shifts. Apply via `bg-stateslayer-overlay-*` utilities:

| State    | Overlay   | Tailwind                                                                                              |
| -------- | --------- | ----------------------------------------------------------------------------------------------------- |
| Hover    | ~8%       | `bg-stateslayer-overlay-hover`                                                                        |
| Pressed  | ~16%      | `bg-stateslayer-overlay-pressed`                                                                      |
| Disabled | ~38% text | `bg-stateslayer-overlay-disabled` + `text-fg-disabled` + `cursor-not-allowed` + `pointer-events-none` |

Never communicate disabled state by colour alone. No scale transforms on state change — overlays only.

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
- Use sentence case for all UI copy — headings, labels, CTAs.

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
- Use exclamation marks, filler words ("just", "simply"), or passive voice in UI copy.
- Exceed 88% opacity for foreground text — `fg-primary` is intentionally ~88%.
- Use a thick single-side accent border decoratively on cards or panels — the only accent-border pattern in QBDS is the `border-stroke-active` underline on active `Tabs`.
- Nest surfaces more than one layer deep (card-in-card-in-card) — flatten with `border-stroke-divider` and spacing instead.
- Stack a decorative eyebrow label or pill chip above a headline, or repeat small uppercase kicker labels above every section — let `headings-h3-semibold` and layout density carry hierarchy.
- Add numbered section markers (01 / 02 / 03) unless the section is a literal ordered sequence (e.g. onboarding steps).
- Blow up a long-sentence headline to `display-*` size — that scale is for short KPI values and 1–2 word phrases; longer copy takes `headings-h2-semibold`.
- Fill a page with a uniform card grid of icon + heading + text — vary content to match real information density; a repeated filler template is not a layout.
- Use PNG icons, ad-hoc Unicode symbols, or illustration as product chrome — QBDS stays typographic.
