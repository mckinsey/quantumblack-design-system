# QBDS Tokens

The single source of truth for picking a design token in code. Every row below maps a **CSS variable** defined in [`src/styles/globals.css`](../src/styles/globals.css) to the **Tailwind utility** you should use in components, with guidance on what it's for. The **Design name** column lists the upstream identifier in the QBDS design library — use it when syncing changes between code and design.

A searchable reference with light/dark swatches (and shadow previews for elevations) is at **`/tokens`** on the registry site (this file + `globals.css`, via [`src/lib/tokens.ts`](../src/lib/tokens.ts)). After edits, run `npm run tokens:check` and spot-check `/tokens` in the dev server. The page skips `*-inverse` rows for now; they stay in the tables below.

## How to choose a token

1. **Identify purpose first.** Is it a background panel (`surface`), a content/component fill (`fill`), text colour (`text`/`fg`), a stroke (`border`/`stroke`), status feedback (`status`), an interaction overlay (`stateslayer-overlay`), or a shadow (`shadow-elevation`)? Match purpose to the right family before picking a shade.
2. **Then pick contrast.** Within a family the scale is usually `primary > secondary > tertiary > disabled`; `primary` is highest contrast.
3. **Use `-inverse` on dark/high-contrast backgrounds.** When placing content on `fill-active` or any accent surface, swap to the matching `-inverse` token so it remains legible across themes.

## Quick rules

- **Prefer semantic over primitive.** Use `bg-fill-active`, never `bg-slate-950`. Primitives (`mist-*`, `slate-*`, opacity ladders) exist only to feed semantics — don't reach for them directly in components.
- **Prefer Tailwind utility over inline var.** Use `bg-surface-base`, not `bg-[var(--surface-base)]`. The bridge is already wired in `@theme inline`.
- **Use the right family.** `surface-*` for shells, `fill-*` for content/components, `text-*`/`fg-*` for text, `border-*`/`stroke-*` for strokes, `stateslayer-overlay-*` for interaction tints.
- **State overlays go through `bg-stateslayer-overlay-*`,** not custom alpha. They are colour-correct in both light and dark modes.
- **Typography is class-based.** Use `paragraph-regular-primary`, not `text-sm leading-5 tracking-[-0.028px]`. The `cn()` wrapper in [`src/lib/utils.ts`](../src/lib/utils.ts) extends `tailwind-merge` to dedupe these classes correctly.
- **Status colours have two flavours.** `status-*` is for **non-text fills/borders** (not AA-compliant); `text-information|error|warning|success` is for **text** (AA 4.5:1).

---

## Surface

Page and panel backgrounds. The chrome.

| CSS variable          | Tailwind               | Use for                                                                                                                           | Design name         |
| --------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `--surface-base`      | `bg-surface-base`      | High contrast surface — negative space / separator between primary or secondary backgrounds. Suitable for high-contrast canvases. | `Surface/Base`      |
| `--surface-primary`   | `bg-surface-primary`   | Primary page / UI shell panel background.                                                                                         | `Surface/Primary`   |
| `--surface-secondary` | `bg-surface-secondary` | Secondary page / UI shell panel background — side panels.                                                                         | `Surface/Secondary` |
| `--surface-tertiary`  | `bg-surface-tertiary`  | Optional usage — tertiary background / UI shell panels when primary and secondary are already used.                               | `Surface/Tertiary`  |

## Fill — content

Content-bearing fills: button bodies, tooltip backgrounds, icons, sliders, tags, switches.

