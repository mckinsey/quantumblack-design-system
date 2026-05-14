# QBDS Token Reference

Complete catalog of CSS custom properties defined in `globals.css`. All tokens auto-switch between light/dark mode.

## Color Primitives (do NOT use directly in components)

### Mist (Light palette)

| Token | Value | Usage |
|-------|-------|-------|
| `--mist-50` | `#ffffff` | Pure white |
| `--mist-100` | `#fafafb` | Near-white |
| `--mist-200` | `#f5f6f6` | Light gray |
| `--mist-300` | `#f2f3f4` | |
| `--mist-400` | `#ebedee` | |
| `--mist-500` | `#e6e8ea` | |
| `--mist-600` | `#e2e4e6` | |
| `--mist-700` | `#dddfe1` | |
| `--mist-800` | `#d8dadd` | |
| `--mist-900` | `#d3d6d9` | |

### Slate (Dark palette)

| Token | Value | Usage |
|-------|-------|-------|
| `--slate-50` | `#373a44` | Lightest dark |
| `--slate-100` | `#333640` | |
| `--slate-200` | `#2f323c` | |
| `--slate-300` | `#2b2e39` | |
| `--slate-400` | `#272a35` | |
| `--slate-500` | `#232632` | |
| `--slate-600` | `#1f222e` | |
| `--slate-700` | `#1b1e2a` | |
| `--slate-800` | `#181b26` | |
| `--slate-900` | `#141721` | Deepest dark |

### Brand

| Token | Value |
|-------|-------|
| `--brand-accents-mckinsey-deep-blue` | `#051c2c` |
| `--brand-accents-mckinsey-electric-blue` | `#2251ff` |
| `--brand-accents-mckinsey-cyan` | `#00a9f4` |
| `--brand-accents-qb-accent` | `#00a9f4` |

---

## Semantic Tokens (USE these in components)

### Foreground (Text & Icons) — `fg-*`

| Tailwind Class | Light | Dark |
|---------------|-------|------|
| `text-fg-primary` | slate-900 @ 88% | mist-50 @ 88% |
| `text-fg-secondary` | slate-900 @ 60% | mist-50 @ 60% |
| `text-fg-tertiary` | slate-900 @ 50% | mist-50 @ 50% |
| `text-fg-disabled` | slate-900 @ 38% | mist-50 @ 38% |
| `text-fg-primary-inverse` | mist-50 @ 88% | slate-900 @ 88% |
| `text-fg-secondary-inverse` | mist-50 @ 60% | slate-900 @ 60% |
| `text-fg-tertiary-inverse` | mist-50 @ 50% | slate-900 @ 50% |
| `text-fg-disabled-inverse` | mist-50 @ 38% | slate-900 @ 38% |

### Stroke (Borders) — `stroke-*`

| Tailwind Class | Purpose |
|---------------|---------|
| `border-stroke-divider` | Subtle dividers |
| `border-stroke-primary` | Strong borders |
| `border-stroke-secondary` | Medium borders |
| `border-stroke-tertiary` | Subtle borders |
| `border-stroke-active` | Active/selected state |
| `border-stroke-focus-brand` | Focus ring (QB cyan) |
| `border-stroke-focus-brand-accent-red` | Error focus ring |

### Fill (Backgrounds) — `fill-*`

| Tailwind Class | Purpose |
|---------------|---------|
| `bg-fill-primary` | Primary fill (strong) |
| `bg-fill-secondary` | Secondary fill |
| `bg-fill-tertiary` | Tertiary fill |
| `bg-fill-subtle` | Very subtle fill |
| `bg-fill-muted` | Muted background |
| `bg-fill-active` | Active/selected fill |
| `bg-fill-disabled` | Disabled state |
| `bg-fill-selected-range` | Date range selection |
| `bg-fill-onsurface-ui-{1,2,3,4}` | On-surface UI elements |

### Surface (Page/Card backgrounds) — `surface-*`

| Tailwind Class | Light Value | Dark Value |
|---------------|-------------|------------|
| `bg-surface-bg-primary` | mist-50 | slate-800 |
| `bg-surface-bg-secondary` | mist-400 | slate-700 |
| `bg-surface-bg-tertiary` | mist-500 | slate-500 |
| `bg-surface-bg-base` | mist-100 | slate-900 |
| `bg-surface-primary` | mist-50 | slate-800 |
| `bg-surface-secondary` | mist-400 | slate-700 |
| `bg-surface-tertiary` | mist-500 | slate-500 |

### Status — `status-*`

