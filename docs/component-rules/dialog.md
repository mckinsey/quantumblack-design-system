---
component: "dialog"
display-name: "Dialog"
status: "stable"
last-updated: "2026-05-10"
registry-name: "dialog"
figma:
  file-key: "iuMWqCsIohoKAUB0tBS0xr"
  page: "❖ ⎯ Dialog"                # OPEN ISSUE: no dedicated Dialog page in QBDS v2.0.0 yet
  primary-node-id: "tbd"
code-connect:
  mapped: false
  file: "src/components/ui/dialog.figma.tsx"
related:
  - "button"
  - "form"
  - "sheet"
  - "alert-dialog"
---

# Dialog

> A modal surface that interrupts the main flow. Use it when the user must finish or dismiss a discrete task before continuing.

## Purpose

`Dialog` is QBDS's modal primitive, built on Radix UI's accessible Dialog. It traps focus, restores it on close, renders into a portal, dims the page with an overlay, and exposes a compositional API (`Trigger`, `Content`, `Header`, `Title`, `Description`, `Footer`, `Close`). It is the right surface for short, focused interactions — confirmations, single-form submissions, detail edits — when the user must commit or cancel before doing anything else.

## When to use

- The user is committing to a discrete action (`Delete invoice?`, `Invite teammate`).
- A form's complexity is small enough to fit on one screen and finishing it is mandatory.
- The user is editing a single record where context outside the dialog is useful (preview behind the overlay).

## When not to use

- Multi-step wizards or long forms → use a full page or a `Sheet` (slide-over) so users can defer.
- Destructive irreversible actions where the user needs a stronger interrupt → use `AlertDialog` (when added to QBDS) or a confirmation pattern with explicit consequence text.
- Non-blocking notifications → use `Toast` or `Snackbar`.
- Nested dialogs → never. If a sub-task requires interruption, replace the current `Dialog`; do not stack.

## Anatomy

| Sub-component       | data-slot           | Required? | Notes                                                                                |
| ------------------- | ------------------- | --------- | ------------------------------------------------------------------------------------ |
| `Dialog`            | `dialog`            | yes       | Root state container. Wraps `DialogPrimitive.Root`.                                  |
| `DialogTrigger`     | `dialog-trigger`    | usually   | The control that opens the dialog. Use `asChild` to wrap a `<Button>`.               |
| `DialogPortal`      | `dialog-portal`     | implicit  | Rendered automatically by `DialogContent`. Do not include manually.                  |
| `DialogOverlay`     | `dialog-overlay`    | implicit  | Rendered automatically by `DialogContent`. Do not include manually.                  |
| `DialogContent`     | `dialog-content`    | yes       | The modal surface. Holds the layout (`bg-surface-bg-primary`, centered, `max-w-lg`). |
| `DialogHeader`      | `dialog-header`     | yes       | Vertical group containing `DialogTitle` + `DialogDescription`.                       |
| `DialogTitle`       | `dialog-title`      | yes       | Required for screen reader announcement. Radix throws a dev-only error if missing.   |
| `DialogDescription` | `dialog-description`| yes       | Required for screen reader announcement. Pair with `DialogTitle`.                    |
| `DialogFooter`      | `dialog-footer`     | usually   | Action buttons. Stacks on mobile (`flex-col-reverse`), inlines on `sm:` breakpoint.  |
| `DialogClose`       | `dialog-close`      | usually   | Programmatic close trigger. Use `asChild` for the cancel button.                     |

The built-in close affordance (the `X` in the top-right) is rendered by `DialogContent` when `showCloseButton={true}` (the default). Set it to `false` only when you also provide an explicit `Close` action in the body.

## API surface

Sub-components forward all props to the underlying Radix primitive. The only QBDS-added prop is on `DialogContent`:

| Component       | Prop              | Type      | Default | Notes                                                                                |
| --------------- | ----------------- | --------- | ------- | ------------------------------------------------------------------------------------ |
| `DialogContent` | `showCloseButton` | `boolean` | `true`  | Renders the top-right `X` icon + `sr-only` "Close" label. Disable only if you supply an alternative dismiss control. |