| CSS variable          | Tailwind               | Use for                                                                                                                | Design name                      |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `--fill-primary`      | `bg-fill-primary`      | Buttons and tooltip backgrounds; high contrast / emphasised items; accents.                                            | `Fill/Content/Primary`           |
| `--fill-secondary`    | `bg-fill-secondary`    | Medium contrast accent backgrounds.                                                                                    | `Fill/Content/Secondary`         |
| `--fill-tertiary`     | `bg-fill-tertiary`     | Medium colour contrast overlay on high contrast items, UI shells / panels, tiles.                                      | `Fill/Content/Tertiary`          |
| `--fill-active`       | `bg-fill-active`       | Active state fill for icons, button backgrounds, tags, switches, toggle items, sliders.                                | `Fill/Content/Active`            |
| `--fill-active-alpha` | `bg-fill-active-alpha` | Opacity-based active fill — same hue as `fill-active` but semi-transparent; use where a solid fill would be too harsh. | `Fill/Active`                    |
| `--fill-disabled`     | `bg-fill-disabled`     | Any fill for disabled elements that sit on `fill-muted` or surface tokens.                                             | `Fill/Content/Disabled`          |
| `--slider-track`      | `bg-slider-track`      | Slider track, step markers, stepper track fills.                                                                       | `Fill/Content/StepMarkers-Track` |
| `--fill-*-inverse`    | `bg-fill-*-inverse`    | Same usage as the non-inverse token, tuned for high-contrast / theme-switch contexts.                                  | `Fill/Content/*-Inverse`         |

## Fill — onSurface

UI containers that sit **on top of** surface tokens: tiles, input field backgrounds, badges, secondary buttons.

| CSS variable                                    | Tailwind                                          | Use for                                                                                                                                               | Design name                                                     |
| ----------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `--fill-subtle`                                 | `bg-fill-subtle`                                  | Low contrast overlay on high contrast items — disabled backgrounds when disabled icons/text are present; tiles, tags, badges, secondary button fills. | `Fill/onSurface/Subtle`                                         |
| `--fill-muted`                                  | `bg-fill-muted`                                   | Same usage as subtle, slightly higher contrast.                                                                                                       | `Fill/onSurface/Muted`                                          |
| `--fill-onsurface-ui-1`                         | `bg-fill-onsurface-ui-1`                          | Solid high-contrast tiles / UI container backgrounds that sit on surface tokens.                                                                      | `Fill/onSurface/bg-ui1`                                         |
| `--fill-onsurface-ui-2`                         | `bg-fill-onsurface-ui-2`                          | Solid avatar (mono) backgrounds, medium contrast tiles, UI containers that sit on surface tokens.                                                     | `Fill/onSurface/bg-ui2`                                         |
| `--fill-onsurface-ui-3`                         | `bg-fill-onsurface-ui-3`                          | Solid UI backgrounds — field inputs, notification/toast/sonner panels that sit on surface tokens.                                                     | `Fill/onSurface/bg-ui3`                                         |
| `--fill-subtle-inverse`, `--fill-muted-inverse` | `bg-fill-subtle-inverse`, `bg-fill-muted-inverse` | High-contrast / theme-switch variants of the above.                                                                                                   | `Fill/onSurface/Subtle-Inverse`, `Fill/onSurface/Muted-Inverse` |

## Text

Text fills only. For status-text colours, use `text-information|error|warning|success` (AA-compliant) rather than `status-*` (which is for fills/borders, not AA-compliant).

The QBDS source-of-truth variables live under `--text-*`; the Tailwind bridge exposes them as `--color-fg-*` so the utility names use the `fg-` prefix.

| CSS variable         | Tailwind            | Use for                                                            | Design name        |
| -------------------- | ------------------- | ------------------------------------------------------------------ | ------------------ |
| `--text-primary`     | `text-fg-primary`   | Body copy, data entries, headers.                                  | `Text/Primary`     |
| `--text-secondary`   | `text-fg-secondary` | Secondary text, additional descriptors, input labels, data labels. | `Text/Secondary`   |
| `--text-tertiary`    | `text-fg-tertiary`  | Placeholder, hint text, tertiary content.                          | `Text/Tertiary`    |
| `--text-disabled`    | `text-fg-disabled`  | Disabled content.                                                  | `Text/Disabled`    |
| `--text-*-inverse`   | `text-fg-*-inverse` | Same usage on high-contrast backgrounds or accent elements.        | `Text/*-Inverse`   |
| `--text-information` | `text-information`  | Status generic info text. AA-compliant 4.5:1.                      | `Text/Information` |
| `--text-error`       | `text-error`        | Status error text. AA-compliant 4.5:1.                             | `Text/Error`       |
| `--text-warning`     | `text-warning`      | Status warning text. AA-compliant 4.5:1.                           | `Text/Warning`     |
| `--text-success`     | `text-success`      | Status success text. AA-compliant 4.5:1.                           | `Text/Success`     |