| Tailwind Class | Light | Dark |
|---------------|-------|------|
| `text-status-success` / `bg-status-success` | green-600 | green-400 |
| `text-status-error` / `bg-status-error` | red-600 | red-400 |
| `text-status-warning` / `bg-status-warning` | amber-600 | amber-400 |
| `text-status-information` / `bg-status-information` | cyan-600 | cyan-400 |

### State Layers — `stateslayer-*`

| Tailwind Class | Purpose |
|---------------|---------|
| `bg-stateslayer-overlay-enabled` | Resting / enabled (transparent layer) |
| `bg-stateslayer-overlay-hover` | Hover overlay |
| `bg-stateslayer-overlay-pressed` | Active/pressed overlay |
| `bg-stateslayer-overlay-disabled` | Disabled overlay |
| `bg-stateslayer-overlay-active` | Active state fill |
| `bg-stateslayer-overlay-enabled-inverse` | Enabled on dark backgrounds |
| `bg-stateslayer-overlay-hover-inverse` | Hover on dark backgrounds |
| `bg-stateslayer-overlay-pressed-inverse` | Pressed on dark backgrounds |
| `bg-stateslayer-overlay-disabled-inverse` | Disabled on dark backgrounds |
| `bg-stateslayer-overlay-active-inverse` | Active on dark backgrounds |

---

## Elevation Shadows

| Class | Box Shadow |
|-------|-----------|
| `shadow-elevation-0` | `0 1px 1px shade-t, 0 0 1px shade` |
| `shadow-elevation-1` | `0 2px 4px 1px shade-t-01, 0 1px 4px shade-01` |
| `shadow-elevation-2` | `0 4px 8px shade-t-02, 0 2px 4px -1px shade-02` |
| `shadow-elevation-3` | `0 8px 12px 1px shade-t-03, 0 4px 8px -1px shade-03` |
| `shadow-elevation-4` | `0 16px 32px 2px shade-t-04, 0 8px 16px -2px shade-04` |

---

## Radius Tokens

| Token | Sharp (default) | Rounded (`.radius-mode`) | Tailwind |
|-------|----------------|--------------------------|----------|
| `--rad-round` | 1000px | 1000px | `rounded-round` |
| `--rad-reg` | 0px | 8px | `rounded-reg` |
| `--rad-sm` | 0px | 4px | `rounded-sm` |
| `--rad-md` | 0px | 12px | `rounded-md` |
| `--rad-lg` | 0px | 16px | `rounded-lg` |

`--rad-round` is mode-invariant — fully-rounded "pill" radius regardless of theme. Use for circular avatars, status dots, pill-shaped badges.

---

## Typography Utility Classes

### Display

| Class | Size | Weight | Tracking |
|-------|------|--------|----------|
| `display-d1-regular` | 56px/60px | Light | -0.28px |
| `display-d2-regular` | 48px/56px | Light | -0.96px |
| `display-d3-regular` | 40px/48px | Light | -0.8px |

### Headings

| Class | Size | Weight | Tracking |
|-------|------|--------|----------|
| `headings-h1-regular` | 32px/40px | Normal | -0.128px |
| `headings-h2-semibold` | 24px/32px | Semibold | -0.096px |
| `headings-h2-regular` | 24px/32px | Normal | -0.096px |
| `headings-h3-regular` | 20px/28px | Normal | 0 |
| `headings-h3-semibold` | 20px/28px | Semibold | 0 |
| `headings-h4-regular` | 16px/24px | Normal | -0.016px |
| `headings-h4-semibold` | 16px/24px | Semibold | -0.016px |

### Paragraph

| Class | Size | Weight |
|-------|------|--------|
| `paragraph-large-primary` | 16px/24px | Normal |
| `paragraph-large-primary-link` | 16px/24px | Normal + underline |
| `paragraph-large-emphasised` | 16px/24px | Semibold |
| `paragraph-medium-primary` | 14px/20px | Normal |
| `paragraph-medium-primary-link` | 14px/20px | Normal + underline |
| `paragraph-medium-emphasised-600` | 14px/20px | Semibold |
| `paragraph-small-primary` | 12px/16px | Normal |
| `paragraph-small-primary-link` | 12px/16px | Normal + underline |
| `paragraph-small-emphasised` | 12px/16px | Semibold |
| `paragraph-code-text` | 12px/16px | Mono, Normal |

### Labels

| Class | Size |
|-------|------|
| `label-large-primary` | 16px/24px |
| `label-medium-primary` | 14px/20px |
| `label-small-primary` | 12px/16px |

