import{r as e}from"./chunk-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-Dxo5pGJX.js";import{Ct as r,Ft as i,Mt as a,Nt as o}from"./index-DuUzSC1G.js";var s=e(t()),c="# QBDS Tokens\n\nThe single source of truth for picking a design token in code. Every row below maps a **CSS variable** defined in [`src/styles/globals.css`](../src/styles/globals.css) to the **Tailwind utility** you should use in components, with guidance on what it's for. The **Design name** column lists the upstream identifier in the QBDS design library — use it when syncing changes between code and design.\n\nA searchable reference with light/dark swatches (and shadow previews for elevations) is at **`/tokens`** on the registry site (this file + `globals.css`, via [`src/lib/tokens.ts`](../src/lib/tokens.ts)). After edits, run `npm run tokens:check` and spot-check `/tokens` in the dev server. The page skips `*-inverse` rows for now; they stay in the tables below.\n\n## How to choose a token\n\n1. **Identify purpose first.** Is it a background panel (`surface`), a content/component fill (`fill`), text colour (`text`/`fg`), a stroke (`border`/`stroke`), status feedback (`status`), an interaction overlay (`stateslayer-overlay`), or a shadow (`shadow-elevation`)? Match purpose to the right family before picking a shade.\n2. **Then pick contrast.** Within a family the scale is usually `primary > secondary > tertiary > disabled`; `primary` is highest contrast.\n3. **Use `-inverse` on dark/high-contrast backgrounds.** When placing content on `fill-active` or any accent surface, swap to the matching `-inverse` token so it remains legible across themes.\n\n## Quick rules\n\n- **Prefer semantic over primitive.** Use `bg-fill-active`, never `bg-slate-950`. Primitives (`mist-*`, `slate-*`, opacity ladders) exist only to feed semantics — don't reach for them directly in components.\n- **Prefer Tailwind utility over inline var.** Use `bg-surface-base`, not `bg-[var(--surface-base)]`. The bridge is already wired in `@theme inline`.\n- **Use the right family.** `surface-*` for shells, `fill-*` for content/components, `text-*`/`fg-*` for text, `border-*`/`stroke-*` for strokes, `stateslayer-overlay-*` for interaction tints.\n- **State overlays go through `bg-stateslayer-overlay-*` or the stacked `overlay-*` utilities,** not custom alpha. They are colour-correct in both light and dark modes.\n- **Typography is class-based.** Use `paragraph-regular-primary`, not `text-sm leading-5 tracking-[-0.028px]`. The `cn()` wrapper in [`src/lib/utils.ts`](../src/lib/utils.ts) extends `tailwind-merge` to dedupe these classes correctly.\n- **Status colours have two flavours.** `status-*` is for **non-text fills/borders** (not AA-compliant); `text-information|error|warning|success` is for **text** (AA 4.5:1).\n\n---\n\n## Surface\n\nPage and panel backgrounds. The chrome.\n\n| CSS variable          | Tailwind               | Use for                                                                                                                           | Design name         |\n| --------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------- |\n| `--surface-base`      | `bg-surface-base`      | High contrast surface — negative space / separator between primary or secondary backgrounds. Suitable for high-contrast canvases. | `Surface/Base`      |\n| `--surface-primary`   | `bg-surface-primary`   | Primary page / UI shell panel background.                                                                                         | `Surface/Primary`   |\n| `--surface-secondary` | `bg-surface-secondary` | Secondary page / UI shell panel background — side panels.                                                                         | `Surface/Secondary` |\n| `--surface-tertiary`  | `bg-surface-tertiary`  | Optional usage — tertiary background / UI shell panels when primary and secondary are already used.                               | `Surface/Tertiary`  |\n\n## Fill — content\n\nContent-bearing fills: button bodies, tooltip backgrounds, icons, sliders, tags, switches.\n\n| CSS variable               | Tailwind                    | Use for                                                                                                                | Design name                      |\n| -------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------- |\n| `--fill-primary`           | `bg-fill-primary`           | Buttons and tooltip backgrounds; high contrast / emphasised items; accents.                                            | `Fill/Content/Primary`           |\n| `--fill-secondary`         | `bg-fill-secondary`         | Medium contrast accent backgrounds.                                                                                    | `Fill/Content/Secondary`         |\n| `--fill-tertiary`          | `bg-fill-tertiary`          | Medium colour contrast overlay on high contrast items, UI shells / panels, tiles.                                      | `Fill/Content/Tertiary`          |\n| `--fill-active`            | `bg-fill-active`            | Active state fill for icons, button backgrounds, tags, switches, toggle items, sliders.                                | `Fill/Content/Active`            |\n| `--fill-active-alpha`      | `bg-fill-active-alpha`      | Opacity-based active fill — same hue as `fill-active` but semi-transparent; use where a solid fill would be too harsh. | `Fill/Active`                    |\n| `--fill-disabled`          | `bg-fill-disabled`          | Any fill for disabled elements that sit on `fill-muted` or surface tokens.                                             | `Fill/Content/Disabled`          |\n| `--fill-stepmarkers-track` | `bg-fill-stepmarkers-track` | Slider track, step markers, stepper track fills.                                                                       | `Fill/Content/StepMarkers-Track` |\n| `--fill-*-inverse`         | `bg-fill-*-inverse`         | Same usage as the non-inverse token, tuned for high-contrast / theme-switch contexts.                                  | `Fill/Content/*-Inverse`         |\n\n## Fill — onSurface\n\nUI containers that sit **on top of** surface tokens: tiles, input field backgrounds, badges, secondary buttons.\n\n| CSS variable                                    | Tailwind                                          | Use for                                                                                                                                               | Design name                                                     |\n| ----------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |\n| `--fill-subtle`                                 | `bg-fill-subtle`                                  | Low contrast overlay on high contrast items — disabled backgrounds when disabled icons/text are present; tiles, tags, badges, secondary button fills. | `Fill/onSurface/Subtle`                                         |\n| `--fill-muted`                                  | `bg-fill-muted`                                   | Same usage as subtle, slightly higher contrast.                                                                                                       | `Fill/onSurface/Muted`                                          |\n| `--fill-onsurface-ui-1`                         | `bg-fill-onsurface-ui-1`                          | Solid high-contrast tiles / UI container backgrounds that sit on surface tokens.                                                                      | `Fill/onSurface/bg-ui1`                                         |\n| `--fill-onsurface-ui-2`                         | `bg-fill-onsurface-ui-2`                          | Solid avatar (mono) backgrounds, medium contrast tiles, UI containers that sit on surface tokens.                                                     | `Fill/onSurface/bg-ui2`                                         |\n| `--fill-onsurface-ui-3`                         | `bg-fill-onsurface-ui-3`                          | Solid UI backgrounds — field inputs, notification/toast/sonner panels that sit on surface tokens.                                                     | `Fill/onSurface/bg-ui3`                                         |\n| `--fill-subtle-inverse`, `--fill-muted-inverse` | `bg-fill-subtle-inverse`, `bg-fill-muted-inverse` | High-contrast / theme-switch variants of the above.                                                                                                   | `Fill/onSurface/Subtle-Inverse`, `Fill/onSurface/Muted-Inverse` |\n\n## Text\n\nText fills only. For status-text colours, use `text-information|error|warning|success` (AA-compliant) rather than `status-*` (which is for fills/borders, not AA-compliant).\n\nThe QBDS source-of-truth variables live under `--text-*`; the Tailwind bridge exposes them as `--color-fg-*` so the utility names use the `fg-` prefix.\n\n| CSS variable         | Tailwind            | Use for                                                            | Design name        |\n| -------------------- | ------------------- | ------------------------------------------------------------------ | ------------------ |\n| `--text-primary`     | `text-fg-primary`   | Body copy, data entries, headers.                                  | `Text/Primary`     |\n| `--text-secondary`   | `text-fg-secondary` | Secondary text, additional descriptors, input labels, data labels. | `Text/Secondary`   |\n| `--text-tertiary`    | `text-fg-tertiary`  | Placeholder, hint text, tertiary content.                          | `Text/Tertiary`    |\n| `--text-disabled`    | `text-fg-disabled`  | Disabled content.                                                  | `Text/Disabled`    |\n| `--text-*-inverse`   | `text-fg-*-inverse` | Same usage on high-contrast backgrounds or accent elements.        | `Text/*-Inverse`   |\n| `--text-information` | `text-information`  | Status generic info text. AA-compliant 4.5:1.                      | `Text/Information` |\n| `--text-error`       | `text-error`        | Status error text. AA-compliant 4.5:1.                             | `Text/Error`       |\n| `--text-warning`     | `text-warning`      | Status warning text. AA-compliant 4.5:1.                           | `Text/Warning`     |\n| `--text-success`     | `text-success`      | Status success text. AA-compliant 4.5:1.                           | `Text/Success`     |\n\n## Border / Stroke\n\nOutlines, dividers, focus rings. Source-of-truth variables live under `--border-*`; the Tailwind bridge exposes them as `--color-stroke-*` so the utility names use the `stroke-` prefix.\n\n| CSS variable              | Tailwind                       | Use for                                                                                                                 | Design name             |\n| ------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ----------------------- |\n| `--border-divider`        | `border-stroke-divider`        | Very light separators — list items, button groupings.                                                                   | `Border/Divider`        |\n| `--border-primary`        | `border-stroke-primary`        | High contrast border — emphasised states.                                                                               | `Border/Primary`        |\n| `--border-secondary`      | `border-stroke-secondary`      | Medium contrast border — switches, tags, toggle elements, emphasised states.                                            | `Border/Secondary`      |\n| `--border-tertiary`       | `border-stroke-tertiary`       | Subtle outlines — cards, panels, node links, inline inputs, tabs, data tables, disabled toggle items, badges, switches. | `Border/Tertiary`       |\n| `--border-tertiary-hover` | `border-stroke-tertiary-hover` | Hover state of the above.                                                                                               | `Border/Tertiary-Hover` |\n| `--border-active`         | `border-stroke-active`         | Active state — tabs, tags, inline inputs, buttons, switches, toggles, sliders.                                          | `Border/Active`         |\n| `--border-status-focus`   | `border-stroke-status-focus`   | Active / focus ring for UI elements.                                                                                    | `Border/Status/Focus`   |\n| `--border-status-mono`    | `border-stroke-status-mono`    | Active / focus variant — monochrome.                                                                                    | `Border/Status/Mono`    |\n| `--border-status-error`   | `border-stroke-status-error`   | Active / focus error variant — tags, badges, indicators, cards/panels.                                                  | `Border/Status/Error`   |\n| `--border-status-success` | `border-stroke-status-success` | Active / focus success variant — tags, badges, indicators, cards/panels.                                                | `Border/Status/Success` |\n| `--border-status-warning` | `border-stroke-status-warning` | Active / focus warning variant — tags, badges, indicators, cards/panels.                                                | `Border/Status/Warning` |\n| `--border-*-inverse`      | `border-stroke-*-inverse`      | Same usage on high-contrast or accent surfaces.                                                                         | `Border/*-Inverse`      |\n\n## Status\n\nFor **fills and borders only** — _not text_. Not AA-compliant; use `text-error|success|warning|information` for text.\n\n| CSS variable           | Tailwind                                             | Use for                                        | Design name          |\n| ---------------------- | ---------------------------------------------------- | ---------------------------------------------- | -------------------- |\n| `--status-success`     | `bg-status-success`, `border-status-success`         | Success status fill or border.                 | `Status/Success`     |\n| `--status-error`       | `bg-status-error`, `border-status-error`             | Error status fill or border.                   | `Status/Error`       |\n| `--status-warning`     | `bg-status-warning`, `border-status-warning`         | Warning status fill or border.                 | `Status/Warning`     |\n| `--status-information` | `bg-status-information`, `border-status-information` | Information status fill or border.             | `Status/Information` |\n| `--status-*-inverse`   | `bg-status-*-inverse`                                | Same usage on high-contrast / accent surfaces. | `Status/*-Inverse`   |\n\n## State-layer overlays\n\nInteraction state overlays applied to the **entire UI item** (e.g. button hover tint). Used in buttons, inputs, menus, pickers, text areas, tags, list items.\n\n| CSS variable                            | Tailwind                                 | Use for                                           | Design name                           |\n| --------------------------------------- | ---------------------------------------- | ------------------------------------------------- | ------------------------------------- |\n| `--stateslayer-overlay-enabled`         | `bg-stateslayer-overlay-enabled`         | Default (no overlay) state.                       | `StatesLayer-Overlay/Enabled`         |\n| `--stateslayer-overlay-hover`           | `bg-stateslayer-overlay-hover`           | Hover state overlay.                              | `StatesLayer-Overlay/Hover`           |\n| `--stateslayer-overlay-pressed`         | `bg-stateslayer-overlay-pressed`         | Pressed state overlay.                            | `StatesLayer-Overlay/Pressed`         |\n| `--stateslayer-overlay-disabled`        | `bg-stateslayer-overlay-disabled`        | Disabled state overlay.                           | `StatesLayer-Overlay/Disabled`        |\n| `--stateslayer-overlay-active`          | `bg-stateslayer-overlay-active`          | Active state overlay.                             | `StatesLayer-Overlay/Active`          |\n| `--stateslayer-overlay-enabled-inverse` | `bg-stateslayer-overlay-enabled-inverse` | Default inverse overlay (no tint).                | `StatesLayer-Overlay/Enabled_Inverse` |\n| `--stateslayer-overlay-*-inverse`       | `bg-stateslayer-overlay-*-inverse`       | Same overlays on high-contrast / accent elements. | `StatesLayer-Overlay/*-Inverse`       |\n\nTo **stack** an overlay on a solid fill (correct alpha compositing, same as Figma), use the composed utilities instead of hand-rolled gradients:\n\n| Utility             | Use for                                 |\n| ------------------- | --------------------------------------- |\n| `overlay-hover`     | Hover tint on a solid `bg-fill-*`       |\n| `overlay-pressed`   | Pressed tint                            |\n| `overlay-disabled`  | Disabled tint                           |\n| `overlay-*-inverse` | Same on high-contrast / accent surfaces |\n\nExample: `bg-fill-onsurface-ui-2 hover:overlay-hover active:overlay-pressed`. Variant-capable (`before:overlay-hover`, `disabled:overlay-disabled`, …). Does not tint replaced children (`img`) — put the utility on a `::before` / absolute layer when content sits above the fill.\n\n## Brand accent\n\nBrand accent primitives for decorative highlights (active states, accent badges/tags, focal icons). Use sparingly — brand colours, not status colours.\n\n| CSS variable                             | Tailwind                                                                                                                              | Use for                 | Design name                            |\n| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------- |\n| `--brand-accents-mckinsey-deep-blue`     | `bg-brand-accents-mckinsey-deep-blue`, `text-brand-accents-mckinsey-deep-blue`, `border-brand-accents-mckinsey-deep-blue`             | McKinsey deep blue.     | `Brand-Accents/McKinsey-Deep-Blue`     |\n| `--brand-accents-mckinsey-electric-blue` | `bg-brand-accents-mckinsey-electric-blue`, `text-brand-accents-mckinsey-electric-blue`, `border-brand-accents-mckinsey-electric-blue` | McKinsey electric blue. | `Brand-Accents/McKinsey-Electric-Blue` |\n| `--brand-accents-mckinsey-cyan`          | `bg-brand-accents-mckinsey-cyan`, `text-brand-accents-mckinsey-cyan`, `border-brand-accents-mckinsey-cyan`                            | McKinsey cyan.          | `Brand-Accents/McKinsey-Cyan`          |\n| `--brand-accents-qb-accent`              | `bg-brand-accents-qb-accent`, `text-brand-accents-qb-accent`, `border-brand-accents-qb-accent`                                        | QB accent.              | `Brand-Accents/QB-Accent`              |\n\n## Elevations\n\nShadow colour pairs. **Do not use directly** — use the composed `shadow-elevation-*` utilities below.\n\n| Utility              | Composition                   | Design name                                     |\n| -------------------- | ----------------------------- | ----------------------------------------------- |\n| `shadow-elevation-0` | Hairline                      | `Elevations/Shade_T` + `Elevations/Shade`       |\n| `shadow-elevation-1` | Subtle lift                   | `Elevations/Shade_T–01` + `Elevations/Shade–01` |\n| `shadow-elevation-2` | Card / dropdown               | `Elevations/Shade_T–02` + `Elevations/Shade–02` |\n| `shadow-elevation-3` | Modal / popover               | `Elevations/Shade_T–03` + `Elevations/Shade–03` |\n| `shadow-elevation-4` | Highest — full-screen overlay | `Elevations/Shade_T–04` + `Elevations/Shade–04` |\n\nShadow colour tokens are also exposed as `--color-elevations-shade*` if you ever need to compose a custom shadow, but prefer the utilities.\n\n---\n\n## Typography\n\nClass-based typography utilities defined in [`src/styles/globals.css`](../src/styles/globals.css). The `cn()` helper in [`src/lib/utils.ts`](../src/lib/utils.ts) registers these as a single conflict group so the last class wins (e.g. `cn('label-regular-primary', 'label-small-primary')` → `label-small-primary`). Do **not** compose typography by hand with `text-sm leading-5 tracking-[-0.028px]` — use the class.\n\n### Display\n\nFor oversized stats. KPI numbers go here; KPI labels use `headings-h3-regular`.\n\n| Utility class        | Use for                                  | Design name          |\n| -------------------- | ---------------------------------------- | -------------------- |\n| `display-d1-regular` | KPI numerical values and units (56/60).  | `Display/D1-Regular` |\n| `display-d2-regular` | Smaller display / hero numerals (48/56). | `Display/D2-Regular` |\n| `display-d3-regular` | Smaller display still (40/48).           | `Display/D3-Regular` |\n\n### Headings\n\n| Utility class          | Use for                                                                                               | Design name            |\n| ---------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------- |\n| `headings-h1-regular`  | Page / dashboard titles. One H1 per page; keep to a single line.                                      | `Headings/H1-Regular`  |\n| `headings-h2-regular`  | Article / section header, one level under H1.                                                         | `Headings/H2-Regular`  |\n| `headings-h2-semibold` | Same as `headings-h2-regular` when more emphasis is needed.                                           | `Headings/H2-Semibold` |\n| `headings-h3-regular`  | Article subtitles, labels above D1/D2, form / section titles, card / tile headers, large-format tabs. | `Headings/H3-Regular`  |\n| `headings-h3-semibold` | Emphasis variant of H3, e.g. inside a card already labelled with `headings-h3-regular`.               | `Headings/H3-Semibold` |\n| `headings-h4-regular`  | Sub-section / small block headings.                                                                   | `Headings/H4-Regular`  |\n| `headings-h4-semibold` | Emphasis variant of H4.                                                                               | `Headings/H4-Semibold` |\n\n### Labels\n\nShort body text used in components (cards, list items, captions). Keep to ≤2 lines.\n\n| Utility class           | Use for                                | Design name             |\n| ----------------------- | -------------------------------------- | ----------------------- |\n| `label-large-primary`   | Large component labels.                | `Label/Large-Primary`   |\n| `label-regular-primary` | Default component label.               | `Label/Regular-Primary` |\n| `label-small-primary`   | Compact labels — list items, captions. | `Label/Small-Primary`   |\n\n### Paragraphs\n\n| Utility class                      | Use for                                                                          | Design name                        |\n| ---------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------- |\n| `paragraph-large-primary`          | Default body text. Large editorial / article / dialogue / chat content.          | `Paragraph/Large-Primary`          |\n| `paragraph-large-primary-link`     | Same, underlined link variant.                                                   | `Paragraph/Large-Primary-Link`     |\n| `paragraph-large-emphasised`       | Semibold emphasis of the above.                                                  | `Paragraph/Large-Emphasised`       |\n| `paragraph-regular-primary`        | Default body. Editorial / article / dialogue / chat, normally under H2 headings. | `Paragraph/Regular-Primary`        |\n| `paragraph-regular-primary-link`   | Same, underlined link variant.                                                   | `Paragraph/Regular-Primary-Link`   |\n| `paragraph-regular-emphasised-600` | Semibold emphasis of the above.                                                  | `Paragraph/Regular-Emphasised-600` |\n| `paragraph-small-primary`          | Alt text, tooltips, tight helper text.                                           | `Paragraph/Small-Primary`          |\n| `paragraph-small-primary-link`     | Same, underlined link variant.                                                   | `Paragraph/Small-Primary-Link`     |\n| `paragraph-small-emphasised`       | Semibold emphasis of the above.                                                  | `Paragraph/Small-Emphasised`       |\n| `paragraph-code-text`              | Inline code snippets and smaller code elements.                                  | `Paragraph/code-text`              |\n\n### CTAs / Buttons\n\n| Utility class        | Use for                                       | Design name          |\n| -------------------- | --------------------------------------------- | -------------------- |\n| `cta-button-01`      | Default text for ≤40px button / CTA controls. | `CTA/button-01`      |\n| `cta-button-link-01` | Underlined link variant.                      | `CTA/button-link-01` |\n| `cta-button-02`      | Default text for 32px buttons / CTAs.         | `CTA/button-02`      |\n| `cta-button-link-02` | Underlined link variant.                      | `CTA/button-link-02` |\n| `cta-button-03`      | Smallest button text.                         | `CTA/button-03`      |\n| `cta-button-link-03` | Underlined link variant.                      | `CTA/button-link-03` |\n\n---\n\n## Radius\n\nQBDS ships with a **sharp** default (0px) and an opt-in **rounded mode**. Toggle by adding `class=\"radius-mode\"` on an ancestor (commonly the `<html>` element); the radius variables then resolve to non-zero values.\n\n| Tailwind utility       | CSS variable     | Sharp (default) | Rounded mode | Use for                                                                | Design name    |\n| ---------------------- | ---------------- | --------------- | ------------ | ---------------------------------------------------------------------- | -------------- |\n| `rounded-radius-reg`   | `--radius-reg`   | 0px             | 8px          | Default / regular component radius.                                    | `Radius/Reg`   |\n| `rounded-radius-sm`    | `--radius-sm`    | 0px             | 4px          | Smaller chips, inline elements.                                        | `Radius/Sm`    |\n| `rounded-radius-md`    | `--radius-md`    | 0px             | 12px         | Cards, panels.                                                         | `Radius/Md`    |\n| `rounded-radius-lg`    | `--radius-lg`    | 0px             | 16px         | Large containers, modals.                                              | `Radius/Lg`    |\n| `rounded-radius-round` | `--radius-round` | 9999px          | 9999px       | Pills, avatars, fully rounded shapes. Always round regardless of mode. | `Radius/Round` |\n\n---\n\n## Stroke width\n\nQBDS supports stroke weights of 0.5, 1, 2, 4, and 8 px. Use Tailwind's `border-*` utilities; reach for arbitrary values only for the 0.5px case.\n\n| Width | Tailwind utility | Design name |\n| ----- | ---------------- | ----------- |\n| 0.5px | `border-[0.5px]` | `stroke-05` |\n| 1px   | `border`         | `stroke-1`  |\n| 2px   | `border-2`       | `stroke-2`  |\n| 4px   | `border-4`       | `stroke-4`  |\n| 8px   | `border-8`       | `stroke-8`  |\n\n---\n\n## Spacing\n\nQBDS uses Tailwind's default 4px-based spacing scale unchanged. There are no QBDS-named CSS spacing variables — write `gap-4` (16px), `p-6` (24px), `gap-1` (4px), etc., directly. Design names below are listed for sync purposes.\n\n| Tailwind         | px  | Design name  |\n| ---------------- | --- | ------------ |\n| `gap-1`, `p-1`   | 4   | `Spacing/4`  |\n| `gap-2`, `p-2`   | 8   | `Spacing/8`  |\n| `gap-4`, `p-4`   | 16  | `Spacing/16` |\n| `gap-6`, `p-6`   | 24  | `Spacing/24` |\n| `gap-7`, `p-7`   | 28  | `Spacing/28` |\n| `gap-8`, `p-8`   | 32  | `Spacing/32` |\n| `gap-12`, `p-12` | 48  | `Spacing/48` |\n| `gap-24`, `p-24` | 96  | `Spacing/96` |\n\nSo write `gap-4`, not `gap-[16px]`.\n\n---\n\n## What NOT to use\n\n- **Primitives directly.** `mist-50`, `slate-900`, `--mist-50-opacity-88`, `--slate-900-opacity-60` — these feed the semantic tokens above. Always pick the semantic equivalent.\n- **Raw Tailwind `slate-*` utilities.** QBDS redefines `--color-slate-*` inside `@theme`; using `bg-slate-100` will yield QBDS values, not stock Tailwind defaults. Prefer semantic surface / fill tokens.\n- **Inline CSS variables.** `bg-[var(--surface-base)]` works but the Tailwind utility `bg-surface-base` exists for the same thing — use it for readability and class-merging.\n- **Hand-rolled state overlays.** Don't write `bg-white/8` or arbitrary `linear-gradient(…)` overlays — use `bg-stateslayer-overlay-hover` or `hover:overlay-hover` so it adapts to dark / theme-switched contexts.\n- **Hand-rolled typography.** Don't compose `text-sm leading-5 tracking-[-0.028px]` — use `paragraph-regular-primary`.\n\nMaintainers syncing from Figma: see [README — Syncing from Figma](../README.md#syncing-from-figma).\n",l=`## Typography`,u={Elevations:`Use the composed shadow-elevation-* utilities — not the shade variables directly.`},d=[`Surface`,`Fill — content`,`Fill — onSurface`,`Text`,`Border / Stroke`,`Status`,`State-layer overlays`,`Brand accent`,`Elevations`],f=new Set([`QBDS Tokens`,`How to choose a token`,`Quick rules`]);function p(e){return e.replace(/`/g,``).trim()}function m(e){return e.replace(/^#+\s*/,``).trim()}function ee(e){if(e.includes(`*`))return null;let t=[...e.matchAll(/--[a-z0-9-]+/g)].map(e=>e[0]);return t.length===1?t[0]:null}function h(e,t,n){let r=e.split(`
`),i=[];for(let e of r){if(!e.startsWith(`|`)||e.includes(`---`))continue;let r=e.split(`|`).map(e=>e.trim()).filter(Boolean);if(!(r.length<3))if(n===`semantic`){if(r[0]===`CSS variable`)continue;let e=ee(r[0]),n=p(r[1]),a=r[2]??``,o=p(r[3]??``),s=!e||e.includes(`*`);i.push({name:o,category:t,cssVar:e,tailwind:n,description:a,light:null,dark:null,patternOnly:s})}else{if(r[0]===`Utility`)continue;let e=p(r[0]),n=r[1]??``,a=p(r[2]??``);i.push({name:a,category:t,cssVar:null,tailwind:e,description:n,light:null,dark:null,patternOnly:!0})}}return i}function g(e){let t=(e.split(l)[0]??e).split(/^## /m).filter(Boolean),n=[];for(let e of t){let t=e.indexOf(`
`);if(t===-1)continue;let r=m(e.slice(0,t).trim()),i=e.slice(t+1);if(f.has(r))continue;let a=r===`Elevations`?`elevation`:`semantic`;n.push(...h(i,r,a))}return n}function _(e){let t=new Map;for(let n of e.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g))t.set(`--${n[1]}`,n[2].trim());return t}function v(e,t){let n=t===`:root`?/:root\s*\{([\s\S]*?)\n\}/:/\.dark\s*\{([\s\S]*?)\n\}/;return e.match(n)?.[1]??``}function y(e){return e.replace(/calc\(\s*(\d+(?:\.\d+)?)\s*\/\s*255\s*\)/gi,(e,t)=>String(Number(t)/255))}function b(e){let t=e.trim();if(/^#[\da-fA-F]{8}$/.test(t))return t.toLowerCase();if(/^#[\da-fA-F]{6}$/.test(t))return`${t.toLowerCase()}ff`;if(/^#[\da-fA-F]{3}$/.test(t)){let e=t[1],n=t[2],r=t[3];return`#${e}${e}${n}${n}${r}${r}ff`}return null}function x(e){let t=e.trim().match(/^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/i);if(!t)return null;let n=Number.parseFloat(t[1]);return t[1].endsWith(`%`)&&(n/=100),{l:n,c:Number.parseFloat(t[2]),h:Number.parseFloat(t[3]),alpha:t[4]===void 0?1:Number.parseFloat(t[4])}}function S(e){let t=Math.abs(e);return t>.0031308?(Math.sign(e)||1)*(1.055*t**(1/2.4)-.055):e*12.92}function te(e,t,n){let r=n*Math.PI/180,i=t*Math.cos(r),a=t*Math.sin(r),o=(e+.3963377773761749*i+.2158037573099136*a)**3,s=(e-.1055613458156586*i-.0638541728258133*a)**3,c=(e-.0894841775298119*i-1.2914855480194092*a)**3,l=e=>Math.min(1,Math.max(0,e));return[l(S(4.076741636075957*o-3.3077115392580616*s+.2309699031821044*c)),l(S(-1.2684379732850317*o+2.6097573492876887*s-.3413193760026573*c)),l(S(-.0041960761386756*o-.7034186179359362*s+1.7076146940746117*c))]}function ne(e,t,n,r){let i=e=>Math.min(1,Math.max(0,e)),a=e=>Math.round(i(e)*255).toString(16).padStart(2,`0`);return`#${a(e)}${a(t)}${a(n)}${a(r)}`}function re(e){let t=x(e);if(!t)return null;let[n,r,i]=te(t.l,t.c,t.h);return ne(n,r,i,t.alpha)}function C(e){let t=y(e.trim());return b(t)||(/^oklch\(/i.test(t)?re(t):null)}function w(e){return _(e.match(/@theme inline \{([\s\S]*?)\n\}/)?.[1]??``)}function T(e,t,n,r){let i=y(e.trim()),a=i.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/);if(a){let e=a[1];if(r.has(e))return null;r.add(e);let i=e,o=n.get(e)??t.get(e)??null;if(!o)return null;let s=T(o,t,n,r);return s?{value:s.value,alias:i}:null}let o=C(i);return o?{value:o,alias:null}:null}function E(e,t){let n=w(t),r=_(v(t,`:root`)),i=_(v(t,`.dark`));return e.map(e=>{if(e.patternOnly||!e.cssVar)return e;let t=r.get(e.cssVar)??n.get(e.cssVar)??``,a=i.get(e.cssVar)??n.get(e.cssVar)??``,o=T(t,n,r,new Set)??null,s=T(a,n,i,new Set)??null;return{...e,light:o,dark:s}})}var D=null;function O(e){return D||=g(c),E(D,e)}function k(e){return!!(e.cssVar?.includes(`-inverse`)||e.tailwind.includes(`-inverse`)||/inverse/i.test(e.name))}function A(e){return e.filter(e=>!k(e))}function j(e){let t=new Set(e.map(e=>e.category)),n=d.filter(e=>t.has(e)),r=[...t].filter(e=>!n.includes(e)).sort();return[...n,...r]}function M(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,`-`)}function N(e,t,n){let r=t.trim().toLowerCase();return e.filter(e=>n!==`all`&&e.category!==n?!1:r?e.name.toLowerCase().includes(r)||(e.cssVar?.toLowerCase().includes(r)??!1)||e.tailwind.toLowerCase().includes(r)||e.description.toLowerCase().includes(r)||e.category.toLowerCase().includes(r):!0)}function P(e){let t=new Map;for(let n of e)t.has(n.category)||t.set(n.category,[]),t.get(n.category)?.push(n);return[...t.entries()].sort(([e],[t])=>{let n=d.indexOf(e),r=d.indexOf(t);return n===-1&&r===-1?e.localeCompare(t):n===-1?1:r===-1?-1:n-r})}function F(e){return e.split(`,`).map(e=>e.trim()).join(` · `)}function I(e){return e.replace(/[.\s]+$/,``).trim()}var L=`@import 'tailwindcss';
@import 'tw-animate-css';

/* Dark mode variant - equivalent to @custom-variant dark */
@custom-variant dark (&:where(.dark, .dark *));

/* Radius mode variant - for rounded corners (sharp is default) */
@custom-variant radius-mode (&:where(.radius-mode, .radius-mode *));

@theme inline {
  /** Font Tokens */
  --font-display: 'Inter', sans-serif;
  --font-headings: 'Inter', sans-serif;
  --font-paragraph: 'Inter', sans-serif;
  --font-code-text: 'Roboto Mono', monospace;
  --font-weight-300: 300;
  --font-weight-400: 400;
  --font-weight-600: 600;
  --font-font-size-12: 12px;
  --font-font-size-14: 14px;
  --font-font-size-16: 16px;
  --font-font-size-20: 20px;
  --font-font-size-24: 24px;
  --font-font-size-32: 32px;
  --font-font-size-40: 40px;
  --font-font-size-48: 48px;
  --font-font-size-56: 56px;
  --font-line-height-12: 12px;
  --font-line-height-16: 16px;
  --font-line-height-20: 20px;
  --font-line-height-24: 24px;
  --font-line-height-28: 28px;
  --font-line-height-32: 32px;
  --font-line-height-40: 40px;
  --font-line-height-48: 48px;
  --font-line-height-56: 56px;
  --font-line-height-64: 64px;
  --font-sans: 'Inter', sans-serif;

  /** Text Size Mappings - shadcn convention mapped to primitives */
  --text-xs: var(--font-font-size-12);
  --text-xs-line-height: var(--font-line-height-12);
  --text-sm: var(--font-font-size-14);
  --text-sm-line-height: var(--font-line-height-16);
  --text-base: var(--font-font-size-16);
  --text-base-line-height: var(--font-line-height-20);
  --text-lg: var(--font-font-size-20);
  --text-lg-line-height: var(--font-line-height-24);
  --text-xl: var(--font-font-size-20);
  --text-xl-line-height: var(--font-line-height-24);
  --text-2xl: var(--font-font-size-24);
  --text-2xl-line-height: var(--font-line-height-28);
  --text-3xl: var(--font-font-size-32);
  --text-3xl-line-height: var(--font-line-height-32);
  --text-4xl: var(--font-font-size-40);
  --text-4xl-line-height: var(--font-line-height-40);
  --text-5xl: var(--font-font-size-48);
  --text-5xl-line-height: var(--font-line-height-48);
  --text-6xl: var(--font-font-size-56);
  --text-6xl-line-height: var(--font-line-height-56);

  /** Mist Primitives */
  --mist-50: oklch(100% 0 0);
  --mist-100: oklch(98.54% 0.0013 286.38);
  --mist-200: oklch(97.24% 0.0011 197.14);
  --mist-300: oklch(96.37% 0.0017 247.84);
  --mist-400: oklch(94.49% 0.0025 228.79);
  --mist-500: oklch(93% 0.0035 247.86);
  --mist-600: oklch(91.79% 0.0035 247.86);
  --mist-700: oklch(90.27% 0.0035 247.86);
  --mist-800: oklch(88.77% 0.0046 258.33);
  --mist-900: oklch(87.46% 0.0053 247.88);

  /** Mist Opacity Tokens */
  --mist-50-opacity-0: oklch(100% 0 0 / 0);
  --mist-50-opacity-4: oklch(100% 0 0 / calc(10 / 255));
  --mist-50-opacity-6: oklch(100% 0 0 / calc(15 / 255));
  --mist-50-opacity-8: oklch(100% 0 0 / calc(20 / 255));
  --mist-50-opacity-10: oklch(100% 0 0 / calc(26 / 255));
  --mist-50-opacity-12: oklch(100% 0 0 / calc(31 / 255));
  --mist-50-opacity-16: oklch(100% 0 0 / calc(41 / 255));
  --mist-50-opacity-24: oklch(100% 0 0 / calc(61 / 255));
  --mist-50-opacity-30: oklch(100% 0 0 / calc(77 / 255));
  --mist-50-opacity-38: oklch(100% 0 0 / calc(97 / 255));
  --mist-50-opacity-50: oklch(100% 0 0 / calc(128 / 255));
  --mist-50-opacity-60: oklch(100% 0 0 / calc(153 / 255));
  --mist-50-opacity-88: oklch(100% 0 0 / calc(224 / 255));

  /** Mist Utility Colors */
  --color-mist-50: var(--mist-50);
  --color-mist-50-opacity-88: var(--mist-50-opacity-88);
  --color-mist-50-opacity-38: var(--mist-50-opacity-38);

  /** Slate Primitives */
  --slate-50: oklch(34.96% 0.0179 272.24);
  --slate-100: oklch(33.4% 0.0181 272.2);
  --slate-200: oklch(31.83% 0.0183 272.16);
  --slate-300: oklch(30.29% 0.0203 273.16);
  --slate-400: oklch(28.68% 0.0206 273.08);
  --slate-500: oklch(27.1% 0.0227 273.84);
  --slate-600: oklch(25.44% 0.0231 273.73);
  --slate-700: oklch(23.76% 0.0235 273.59);
  --slate-800: oklch(22.43% 0.022 272.68);
  --slate-900: oklch(20.64% 0.0205 271.56);
  --slate-950: oklch(18.46% 0.0187 274.71);

  /** Slate Opacity Tokens */
  --slate-900-opacity-0: oklch(20.64% 0.0205 271.56 / 0);
  --slate-900-opacity-4: oklch(20.64% 0.0205 271.56 / calc(10 / 255));
  --slate-900-opacity-6: oklch(20.64% 0.0205 271.56 / calc(15 / 255));
  --slate-900-opacity-8: oklch(20.64% 0.0205 271.56 / calc(20 / 255));
  --slate-900-opacity-10: oklch(20.64% 0.0205 271.56 / calc(26 / 255));
  --slate-900-opacity-12: oklch(20.64% 0.0205 271.56 / calc(31 / 255));
  --slate-900-opacity-16: oklch(20.64% 0.0205 271.56 / calc(41 / 255));
  --slate-900-opacity-24: oklch(20.64% 0.0205 271.56 / calc(61 / 255));
  --slate-900-opacity-30: oklch(20.64% 0.0205 271.56 / calc(77 / 255));
  --slate-900-opacity-38: oklch(20.64% 0.0205 271.56 / calc(97 / 255));
  --slate-900-opacity-50: oklch(20.64% 0.0205 271.56 / calc(128 / 255));
  --slate-900-opacity-60: oklch(20.64% 0.0205 271.56 / calc(153 / 255));
  --slate-900-opacity-88: oklch(20.64% 0.0205 271.56 / calc(224 / 255));

  /** Brand Accents */
  --brand-accents-mckinsey-deep-blue: oklch(21.74% 0.0429 242.02);
  --brand-accents-mckinsey-electric-blue: oklch(53.17% 0.26 265.39);
  --brand-accents-mckinsey-cyan: oklch(69.89% 0.1572 238.91);
  --brand-accents-qb-accent: oklch(69.89% 0.1572 238.91);

  /** Brand Accent Utility Colors */
  --color-brand-accents-mckinsey-deep-blue: var(
    --brand-accents-mckinsey-deep-blue
  );
  --color-brand-accents-mckinsey-electric-blue: var(
    --brand-accents-mckinsey-electric-blue
  );
  --color-brand-accents-mckinsey-cyan: var(--brand-accents-mckinsey-cyan);
  --color-brand-accents-qb-accent: var(--brand-accents-qb-accent);

  /** Red primitives (DS-Primitives) */
  --red-50: #fef2f2ff;
  --red-100: #fee2e2ff;
  --red-200: #fecacaff;
  --red-300: #fca5a5ff;
  --red-400: #f87171ff;
  --red-500: #ef4444ff;
  --red-600: #dc2626ff;
  --red-700: #b91c1cff;
  --red-800: #991b1bff;
  --red-900: #7f1d1dff;
  --red-950: #450a0aff;

  /** Red utility colors */
  --color-red-50: var(--red-50);
  --color-red-100: var(--red-100);
  --color-red-200: var(--red-200);
  --color-red-300: var(--red-300);
  --color-red-400: var(--red-400);
  --color-red-500: var(--red-500);
  --color-red-600: var(--red-600);
  --color-red-700: var(--red-700);
  --color-red-800: var(--red-800);
  --color-red-900: var(--red-900);
  --color-red-950: var(--red-950);

  /** Amber primitives (DS-Primitives) */
  --amber-50: #fffbebff;
  --amber-100: #fef3c7ff;
  --amber-200: #fde68aff;
  --amber-300: #fcd34dff;
  --amber-400: #fbbf24ff;
  --amber-500: #f59e0bff;
  --amber-600: #d97706ff;
  --amber-700: #b45309ff;
  --amber-800: #92400eff;
  --amber-900: #78350fff;
  --amber-950: #431407ff;

  /** Amber utility colors */
  --color-amber-50: var(--amber-50);
  --color-amber-100: var(--amber-100);
  --color-amber-200: var(--amber-200);
  --color-amber-300: var(--amber-300);
  --color-amber-400: var(--amber-400);
  --color-amber-500: var(--amber-500);
  --color-amber-600: var(--amber-600);
  --color-amber-700: var(--amber-700);
  --color-amber-800: var(--amber-800);
  --color-amber-900: var(--amber-900);
  --color-amber-950: var(--amber-950);

  /** Green primitives (DS-Primitives) */
  --green-50: #f0fdf4ff;
  --green-100: #dcfce7ff;
  --green-200: #bbf7d0ff;
  --green-300: #86efacff;
  --green-400: #4ade80ff;
  --green-500: #22c55eff;
  --green-600: #16a34aff;
  --green-700: #15803dff;
  --green-800: #166534ff;
  --green-900: #14532dff;
  --green-950: #052e16ff;

  /** Green utility colors */
  --color-green-50: var(--green-50);
  --color-green-100: var(--green-100);
  --color-green-200: var(--green-200);
  --color-green-300: var(--green-300);
  --color-green-400: var(--green-400);
  --color-green-500: var(--green-500);
  --color-green-600: var(--green-600);
  --color-green-700: var(--green-700);
  --color-green-800: var(--green-800);
  --color-green-900: var(--green-900);
  --color-green-950: var(--green-950);

  /** Cyan primitives (DS-Primitives) */
  --cyan-50: #ecfeffff;
  --cyan-100: #cffafeff;
  --cyan-200: #a5f3fcff;
  --cyan-300: #67e8f9ff;
  --cyan-400: #22d3eeff;
  --cyan-500: #06b6d4ff;
  --cyan-600: #0891b2ff;
  --cyan-700: #0e7490ff;
  --cyan-800: #155e75ff;
  --cyan-900: #164e63ff;
  --cyan-950: #083344ff;

  /** Cyan utility colors */
  --color-cyan-50: var(--cyan-50);
  --color-cyan-100: var(--cyan-100);
  --color-cyan-200: var(--cyan-200);
  --color-cyan-300: var(--cyan-300);
  --color-cyan-400: var(--cyan-400);
  --color-cyan-500: var(--cyan-500);
  --color-cyan-600: var(--cyan-600);
  --color-cyan-700: var(--cyan-700);
  --color-cyan-800: var(--cyan-800);
  --color-cyan-900: var(--cyan-900);
  --color-cyan-950: var(--cyan-950);

  /** Sky primitives (DS-Primitives) */
  --sky-50: #f0f9ffff;
  --sky-100: #e0f2feff;
  --sky-200: #bae6fdff;
  --sky-300: #7dd3fcff;
  --sky-400: #38bdf8ff;
  --sky-500: #0ea5e9ff;
  --sky-600: #0284c7ff;
  --sky-700: #0369a1ff;
  --sky-800: #075985ff;
  --sky-900: #0c4a6eff;
  --sky-950: #082f49ff;

  /** Sky utility colors */
  --color-sky-50: var(--sky-50);
  --color-sky-100: var(--sky-100);
  --color-sky-200: var(--sky-200);
  --color-sky-300: var(--sky-300);
  --color-sky-400: var(--sky-400);
  --color-sky-500: var(--sky-500);
  --color-sky-600: var(--sky-600);
  --color-sky-700: var(--sky-700);
  --color-sky-800: var(--sky-800);
  --color-sky-900: var(--sky-900);
  --color-sky-950: var(--sky-950);

  /** Radius Tokens - Available as Tailwind utilities */
  --radius-round: var(--rad-round);
  --radius-reg: var(--rad-reg);
  --radius-sm: var(--rad-sm);
  --radius-md: var(--rad-md);
  --radius-lg: var(--rad-lg);

  /*** Foreground (Text/Icon) Tokens */

  --color-fg-primary: var(--text-primary);
  --color-fg-secondary: var(--text-secondary);
  --color-fg-tertiary: var(--text-tertiary);
  --color-fg-disabled: var(--text-disabled);
  --color-fg-primary-inverse: var(--text-primary-inverse);
  --color-fg-secondary-inverse: var(--text-secondary-inverse);
  --color-fg-tertiary-inverse: var(--text-tertiary-inverse);
  --color-fg-disabled-inverse: var(--text-disabled-inverse);
  --color-fg-error: var(--text-error);

  /*** Stroke (Border) Tokens */

  --color-stroke-divider: var(--border-divider);
  --color-stroke-primary: var(--border-primary);
  --color-stroke-secondary: var(--border-secondary);
  --color-stroke-tertiary: var(--border-tertiary);
  --color-stroke-active: var(--border-active);
  --color-stroke-status-focus: var(--border-status-focus);
  --color-stroke-status-mono: var(--border-status-mono);
  --color-stroke-status-error: var(--border-status-error);
  --color-stroke-status-success: var(--border-status-success);
  --color-stroke-status-warning: var(--border-status-warning);
  --color-stroke-divider-inverse: var(--border-divider-inverse);
  --color-stroke-primary-inverse: var(--border-primary-inverse);
  --color-stroke-secondary-inverse: var(--border-secondary-inverse);
  --color-stroke-tertiary-inverse: var(--border-tertiary-inverse);
  --color-stroke-tertiary-hover: var(--border-tertiary-hover);
  --color-stroke-tertiary-hover-inverse: var(--border-tertiary-hover-inverse);
  --color-stroke-active-inverse: var(--border-active-inverse);

  /*** Fill Tokens */

  --color-fill-primary: var(--fill-primary);
  --color-fill-secondary: var(--fill-secondary);
  --color-fill-tertiary: var(--fill-tertiary);
  --color-fill-subtle: var(--fill-subtle);
  --color-fill-muted: var(--fill-muted);
  --color-fill-active: var(--fill-active);
  --color-fill-disabled: var(--fill-disabled);
  --color-fill-primary-inverse: var(--fill-primary-inverse);
  --color-fill-secondary-inverse: var(--fill-secondary-inverse);
  --color-fill-tertiary-inverse: var(--fill-tertiary-inverse);
  --color-fill-subtle-inverse: var(--fill-subtle-inverse);
  --color-fill-disabled-inverse: var(--fill-disabled-inverse);
  --color-fill-active-inverse: var(--fill-active-inverse);
  --color-fill-muted-inverse: var(--fill-muted-inverse);
  --color-fill-active-alpha: var(--fill-active-alpha);
  --color-fill-onsurface-ui-1: var(--fill-onsurface-ui-1);
  --color-fill-onsurface-ui-2: var(--fill-onsurface-ui-2);
  --color-fill-onsurface-ui-3: var(--fill-onsurface-ui-3);

  --color-fill-stepmarkers-track: var(--fill-stepmarkers-track);

  /*** Surface Tokens */

  --color-surface-primary: var(--surface-primary);
  --color-surface-secondary: var(--surface-secondary);
  --color-surface-tertiary: var(--surface-tertiary);
  --color-surface-base: var(--surface-base);
  --color-sidebar: var(--surface-base);
  --color-sidebar-foreground: var(--text-primary);

  /*** Status Tokens */

  --color-status-success: var(--status-success);
  --color-status-error: var(--status-error);
  --color-status-warning: var(--status-warning);
  --color-status-information: var(--status-information);
  --color-status-success-inverse: var(--status-success-inverse);
  --color-status-error-inverse: var(--status-error-inverse);
  --color-status-warning-inverse: var(--status-warning-inverse);
  --color-status-information-inverse: var(--status-information-inverse);

  /*** State Layer Tokens */

  --color-stateslayer-overlay-enabled: var(--stateslayer-overlay-enabled);
  --color-stateslayer-overlay-hover: var(--stateslayer-overlay-hover);
  --color-stateslayer-overlay-pressed: var(--stateslayer-overlay-pressed);
  --color-stateslayer-overlay-disabled: var(--stateslayer-overlay-disabled);
  --color-stateslayer-overlay-active: var(--stateslayer-overlay-active);
  --color-stateslayer-overlay-hover-inverse: var(
    --stateslayer-overlay-hover-inverse
  );
  --color-stateslayer-overlay-pressed-inverse: var(
    --stateslayer-overlay-pressed-inverse
  );
  --color-stateslayer-overlay-disabled-inverse: var(
    --stateslayer-overlay-disabled-inverse
  );
  --color-stateslayer-overlay-active-inverse: var(
    --stateslayer-overlay-active-inverse
  );
  --color-stateslayer-overlay-enabled-inverse: var(
    --stateslayer-overlay-enabled-inverse
  );

  /*** Elevation Tokens */

  --color-elevations-shade-t: var(--elevations-shade-t);
  --color-elevations-shade: var(--elevations-shade);
  --color-elevations-shade-t-01: var(--elevations-shade-t-01);
  --color-elevations-shade-01: var(--elevations-shade-01);
  --color-elevations-shade-t-02: var(--elevations-shade-t-02);
  --color-elevations-shade-02: var(--elevations-shade-02);
  --color-elevations-shade-t-03: var(--elevations-shade-t-03);
  --color-elevations-shade-03: var(--elevations-shade-03);
  --color-elevations-shade-t-04: var(--elevations-shade-t-04);
  --color-elevations-shade-04: var(--elevations-shade-04);

  /*** shadcn compatibility aliases — let plain-Tailwind / stock shadcn classes
       (bg-background, text-foreground, bg-popover, text-destructive, ring-ring, etc.)
       resolve to QBDS semantic tokens. Keep these as last-resort aliases; prefer
       QBDS tokens (text-fg-*, bg-fill-*, bg-surface-*) in new component code. */

  --color-background: var(--surface-base);
  --color-foreground: var(--text-primary);
  --color-card: var(--surface-primary);
  --color-card-foreground: var(--text-primary);
  --color-popover: var(--surface-primary);
  --color-popover-foreground: var(--text-primary);
  --color-primary: var(--fill-active);
  --color-primary-foreground: var(--text-primary-inverse);
  --color-secondary: var(--fill-tertiary);
  --color-secondary-foreground: var(--text-primary);
  --color-muted: var(--fill-muted);
  --color-muted-foreground: var(--text-secondary);
  --color-accent: var(--fill-subtle);
  --color-accent-foreground: var(--text-primary);
  --color-destructive: var(--status-error);
  --color-destructive-foreground: var(--text-primary-inverse);
  --color-border: var(--border-divider);
  --color-input: var(--border-secondary);
  --color-ring: var(--border-status-focus);

  /* Accordion panel open/close height transition. Base UI sets
   * --accordion-panel-height to a concrete px when toggling, so a height
   * transition (not keyframes — those can't animate to \`auto\`) interpolates. */
  --accordion-panel-duration: 0.2s;
}

:root {
  /** Sharp radius tokens (default - no radius) */
  --rad-reg: 0px;
  --rad-sm: 0px;
  --rad-md: 0px;
  --rad-lg: 0px;
  --rad-round: 9999px;

  /** Light mode text tokens */

  --text-primary: var(--slate-900-opacity-88);
  --text-secondary: var(--slate-900-opacity-60);
  --text-tertiary: var(--slate-900-opacity-50);
  --text-disabled: var(--slate-900-opacity-38);
  --text-primary-inverse: var(--mist-50-opacity-88);
  --text-secondary-inverse: var(--mist-50-opacity-60);
  --text-tertiary-inverse: var(--mist-50-opacity-50);
  --text-disabled-inverse: var(--mist-50-opacity-38);
  --text-information: var(--color-sky-700);
  --text-error: var(--color-red-700);
  --text-warning: var(--color-amber-700);
  --text-success: var(--color-green-700);

  /** Light mode border tokens */

  --border-divider: var(--slate-900-opacity-10);
  --border-primary: var(--slate-900-opacity-38);
  --border-secondary: var(--slate-900-opacity-24);
  --border-tertiary: var(--slate-900-opacity-16);
  --border-tertiary-hover: var(--slate-900-opacity-38);
  --border-active: var(--slate-950);
  --border-status-focus: var(--color-sky-500);
  --border-status-mono: var(--slate-900-opacity-24);
  --border-status-error: var(--color-red-700);
  --border-status-success: var(--color-green-600);
  --border-status-warning: var(--color-amber-500);
  --border-divider-inverse: var(--mist-50-opacity-8);
  --border-primary-inverse: var(--mist-50-opacity-60);
  --border-secondary-inverse: var(--mist-50-opacity-38);
  --border-tertiary-inverse: var(--mist-50-opacity-16);
  --border-tertiary-hover-inverse: var(--mist-50-opacity-38);
  --border-active-inverse: var(--mist-50);

  /** Light mode fill tokens */

  --fill-primary: var(--slate-900-opacity-88);
  --fill-secondary: var(--slate-900-opacity-60);
  --fill-tertiary: var(--slate-900-opacity-16);
  --fill-subtle: var(--slate-900-opacity-6);
  --fill-muted: var(--slate-900-opacity-8);
  --fill-active: var(--slate-950);
  --fill-disabled: var(--slate-900-opacity-38);
  --fill-primary-inverse: var(--mist-50-opacity-88);
  --fill-secondary-inverse: var(--mist-50-opacity-60);
  --fill-tertiary-inverse: var(--mist-50-opacity-16);
  --fill-subtle-inverse: var(--mist-50-opacity-6);
  --fill-muted-inverse: var(--mist-50-opacity-8);
  --fill-disabled-inverse: var(--mist-50-opacity-38);
  --fill-active-inverse: var(--mist-50);
  --fill-active-alpha: var(--slate-900-opacity-88);
  --fill-onsurface-ui-1: var(--mist-100);
  --fill-onsurface-ui-2: var(--mist-300);
  --fill-onsurface-ui-3: var(--mist-200);

  --fill-stepmarkers-track: var(--mist-900);

  /** Light mode surface tokens */

  --surface-primary: var(--mist-50);
  --surface-secondary: var(--mist-400);
  --surface-tertiary: var(--mist-500);
  --surface-base: var(--mist-100);

  /** Light mode status tokens */

  --status-success: var(--color-green-600);
  --status-error: var(--color-red-600);
  --status-warning: var(--color-amber-600);
  --status-information: var(--color-sky-600);
  --status-success-inverse: var(--color-green-400);
  --status-error-inverse: var(--color-red-400);
  --status-warning-inverse: var(--color-amber-400);
  --status-information-inverse: var(--color-sky-400);

  /** Light mode state layer tokens */

  --stateslayer-overlay-enabled: var(--slate-900-opacity-0);
  --stateslayer-overlay-hover: var(--slate-900-opacity-8);
  --stateslayer-overlay-pressed: var(--slate-900-opacity-16);
  --stateslayer-overlay-disabled: var(--slate-900-opacity-8);
  --stateslayer-overlay-active: var(--slate-950);
  --stateslayer-overlay-hover-inverse: var(--mist-50-opacity-8);
  --stateslayer-overlay-pressed-inverse: var(--mist-50-opacity-16);
  --stateslayer-overlay-disabled-inverse: var(--slate-900-opacity-38);
  --stateslayer-overlay-active-inverse: var(--mist-50);
  --stateslayer-overlay-enabled-inverse: var(--mist-50-opacity-0);

  /** Light mode elevation tokens */

  --elevations-shade-t: var(--slate-900-opacity-8);
  --elevations-shade: var(--slate-900-opacity-38);
  --elevations-shade-t-01: var(--slate-900-opacity-12);
  --elevations-shade-01: var(--slate-900-opacity-12);
  --elevations-shade-t-02: var(--slate-900-opacity-12);
  --elevations-shade-02: var(--slate-900-opacity-24);
  --elevations-shade-t-03: var(--slate-900-opacity-12);
  --elevations-shade-03: var(--slate-900-opacity-8);
  --elevations-shade-t-04: var(--slate-900-opacity-12);
  --elevations-shade-04: var(--slate-900-opacity-8);
}

.dark {
  /** Sharp radius tokens (default - no radius, same as light mode) */
  --rad-reg: 0px;
  --rad-sm: 0px;
  --rad-md: 0px;
  --rad-lg: 0px;
  --rad-round: 9999px;

  /** Dark mode text tokens */

  --text-primary: var(--mist-50-opacity-88);
  --text-secondary: var(--mist-50-opacity-60);
  --text-tertiary: var(--mist-50-opacity-50);
  --text-disabled: var(--mist-50-opacity-38);
  --text-primary-inverse: var(--slate-900-opacity-88);
  --text-secondary-inverse: var(--slate-900-opacity-60);
  --text-tertiary-inverse: var(--slate-900-opacity-50);
  --text-disabled-inverse: var(--slate-900-opacity-38);
  --text-information: var(--color-sky-400);
  --text-error: var(--color-red-400);
  --text-warning: var(--color-amber-400);
  --text-success: var(--color-green-400);

  /** Dark mode border tokens */

  --border-divider: var(--mist-50-opacity-8);
  --border-primary: var(--mist-50-opacity-60);
  --border-secondary: var(--mist-50-opacity-38);
  --border-tertiary: var(--mist-50-opacity-16);
  --border-tertiary-hover: var(--mist-50-opacity-38);
  --border-active: var(--mist-50);
  --border-status-focus: var(--color-sky-400);
  --border-status-mono: var(--mist-50-opacity-24);
  --border-status-error: var(--color-red-400);
  --border-status-success: var(--color-green-400);
  --border-status-warning: var(--color-amber-400);
  --border-divider-inverse: var(--slate-900-opacity-8);
  --border-primary-inverse: var(--slate-900-opacity-60);
  --border-secondary-inverse: var(--slate-900-opacity-38);
  --border-tertiary-inverse: var(--slate-900-opacity-16);
  --border-tertiary-hover-inverse: var(--slate-900-opacity-38);
  --border-active-inverse: var(--slate-950);

  /** Dark mode fill tokens */

  --fill-primary: var(--mist-50-opacity-88);
  --fill-secondary: var(--mist-50-opacity-60);
  --fill-tertiary: var(--mist-50-opacity-16);
  --fill-subtle: var(--mist-50-opacity-6);
  --fill-muted: var(--mist-50-opacity-8);
  --fill-active: var(--mist-50);
  --fill-disabled: var(--mist-50-opacity-38);
  --fill-primary-inverse: var(--slate-900-opacity-88);
  --fill-secondary-inverse: var(--slate-900-opacity-60);
  --fill-tertiary-inverse: var(--slate-900-opacity-24);
  --fill-subtle-inverse: var(--slate-900-opacity-6);
  --fill-muted-inverse: var(--slate-900-opacity-8);
  --fill-disabled-inverse: var(--slate-900-opacity-38);
  --fill-active-inverse: var(--slate-950);
  --fill-active-alpha: var(--mist-50-opacity-88);
  --fill-onsurface-ui-1: var(--slate-600);
  --fill-onsurface-ui-2: var(--slate-300);
  --fill-onsurface-ui-3: var(--slate-400);

  --fill-stepmarkers-track: var(--slate-100);

  /** Dark mode surface tokens */

  --surface-primary: var(--slate-800);
  --surface-secondary: var(--slate-700);
  --surface-tertiary: var(--slate-500);
  --surface-base: var(--slate-900);

  /** Dark mode status tokens */

  --status-success: var(--color-green-400);
  --status-error: var(--color-red-400);
  --status-warning: var(--color-amber-400);
  --status-information: var(--color-sky-400);
  --status-success-inverse: var(--color-green-600);
  --status-error-inverse: var(--color-red-600);
  --status-warning-inverse: var(--color-amber-600);
  --status-information-inverse: var(--color-sky-600);

  /** Dark mode state layer tokens */

  --stateslayer-overlay-enabled: var(--mist-50-opacity-0);
  --stateslayer-overlay-hover: var(--mist-50-opacity-8);
  --stateslayer-overlay-pressed: var(--mist-50-opacity-16);
  --stateslayer-overlay-disabled: var(--slate-900-opacity-38);
  --stateslayer-overlay-active: var(--mist-50);
  --stateslayer-overlay-hover-inverse: var(--slate-900-opacity-8);
  --stateslayer-overlay-pressed-inverse: var(--slate-900-opacity-16);
  --stateslayer-overlay-disabled-inverse: var(--slate-900-opacity-8);
  --stateslayer-overlay-active-inverse: var(--slate-950);
  --stateslayer-overlay-enabled-inverse: var(--slate-900-opacity-0);

  /** Dark mode elevation tokens */

  --elevations-shade-t: var(--slate-900-opacity-88);
  --elevations-shade: var(--slate-900-opacity-88);
  --elevations-shade-t-01: var(--slate-900-opacity-60);
  --elevations-shade-01: var(--slate-900-opacity-12);
  --elevations-shade-t-02: var(--slate-900-opacity-88);
  --elevations-shade-02: var(--slate-900-opacity-38);
  --elevations-shade-t-03: var(--slate-900-opacity-38);
  --elevations-shade-03: var(--slate-900-opacity-88);
  --elevations-shade-t-04: var(--slate-900-opacity-38);
  --elevations-shade-04: var(--slate-900-opacity-88);
}

.radius-mode {
  /** Rounded radius tokens */
  --rad-reg: 8px;
  --rad-sm: 4px;
  --rad-md: 12px;
  --rad-lg: 16px;
}

@utility shadow-elevation-0 {
  --tw-shadow:
    0 1px 1px 0 var(--color-elevations-shade-t),
    0 0 1px 0 var(--color-elevations-shade);
  box-shadow:
    var(--tw-inset-shadow), var(--tw-inset-ring-shadow),
    var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
}

@utility shadow-elevation-1 {
  --tw-shadow:
    0 2px 4px 1px var(--color-elevations-shade-t-01),
    0 1px 4px 0 var(--color-elevations-shade-01);
  box-shadow:
    var(--tw-inset-shadow), var(--tw-inset-ring-shadow),
    var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
}

@utility shadow-elevation-2 {
  --tw-shadow:
    0 4px 8px 0 var(--color-elevations-shade-t-02),
    0 2px 4px -1px var(--color-elevations-shade-02);
  box-shadow:
    var(--tw-inset-shadow), var(--tw-inset-ring-shadow),
    var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
}

@utility shadow-elevation-3 {
  --tw-shadow:
    0 8px 12px 1px var(--color-elevations-shade-t-03),
    0 4px 8px -1px var(--color-elevations-shade-03);
  box-shadow:
    var(--tw-inset-shadow), var(--tw-inset-ring-shadow),
    var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
}

@utility shadow-elevation-4 {
  --tw-shadow:
    0 16px 32px 2px var(--color-elevations-shade-t-04),
    0 8px 16px -2px var(--color-elevations-shade-04);
  box-shadow:
    var(--tw-inset-shadow), var(--tw-inset-ring-shadow),
    var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
}

/**
 * State-layer overlays as a stacked background-image on top of a solid fill.
 * Prefer these over arbitrary linear-gradient classes. Variant-capable
 * (hover:overlay-hover, active:overlay-pressed, disabled:overlay-disabled,
 * before:overlay-hover, etc). Does not tint replaced children (e.g. img) —
 * put the utility on a ::before / absolute layer when content sits above the fill.
 */
@utility overlay-hover {
  background-image: linear-gradient(
    var(--color-stateslayer-overlay-hover),
    var(--color-stateslayer-overlay-hover)
  );
}

@utility overlay-pressed {
  background-image: linear-gradient(
    var(--color-stateslayer-overlay-pressed),
    var(--color-stateslayer-overlay-pressed)
  );
}

@utility overlay-disabled {
  background-image: linear-gradient(
    var(--color-stateslayer-overlay-disabled),
    var(--color-stateslayer-overlay-disabled)
  );
}

@utility overlay-hover-inverse {
  background-image: linear-gradient(
    var(--color-stateslayer-overlay-hover-inverse),
    var(--color-stateslayer-overlay-hover-inverse)
  );
}

@utility overlay-pressed-inverse {
  background-image: linear-gradient(
    var(--color-stateslayer-overlay-pressed-inverse),
    var(--color-stateslayer-overlay-pressed-inverse)
  );
}

@utility overlay-disabled-inverse {
  background-image: linear-gradient(
    var(--color-stateslayer-overlay-disabled-inverse),
    var(--color-stateslayer-overlay-disabled-inverse)
  );
}

@layer utilities {
  /** Icon classes */
  .icon {
    color: color-mix(in srgb, var(--color-fill-active) 60%, transparent);
  }

  .icon-interactive {
    color: color-mix(in srgb, var(--color-fill-active) 60%, transparent);
    transition: color 0.2s;
  }

  .icon-interactive:hover {
    color: color-mix(in srgb, var(--color-fill-active) 88%, transparent);
  }

  .icon-interactive:disabled {
    color: color-mix(in srgb, var(--color-fill-active) 30%, transparent);
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    @apply appearance-none;
  }
}

/* Text Styles
 * Declared as \`@utility\` (not plain \`@layer utilities\` rules) so they remain
 * variant-capable in Tailwind v4 — e.g. \`group-data-[size=lg]/accordion:headings-h3-regular\`.
 */
@utility display-d1-regular {
  @apply font-sans text-[56px] leading-[60px] font-light tracking-[-0.28px];
}

@utility display-d2-regular {
  @apply font-sans text-[48px] leading-[56px] font-light tracking-[-0.96px];
}

@utility display-d3-regular {
  @apply font-sans text-[40px] leading-[48px] font-light tracking-[-0.8px];
}

@utility headings-h1-regular {
  @apply font-sans text-3xl leading-10 font-normal tracking-[-0.128px];
}

@utility headings-h2-semibold {
  @apply font-sans text-2xl leading-8 font-semibold tracking-[-0.096px];
}

@utility headings-h2-regular {
  @apply font-sans text-2xl leading-8 font-normal tracking-[-0.096px];
}

@utility headings-h3-regular {
  @apply font-sans text-xl leading-7 font-normal tracking-[0px];
}

@utility headings-h3-semibold {
  @apply font-sans text-xl leading-7 font-semibold tracking-[0px];
}

@utility headings-h4-regular {
  @apply font-sans text-base leading-6 font-normal tracking-[-0.016px];
}

@utility headings-h4-semibold {
  @apply font-sans text-base leading-6 font-semibold tracking-[-0.016px];
}

@utility label-large-primary {
  @apply font-sans text-base leading-6 font-normal tracking-[-0.128px];
}

@utility label-regular-primary {
  @apply font-sans text-sm leading-5 font-normal tracking-[-0.112px];
}

@utility label-small-primary {
  @apply font-sans text-xs leading-4 font-normal tracking-[0px];
}

@utility paragraph-large-primary {
  @apply font-sans text-base leading-6 font-normal tracking-[-0.032px];
}

@utility paragraph-large-primary-link {
  @apply font-sans text-base leading-6 font-normal tracking-[-0.032px] underline;
}

@utility paragraph-large-emphasised {
  @apply font-sans text-base leading-6 font-semibold tracking-[-0.032px];
}

@utility paragraph-regular-primary {
  @apply font-sans text-sm leading-5 font-normal tracking-[-0.028px];
}

@utility paragraph-regular-primary-link {
  @apply font-sans text-sm leading-5 font-normal tracking-[-0.028px] underline;
}

@utility paragraph-regular-emphasised-600 {
  @apply font-sans text-sm leading-5 font-semibold tracking-[-0.028px];
}

@utility paragraph-small-primary {
  @apply font-sans text-xs leading-4 font-normal tracking-[0.024px];
}

@utility paragraph-small-primary-link {
  @apply font-sans text-xs leading-4 font-normal tracking-[0.024px] underline;
}

@utility paragraph-small-emphasised {
  @apply font-sans text-xs leading-4 font-semibold tracking-[0.024px];
}

@utility paragraph-code-text {
  @apply font-mono text-xs leading-4 font-normal tracking-[0px];
}

@utility cta-button-01 {
  @apply font-sans text-base leading-6 font-semibold tracking-[-0.064px];
}

@utility cta-button-link-01 {
  @apply font-sans text-base leading-6 font-semibold tracking-[-0.064px] underline;
}

@utility cta-button-02 {
  @apply font-sans text-sm leading-5 font-semibold tracking-[-0.056px];
}

@utility cta-button-link-02 {
  @apply font-sans text-sm leading-5 font-semibold tracking-[-0.056px] underline;
}

@utility cta-button-03 {
  @apply font-sans text-xs leading-4 font-semibold tracking-[-0.012px];
}

@utility cta-button-link-03 {
  @apply font-sans text-xs leading-4 font-semibold tracking-[-0.012px] underline;
}
`,R=n(),z=A(O(L)),B=j(z),V=`#ffffff`,H=`#141721`,U=H,W=`#e5e5e5`,G={"--elevations-shade-t":`var(--slate-900-opacity-8)`,"--elevations-shade":`var(--slate-900-opacity-38)`,"--elevations-shade-t-01":`var(--slate-900-opacity-12)`,"--elevations-shade-01":`var(--slate-900-opacity-12)`,"--elevations-shade-t-02":`var(--slate-900-opacity-12)`,"--elevations-shade-02":`var(--slate-900-opacity-24)`,"--elevations-shade-t-03":`var(--slate-900-opacity-12)`,"--elevations-shade-03":`var(--slate-900-opacity-8)`,"--elevations-shade-t-04":`var(--slate-900-opacity-12)`,"--elevations-shade-04":`var(--slate-900-opacity-8)`},K=`sm:grid sm:grid-cols-[4.5rem_minmax(0,1fr)_8.75rem_8.75rem] sm:gap-x-4`,q={"shadow-elevation-0":`shadow-elevation-0`,"shadow-elevation-1":`shadow-elevation-1`,"shadow-elevation-2":`shadow-elevation-2`,"shadow-elevation-3":`shadow-elevation-3`,"shadow-elevation-4":`shadow-elevation-4`};function J(e){return q[e.trim()]??null}var Y={backgroundColor:`#ffffff`,backgroundImage:`linear-gradient(45deg, #cccccc 25%, transparent 25%, transparent 75%, #cccccc 75%, #cccccc), linear-gradient(45deg, #cccccc 25%, transparent 25%, transparent 75%, #cccccc 75%, #cccccc)`,backgroundSize:`5px 5px`,backgroundPosition:`0 0, 2.5px 2.5px`};function X(e){return/^#[\da-f]{8}$/i.test(e)&&e.slice(7,9).toLowerCase()!==`ff`}function ie({value:e,onLight:t}){let n=t?`border border-[#14172129]`:`border border-[#ffffff29]`;return X(e)?(0,R.jsxs)(`div`,{className:i(`relative size-7 shrink-0 overflow-hidden rounded-full`,n),"aria-hidden":!0,children:[(0,R.jsx)(`div`,{className:`absolute inset-0`,style:Y}),(0,R.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundColor:e}})]}):(0,R.jsx)(`div`,{className:i(`size-7 shrink-0 rounded-full`,n),style:{backgroundColor:e},"aria-hidden":!0})}function Z({value:e}){let[t,n]=(0,s.useState)(!1),[r,i]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{if(!t)return;let e=window.setTimeout(()=>n(!1),2e3);return()=>window.clearTimeout(e)},[t]),(0,s.useEffect)(()=>{if(!r)return;let e=window.setTimeout(()=>i(!1),2e3);return()=>window.clearTimeout(e)},[r]),(0,R.jsx)(o,{type:`button`,variant:`ghost`,size:`sm`,className:`size-6 shrink-0 p-0`,"aria-label":t?`Copied`:r?`Copy failed`:`Copy ${e}`,onClick:()=>{if(!navigator.clipboard?.writeText){n(!1),i(!0);return}navigator.clipboard.writeText(e).then(()=>{i(!1),n(!0)}).catch(()=>{n(!1),i(!0)})},children:(0,R.jsx)(a,{icon:t?`check`:r?`error`:`content_copy`,size:`sm`})})}function Q({label:e,canvas:t,color:n}){let r=t===V,i=n.alias?`${n.value} · ${n.alias}`:n.value;return(0,R.jsxs)(`div`,{className:`border-stroke-tertiary grid h-[3.25rem] w-[8.75rem] grid-cols-[1.75rem_1fr] items-center gap-2 border px-2`,style:{backgroundColor:t},title:i,children:[(0,R.jsx)(ie,{value:n.value,onLight:r}),(0,R.jsxs)(`div`,{className:`min-w-0`,children:[(0,R.jsx)(`p`,{className:r?`paragraph-small-emphasised text-[#14172199]`:`paragraph-small-emphasised text-[#ffffff99]`,children:e}),(0,R.jsx)(`p`,{className:r?`paragraph-small-primary truncate font-mono text-[#141721]`:`paragraph-small-primary truncate font-mono text-[#ffffff]`,children:n.value})]})]})}function $({canvas:e,shadowClass:t,darkScope:n}){let r=e===V;return(0,R.jsx)(`div`,{className:i(`border-stroke-tertiary flex h-[3.25rem] w-[8.75rem] items-center justify-center border px-2`,n&&`dark`),style:{backgroundColor:e,...n?void 0:G},"aria-label":r?`Light mode shadow`:`Dark mode shadow`,role:`img`,children:(0,R.jsx)(`div`,{className:i(`size-9 shrink-0 rounded-sm`,t),style:{backgroundColor:r?U:W},"aria-hidden":!0})})}function ae({token:e}){let t=F(e.tailwind),n=e.tailwind.split(`,`).map(e=>e.trim()).join(` `),r=e.description?`sm:row-span-3`:`sm:row-span-2`,a=J(e.tailwind),o=e.category===`Elevations`&&a!==null,s=!o&&!e.patternOnly&&e.light?.value&&e.dark?.value;return(0,R.jsxs)(`li`,{id:M(e.name),className:i(K,`border-stroke-divider flex scroll-mt-20 flex-col gap-2 border-b py-3 last:border-b-0 sm:grid sm:gap-y-1`),children:[(0,R.jsxs)(`div`,{className:`grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 sm:contents`,children:[(0,R.jsx)(`span`,{className:`paragraph-small-emphasised text-fg-tertiary sm:col-start-1 sm:row-start-1 sm:self-baseline`,children:`Figma`}),(0,R.jsxs)(`span`,{className:`paragraph-regular-primary text-fg-primary inline-flex min-w-0 items-center gap-0.5 font-semibold sm:col-start-2 sm:row-start-1 sm:self-baseline`,children:[(0,R.jsx)(`span`,{className:`min-w-0 truncate`,children:e.name}),(0,R.jsx)(Z,{value:e.name})]}),(0,R.jsx)(`span`,{className:`paragraph-small-emphasised text-fg-tertiary sm:col-start-1 sm:row-start-2 sm:self-baseline`,children:`Tailwind`}),(0,R.jsxs)(`span`,{className:`paragraph-regular-primary text-fg-primary inline-flex min-w-0 items-center gap-0.5 font-mono sm:col-start-2 sm:row-start-2 sm:self-baseline`,children:[(0,R.jsx)(`code`,{className:`min-w-0 truncate`,children:t}),(0,R.jsx)(Z,{value:n})]}),e.description&&(0,R.jsx)(`p`,{className:`paragraph-small-primary text-fg-secondary col-span-2 sm:col-span-1 sm:col-start-2 sm:row-start-3`,children:I(e.description)})]}),s||o?(0,R.jsxs)(`div`,{className:`flex justify-end gap-2 sm:contents`,children:[(0,R.jsx)(`div`,{className:i(`sm:col-start-3 sm:row-start-1 sm:self-center`,r),children:o?(0,R.jsx)($,{canvas:V,shadowClass:a,darkScope:!1}):(0,R.jsx)(Q,{label:`Light`,canvas:V,color:e.light})}),(0,R.jsx)(`div`,{className:i(`sm:col-start-4 sm:row-start-1 sm:self-center`,r),children:o?(0,R.jsx)($,{canvas:H,shadowClass:a,darkScope:!0}):(0,R.jsx)(Q,{label:`Dark`,canvas:H,color:e.dark})})]}):(0,R.jsx)(`p`,{className:`paragraph-small-primary text-fg-tertiary sm:col-span-2 sm:col-start-3 sm:row-span-2`,children:e.patternOnly?`Pattern token — see TOKENS.md`:`Could not resolve colour from globals.css`})]})}function oe(){let[e,t]=(0,s.useState)(``),[n,i]=(0,s.useState)(`all`),a=(0,s.useMemo)(()=>N(z,e,n),[e,n]),o=(0,s.useMemo)(()=>P(a),[a]);return(0,R.jsx)(`main`,{className:`bg-surface-base min-h-screen w-full p-5 md:p-10`,children:(0,R.jsx)(`div`,{className:`mx-auto w-full max-w-[52rem]`,children:(0,R.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,R.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,R.jsx)(`h1`,{className:`headings-h1-regular text-fg-primary`,children:`Design Tokens`}),(0,R.jsx)(`p`,{className:`paragraph-large-primary text-fg-secondary`,children:`QBDS colours and elevation shadows in one place: the Figma name, the Tailwind class to paste into your code, and a light/dark preview (swatches or shadow samples).`})]}),(0,R.jsxs)(`div`,{className:`flex flex-col gap-3 sm:flex-row sm:items-center`,children:[(0,R.jsx)(r,{type:`search`,placeholder:`Search…`,value:e,onChange:e=>t(e.target.value),className:`sm:max-w-xs`,"aria-label":`Search tokens`}),(0,R.jsxs)(`label`,{className:`paragraph-small-primary text-fg-secondary flex items-center gap-2`,children:[`Category`,(0,R.jsxs)(`select`,{value:n,onChange:e=>i(e.target.value),className:`border-stroke-tertiary bg-surface-primary text-fg-primary paragraph-small-primary border px-2 py-1`,children:[(0,R.jsx)(`option`,{value:`all`,children:`All`}),B.map(e=>(0,R.jsx)(`option`,{value:e,children:e},e))]})]})]}),o.length===0?(0,R.jsx)(`p`,{className:`paragraph-regular-primary text-fg-secondary`,children:`No tokens match your search.`}):o.map(([e,t])=>(0,R.jsxs)(`section`,{className:`flex flex-col gap-2`,children:[(0,R.jsx)(`h2`,{className:`headings-h3-semibold text-fg-primary`,children:e}),u[e]&&(0,R.jsx)(`p`,{className:`paragraph-small-primary text-fg-secondary -mt-1`,children:u[e]}),(0,R.jsx)(`ul`,{className:`border-stroke-tertiary border-t`,children:t.map(e=>(0,R.jsx)(ae,{token:e},`${e.category}-${e.name}-${e.cssVar??e.tailwind}`))})]},e))]})})})}export{oe as default};