For Radix-supplied props (controlled `open`, `onOpenChange`, `modal`, `defaultOpen`), follow [the Radix Dialog docs](https://www.radix-ui.com/primitives/docs/components/dialog). The most important ones:

- `open` / `onOpenChange` — for controlled state (necessary if dismiss should be confirmed first).
- `modal={false}` — disables focus trap and overlay click-to-close. Almost never the right choice for QBDS surfaces.

## Hard rules

1. **Always render `DialogTitle` and `DialogDescription`.** Both are required for accessible naming and description. Radix dev mode warns when missing; production silently fails AT users. Why: WCAG 4.1.2 (Name, Role, Value).
2. **Use `DialogTrigger` with `asChild` to wrap a `<Button>`.** Do not put `onClick` on a Button to flip controlled state if Radix's uncontrolled state is enough. Why: keeps focus return logic intact and avoids double-state.
3. **Never nest a `Dialog` inside another `Dialog`.** Replace the current dialog instead. Why: focus trap stacks become ambiguous, and Radix does not document a guarantee for nested dialogs.
4. **Submit-style buttons in `DialogFooter` must be `type="submit"` and reference the form by `form="..."`.** The body's form must have `id="..."` matching. Why: the dialog's footer is outside the form element by convention; the `form=` attribute reconnects them.
5. **`DialogContent` must remain centered and max `sm:max-w-lg`.** Do not override `max-width` for "more breathing room" — that is a sign the content belongs in a page or `Sheet`, not a dialog.
6. **Do not put a scroll container inside `DialogContent` without explicit overflow handling.** Long content should either move to a `Sheet`, or `DialogContent` should be allowed to grow with `max-h` + an inner scroll region. Avoid sticky headers/footers inside the dialog.
7. **Always provide an explicit cancel/dismiss path.** Either keep `showCloseButton`, or include a `Cancel` button in `DialogFooter` via `<DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>`.
8. **The destructive action's button must use the destructive variant.** Until QBDS ships a destructive variant, use `default` and prepend an explicit consequence sentence in `DialogDescription` ("This will permanently delete 17 records.").

## Soft rules

- Keep `DialogTitle` to one line — about 6 words.
- Keep `DialogDescription` to one short sentence; if you need more, the action probably belongs on a full page.
- Footer order, LTR: `Cancel` (left, `secondary`), primary action (right, `default` or `accent`).
- Avoid putting more than two actions in `DialogFooter`. A third action is usually a sign of feature creep.
- Do not animate content into the dialog — Radix already animates the overlay and content. Extra animation feels jittery.

## Composition patterns

### Pattern: Confirm a destructive action

The most common Dialog use case. Note the explicit consequence sentence in the description.

```tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

<Dialog>
  <DialogTrigger asChild>
    <Button variant="ghost">Delete invoice</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete invoice INV-7821?</DialogTitle>
      <DialogDescription>
        This permanently removes the invoice and its line items. This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <Button onClick={onConfirmDelete}>Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### Pattern: Form submission

Form lives inside `DialogContent`; submit button lives in `DialogFooter` and binds via `form="..."`.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Invite teammate</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Invite a teammate</DialogTitle>
      <DialogDescription>They will receive an email with a join link.</DialogDescription>
    </DialogHeader>
    <Form {...form}>
      <form id="invite-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* FormField items */}
      </form>
    </Form>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <Button type="submit" form="invite-form">Send invite</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### Pattern: Controlled open with a custom dismiss guard

When closing requires a confirmation (e.g. unsaved changes).

```tsx
const [open, setOpen] = React.useState(false);

const handleOpenChange = (next: boolean) => {
  if (!next && form.formState.isDirty) {
    if (!window.confirm('Discard unsaved changes?')) return;
  }
  setOpen(next);
};

<Dialog open={open} onOpenChange={handleOpenChange}>
  {/* ... */}
</Dialog>;
```

## Accessibility contract

- **Keyboard**: `ESC` closes (overrideable via `onOpenChange`). `Tab` cycles focus inside the dialog only. The first focusable element receives focus on open; focus returns to the trigger on close (Radix default).
- **ARIA**: Radix sets `role="dialog"`, `aria-modal="true"`, `aria-labelledby={title-id}`, `aria-describedby={description-id}` automatically. The `DialogTitle` and `DialogDescription` IDs are wired via Radix context — you do not set them manually.
- **Focus**: a focus trap is active while the dialog is open. The overlay click and `ESC` both dismiss unless `onOpenChange` returns false.
- **Contrast**: `bg-surface-bg-primary` against the `bg-black/50` overlay exceeds AA in both modes. Title (`text-fg-primary`) over surface exceeds AAA.
- **Screen reader**: the announcement is "{Title}. {Description}. Dialog." in this order. Avoid putting essential consequence text in the body — it will be skipped by AT users on first focus.
- **Reduced motion**: the fade/zoom animations are CSS-driven (`data-[state=open]:animate-in`) and respect `prefers-reduced-motion` via Tailwind's `motion-safe`/`motion-reduce` utilities. Add `motion-reduce:animate-none` on `DialogContent` if you observe issues.

## Tokens used

| Role                | Token                                                 |
| ------------------- | ----------------------------------------------------- |
| Surface             | `--color-surface-bg-primary` (DialogContent fill)     |
| Foreground (title)  | `--color-fg-primary` (via DialogHeader)               |
| Foreground (close)  | `--color-fg-secondary`                                |
| Overlay             | `bg-black/50` (Tailwind utility — not a QBDS token)   |
| Border              | default `border` (1px) — currently relies on the user-agent default border-color |
| Shadow              | `shadow-lg` (Tailwind utility — not yet bound to a QBDS effect style) |

**Open issues**:

- The overlay (`bg-black/50`) and shadow (`shadow-lg`) are Tailwind defaults, not QBDS tokens. When QBDS exposes `--color-overlay-scrim` and a QBDS effect style for elevation, swap them in.
- The default `border` on `DialogContent` has no explicit color binding — it falls back to Tailwind's default border color. Should bind to `--color-stroke-tertiary` or similar.

## Code Connect

- **Status**: `not-mapped`.
- **File** (planned): `src/components/ui/dialog.figma.tsx`.
- **Figma node**: not yet known. There is no `❖ ⎯ Dialog` page in QBDS v2.0.0 (verified against the page list).
- **Mapping notes**:
  - **Open issue**: dialog needs a Figma component set before Code Connect can be authored. The likely approach is one component set with variants for `header`, `description`, `footer-actions`, and `closable` axes.
  - When the Figma component is shipped, expect `figma.connect` blocks per major composition (confirmation vs. form).
  - Compound components (`DialogTitle`, `DialogDescription` etc.) generally do not get individual Code Connect blocks — only the parent does.

## Anti-patterns

### BAD: missing accessible name

```tsx
<DialogContent>
  <p>Are you sure?</p>
  <Button>Delete</Button>
</DialogContent>
```

Reason: no `DialogTitle`, no `DialogDescription`. Radix warns in dev; AT users get a dialog announcement with no context.

### GOOD: explicit Title + Description

```tsx
<DialogContent>
  <DialogHeader>
    <DialogTitle>Delete this row?</DialogTitle>
    <DialogDescription>This action cannot be undone.</DialogDescription>
  </DialogHeader>
  {/* ... */}
</DialogContent>
```

### BAD: nested dialog

```tsx
<Dialog>
  <DialogContent>
    <Dialog>
      <DialogContent>...</DialogContent>
    </Dialog>
  </DialogContent>
</Dialog>
```

Reason: focus trap and ARIA modal stacking is undefined. Replace the parent dialog content instead.

### BAD: footer button outside the form's reach

```tsx
<DialogContent>
  <form onSubmit={onSubmit}>
    <Input name="email" />
  </form>
  <DialogFooter>
    <Button type="submit">Save</Button> {/* this is NOT inside the form */}
  </DialogFooter>
</DialogContent>
```

Reason: the submit button isn't a descendant of the form, so clicking it does nothing.

### GOOD: link the button to the form by id

```tsx
<form id="invite-form" onSubmit={onSubmit}>
  <Input name="email" />
</form>
<DialogFooter>
  <Button type="submit" form="invite-form">Save</Button>
</DialogFooter>
```

### BAD: oversized dialog

```tsx
<DialogContent className="max-w-4xl">{/* multi-step form */}</DialogContent>
```

Reason: a multi-step form belongs on a page or in a `Sheet`, not in a dialog. Increasing `max-w` masks the design problem.

## Migration notes

None. Dialog has been API-stable since shadcn integration.

## Related components

- `Button` — `DialogTrigger asChild` and `DialogClose asChild` always wrap a Button.
- `Form` — the body of a Dialog form. Always set `id` on the form so the footer's submit button can reference it.
- `Sheet` (slide-over panel) — for longer interactions or wizards.
- `AlertDialog` (planned) — when QBDS ships it, use it for destructive irreversible actions.
- `Toast` / `Snackbar` — for non-blocking notifications.