## Border / Stroke

Outlines, dividers, focus rings. Source-of-truth variables live under `--border-*`; the Tailwind bridge exposes them as `--color-stroke-*` so the utility names use the `stroke-` prefix.

| CSS variable              | Tailwind                       | Use for                                                                                                                 | Design name             |
| ------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `--border-divider`        | `border-stroke-divider`        | Very light separators — list items, button groupings.                                                                   | `Border/Divider`        |
| `--border-primary`        | `border-stroke-primary`        | High contrast border — emphasised states.                                                                               | `Border/Primary`        |
| `--border-secondary`      | `border-stroke-secondary`      | Medium contrast border — switches, tags, toggle elements, emphasised states.                                            | `Border/Secondary`      |
| `--border-tertiary`       | `border-stroke-tertiary`       | Subtle outlines — cards, panels, node links, inline inputs, tabs, data tables, disabled toggle items, badges, switches. | `Border/Tertiary`       |
| `--border-tertiary-hover` | `border-stroke-tertiary-hover` | Hover state of the above.                                                                                               | `Border/Tertiary-Hover` |
| `--border-active`         | `border-stroke-active`         | Active state — tabs, tags, inline inputs, buttons, switches, toggles, sliders.                                          | `Border/Active`         |
| `--border-status-focus`   | `border-stroke-status-focus`   | Active / focus ring for UI elements.                                                                                    | `Border/Status/Focus`   |
| `--border-status-mono`    | `border-stroke-status-mono`    | Active / focus variant — monochrome.                                                                                    | `Border/Status/Mono`    |
| `--border-status-error`   | `border-stroke-status-error`   | Active / focus error variant — tags, badges, indicators, cards/panels.                                                  | `Border/Status/Error`   |
| `--border-status-success` | `border-stroke-status-success` | Active / focus success variant — tags, badges, indicators, cards/panels.                                                | `Border/Status/Success` |
| `--border-status-warning` | `border-stroke-status-warning` | Active / focus warning variant — tags, badges, indicators, cards/panels.                                                | `Border/Status/Warning` |
| `--border-*-inverse`      | `border-stroke-*-inverse`      | Same usage on high-contrast or accent surfaces.                                                                         | `Border/*-Inverse`      |

## Status

For **fills and borders only** — _not text_. Not AA-compliant; use `text-error|success|warning|information` for text.

| CSS variable           | Tailwind                                             | Use for                                        | Design name          |
| ---------------------- | ---------------------------------------------------- | ---------------------------------------------- | -------------------- |
| `--status-success`     | `bg-status-success`, `border-status-success`         | Success status fill or border.                 | `Status/Success`     |
| `--status-error`       | `bg-status-error`, `border-status-error`             | Error status fill or border.                   | `Status/Error`       |
| `--status-warning`     | `bg-status-warning`, `border-status-warning`         | Warning status fill or border.                 | `Status/Warning`     |
| `--status-information` | `bg-status-information`, `border-status-information` | Information status fill or border.             | `Status/Information` |
| `--status-*-inverse`   | `bg-status-*-inverse`                                | Same usage on high-contrast / accent surfaces. | `Status/*-Inverse`   |

## State-layer overlays

Interaction state overlays applied to the **entire UI item** (e.g. button hover tint). Used in buttons, inputs, menus, pickers, text areas, tags, list items.

