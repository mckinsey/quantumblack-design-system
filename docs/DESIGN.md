# DESIGN.md — QuantumBlack Design System (QBDS)

> Source: [mckinsey/quantumblack-design-system](https://github.com/mckinsey/quantumblack-design-system) (Tailwind CSS v4 + shadcn/ui, Radix UI primitives, Material Symbols sharp icons). Sections marked **\[DRAFT — TBD\]** are inferred from the code or reasonable defaults and should be confirmed against official QB brand guidance before use.

---

## 1\. Visual theme and atmosphere

**\[DRAFT — TBD: replace with official QB brand voice.\]**

QBDS is a dark-capable, geometry-first interface language rooted in McKinsey/QuantumBlack's analytical heritage. The aesthetic is **precise, quiet, and structural** — every surface is flat by default, every corner is sharp by default, and every color carries a semantic role rather than a decorative one. The system borrows from professional tooling: neutral slate and mist palettes, restrained brand accents (QB cyan, McKinsey deep blue and electric blue), opacity-driven state layers instead of saturated hovers, and Material Symbols drawn in **sharp** geometry to reinforce the deliberate, right-angled posture.

Density is high but never cramped — typography uses Inter at tight tracking, line-heights are compact (1.0–1.4), and hierarchy is carried by weight (light 300, regular 400, semibold 600) rather than color. Depth, when it appears, is subtle: shadows are slate-tinted and soft, and light-mode separation relies primarily on 1-px borders. The overall effect is "data-dense and composed" — an interface that earns attention through clarity rather than ornament.

---

## 2\. Color palette and roles

QBDS uses a **3-layer token system** (see §4): primitives → semantic aliases → component styles. The tables below list primitive hex values and key semantic aliases. Always prefer semantic tokens (`--color-fg-primary`, `--color-surface-bg-primary`) over primitives in component code.

### Mist (light neutrals)

| Token      | Value   | Token      | Value   |
|----------|-------|----------|-------|
| --mist-50  | #FFFFFF | --mist-500 | #E6E8EA |
| --mist-100 | #FAFAFB | --mist-600 | #E2E4E6 |
| --mist-200 | #F5F6F6 | --mist-700 | #DDDFE1 |
| --mist-300 | #F2F3F4 | --mist-800 | #D8DADD |
| --mist-400 | #EBEDEE | --mist-900 | #D3D6D9 |

### Slate (dark neutrals)

| Token       | Value   | Token       | Value   |
|-----------|-------|-----------|-------|
| --slate-50  | #373A44 | --slate-600 | #1F222E |
| --slate-100 | #333640 | --slate-700 | #1B1E2A |
| --slate-200 | #2F323C | --slate-800 | #181B26 |
| --slate-300 | #2B2E39 | --slate-900 | #141721 |
| --slate-400 | #272A35 | --slate-950 | #10121B |
| --slate-500 | #232632 |             |         |

### Brand accents

| Role                    | Token                                  | Value   |
|-----------------------|--------------------------------------|-------|
| McKinsey deep blue      | --brand-accents-mckinsey-deep-blue     | #051C2C |
| McKinsey electric blue  | --brand-accents-mckinsey-electric-blue | #2251FF |
| McKinsey cyan           | --brand-accents-mckinsey-cyan          | #00A9F4 |
| QB accent (primary CTA) | --brand-accents-qb-accent              | #00A9F4 |

### Opacity ramps (applied on top of primitives for state layers)

`0 / 4 / 6 / 8 / 10 / 12 / 16 / 24 / 30 / 38 / 50 / 60 / 88` — defined for both `--slate-900-opacity-*` (light mode surfaces) and `--mist-50-opacity-*` (dark mode surfaces).

### Semantic roles (light mode → dark mode)

| Role                 | Light value     | Dark value    |
|--------------------|---------------|-------------|
| fg-primary           | slate-900 @ 88% | mist-50 @ 88% |
| fg-secondary         | slate-900 @ 60% | mist-50 @ 60% |
| fg-tertiary          | slate-900 @ 50% | mist-50 @ 50% |
| fg-disabled          | slate-900 @ 38% | mist-50 @ 38% |
| surface-bg-primary   | --mist-50       | --slate-800   |
| surface-bg-secondary | --mist-400      | --slate-700   |
| surface-bg-tertiary  | --mist-500      | --slate-500   |
| surface-bg-base      | --mist-100      | --slate-900   |
| stroke-divider       | slate-900 @ 10% | mist-50 @ 8%  |
| stroke-primary       | slate-900 @ 38% | mist-50 @ 60% |
| stroke-secondary     | slate-900 @ 24% | mist-50 @ 38% |
| stroke-tertiary      | slate-900 @ 16% | mist-50 @ 16% |
| stroke-active        | --slate-950     | --mist-50     |
| fill-primary         | slate-900 @ 88% | mist-50 @ 88% |
| fill-muted           | slate-900 @ 8%  | mist-50 @ 8%  |
| fill-subtle          | slate-900 @ 6%  | mist-50 @ 6%  |

### Status colors

| Role                | Light     | Dark      |
|-------------------|---------|---------|
| status-success      | green-600 | green-400 |
| status-error        | red-600   | red-400   |
| status-warning      | amber-600 | amber-400 |
| status-information  | cyan-600  | cyan-400  |
| stroke-status-focus | sky-400   | sky-400   |

### Tag accent palette (8 families × 2 intensities × 2 modes)

Primary/subtle pairs in: **blue, sky, amber, teal, lime, indigo, red, emerald**. Light mode uses `-600`/`-50`, dark mode uses `-400`/`-950`.

---

## 3\. Typography rules

**Fonts:** Inter (display, headings, paragraph, UI), Roboto Mono (code). **Weights used:** 300 (Light), 400 (Regular), 600 (Semibold). No 500, 700, or 800.

### Size / line-height / weight / tracking table

| Class                             | Size | Line-height | Weight    | Tracking |
|---------------------------------|----|-----------|---------|--------|
| display-d1-regular                | 56   | 60          | 300       | -0.28    |
| display-d2-regular                | 48   | 56          | 300       | -0.96    |
| display-d3-regular                | 40   | 48          | 300       | -0.80    |
| headings-h1-regular               | 32   | 40          | 400       | -0.128   |
| headings-h2-regular / -semibold   | 24   | 32          | 400 / 600 | -0.096   |
| headings-h3-regular / -semibold   | 20   | 28          | 400 / 600 | 0        |
| headings-h4-regular / -semibold   | 16   | 24          | 400 / 600 | -0.016   |
| label-large-primary               | 16   | 24          | 400       | -0.128   |
| label-regular-primary             | 14   | 20          | 400       | -0.112   |
| label-small-primary               | 12   | 16          | 400       | 0        |
| paragraph-large-primary           | 16   | 24          | 400       | -0.032   |
| paragraph-large-emphasised        | 16   | 24          | 600       | -0.032   |
| paragraph-regular-primary         | 14   | 20          | 400       | -0.028   |
| paragraph-regular-emphasised-600  | 14   | 20          | 600       | -0.028   |
| paragraph-small-primary           | 12   | 16          | 400       | +0.024   |
| paragraph-small-emphasised        | 12   | 16          | 600       | +0.024   |
| paragraph-code-text (Roboto Mono) | 12   | 16          | 400       | 0        |
| cta-button-01                     | 16   | 24          | 600       | -0.064   |
| cta-button-02                     | 14   | 20          | 600       | -0.056   |
| cta-button-03                     | 12   | 16          | 600       | -0.012   |

Link variants (`*-link`) add underline; all other properties identical.

**Rule of thumb:** displays are light (300); body is regular (400); buttons, labels, and emphasis are semibold (600). Never exceed 3 weights on a page.

---

## 4\. Token architecture

QBDS enforces a strict three-layer token pipeline. An agent building matching UI **must** reach for tokens at the highest applicable layer.

| Layer                          | Purpose                                                | Examples                                                                    | When to use                                                         |
|------------------------------|------------------------------------------------------|---------------------------------------------------------------------------|-------------------------------------------------------------------|
| 1. Primitives                  | Raw palette and scale values                           | --mist-500, --slate-900, --font-font-size-14                                | Almost never directly. Only when extending the token system itself. |
| 2. Semantic aliases            | Role-based tokens that swap with theme                 | --color-fg-primary, --color-surface-bg-primary, --color-stroke-status-focus | Default choice for all component styling.                           |
| 3. Component / utility classes | Pre-composed Tailwind utilities and typography classes | paragraph-regular-primary, shadow-elevation-2, bg-fill-muted                | Use inside component definitions for speed and consistency.         |

**Why it matters:** semantic tokens (`--color-fg-primary`) remap under `.dark` and `.radius-mode` automatically. Primitives (`--slate-900`) do not. Hardcoding primitives breaks dark mode and sharp/rounded theming.

**Token families (semantic layer):**

- `fg-*` — text and icon color

- `stroke-*` — borders, dividers, focus rings

- `fill-*` — solid-ish backgrounds for components (buttons, inputs)

- `surface-*` — page and panel backgrounds

- `status-*` — success / error / warning / information

- `tags-accent-*` — 8-color categorical palette

- `stateslayer-*` — hover / pressed / disabled overlays

- `elevations-shade-*` — shadow composition

---

## 5\. Theming and modes

QBDS has **two independent mode switches**, applied as CSS classes on a parent element. They compose.

| Mode            | Class                         | Default               | Effect                                                                            |
|---------------|-----------------------------|---------------------|---------------------------------------------------------------------------------|
| Light / dark    | .dark (absent = light)        | Light                 | Remaps all semantic color tokens (fg, surface, stroke, fill, status, elevations). |
| Sharp / rounded | .radius-mode (absent = sharp) | Sharp (all radii = 0) | Overrides --rad-sm/reg/md/lg from 0px to 4/8/12/16px.                             |

### Radius scale

| Token       | Sharp (default) | Rounded (.radius-mode) |
|-----------|---------------|----------------------|
| --rad-sm    | 0px             | 4px                    |
| --rad-reg   | 0px             | 8px                    |
| --rad-md    | 0px             | 12px                   |
| --rad-lg    | 0px             | 16px                   |
| --rad-round | (full)          | (full)                 |

**Sharp is the brand default.** Only enable `.radius-mode` when an application explicitly opts into rounded geometry. Mixing sharp and rounded in the same surface breaks the brand feel.

### Theme activation

```html
<html class="dark">         <!-- dark mode, sharp (brand default dark) -->
<html class="radius-mode">  <!-- light mode, rounded -->
<html class="dark radius-mode"> <!-- dark + rounded -->
```

---

## 6\. Iconography

**Source:** [Material Symbols sharp @ 400 weight](https://fonts.google.com/icons) (`@material-symbols/svg-400/sharp`). **Never use:** rounded or outlined variants of Material Symbols, lucide-react, heroicons, or any other icon set. Sharp geometry is a brand-defining choice.

### Component pattern

Icons are React components wrapping a single SVG `<path>`:

```tsx
<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
  <path d="..." />
</svg>
```

All icons live in `src/components/icons/` and inherit `currentColor`, so color is controlled by the parent's `text-*` class (typically a `fg-*` semantic token).

### Opacity state model

| State                      | Color             | Transition |
|--------------------------|-----------------|----------|
| Default (static)           | fill-active @ 60% | —          |
| .icon-interactive hover    | fill-active @ 88% | color 0.2s |
| .icon-interactive disabled | fill-active @ 30% | —          |

### Size scale (via `icon-shell`)

Sizes follow the component size scale: `xxs`, `xs`, `sm`, `default` (9 = 36px), `lg`, `xl`. Icons inside buttons inherit button size.

---

## 7\. Component styles

All 39 registered primitives. Each entry lists size/variant axes and key style facts. Defaults are in **bold**. All components ship as Radix primitives styled via `cva` (class-variance-authority).

### Button

- **Sizes (9):** `xxs`, `xs`, `sm`, **`default`** (p-2, cta-button-02), `lg` (px-3 py-3, cta-button-01), `icon-xs` (20px), `icon-sm` (28px), `icon` (36px), `icon-lg` (48px).

- **Variants (5):** **`default`** (fill-primary bg, inverse text), `accent` (QB cyan bg), `secondary` (fill-muted bg), `outline` (1-px stroke-secondary border), `ghost` (transparent, state-layer hover).

- **State layers:** hover and active apply `stateslayer-overlay-hover/pressed` as a `linear-gradient` on top of the variant bg (so transparency composes correctly).

- **Focus:** `ring-stroke-status-focus` at 1-px (xxs/xs/sm/icon-xs/icon-sm) or 2-px (default/lg/icon/icon-lg). Non-ghost variants add `ring-offset-1`.

- **Disabled:** `bg-fill-muted`, `text-fg-disabled`, plus disabled overlay gradient; `cursor-not-allowed`.

- **Text behavior:** only text nodes underline on hover/focus/active, not icons.

### Icon Button

Same as Button with `size="icon-*"` — square, no padding, no text. Used for toolbar actions.

### Badge

- **Sizes:** `sm` (h-5), **`default`** (h-6), `lg` (h-7).

- **Shape variants:** `pill` (rounded-full), `rect` (rounded-\[4px\]), plus `dot-pill`, `label-rect`, `label-pill` layout subtypes.

- **Color variants (6):** **`high-emphasis`**, `brand-accent` (QB cyan), `alternative`, `error`, `warning`, `success`.

- **Outline modifier:** flag that switches to border + transparent fill.

- Typography: `label-small-primary` (sm/default), `label-regular-primary` (lg).

### Numeric Badge (sub-component)

- **Sizes:** `sm` (h-4), **`default`** (h-5), `lg` (h-6).

- **Variants:** **`primary`**, `secondary`, `accent`.

- Uses `paragraph-small-emphasised` or `paragraph-regular-emphasised-600`.

### Status Badge (sub-component)

Semantic status pill with left dot, mapped to status tokens.

### Alert

- **Layouts:** **`default`** (inline, tight padding), `long` (p-4, gap-4).

- Composes: title (`headings-h4-*`), description (`paragraph-large-primary text-fg-secondary`), optional icon and action.

- Status-colored left border is available via composition with `border-l-status-*`.

### Avatar

- **Sizes (6):** `xxs` (20px), `xs` (24px), `sm` (28px), **`default`** (36px), `lg` (48px), `xl` (64px).

- **With border:** default/lg/xl get a 2-px `stroke-active-inverse` ring.

- **Fallback:** initials or placeholder icon sized to match.

- **Avatar link:** underlined label adjacent to avatar (`font-semibold`).

### Card

- Default layout: `flex flex-col gap-3 p-6`, background `surface-primary`, text `fg-primary`.

- **Slots:** `Card`, `CardHeader` (auto-rows grid, supports `CardAction` in top-right), `CardTitle` (`font-semibold leading-none`), `CardDescription` (`text-sm text-fg-secondary`), `CardAction`, `CardContent`, `CardFooter`.

- Optional bottom/top borders (`.border-b`, `.border-t`) add `pb-3`/`pt-3`.

- **No shadow by default** — separation comes from background contrast and optional borders. Use `shadow-elevation-*` only for floating surfaces.

### Checkbox

- **Sizes:** **`default`** (bounding 20px, visible 16px), `lg` (bounding 24px, visible 20px).

- Checkmark SVG sized `7×8` (default) or `9×11` (lg).

- Border: `stroke-primary`, transparent fill unchecked. Checked state fills with `fill-primary`, shows inverse checkmark.

### Collapsible

Unstyled Radix primitive — inherits from container.

### Combobox

Composable search/select combo. Uses `command` pattern: search input + scrollable list + groups with dividers (`mb-1 border-b pb-1`), disabled/selected states via `text-fg-secondary`/`bg-fill-subtle`.

### Dialog

- Overlay: full-screen `surface-bg-base @ opacity` with backdrop blur.

- Content: `surface-primary` bg, `shadow-elevation-3`, close button top-right.

- Header: `text-lg font-semibold leading-none`; description: `text-sm text-fg-secondary`.

### Dropdown Menu

- Trigger + content floating panel on `surface-primary` with `shadow-elevation-2`, `stroke-divider` border.

- Items: `px-2 py-1.5 text-sm`, state-layer hover, supports icons and keyboard shortcuts (kbd slot).

### Empty (state)

- Layout: centered `flex flex-col items-center gap-3 p-6`.

- Media slot supports `icon` variant: `size-10` rounded container, `size-6` icon.

- Title: `text-lg font-medium`; description: `text-fg-secondary text-sm`.

### Field (form-field wrapper)

- Orientations: **`vertical`** (gap-2), `horizontal` (flex-row gap-6).

- Slots: label, description (`text-fg-secondary`), error message (`text-status-error text-sm`), content.

- Error text appears below input; description above or beside depending on orientation.

### Form

React-Hook-Form wrapper. Inherits field styling; exposes `FormField`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`.

### Icon Shell

Wrapper that applies `size` and `variant` (color role) to an icon. See §6 for sizes and opacity rules.

### Input

- **Sizes:** `sm` (h-7, paragraph-regular), **`default`** (h-9, paragraph-regular), `lg` (h-12, paragraph-large).

- **Variants:** **`default`** (fill-onsurface-ui-3 bg, transparent border), `inline` (transparent bg, bottom-border only).

- **States:**

  - Hover (default): `stateslayer-overlay-hover` overlay.

  - Focus (default): `stateslayer-overlay-active-inverse` bg + `ring-stroke-status-focus` + `shadow-elevation-0`.

  - Focus (inline): border-bottom switches to `stroke-status-focus`.

  - `aria-invalid`: border (or border-b) switches to `status-error`.

  - Disabled: `stateslayer-overlay-disabled` bg, `fg-disabled` text, `cursor-not-allowed`.

### Input Group

- Wraps input with left/right addons (icon, button, kbd, text label).

- **Sizes:** `sm`, **`default`**, `lg`. **Variants:** **`default`**, `inline` (no padding).

- Addon button sizes: `xs` (h-6) through `icon-xs` (size-4).

### Label

- **Sizes:** `sm`, **`default`**, `lg` — mapped to label-\* typography classes.

- Disabled state: `fg-disabled` + `cursor-not-allowed`.

### Menubar

- Horizontal menu bar, typically in app shell/header.

- Triggers: `px-1 py-0.75 text-sm font-medium` with `rounded-sm` focus state.

- Items: `rounded-xs py-0.75 pr-1 pl-4 text-sm`; separator `h-px bg-border`.

- Destructive variant: `data-[variant=destructive]` adds `text-destructive`.

### Popover

Floating panel on `surface-primary`, `shadow-elevation-2`, `stroke-divider` border. Content slot accepts arbitrary children.

### Progress

Bar on `fill-muted` track, filled with `fill-primary` (or status color for colored variants). Inherits height from container; default \~4px.

### Radio Group

- **Sizes:** **`default`** (bounding 20px, circle 16px, dot 8px) or `lg` (24 / 20 / 10).

- Unchecked: `border-stroke-primary`, transparent fill. Checked: dot fills with `fill-primary`.

- Grid layout with `gap-3`.

### Scroll Area

- Custom scrollbars: 5-px (`w-1.25`) thumb, `border-l/border-t transparent` spacing.

- Track transparent; thumb uses `stroke-secondary`.

### Select

- Trigger matches Input default: `h-9` (default) or `h-12` (lg), `fill-onsurface-ui-3` bg, focus ring.

- Caret icon: `size-4` (default) / `size-6` (lg).

- Content panel: `shadow-elevation-2`, scroll buttons, group separators (`h-px border-b stroke-divider`).

### Separator

Horizontal or vertical 1-px `stroke-divider` line.

### Sidebar

- Widths: `--sidebar-width` (default), `--sidebar-width-icon` (collapsed).

- **Sides:** `left` (default), `right`. **Collapsible modes:** expanded, icon-only.

- Sections: Header, Content (scroll), Footer; grouped menus with labels, items, sub-menus.

- Menu button variants: **`default`**, `outline`. Sizes: `sm` (h-7), **`default`** (h-8), `lg` (h-12).

- Rail + trigger (7px hit area) for resize/collapse.

### Skeleton

`bg-accent animate-pulse rounded-md` placeholder. (Note: `rounded-md` here ties to `.radius-mode` — resolves to 0 in sharp mode.)

### Slider

- Track: `h-1` `slider-track` color (mist-900 light / slate-100 dark).

- Filled range: `fill-primary`.

- Thumb: `size-5` circle, `stroke-active` border, `surface-primary` fill.

- Tick marks: `h-1 w-1 rounded-full`.

### Sonner (Toast)

- Positioned floating card, `shadow-elevation-2`.

- Left border color by status: `border-l-[var(--border-status-success|error|warning|focus|primary)]`.

- Icon slot `size-6` with matching status color.

### Switch

- **Sizes:** `sm`, **`default`**, `lg`.

- Track: `border-stroke-secondary` unchecked, `border-stroke-primary-inverse` checked.

- Thumb sizes: `size-2` (sm) / `size-2.5` (default) / `size-3.5` (lg); translates on check.

- Small thumb border `border-[0.5px] stroke-secondary`.

### Table

- Structure: Root (`w-full caption-bottom`), Header, Body, Footer, Row, Head cell, Body cell, Caption.

- **Sizes:** `small` (px-3), **`default`** (px-4). Body row height \~60px.

- Dividers: `border-b stroke-tertiary`; text `fg-primary`; caption `text-sm text-fg-secondary`.

- Rows ship as `group` for group-hover styling.

### Tabs

- **Sizes:** `sm`, **`default`**, `lg`. Gap and padding scale with size.

- List (trigger row) padding: `px-3 py-2` / `px-4 pt-2 pb-3` / `px-6 py-3`.

- Panel padding: `py-2` / none / `py-3`.

- Active trigger: bottom border `stroke-active`, `fg-primary`. Inactive: `fg-secondary`.

### Tag

- **Sizes:** `xs` (h-5, label-small), `sm` (h-6), **`default`** (h-7), `lg` (h-8, label-large).

- **Shape:** rect (default, sharp) or `pill` (rounded-full, px-2).

- **Variants:** **`primary`**, `secondary` (border + fill-muted), `accent` (QB cyan border + fill-muted), plus status variants.

- Close icon: `size-4`, `ml-1` (except xs).

### Tag Toggle

Tag variant that acts as a filter chip: `border-stroke-tertiary` default, selected state switches to fill-primary inverse. Shares sizing with Tag.

### Textarea

- **Sizes:** `sm`, **`default`**, `lg` (mirrors Input).

- **Variants:** **`default`** (fill-onsurface-ui-3), `inline` (transparent, underline).

- Auto-resize supported; min-height scales with size.

### Time Input

- **Sizes:** `sm` (h-7), **`default`** (h-9), `lg` (h-10). **Variants:** `default`, `inline`.

- Segmented field: hour / minute / (second) with keyboard arrow navigation.

- Trigger icon sizes: `size-5` / `size-5` / `size-7`.

### Time Picker

- Popover list of selectable times. **Sizes:** `sm`, **`default`**, `lg`.

- Item padding scales with size; selected item uses `fill-primary` bg.

- Panel size: `h-32 min-h-[120px] w-[96px]` default; `h-40 min-h-40 w-[112px]` lg.

### Toggle

Unstyled Radix Toggle primitive. Typically composed into `Tag Toggle` or custom button-as-toggle. Inherit from parent variant.

### Tooltip

- Floating panel, `surface-primary` bg, `shadow-elevation-2`, `stroke-divider` border.

- `paragraph-small-primary`, max-width constrained.

### Calendar

- Date-grid primitive (via `react-day-picker`).

- Cell size: `--cell-size` = 12 (lg) or 10 (default) spacing units.

- Range start/middle/end: `rounded-none` in sharp mode (no pill ends).

- Nav buttons: `h-12` (lg) or `h-7`; separator typography `text-fg-tertiary`.

---

## 8\. Accessibility & focus

**\[DRAFT — TBD: confirm against official a11y spec.\]**

### Focus ring

- Always `ring-stroke-status-focus` (sky-400, identical in light and dark).

- **Ring width:** 1-px for small components (`xxs`, `xs`, `sm`, `icon-xs`, `icon-sm`), 2-px for medium and large.

- **Ring offset:** 1-px with `ring-offset-stroke-active-inverse` on filled variants (so the ring is visually separated from the fill).

- Focus is always `focus-visible` — never shown on mouse click, always shown on keyboard nav.

### Error and validation

- `aria-invalid="true"` on inputs switches border (or border-bottom in inline variant) to `border-status-error`, removes the focus ring's ring-colored outline (`ring-0`) to avoid clashing.

- Error messages use `text-status-error text-sm` and render below the input inside the Field wrapper.

### Disabled state

- All interactive components apply: `cursor-not-allowed`, `text-fg-disabled`, `pointer-events-none` (where appropriate), and a disabled overlay gradient (`stateslayer-overlay-disabled`).

- Never communicate disabled-ness by color alone — always combine with cursor + overlay.

### Keyboard

- All menus, dropdowns, dialogs, comboboxes, and time inputs ship with Radix/`cmdk` keyboard handling: arrow nav, Enter to select, Escape to close, Tab to leave.

- Focus returns to trigger when a floating surface closes.

### Semantic structure

- Icons default to `aria-hidden="true"` — label the parent button/link instead.

- Dialogs, popovers, tooltips include role/aria-\* via Radix primitives.

- Form controls are always associated with a `<Label>` (via `Field` or `Form`).

### Touch targets

- Minimum effective target: **36 × 36 px** (`size-9`, the default Button/Input height).

- Mobile-critical flows: prefer `lg` (48 px) to clear the 44-px touch-target recommendation.

### Motion

- Transitions are short (0.2s for color on icons); `transition-all` on buttons for state-layer fades. No pulsing, bouncing, or parallax motion.

- Respect `prefers-reduced-motion` — disable `animate-pulse` (skeleton) and long transitions under this media query. **\[TBD: verify in code.\]**

---

## 9\. Layout principles

**\[DRAFT — TBD: no explicit layout scale is defined in the QBDS token set. The following is inferred from observed component padding and Tailwind v4 defaults.\]**

### Spacing scale (inferred from usage)

- Base unit: **4 px** (Tailwind default, confirmed by `p-2 = 8px`, `p-3 = 12px`, `gap-3 = 12px` patterns).

- Common steps observed: `0.5` (2), `1` (4), `1.5` (6), `2` (8), `3` (12), `4` (16), `6` (24), `8` (32).

- Card default padding: `p-6` (24 px). Button default padding: `p-2` (8 px). Input default height: `h-9` (36 px).

### Grid / container

- **\[TBD: no explicit max-content-width is defined in tokens.\]** Suggested default: `max-w-screen-xl` (1280 px) for application shells.

- Sidebar widths are named via CSS custom properties (`--sidebar-width`, `--sidebar-width-icon`) — set at the app level.

### Border-radius scale

See §5 for the full table. **Sharp (0) is the default.** Inside `.radius-mode`: `sm` 4, `reg` 8, `md` 12, `lg` 16.

### Stacking / z-index

Floating surfaces (Popover, Dropdown, Dialog, Tooltip) are managed by Radix portals — do not set z-index manually. Dialog uses `z-20` internally for nav arrows.

---

## 10\. Depth and elevation

QBDS defines **5 elevation utilities**. Each composes two stacked shadows: a soft tint (`-shade-t-*`) and a harder shadow (`-shade-*`). In dark mode, shadows darken dramatically (slate-900 @ 88%) to read against slate backgrounds.

| Utility            | Usage                                               | Shadow composition                                    |
|------------------|---------------------------------------------------|-----------------------------------------------------|
| shadow-elevation-0 | Flush input focus, subtle resting state             | 0 1px 1px 0 shade-t + 0 0 1px 0 shade                 |
| shadow-elevation-1 | Cards (when elevated), low panels                   | 0 2px 4px 1px shade-t-01 + 0 1px 4px 0 shade-01       |
| shadow-elevation-2 | Popovers, dropdowns, tooltips, select menus, toasts | 0 4px 8px 0 shade-t-02 + 0 2px 4px -1px shade-02      |
| shadow-elevation-3 | Dialogs, modals                                     | 0 8px 12px 1px shade-t-03 + 0 4px 8px -1px shade-03   |
| shadow-elevation-4 | Full-screen overlays, drawers                       | 0 16px 32px 2px shade-t-04 + 0 8px 16px -2px shade-04 |

**Light mode** shade colors are `slate-900` at 8–38% opacity. **Dark mode** shade colors deepen to 60–88% opacity (so they read against already-dark surfaces).

**Default philosophy:** most surfaces in light mode carry **no shadow** — separation comes from `stroke-divider` borders and `surface-bg-*` contrast. Shadows appear only when a surface is truly floating above its parent.

---

## 11\. Do's and don'ts

**\[DRAFT — TBD: inferred from code patterns and shadcn/Radix conventions. Confirm against official QB brand guidance.\]**

### Do

- Use **semantic tokens** (`fg-primary`, `surface-bg-primary`) for all component styling. Reach for primitives only when extending the token system itself.

- Default to **sharp geometry** (radii = 0). Opt into `.radius-mode` only at the app level, not per-component.

- Use **borders over shadows** for separation in light mode. Reserve `shadow-elevation-*` for truly floating surfaces.

- Use **opacity-based state layers** (`stateslayer-overlay-*`) instead of saturated hover colors — this is how QBDS composes states across themes.

- Apply **typography classes** (`paragraph-regular-primary`, `cta-button-02`) instead of composing font-size + line-height + weight + tracking utilities manually.

- Use **Material Symbols sharp @ 400** for all icons.

- Ship every interactive element with a visible **`focus-visible` ring** using `ring-stroke-status-focus`.

### Don't

- **Don't use primitives directly** in component code (`bg-slate-900`, `text-mist-50`) — use semantic tokens so dark/light modes swap cleanly.

- **Don't mix sharp and rounded corners** in the same surface. Either `.radius-mode` is set on a parent, or it isn't.

- **Don't use rounded-full on rectangular buttons** — `rounded-full` is reserved for pill tags, avatars, and dot indicators.

- **Don't use more than 3 font weights** on a page (QBDS ships only 300, 400, 600 — that is the maximum, not the target).

- **Don't saturate hover colors.** Hover state should feel like a subtle overlay, not a color change.

- **Don't use drop-shadows on cards by default.** Light-mode cards separate via background and border; shadows imply floating.

- **Don't import icons from lucide, heroicons, or non-sharp Material Symbols** — breaks brand geometry.

- **Don't exceed 88% opacity for foreground text.** `fg-primary` is intentionally slate-900 @ 88%, not 100%, to soften contrast.

- **Don't communicate status by color alone.** Pair status colors with icons and text labels.

- **Don't set z-index manually** on Radix-portalled surfaces.

---

## 12\. Responsive behavior

**\[DRAFT — TBD: QBDS does not define custom breakpoints. Tailwind v4 defaults apply.\]**

### Breakpoints (Tailwind v4 defaults)

| Name   | Width     | Suggested behavior                                                          |
|------|---------|---------------------------------------------------------------------------|
| Mobile | < 640 px  | Stack vertically, bottom sheet for menus, Sidebar collapses to off-canvas.  |
| sm     | ≥ 640 px  | Start showing 2-column forms.                                               |
| md     | ≥ 768 px  | Tablet layouts, sidebar can live as overlay.                                |
| lg     | ≥ 1024 px | Full persistent sidebar, multi-column dashboards.                           |
| xl     | ≥ 1280 px | Widest suggested content container.                                         |
| 2xl    | ≥ 1536 px | Large display optimization (avoid stretching single content to full width). |

### Touch targets

- Minimum: **36 × 36 px** (`size-9`). Prefer **48 × 48 px** (`size-12`, `lg` variant) for primary mobile actions to clear the WCAG 2.5.5 recommended 44-px target.

### Type scaling

- **Do not drop body text below 12 px** (`paragraph-small-primary`) on mobile.

- Displays (40–56 px) can scale down to h1-equivalent (32 px) on small screens — use responsive class swaps.

### Sidebar

- Use `Sidebar` in `offcanvas` or `icon`-collapsed modes on `< md`. Persistent on `≥ lg`.

---

## 13\. Agent prompt guide

### Quick palette (the colors you'll reach for 90% of the time)

```
bg-base:       var(--color-surface-bg-base)         // mist-100  / slate-900
bg-primary:    var(--color-surface-bg-primary)      // mist-50   / slate-800
fg-primary:    var(--color-fg-primary)              // slate-900 @ 88% / mist-50 @ 88%
fg-secondary:  var(--color-fg-secondary)            // ...@ 60%
stroke-div:    var(--color-stroke-divider)          // ...@ 10% / ...@ 8%
accent:        var(--color-brand-accents-qb-accent) // #00A9F4
focus:         var(--color-stroke-status-focus)     // sky-400
```

### Defaults to remember

- **Font:** Inter (UI), Roboto Mono (code). Weights: 300 / 400 / 600 only.

- **Body size:** 14 px (`paragraph-regular-primary`). Button default size: 14 px semibold.

- **Radius:** 0 px (sharp) unless `.radius-mode` is set.

- **Icons:** Material Symbols sharp @ 400, inheriting `currentColor`.

- **Card padding:** `p-6` (24 px), `gap-3` between slots, no shadow by default.

- **Button height:** 36 px (`h-9`) default; 48 px (`h-12`) for large.

- **Input height:** 36 px (`h-9`) default.

- **Focus ring:** 1-px or 2-px `ring-stroke-status-focus` with 1-px offset on filled variants.

### Ready-to-use prompts

- **"Create a settings page"** → light `surface-bg-base` bg, grouped `Card` sections with `p-6 gap-3`, no shadows, `stroke-divider` borders between groups, 14 px body, `Switch` for toggles, `Field` wrappers for each control. Sharp corners.

- **"Build a data table"** → `Table` with `default` size (px-4), 60-px body rows, `border-b stroke-tertiary` row dividers, sticky header using `surface-bg-primary`, `paragraph-regular-primary` body, monospaced numbers via `font-mono` on numeric cells, row group-hover with `fill-subtle`.

- **"Build a dashboard card"** → `Card` with `CardHeader` (Title + optional `CardAction`), `CardContent` for chart area, `CardFooter` with small metadata (`paragraph-small-primary text-fg-secondary`). No shadow, optional `border-b` between header and content.

- **"Build a modal for confirming a destructive action"** → `Dialog` with `shadow-elevation-3`, `headings-h4-semibold` title, `paragraph-regular-primary text-fg-secondary` body, footer with ghost-variant Cancel + `default`-variant destructive action styled with `status-error` text.

- **"Build a sidebar app shell"** → `Sidebar` (left, collapsible=icon), header with logo slot, grouped menu items, footer with user avatar. Main content `surface-bg-base`, `max-w-screen-xl mx-auto p-6` inside.

- **"Build an empty state"** → `Empty` with `icon` media variant (size-10 rounded container, size-6 icon), `text-lg font-medium` title, `paragraph-regular-primary text-fg-secondary` description, primary Button below.

- **"Build a tag filter row"** → row of `TagToggle` (default size), gap-2, unselected with `border-stroke-tertiary`, selected with `fill-primary`. Add a "Clear" ghost Button on the right.

- **"Build a toast notification"** → `Sonner` with status-colored left border (`border-l-status-success`), `shadow-elevation-2`, `surface-primary` bg, icon on the left, message `paragraph-regular-primary`.

### Theme swap cheatsheet

- Light + sharp (default brand): no classes on root.

- Dark + sharp: `<html class="dark">`.

- Light + rounded: `<html class="radius-mode">`.

- Dark + rounded: `<html class="dark radius-mode">`.

---

*Generated against QBDS `main` as of April 2026. Re-verify tokens and components against the live registry before production use.*