---
component: "button"
display-name: "Button"
status: "stable"
last-updated: "2026-05-10"
registry-name: "button"
figma:
  file-key: "iuMWqCsIohoKAUB0tBS0xr"
  page: "❖ ⎯ Buttons"
  primary-node-id: "2175:28524"
code-connect:
  mapped: false
  file: "src/components/ui/button.figma.tsx"
related:
  - "buttons-group"
  - "icon-shell"
  - "tooltip"
---

# Button

> The single-action affordance. Anything the user can click that does one thing — submitting, opening, dismissing, navigating — is a `Button`.

## Purpose

`Button` is the primary call-to-action primitive in QBDS. It enforces consistent sizing, focus rings, disabled treatment, hover/pressed state-layers, and inverted text contrast across light and dark modes. All other interactive primitives (link, segmented control, icon button) either compose `Button` or follow its hard rules.

## When to use

- Submitting a form (`type="submit"` inside `<Form>`).
- Triggering an action: `Save`, `Delete`, `Apply filter`, `Add row`.
- Opening overlays: `Dialog`, `Sheet`, `Popover`, `DropdownMenu` (always via the overlay's own `Trigger` slot, not a bare `<Button onClick>`).
- Navigating between routes — but only when paired with `asChild` to render an `<a>` underneath.

## When not to use

- Plain text links inline in body copy → use a real `<a>` styled as a link, not a `ghost` Button.
- Toggle on/off → use `Switch` (binary) or `Toggle` (segmented), not two-state Buttons.
- Pure decorative containers → never put `<Button>` around non-clickable content; if it does nothing on `onClick`, it is not a Button.
- Submitting AND navigating at once → split into two Buttons or a `DropdownMenu`.

## Anatomy

`Button` is a single primitive with two notable internals:

- The element itself (`<button>` by default, or any tag if `asChild` is true).
- An automatic text wrapper (`wrapTextNodes`) that wraps every string/number child in a `<span>`. This guarantees that hover/focus underlines apply to text only, never to icons or other inline children.

`data-slot="button"` is set on the root for selector-based theming and Code Connect identity.

## API surface

Source of truth: `public/api/button.json`.

| Prop       | Type                                                                                                                | Default     | Notes                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------- |
| `variant`  | `"default" \| "accent" \| "secondary" \| "outline" \| "ghost"`                                                       | `"default"` | Visual treatment. `default` is the high-emphasis dark-on-light primary action.         |
| `size`     | `"xxs" \| "xs" \| "sm" \| "default" \| "lg" \| "icon-xs" \| "icon-sm" \| "icon" \| "icon-lg"`                        | `"default"` | Text sizes use `cta-button-01..03`. Icon sizes are square (no padding) for `IconShell`. |
| `asChild`  | `boolean`                                                                                                            | `false`     | Render as the immediate child via Radix `Slot`. Use for link buttons.                  |
| `disabled` | `boolean`                                                                                                            | `false`     | Standard HTML; combined with `disabled:` Tailwind classes for the disabled state layer. |
| `type`     | `"button" \| "submit" \| "reset"`                                                                                    | `"button"`  | Native HTML. Always set explicitly inside forms — never rely on the browser default.    |

The component also accepts every native `<button>` prop (`onClick`, `aria-*`, `name`, `value`, `form`, etc.) via `React.ComponentProps<'button'>`.

### Variant matrix (what each combo means)

- `default` — primary action; `bg-fill-primary` / `text-fg-primary-inverse`. Used for the dominant action in a dialog footer, form submit, or toolbar.
- `accent` — brand-accented primary; `bg-brand-accents-qb-accent`. Reserved for marquee CTAs and brand surfaces. Do not use as a generic alternative to `default`.
- `secondary` — companion to `default`; `bg-fill-muted` / `text-fg-primary`. Use for secondary actions like `Cancel` next to `Save`.
- `outline` — bordered, low-emphasis; `border-stroke-secondary`. Use when surface needs a contour but the action is non-critical.
- `ghost` — transparent until hovered. Use inside dense surfaces (toolbars, table cells, menu items) where chrome would compete with content.

## Hard rules

1. **Always set `type` explicitly inside a `<form>`.** Default browser behaviour is `type="submit"`; an unmarked button inside a form will submit unintentionally. Why: prevents accidental submissions.
2. **Use `asChild` for navigation, never `onClick={() => router.push(...)}`.** Pair with `<a>` or your router's `<Link>`. Why: preserves middle-click, ctrl-click, right-click "open in new tab", and screen reader link semantics.
3. **Never compose `<Button>` inside `<Button>`.** Radix `Slot` will collide and the inner element will lose accessibility props. If you need nested actions, use a `DropdownMenu` or split actions.
4. **Use the `icon-*` sizes only with `IconShell` as the sole child.** Mixing text + icon at icon sizes breaks the square footprint and the focus ring offset.
5. **Disabled buttons must remain in the DOM, not be removed.** Removing a button on disable shifts focus unpredictably. Why: keeps tab order stable; lets screen readers announce the disabled state.
6. **Use semantic `aria-label` on `icon-*` buttons.** An icon without a visible label is meaningless to AT users. Why: WCAG 2.1 Success Criterion 4.1.2.
7. **Bind colors only via QBDS tokens — never hardcoded hex.** All Button classes resolve to `--color-*` semantic variables. Why: ensures dark-mode and brand-theme parity.
8. **Wrap action text in normal children, not in a nested `<span>`.** The component already injects a span via `wrapTextNodes` for the underline behaviour. Adding your own breaks the underline scoping.

## Soft rules

- Prefer text + icon over icon-only when space allows. Icon-only is harder for first-time users.
- Place the primary `Button` on the trailing side of footers and toolbars (right on LTR locales).
- Pair `default` with `secondary` in two-button layouts. Two `default` buttons confuse the eye.
- Use `lg` only for landing-page hero CTAs. Inside dense product UIs, `default` is correct.

## Composition patterns

### Pattern: Submit + Cancel in a Dialog footer

The default action and its escape hatch.

```tsx
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';

<DialogFooter>
  <DialogClose asChild>
    <Button variant="secondary">Cancel</Button>
  </DialogClose>
  <Button type="submit" form="invite-form">Send invite</Button>
</DialogFooter>;
```

### Pattern: Link button (navigation)

When the affordance looks like a button but is actually a link.

```tsx
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

<Button asChild variant="outline">
  <Link to="/billing">Manage billing</Link>
</Button>;
```

### Pattern: Icon-only button with tooltip

Icon-only must always carry an accessible name. Pair with `Tooltip` for sighted users.

```tsx
import { Button } from '@/components/ui/button';
import { IconShell } from '@/components/ui/icon-shell';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Trash2 } from 'lucide-react';

<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon" variant="ghost" aria-label="Delete row">
      <IconShell icon={Trash2} />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Delete row</TooltipContent>
</Tooltip>;
```

### Pattern: Loading state

While an async action is in flight, disable the button and swap the label. Avoid replacing the entire button — keep the same width to prevent layout shift.

```tsx
<Button type="submit" disabled={isSaving} aria-busy={isSaving}>
  {isSaving ? 'Saving…' : 'Save changes'}
</Button>;
```

## Accessibility contract

- **Keyboard**: `Enter` and `Space` activate. `Tab` moves focus. Disabled buttons are skipped by `Tab` (this is the browser default for `<button disabled>`).
- **ARIA**: native `<button>` is implicit role="button". Add `aria-label` for icon-only. Add `aria-pressed` only if the button is a toggle (rare — prefer `Toggle`).
- **Focus**: focus ring uses `--color-stroke-status-focus` with a `ring-offset` that swaps to the inverse stroke for `default`/`accent` so the ring stays visible on dark fills. Smaller sizes use `ring-1`, default/large use `ring-2`.
- **Contrast**: `default` text on `default` fill exceeds 7:1 AAA. `ghost` over `surface-bg-primary` exceeds 4.5:1 AA.
- **Screen reader**: visible text is the accessible name unless `aria-label` overrides it. Loading state should announce via `aria-busy="true"` on the button.

## Tokens used

| Role                              | Token                                                                  |
| --------------------------------- | ---------------------------------------------------------------------- |
| Foreground (text, default fill)   | `--color-fg-primary-inverse`                                           |
| Foreground (text, light fills)    | `--color-fg-primary`                                                   |
| Foreground (disabled)             | `--color-fg-disabled`                                                  |
| Fill (default)                    | `--color-fill-primary`                                                 |
| Fill (secondary)                  | `--color-fill-muted`                                                   |
| Fill (outline / ghost / disabled) | `--color-fill-muted-inverse`, `transparent`, `--color-fill-muted`      |
| Brand accent                      | `--color-brand-accents-qb-accent` + `--color-mist-50-opacity-88` (text) |
| Border (outline)                  | `--color-stroke-secondary`, focus -> `--color-stroke-active`           |
| Focus ring                        | `--color-stroke-status-focus`                                          |
| Hover state layer                 | `--color-stateslayer-overlay-hover`, `-hover-inverse`                  |
| Pressed state layer               | `--color-stateslayer-overlay-pressed`, `-pressed-inverse`              |
| Disabled state layer              | `--color-stateslayer-overlay-disabled`                                 |
| Active state layer (focus-visible)| `--color-stateslayer-overlay-active`, `-active-inverse`                |

State layers are applied via `background-image: linear-gradient(token, token)` so they composite over the existing fill. **The class names must appear literally in source** — Tailwind's JIT cannot see template-string interpolation. See the `hoverGradient`/`activeGradient` constants in `button.tsx`.

## Code Connect

- **Status**: `not-mapped`.
- **File** (planned): `src/components/ui/button.figma.tsx`.
- **Figma node**: <https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr?node-id=2175-28524>.
- **Mapping notes**:
  - Figma `size=` axis values map 1:1 to code `size` values when the names match. The Figma `reg` value (if present) maps to code `'default'`. Verify against the live `❖ ⎯ Buttons` page before authoring.
  - Figma `type=` (variant) is expected to align with code `variant`. Confirm: `default`, `accent`, `secondary`, `outline`, `ghost`.
  - Figma icon-only sets are typically separate component sets; expect 4 distinct `figma.connect` blocks (text + icon-leading + icon-trailing + icon-only).
  - `asChild` cannot be expressed in Figma. Always render the example as a plain `<Button>`; document the `asChild` route in the card, not in Code Connect.

## Anti-patterns

### BAD: hardcoded color

```tsx
<Button style={{ backgroundColor: '#0F62FE' }}>Save</Button>
```

Reason: bypasses the QBDS token system. Will not adapt to dark mode; will not pick up brand-theme overrides; cannot be audited by `figma_lint_design`.

### GOOD: variant-driven color

```tsx
<Button variant="accent">Save</Button>
```

Reason: every fill / text / state-layer routes through `--color-*` tokens, so dark mode and brand themes are automatic.

### BAD: Button-wrapped link missing `asChild`

```tsx
<Button onClick={() => navigate('/billing')}>Manage billing</Button>
```

Reason: breaks middle-click, right-click "Open in new tab", screen reader link semantics, and SSR-friendly prefetch.

### GOOD: link-as-button via `asChild`

```tsx
<Button asChild variant="outline">
  <Link to="/billing">Manage billing</Link>
</Button>
```

### BAD: icon-only without an accessible name

```tsx
<Button size="icon" variant="ghost">
  <IconShell icon={Trash2} />
</Button>
```

Reason: screen readers announce "button" with no name; fails WCAG 4.1.2.

### GOOD: icon-only with `aria-label`

```tsx
<Button size="icon" variant="ghost" aria-label="Delete row">
  <IconShell icon={Trash2} />
</Button>
```

### BAD: nested Buttons

```tsx
<Button asChild>
  <Button variant="ghost">Open</Button>
</Button>
```

Reason: `Slot` collides with the inner button's props; focus, disabled, and ARIA all break in subtle ways.

## Migration notes

None. Button has been API-stable since v1.

## Related components

- `ButtonsGroup` — segmented multi-button container (`❖ ⎯ Buttons Group` page in Figma).
- `IconShell` — the icon primitive used inside `icon-*` button sizes. Always pair them.
- `Tooltip` — required companion for icon-only Buttons.
- `DropdownMenu` — when a Button needs to expose multiple actions, prefer this over chaining Buttons.