| CSS variable                            | Tailwind                                 | Use for                                           | Design name                           |
| --------------------------------------- | ---------------------------------------- | ------------------------------------------------- | ------------------------------------- |
| `--stateslayer-overlay-enabled`         | `bg-stateslayer-overlay-enabled`         | Default (no overlay) state.                       | `StatesLayer-Overlay/Enabled`         |
| `--stateslayer-overlay-hover`           | `bg-stateslayer-overlay-hover`           | Hover state overlay.                              | `StatesLayer-Overlay/Hover`           |
| `--stateslayer-overlay-pressed`         | `bg-stateslayer-overlay-pressed`         | Pressed state overlay.                            | `StatesLayer-Overlay/Pressed`         |
| `--stateslayer-overlay-disabled`        | `bg-stateslayer-overlay-disabled`        | Disabled state overlay.                           | `StatesLayer-Overlay/Disabled`        |
| `--stateslayer-overlay-active`          | `bg-stateslayer-overlay-active`          | Active state overlay.                             | `StatesLayer-Overlay/Active`          |
| `--stateslayer-overlay-enabled-inverse` | `bg-stateslayer-overlay-enabled-inverse` | Default inverse overlay (no tint).                | `StatesLayer-Overlay/Enabled_Inverse` |
| `--stateslayer-overlay-*-inverse`       | `bg-stateslayer-overlay-*-inverse`       | Same overlays on high-contrast / accent elements. | `StatesLayer-Overlay/*-Inverse`       |

## Brand accent

Brand accent primitives for decorative highlights (active states, accent badges/tags, focal icons). Use sparingly — brand colours, not status colours.

| CSS variable                             | Tailwind                                                                                                                              | Use for                 | Design name                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------- |
| `--brand-accents-mckinsey-deep-blue`     | `bg-brand-accents-mckinsey-deep-blue`, `text-brand-accents-mckinsey-deep-blue`, `border-brand-accents-mckinsey-deep-blue`             | McKinsey deep blue.     | `Brand-Accents/McKinsey-Deep-Blue`     |
| `--brand-accents-mckinsey-electric-blue` | `bg-brand-accents-mckinsey-electric-blue`, `text-brand-accents-mckinsey-electric-blue`, `border-brand-accents-mckinsey-electric-blue` | McKinsey electric blue. | `Brand-Accents/McKinsey-Electric-Blue` |
| `--brand-accents-mckinsey-cyan`          | `bg-brand-accents-mckinsey-cyan`, `text-brand-accents-mckinsey-cyan`, `border-brand-accents-mckinsey-cyan`                            | McKinsey cyan.          | `Brand-Accents/McKinsey-Cyan`          |
| `--brand-accents-qb-accent`              | `bg-brand-accents-qb-accent`, `text-brand-accents-qb-accent`, `border-brand-accents-qb-accent`                                        | QB accent.              | `Brand-Accents/QB-Accent`              |

## Elevations

Shadow colour pairs. **Do not use directly** — use the composed `shadow-elevation-*` utilities below.

| Utility              | Composition                   | Design name                                     |
| -------------------- | ----------------------------- | ----------------------------------------------- |
| `shadow-elevation-0` | Hairline                      | `Elevations/Shade_T` + `Elevations/Shade`       |
| `shadow-elevation-1` | Subtle lift                   | `Elevations/Shade_T–01` + `Elevations/Shade–01` |
| `shadow-elevation-2` | Card / dropdown               | `Elevations/Shade_T–02` + `Elevations/Shade–02` |
| `shadow-elevation-3` | Modal / popover               | `Elevations/Shade_T–03` + `Elevations/Shade–03` |
| `shadow-elevation-4` | Highest — full-screen overlay | `Elevations/Shade_T–04` + `Elevations/Shade–04` |

Shadow colour tokens are also exposed as `--color-elevations-shade*` if you ever need to compose a custom shadow, but prefer the utilities.

---

## Typography

Class-based typography utilities defined in [`src/styles/globals.css`](../src/styles/globals.css). The `cn()` helper in [`src/lib/utils.ts`](../src/lib/utils.ts) registers these as a single conflict group so the last class wins (e.g. `cn('label-regular-primary', 'label-small-primary')` → `label-small-primary`). Do **not** compose typography by hand with `text-sm leading-5 tracking-[-0.028px]` — use the class.

