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
  focus-ring:
    backgroundColor: '{colors.focus}'
    size: '2px'
---

# Visual design rules — QuantumBlack Design System

> Source: [mckinsey/quantumblack-design-system](https://github.com/mckinsey/quantumblack-design-system) (Tailwind CSS v4 + shadcn/ui, Radix UI primitives, Material Symbols Sharp icons).
> **Exact hex, opacity ramps, typography measurements, shadow stacks:** [`src/styles/globals.css`](https://github.com/mckinsey/quantumblack-design-system/blob/main/src/styles/globals.css).

**This file:** design rules, accessibility, layout philosophy, do/don't. Does **not** replace `globals.css`, per-component APIs, or the live docs.

---

## Table of contents

1. [Visual theme and atmosphere](#1-visual-theme-and-atmosphere)
2. [Color palette and roles](#2-color-palette-and-roles)
3. [Typography rules](#3-typography-rules)
4. [Token architecture](#4-token-architecture)
5. [Theming and modes](#5-theming-and-modes)
6. [Iconography](#6-iconography)
7. [Components from the registry](#7-components-from-the-registry)
8. [Accessibility & focus](#8-accessibility--focus)
9. [Layout principles](#9-layout-principles)
10. [Depth and elevation](#10-depth-and-elevation)
11. [Interaction conventions](#11-interaction-conventions)
12. [Do's and don'ts](#12-dos-and-donts)
13. [Responsive behavior](#13-responsive-behavior)

---

## 1. Visual theme and atmosphere

QBDS is a **dark-capable, geometry-first** interface language rooted in McKinsey / QuantumBlack analytical practice. The intended posture is **precise, quiet, structural**: flat surfaces by default, sharp corners unless `.radius-mode` is applied at the root (§5), colour used semantically (roles and state — not decorative gradients or rainbow chrome).

Palette: **slate** and **mist** neutrals; restrained **brand accents** (exact values only in `globals.css`). Interaction feedback uses **opacity overlays**, not saturated hovers (§11). **Material Symbols Sharp** for product chrome (§6).

The overall effect is **data-dense and composed** — hierarchy from typography weight and layout density (§3), not from extra colour bands.

---

## 2. Color palette and roles

**Single source of truth for hex, opacity ramps, semantic colour mappings, and status ramps:** [`src/styles/globals.css`](https://github.com/mckinsey/quantumblack-design-system/blob/main/src/styles/globals.css). After `npx shadcn@latest add @qbds/...`, read the same variables from the installed theme file.

QBDS uses a **3-layer pipeline**: **primitives** (mist, slate, brand ramps) → **semantic CSS variables** (`--surface-base`, `--fg-primary`, … in `globals.css`) → **Tailwind utilities** named in [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md) (`bg-surface-base`, `text-fg-primary`, …).

**In UI code:** prefer **Tailwind utilities** so `.dark` and future DS updates apply automatically. Use primitives only when extending the token system itself.

### Chart colours

QBDS chart palettes for ECharts (default), Chart.js, D3, Vega-Lite, and other libraries. Apply these values **directly in chart configuration** — do not use `echarts.registerTheme()` or pass a theme name to `echarts.init()`. Set `color`, axis options, and `backgroundColor` explicitly on each chart instance so dark/light toggling works correctly.

Never invent chart hex. Qualitative and continuous palettes are identical in dark and light mode; only plot/axis tokens swap on theme toggle. Chart labels, legends, tooltips, and titles use **Inter**.

**Qualitative (discrete / categorical series)** — default for bar, line, and pie series with distinct categories. Order matches `theme.color` in the bundled ECharts themes.

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

**Continuous — default scales.** Stops run **light (low) → dark (high)** unless noted.

| Key                  | Use                          | Stops                                                                                                     |
| -------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| **sequential**       | Default continuous / heatmap | `#DBEBFE` → `#BDDCFE` → `#8CC6FF` → `#4BA5FF` → `#097DFE` → `#0063F6` → `#004DE0` → `#0B40B4` → `#163B8B` |
| **sequential_plus**  | Positive / "good" sentiment  | `#D0FAF3` → `#A1F4E8` → `#64E9D9` → `#1BD0C1` → `#00B5A9` → `#00918A` → `#0F766E` → `#0F5B59` → `#144B49` |
| **sequential_minus** | Reversed negative scale      | `#782921` → `#922A20` → `#B22F20` → `#D63A28` → `#EA5748` → `#F1766C` → `#F7AAA3` → `#FACDC9` → `#FBE4E2` |
| **diverging**        | Data with a midpoint         | `#782921` → `#B22F20` → `#EA5748` → `#F7AAA3` → `#C9D0D9` → `#8CC6FF` → `#097DFE` → `#004DE0` → `#163B8B` |

Anchor the diverging centre stop (`#C9D0D9`) at the data's neutral value (often zero).

**Semantic chart colours** — single-value tokens for KPIs, status badges, candlesticks, and annotations. Same in dark and light.

| Role                                | Hex       |
| ----------------------------------- | --------- |
| Positive / success / candlestick up | `#00B5A9` |
| Negative / error / candlestick down | `#EA5748` |
| Neutral                             | `#3E495B` |

**Mode-specific plot tokens** — swap when the theme toggle changes.

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

**Axis behaviour:**

| Axis type       | Axis line    | Ticks                  | Grid lines        |
| --------------- | ------------ | ---------------------- | ----------------- |
| **Category**    | show + ticks | same as axis (38% ink) | **no** grid lines |
| **Value / log** | hide         | —                      | **show** (8% ink) |
| **Time**        | show + ticks | same as axis (38% ink) | **no** grid lines |

**Compact 3-stop gradient** (for `visualMap.inRange.color` in ECharts or equivalent colour-range API): `#163B8B` → `#097DFE` → `#DBEBFE`.

**Line series defaults** (apply across all charting libraries):

| Property      | Value                                        |
| ------------- | -------------------------------------------- |
| Stroke width  | 2px                                          |
| Point markers | Small open circles — size 4, border 1px      |
| Smoothing     | None — straight segments between data points |

---

## 3. Typography rules

**Source of truth for font stacks, sizes, line-heights, tracking, and named utility classes** (`display-*`, `headings-*`, `label-*`, `paragraph-*`, `cta-button-*`, `*-link`): [`globals.css`](https://github.com/mckinsey/quantumblack-design-system/blob/main/src/styles/globals.css) or your project's installed QBDS theme CSS.

**Fonts:** Inter (UI), Roboto Mono (code). **Weights in product: 300, 400, 600 only** — never 500, 700, 800.

Prefer **named typography classes** over composing raw `text-*` + `leading-*` + `tracking-*` manually.

**Rule of thumb:** displays → light (300); body → regular (400); labels, buttons, emphasis → semibold (600). Never exceed three weights on a page.

### Quick-reference — common typography classes

Full list and measurements in [`globals.css`](https://github.com/mckinsey/quantumblack-design-system/blob/main/src/styles/globals.css). These are the most-used classes in product UI:

| Class                       | Typical use                                                  |
| --------------------------- | ------------------------------------------------------------ |
| `headings-h2-semibold`      | Navbar / page title                                          |
| `headings-h3-semibold`      | Section or card title                                        |
| `headings-h4-regular`       | Page subtitle, secondary heading                             |
| `label-regular-primary`     | Form labels, table column headers                            |
| `label-small-primary`       | Nav group labels, helper captions                            |
| `paragraph-regular-primary` | Body copy, input text                                        |
| `paragraph-small-primary`   | Secondary body, description text (min size: do not go below) |
| `cta-button-02`             | Button text (default size)                                   |

For `display-*` sizes and the full weight variants, open `globals.css` and search for `@utility`.

---

## 4. Token architecture

QBDS enforces a strict pipeline. Full role → utility tables live in [TOKENS.md](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/TOKENS.md). Hex values and variable definitions live in `globals.css`.

| Layer                        | Purpose                                                       | When to use                                             |
| ---------------------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| **1. Primitives**            | Raw palette (`mist-*`, `slate-*`, opacity ramps)              | Almost never in product UI — they feed semantics        |
| **2. Semantic tokens**       | Role-based CSS vars that swap under `.dark` / `.radius-mode`  | Via Tailwind utilities from TOKENS.md                   |
| **3. Registry class stacks** | Full interactive styling (`button.tsx` `cva`, `input.tsx`, …) | Copy onto HTML elements or use `@qbds` React primitives |

**Why it matters:** semantic utilities remap under `.dark` and `.radius-mode` automatically. Primitives and hand-rolled hex do not.

### How to choose

1. **Purpose first** — `surface` (shells), `fill` (components), `fg` (copy), `stroke` (borders), `status` (non-text fills), `stateslayer-overlay` (hover/press), `shadow-elevation-*` (depth).
2. **Then contrast** — within a family: `primary` > `secondary` > `tertiary` > `disabled`.
3. **`-inverse`** on accent / high-contrast backgrounds.
4. **Prefer Tailwind utilities** (`bg-surface-base`, `text-fg-primary`) over `var(--*)`.
5. **Typography** — named classes (`paragraph-regular-primary`, `headings-h2-semibold`), not hand-composed `text-sm leading-5`.
6. **Status text** — `text-error`, `text-success`, etc. (AA); `status-*` utilities are for fills/borders only.

### Quick rules

- Prefer **semantic** over **primitive** in product UI.
- Use the right **family** — `surface-*` for shells, `fill-*` for components, `stroke-*` for borders.
- **Hover/press** — `bg-stateslayer-overlay-hover` / `pressed` (or `-inverse`), not `bg-white/8` or ad-hoc opacity.
- **Elevation** — `shadow-elevation-0` … `shadow-elevation-4`, not custom box-shadows.
- **Spacing** — Tailwind 4px scale (`p-6`, `gap-4`).

### Frequent utilities

| Role                     | Utility                                         |
| ------------------------ | ----------------------------------------------- |
| App canvas               | `bg-surface-base`                               |
| Panel / card             | `bg-surface-primary`                            |
| Body text                | `text-fg-primary` + `paragraph-regular-primary` |
| Muted text               | `text-fg-secondary`                             |
| Divider / border         | `border-stroke-divider`                         |
| Card outline             | `border-stroke-tertiary`                        |
| Subtle lift              | `shadow-elevation-1`                            |
| Focus ring               | `focus-visible:ring-stroke-status-focus`        |
| Brand accent (sparingly) | `bg-brand-accents-qb-accent`                    |

---

## 5. Theming and modes

Two **independent** mode switches, applied as CSS classes on a parent element:

| Mode            | Class          | Default when unset    | Effect                                                               |
| --------------- | -------------- | --------------------- | -------------------------------------------------------------------- |
| Light / dark    | `.dark`        | Light token maps      | Remaps `fg`, `surface`, `stroke`, `fill`, `status`, elevation tokens |
| Sharp / rounded | `.radius-mode` | Sharp — all radii `0` | Enables `--rad-sm/reg/md/lg` = `4/8/12/16px`                         |

Default to `class="dark"` on `<html>` at first load. Toggle removes `dark` for light; add `radius-mode` only when the app explicitly opts into rounded geometry.

### Theme activation

```html
<html class="dark">
  <!-- dark, sharp — default -->
  <html>
    <!-- light, sharp -->
    <html class="dark radius-mode">
      <!-- dark, rounded -->
      <html class="radius-mode">
        <!-- light, rounded -->
      </html>
    </html>
  </html>
</html>
```

### Radius scale

| Token       | Sharp (default) | Rounded (`.radius-mode`) |
| ----------- | --------------- | ------------------------ |
| `--rad-sm`  | `0px`           | `4px`                    |
| `--rad-reg` | `0px`           | `8px`                    |
| `--rad-md`  | `0px`           | `12px`                   |
| `--rad-lg`  | `0px`           | `16px`                   |

**Sharp is the brand default.** Never mix sharp and rounded in the same surface.

---

## 6. Iconography

**Source:** [Material Symbols Sharp @ 400 weight](https://fonts.google.com/icons). **Never use:** rounded or outlined Material Symbols variants, lucide-react, heroicons, or any other icon set. Sharp geometry is brand-defining.

Icons inherit `currentColor` — tint is controlled by the parent's `text-fg-*` class.

### Opacity state model

| State                        | Opacity |
| ---------------------------- | ------- |
| Default                      | 60%     |
| `.icon-interactive` hover    | 88%     |
| `.icon-interactive` disabled | 30%     |

### `IconShell` (React path)

```tsx
import { CropFree } from '@/components/icons';
import { IconShell } from '@/components/ui/icon-shell';

<IconShell size="sm">
  <CropFree />
</IconShell>;
```

Common icon names: Close, Check, ChevronDown, ChevronLeft, ChevronRight, CalendarMonth, ArrowForward, CheckCircle, Cancel, ErrorIcon, Info, SwapVert.

---

## 7. Components from the registry

**Authoritative detail** — props, variants, install workflow: [react-qbds-registry.md](react-qbds-registry.md).

Components are Radix-based primitives styled with `cva`. Prefer **composing** them over copying bespoke class stacks from memory. Extend via wrappers; avoid forking registry markup so upstream DS fixes propagate.

Charts are **not** QBDS primitives — use Apache ECharts. Chart colour palettes and plot tokens are defined in [§2 — Chart colours](#chart-colours) above.

---

## 8. Accessibility & focus

### Focus ring

- Always `focus-visible:ring-stroke-status-focus` — never shown on mouse click, always on keyboard nav.
- **Ring width:** 1px for small components (`xs`, `sm`); 2px for medium and large.
- **Ring offset:** 1px with `ring-offset-stroke-active-inverse` on filled variants.

### Error and validation

- `aria-invalid="true"` switches border to `border-status-error`; remove conflicting focus ring with `ring-0`.
- Error messages: `text-status-error text-sm`, rendered below the input inside the Field wrapper.

### Disabled state

- All interactive components: `cursor-not-allowed`, `text-fg-disabled`, `pointer-events-none`, and `stateslayer-overlay-disabled`.
- Never communicate disabled-ness by colour alone.

### Keyboard

- All menus, dropdowns, dialogs, and comboboxes ship with Radix/`cmdk` keyboard handling: arrow nav, Enter to select, Escape to close, Tab to leave.
- Focus returns to trigger when a floating surface closes.

### Semantic structure

- Icons: `aria-hidden="true"` — label the parent button/link.
- Form controls: always associated with a `<Label>` via `Field` or `Form`.

### Touch targets

- Minimum: **36 × 36 px** (`size-9`, default Button/Input height). For mobile-critical flows, prefer `lg` (48px).

### Motion

- Transitions: ~200ms. No pulsing, bouncing, or parallax. Respect `prefers-reduced-motion`.

---

## 9. Layout principles

- **Spacing:** Tailwind 4px scale (`p-*`, `gap-*`). Match shipped patterns: `Card` padding `p-6`, `Button` padding `p-2`, default `Input` height `h-9` (36px). Between major dashboard sections (header, KPI row, charts, table): `gap-8` on a `flex flex-col` wrapper — not isolated `mb-6` on each child.
- **KPI / metric cards:** minimum width `min-w-[240px]` so label, value, and delta stay on one visual unit; use `overflow-x-auto` + `flex-nowrap` when the row cannot fit.
- **Grid/container:** see [app-layout-archetypes.md](app-layout-archetypes.md) for main column widths by archetype.
- **Z-index:** floating surfaces (Popover, Dropdown, Dialog, Tooltip) are managed by Radix portals — never set z-index manually.

---

## 10. Depth and elevation

Five elevation utilities: `shadow-elevation-0` … `shadow-elevation-4`. Exact shadow stacks in `globals.css`.

| Utility              | Typical use                                  |
| -------------------- | -------------------------------------------- |
| `shadow-elevation-0` | Flush input focus, subtle resting lift       |
| `shadow-elevation-1` | Slightly raised cards or panels              |
| `shadow-elevation-2` | Popovers, dropdowns, tooltips, menus, toasts |
| `shadow-elevation-3` | Dialogs, modals                              |
| `shadow-elevation-4` | Heavy overlays, drawers                      |

In light mode, many surfaces use **borders and surface contrast** instead of shadow — reserve elevation utilities for surfaces that truly float above their parent.

---

## 11. Interaction conventions

### State layers

Hover and press use **opacity overlays**:

- **Hover:** ~8% overlay
- **Pressed / active:** ~16% overlay
- **Disabled:** state layer + reduced text opacity (~38%)
- **No scale transforms** — state reads through colour/overlay only
- **Animation:** ~200ms transitions; respect `prefers-reduced-motion`

---

## 12. Do's and don'ts

### Copy & tone

QBDS reads **analytical and restrained** — not marketing or chatty.

- **Functional and direct** — terse labels; no slogans or filler. No marketing buzzwords ("streamline", "empower", "supercharge", "world-class", "enterprise-grade") — name the specific action or data instead.
- **Simple**: clear, concise, direct — not vague, jargon-heavy, or verbose. E.g. "We build new skills within your team," not "We leverage your existing organisational resources to synthesise novel competencies."
- **Sentence case** for labels and short strings; Title Case for proper names only.
- **No emoji** in product UI.
- **Errors** — plain, factual, actionable.
- **Pattern descriptions** — third person where it fits: "Displays…", "Shows…", "Filters…".
- **No em-dash chains** in UI copy or generated narrative text — use periods or commas to separate clauses.
- **No manufactured-contrast one-liners** ("Not a feature. A platform.") or dismissive "theater" framing in empty states, onboarding copy, or insight text — state the fact plainly.

### Do

- Use **Tailwind utilities from TOKENS.md** for all styling — never primitives or raw hex in product UI.
- Default to **sharp geometry**. Opt into `.radius-mode` at the app level, not per-component.
- Use **borders over shadows** for separation in light mode.
- Use **opacity-based state layers** (`stateslayer-overlay-*`) for hover/press.
- Apply **named typography classes** instead of composing font-size + line-height manually.
- Use **Material Symbols Sharp @ 400** for all icons.
- Ship every interactive element with a visible `focus-visible` ring using `ring-stroke-status-focus`.
- Pair status colours with icons **and** text labels.

### Don't

- **Don't use primitives** (`bg-slate-900`, `text-mist-50`) in product UI — semantic tokens only.
- **Don't mix sharp and rounded corners** in the same surface.
- **Don't use `rounded-full` on rectangular buttons** — reserved for pill tags, avatars, dot indicators.
- **Don't exceed 3 font weights** (300, 400, 600 — that's the maximum, not the target).
- **Don't saturate hover colours** — overlays, not colour shifts.
- **Don't use drop-shadows on cards by default** — light-mode cards separate via border and surface.
- **Don't import non-Sharp icons** (lucide, heroicons, rounded/outlined Material Symbols).
- **Don't exceed 88% opacity for foreground text** — `fg-primary` is intentionally ~88%.
- **Don't set z-index manually** on Radix-portalled surfaces.
- **Don't use gradients, patterns, or textures** as backgrounds.
- **Don't use PNG icons or ad-hoc Unicode symbols** for product chrome.
- **Don't fill the shell with illustration or full-bleed imagery** — QBDS stays typographic.
- **Don't use a thick single-side accent border decoratively** on a card or panel — the only accent-border pattern in QBDS is the `border-stroke-active` underline on active `Tabs`; never apply a colored side-stripe to cards, alerts, or panels as a status or decorative treatment.
- **Don't nest surfaces more than one layer deep** (card-in-card-in-card) — flatten with `border-stroke-divider` and spacing instead.
- **Don't stack a decorative eyebrow label or pill chip above a headline**, and don't repeat tiny uppercase kicker labels above every section — let `headings-h3-semibold` and layout density (§9) carry structure.
- **Don't add numbered section markers (01 / 02 / 03)** unless the section is a literal, ordered sequence (e.g. onboarding steps).
- **Don't blow up a long-sentence headline to `display-*` size** — that scale is for short headlines (1–2 phrases); longer copy takes `headings-h2-semibold`.
- **Don't manufacture uniform card grids to fill space** — vary card content to match actual information density; a repeated icon+heading+text template is a filler pattern, not a layout.

---

## 13. Responsive behavior

- **Breakpoints:** Tailwind defaults (`sm`, `md`, `lg`). On small viewports: prefer stacking, bottom sheets for dense menus.
- **Type scaling:** do not drop body text below 12px (`paragraph-small-primary`). Displays (40–56px) can scale down to 32px on small screens.
- **Sidebar:** responsive behaviour and shapes — [app-layout-archetypes.md § Shared app shell](app-layout-archetypes.md#shared-app-shell).