### CTA / Button Text

| Class | Size | Weight |
|-------|------|--------|
| `cta-button-01` | 16px/24px | Semibold |
| `cta-button-link-01` | 16px/24px | Semibold + underline |
| `cta-button-02` | 14px/20px | Semibold |
| `cta-button-link-02` | 14px/20px | Semibold + underline |
| `cta-button-03` | 12px/16px | Semibold |
| `cta-button-link-03` | 12px/16px | Semibold + underline |

### Icon Utility Classes

| Class | Description |
|-------|-------------|
| `.icon` | Static icon at 60% opacity of `fill-active` |
| `.icon-interactive` | Hover: 88% opacity, disabled: 30% opacity, with transition |

---

## Fonts

| Token | Value |
|-------|-------|
| `--font-display` | Inter |
| `--font-headings` | Inter |
| `--font-paragraph` | Inter |
| `--font-code-text` | Roboto Mono |
| `--font-sans` | Inter, sans-serif |

---

## Figma DS-Primitives (raw values, no Tailwind utilities)

These tokens mirror the `Spacing`, `Stroke-Weight`, and `Paragraph-Spacing`
families in the Figma `DS-Primitives` collection. They are intentionally NOT
exposed as Tailwind utilities (e.g. there is no `p-ds-spacing-16` utility) so
that they don't override Tailwind's default `p-*` / `border-*` scales. Use
them via raw `var(--ds-*)` references when you need the exact Figma value:

```css
/* Example: a custom CSS rule mirroring a Figma spec exactly */
.my-card {
  padding: var(--ds-spacing-16);
  border-bottom: var(--ds-stroke-1) solid var(--color-stroke-divider);
}
```

### Spacing — `--ds-spacing-{n}`

| Token | Value | Token | Value |
|---|---:|---|---:|
| `--ds-spacing-1` | 1px | `--ds-spacing-32` | 32px |
| `--ds-spacing-2` | 2px | `--ds-spacing-36` | 36px |
| `--ds-spacing-4` | 4px | `--ds-spacing-40` | 40px |
| `--ds-spacing-8` | 8px | `--ds-spacing-48` | 48px |
| `--ds-spacing-12` | 12px | `--ds-spacing-52` | 52px |
| `--ds-spacing-16` | 16px | `--ds-spacing-56` | 56px |
| `--ds-spacing-20` | 20px | `--ds-spacing-60` | 60px |
| `--ds-spacing-24` | 24px | `--ds-spacing-64` | 64px |
| `--ds-spacing-28` | 28px | `--ds-spacing-72` | 72px |
| | | `--ds-spacing-80` | 80px |
| | | `--ds-spacing-96` | 96px |
| | | `--ds-spacing-infinite` | 9999px |

> Prefer Tailwind's spacing utilities (`p-2`, `gap-4`, etc.) for layout. Reach
> for `--ds-spacing-*` only when you need a value Tailwind can't express
> cleanly, or when matching a designer's explicit Figma spec.

### Stroke widths — `--ds-stroke-{n}`

| Token | Value |
|-------|------:|
| `--ds-stroke-05` | 0.5px |
| `--ds-stroke-1` | 1px |
| `--ds-stroke-2` | 2px |
| `--ds-stroke-4` | 4px |
| `--ds-stroke-8` | 8px |
| `--ds-stroke-12` | 12px |
| `--ds-stroke-16` | 16px |

### Paragraph spacing — `--ds-paragraph-spacing-{n}`

| Token | Value |
|-------|------:|
| `--ds-paragraph-spacing-8` | 8px |
| `--ds-paragraph-spacing-12` | 12px |
| `--ds-paragraph-spacing-16` | 16px |
| `--ds-paragraph-spacing-20` | 20px |

Use as `margin-bottom` between paragraphs in long-form content.

---

## Notes on parity with the Figma file

`globals.css` and the Figma `QBDS_(v2.0.0)` library are kept fully aligned —
every semantic token (Text/Information, Status/Information-Inverse, surfaces,
state layers, etc.) matches Figma, including the `sky-*` info family in dark
mode. If you spot a mismatch, treat the Figma file as the source of truth.

> **Removed:** the `tags-accent-*` namespace was a CSS-only invention with no
> Figma equivalent and zero component consumers. It has been deleted from
> `globals.css`. If a designer asks for a tag color, use the underlying Tailwind
> palette utilities (`bg-blue-50`, `text-red-600`, etc.) directly, or propose a
> new semantic token with designer sign-off.