### Display

For oversized stats. KPI numbers go here; KPI labels use `headings-h3-regular`.

| Utility class        | Use for                                  | Design name          |
| -------------------- | ---------------------------------------- | -------------------- |
| `display-d1-regular` | KPI numerical values and units (56/60).  | `Display/D1-Regular` |
| `display-d2-regular` | Smaller display / hero numerals (48/56). | `Display/D2-Regular` |
| `display-d3-regular` | Smaller display still (40/48).           | `Display/D3-Regular` |

### Headings

| Utility class          | Use for                                                                                               | Design name            |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------- |
| `headings-h1-regular`  | Page / dashboard titles. One H1 per page; keep to a single line.                                      | `Headings/H1-Regular`  |
| `headings-h2-regular`  | Article / section header, one level under H1.                                                         | `Headings/H2-Regular`  |
| `headings-h2-semibold` | Same as `headings-h2-regular` when more emphasis is needed.                                           | `Headings/H2-Semibold` |
| `headings-h3-regular`  | Article subtitles, labels above D1/D2, form / section titles, card / tile headers, large-format tabs. | `Headings/H3-Regular`  |
| `headings-h3-semibold` | Emphasis variant of H3, e.g. inside a card already labelled with `headings-h3-regular`.               | `Headings/H3-Semibold` |
| `headings-h4-regular`  | Sub-section / small block headings.                                                                   | `Headings/H4-Regular`  |
| `headings-h4-semibold` | Emphasis variant of H4.                                                                               | `Headings/H4-Semibold` |

### Labels

Short body text used in components (cards, list items, captions). Keep to ≤2 lines.

| Utility class           | Use for                                | Design name             |
| ----------------------- | -------------------------------------- | ----------------------- |
| `label-large-primary`   | Large component labels.                | `Label/Large-Primary`   |
| `label-regular-primary` | Default component label.               | `Label/Regular-Primary` |
| `label-small-primary`   | Compact labels — list items, captions. | `Label/Small-Primary`   |

### Paragraphs

| Utility class                      | Use for                                                                          | Design name                        |
| ---------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------- |
| `paragraph-large-primary`          | Default body text. Large editorial / article / dialogue / chat content.          | `Paragraph/Large-Primary`          |
| `paragraph-large-primary-link`     | Same, underlined link variant.                                                   | `Paragraph/Large-Primary-Link`     |
| `paragraph-large-emphasised`       | Semibold emphasis of the above.                                                  | `Paragraph/Large-Emphasised`       |
| `paragraph-regular-primary`        | Default body. Editorial / article / dialogue / chat, normally under H2 headings. | `Paragraph/Regular-Primary`        |
| `paragraph-regular-primary-link`   | Same, underlined link variant.                                                   | `Paragraph/Regular-Primary-Link`   |
| `paragraph-regular-emphasised-600` | Semibold emphasis of the above.                                                  | `Paragraph/Regular-Emphasised-600` |
| `paragraph-small-primary`          | Alt text, tooltips, tight helper text.                                           | `Paragraph/Small-Primary`          |
| `paragraph-small-primary-link`     | Same, underlined link variant.                                                   | `Paragraph/Small-Primary-Link`     |
| `paragraph-small-emphasised`       | Semibold emphasis of the above.                                                  | `Paragraph/Small-Emphasised`       |
| `paragraph-code-text`              | Inline code snippets and smaller code elements.                                  | `Paragraph/code-text`              |

### CTAs / Buttons

| Utility class        | Use for                                       | Design name          |
| -------------------- | --------------------------------------------- | -------------------- |
| `cta-button-01`      | Default text for ≤40px button / CTA controls. | `CTA/button-01`      |
| `cta-button-link-01` | Underlined link variant.                      | `CTA/button-link-01` |
| `cta-button-02`      | Default text for 32px buttons / CTAs.         | `CTA/button-02`      |
| `cta-button-link-02` | Underlined link variant.                      | `CTA/button-link-02` |
| `cta-button-03`      | Smallest button text.                         | `CTA/button-03`      |
| `cta-button-link-03` | Underlined link variant.                      | `CTA/button-link-03` |

---

## Radius

QBDS ships with a **sharp** default (0px) and an opt-in **rounded mode**. Toggle by adding `class="radius-mode"` on an ancestor (commonly the `<html>` element); the radius variables then resolve to non-zero values.

| Tailwind utility       | CSS variable     | Sharp (default) | Rounded mode | Use for                                                                | Design name    |
| ---------------------- | ---------------- | --------------- | ------------ | ---------------------------------------------------------------------- | -------------- |
| `rounded-radius-reg`   | `--radius-reg`   | 0px             | 8px          | Default / regular component radius.                                    | `Radius/Reg`   |
| `rounded-radius-sm`    | `--radius-sm`    | 0px             | 4px          | Smaller chips, inline elements.                                        | `Radius/Sm`    |
| `rounded-radius-md`    | `--radius-md`    | 0px             | 12px         | Cards, panels.                                                         | `Radius/Md`    |
| `rounded-radius-lg`    | `--radius-lg`    | 0px             | 16px         | Large containers, modals.                                              | `Radius/Lg`    |
| `rounded-radius-round` | `--radius-round` | 9999px          | 9999px       | Pills, avatars, fully rounded shapes. Always round regardless of mode. | `Radius/Round` |

---

## Stroke width

QBDS supports stroke weights of 0.5, 1, 2, 4, and 8 px. Use Tailwind's `border-*` utilities; reach for arbitrary values only for the 0.5px case.

| Width | Tailwind utility | Design name |
| ----- | ---------------- | ----------- |
| 0.5px | `border-[0.5px]` | `stroke-05` |
| 1px   | `border`         | `stroke-1`  |
| 2px   | `border-2`       | `stroke-2`  |
| 4px   | `border-4`       | `stroke-4`  |
| 8px   | `border-8`       | `stroke-8`  |

---

## Spacing

QBDS uses Tailwind's default 4px-based spacing scale unchanged. There are no QBDS-named CSS spacing variables — write `gap-4` (16px), `p-6` (24px), `gap-1` (4px), etc., directly. Design names below are listed for sync purposes.

| Tailwind         | px  | Design name  |
| ---------------- | --- | ------------ |
| `gap-1`, `p-1`   | 4   | `Spacing/4`  |
| `gap-2`, `p-2`   | 8   | `Spacing/8`  |
| `gap-4`, `p-4`   | 16  | `Spacing/16` |
| `gap-6`, `p-6`   | 24  | `Spacing/24` |
| `gap-7`, `p-7`   | 28  | `Spacing/28` |
| `gap-8`, `p-8`   | 32  | `Spacing/32` |
| `gap-12`, `p-12` | 48  | `Spacing/48` |
| `gap-24`, `p-24` | 96  | `Spacing/96` |

So write `gap-4`, not `gap-[16px]`.

---

## What NOT to use

- **Primitives directly.** `mist-50`, `slate-900`, `--mist-50-opacity-88`, `--slate-900-opacity-60` — these feed the semantic tokens above. Always pick the semantic equivalent.
- **Raw Tailwind `slate-*` utilities.** QBDS redefines `--color-slate-*` inside `@theme`; using `bg-slate-100` will yield QBDS values, not stock Tailwind defaults. Prefer semantic surface / fill tokens.
- **Inline CSS variables.** `bg-[var(--surface-base)]` works but the Tailwind utility `bg-surface-base` exists for the same thing — use it for readability and class-merging.
- **Hand-rolled state overlays.** Don't write `bg-white/8` for a hover tint — use `bg-stateslayer-overlay-hover` so it adapts to dark / theme-switched contexts.
- **Hand-rolled typography.** Don't compose `text-sm leading-5 tracking-[-0.028px]` — use `paragraph-regular-primary`.

Maintainers syncing from Figma: see [README — Syncing from Figma](../README.md#syncing-from-figma).
