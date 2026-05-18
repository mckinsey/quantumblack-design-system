---
component: "form"
display-name: "Form"
status: "stable"
last-updated: "2026-05-10"
registry-name: "form"
figma:
  file-key: "iuMWqCsIohoKAUB0tBS0xr"
  page: "❖ ⎯ Form"
  primary-node-id: "40809:80577"
code-connect:
  mapped: false
  file: "n/a"     # Form has no visual representation; Code Connect does not apply
related:
  - "input"
  - "label"
  - "button"
  - "dialog"
  - "form-elements"
---

# Form

> The contract that ties react-hook-form, QBDS field primitives, and accessible labelling into one composable shape. Every QBDS form on every page goes through this.

## Purpose

`Form` is QBDS's form orchestration layer. It is a thin wrapper over `react-hook-form`'s `FormProvider`, plus four context-aware sub-components (`FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`) and a typed `FormField` controller. Together they wire a single field's `id`, `aria-describedby`, `aria-invalid`, error state, and label association — automatically. Consumers write field code without thinking about IDs or ARIA strings.

Validation is **not** included; pair `Form` with a schema validator (recommended: `zod` + `@hookform/resolvers/zod`) supplied at the call site.

## When to use

- Any user-editable form longer than one field. Below that, a single `<input>` with a label is fine.
- Any form that needs validation feedback bound to a field (the `aria-describedby` chain is the whole point).
- Forms inside `Dialog`, `Sheet`, or full pages — the API is identical regardless of host.

## When not to use

- Read-only display of values → use `<dl>` / `Card` / a definition list, not a Form.
- One-shot inputs where validation is trivial and there's no submit step (e.g. a search box) → a controlled `<Input>` is enough.
- File uploads as the only field → use a dedicated upload component; Form's API doesn't help here.

## Anatomy

`Form` is a compound component built around two React contexts (`FormFieldContext`, `FormItemContext`) plus the hook `useFormField()` that ties them together.

| Sub-component       | data-slot          | Required? | Notes                                                                                                  |
| ------------------- | ------------------ | --------- | ------------------------------------------------------------------------------------------------------ |
| `Form`              | (none — provider)  | yes       | Re-export of `FormProvider` from react-hook-form. Spread the `useForm()` return into it.                |
| `FormField`         | (none — controller)| yes       | Typed wrapper over RHF's `Controller`. Sets `FormFieldContext.name` so descendants know their field.    |
| `FormItem`          | `form-item`        | yes       | Layout container for a single field. Generates the field's `id` via `React.useId()`.                    |
| `FormLabel`         | `form-label`       | usually   | Wraps `<Label>`; sets `htmlFor` to the auto-generated `formItemId`. Toggles error styling via `data-error`. |
| `FormControl`       | `form-control`     | yes       | Radix `Slot` that injects `id`, `aria-describedby`, and `aria-invalid` into its single child.           |
| `FormDescription`   | `form-description` | optional  | Hint text. Receives `id={formDescriptionId}` so it joins the `aria-describedby` chain.                  |
| `FormMessage`       | `form-message`     | yes¹     | Renders the error string for the field. Returns `null` when there is no error and no fallback child.    |

¹ `FormMessage` is required *if* the field validates; if the field cannot fail, you may omit it.

`useFormField()` exposes `{ id, name, formItemId, formDescriptionId, formMessageId, error, ...fieldState }` — useful only for advanced compositions (e.g. building a custom `FormControl` for a non-input control).

## API surface

`Form` itself takes no QBDS-specific props — it is `FormProvider` and forwards every RHF prop. The interesting surface lives in `FormField`'s `ControllerProps` (from react-hook-form):

| Prop          | Type                                                    | Notes                                                                  |
| ------------- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| `name`        | `FieldPath<TFieldValues>`                               | Path into the form's value shape. Typed against your `useForm` schema. |
| `control`     | `Control<TFieldValues>`                                 | From `useForm()`. Optional if `FormProvider` is in scope.              |
| `defaultValue`| `TFieldValues[name]`                                    | Initial value for the field.                                           |
| `rules`       | `RegisterOptions`                                       | Avoid — prefer schema-based validation (zod) at `useForm` time.        |
| `render`      | `({ field, fieldState, formState }) => ReactElement`     | Required. Render the field UI here.                                    |

`FormField` uses `Controller`, so a field's value flows via `field.value`, `field.onChange`, `field.onBlur`, `field.ref`. Spread these into the input.

## Hard rules

1. **Wrap the whole form in `<Form {...form}>` where `form = useForm({...})`.** The provider is what makes `useFormField()` work. Why: every sub-component depends on `FormProvider`'s context.
2. **Every field is `<FormField name="..." render={...}>`, not a raw `<input>`.** Why: `Controller` registers the field with RHF, manages its lifecycle, and exposes `field.onChange` for non-native inputs (Combobox, Calendar, etc.).
3. **Inside `render`, the structure is exactly: `FormItem > FormLabel + FormControl + FormDescription? + FormMessage`.** In that order. Why: `FormControl` slots its props into the immediate child, so the wrapping element of the input must be `FormControl`. The order matters for screen reader announcement (label first, then field, then description, then error).
4. **`FormControl` must wrap the actual input element.** It is a Radix `Slot`; it injects `id`, `aria-describedby`, `aria-invalid` into its single child. If you wrap a `<div>` around the input inside `FormControl`, the IDs land on the wrong node.
5. **Use `FormMessage` for errors — never render `fieldState.error.message` manually.** Why: `FormMessage` already wires `id={formMessageId}`, which `FormControl` includes in `aria-describedby` only when there's an error. Manual rendering breaks the AT chain.
6. **Validation lives on `useForm`, not on `<input required>`.** Pair with a `zodResolver`. Why: HTML validation cannot be styled consistently and bypasses RHF's error state.
7. **Never set `id` manually on a Form input.** `FormItem` generates a stable id via `React.useId()` and `FormControl` propagates it. Setting `id` yourself collides with the generated one.
8. **Submit via `form.handleSubmit(onSubmit)` on the `<form>` element, not via a button click handler.** Why: `handleSubmit` runs validation and only invokes `onSubmit` on success. Bypassing it skips validation.

## Soft rules

- Place `FormDescription` between the label and the input only when the hint clarifies *what* the input expects. Place it after the input when the hint clarifies *how* the input is used.
- Keep field labels short (1–3 words). Use `FormDescription` for the long version.
- Group related fields visually with a heading + a `flex flex-col gap-4` wrapper, not a `<fieldset>` with default browser styling — but do use `<fieldset>` + `<legend>` if you need true semantic grouping for AT.
- Show inline `FormMessage` errors only after the user has interacted (`onBlur` or after first submit). RHF's `mode: 'onBlur'` or `'onTouched'` does this for you.

## Composition patterns

### Pattern: Single-field form (with zod)

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  email: z.string().email('Enter a valid email.'),
});

type Values = z.infer<typeof schema>;

export function InviteForm({ onSubmit }: { onSubmit: (v: Values) => void }) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormDescription>We will send a join link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send invite</Button>
      </form>
    </Form>
  );
}
```

### Pattern: Form inside a Dialog

The form lives inside `DialogContent`; the submit button lives in `DialogFooter` and references the form by id (see also `dialog.md`).

```tsx
<DialogContent>
  <DialogHeader>
    <DialogTitle>Invite a teammate</DialogTitle>
    <DialogDescription>They will receive an email with a join link.</DialogDescription>
  </DialogHeader>
  <Form {...form}>
    <form id="invite-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormField {/* ... */} />
    </form>
  </Form>
  <DialogFooter>
    <DialogClose asChild>
      <Button variant="secondary">Cancel</Button>
    </DialogClose>
    <Button type="submit" form="invite-form">Send invite</Button>
  </DialogFooter>
</DialogContent>;
```

### Pattern: Custom non-input control (Combobox)

`FormControl` works with any single child that accepts `id`, `aria-describedby`, `aria-invalid`. For QBDS components like `Combobox` or `Calendar`, hand `field.value` and `field.onChange` through.

```tsx
<FormField
  control={form.control}
  name="vendor"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Vendor</FormLabel>
      <FormControl>
        <Combobox
          options={vendors}
          value={field.value}
          onValueChange={field.onChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>;
```

### Pattern: Dependent fields

Use `form.watch(...)` outside the field render, or `useWatch({ control, name })` inside.

```tsx
const region = form.watch('region');

<FormField
  control={form.control}
  name="state"
  render={({ field }) => (
    <FormItem>
      <FormLabel>State</FormLabel>
      <FormControl>
        <Select disabled={!region} {/* ... */} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>;
```

## Accessibility contract

- **Label association**: `FormLabel` sets `htmlFor={formItemId}`. `FormControl` sets `id={formItemId}` on the input. The two are linked; clicking the label focuses the input.
- **`aria-describedby`**: `FormControl` sets `aria-describedby` to `${formDescriptionId}` when there is no error, or `${formDescriptionId} ${formMessageId}` when there is. The chain is rebuilt on every render based on `error` from `useFormField()`.
- **`aria-invalid`**: `FormControl` sets `aria-invalid={!!error}` so AT can announce the field state.
- **Error styling**: `FormLabel` toggles `data-error="true"` when the field has an error, switching its color to `--color-status-error`. `FormMessage` always uses `--color-status-error` for the error text.
- **Focus management**: RHF does not move focus on validation by default. To focus the first invalid field on submit, pass `shouldFocusError: true` (the default) when calling `useForm`.
- **Live announcements**: error messages are statically rendered; they are not in an `aria-live` region. AT users hear them when they Tab back into the field. If you need immediate announcement, wrap the form in `<div role="status" aria-live="polite">` (rare — discuss with design first).

## Tokens used

| Role                  | Token                                                          |
| --------------------- | -------------------------------------------------------------- |
| Label foreground      | `--color-fg-secondary`                                         |
| Label foreground (error) | `--color-status-error`                                       |
| Description foreground| `--color-fg-secondary`                                         |
| Message foreground    | `--color-status-error`                                         |

Form-level surface, borders, and field backgrounds live on the input components themselves (`Input`, `Select`, etc.); see those cards for their token usage.

## Code Connect

- **Status**: `n/a`. `Form` has no visual representation in Figma — it is a logical wrapper. Code Connect targets visual components.
- **Field-level mapping**: each individual input (`Input`, `Select`, `Combobox`, `Checkbox`, `Calendar`, `DatePicker`, etc.) gets its own `*.figma.tsx`. Those mappings stand alone and do not need to know about `Form`.
- **Composition guidance**: when an LLM generates a Figma form layout, it should produce real `Input` / `Select` / `Combobox` instances bound to QBDS variables; the surrounding `<Form>` wrapper is a code-only concern.

## Anti-patterns

### BAD: raw input with manual id

```tsx
<form onSubmit={form.handleSubmit(onSubmit)}>
  <label htmlFor="email">Email</label>
  <input id="email" {...form.register('email')} aria-invalid={!!form.formState.errors.email} />
  {form.formState.errors.email && <p>{form.formState.errors.email.message}</p>}
</form>
```

Reason: rebuilds everything `FormItem` / `FormControl` / `FormMessage` already do; misses `aria-describedby`; will drift across consumers.

### GOOD: idiomatic FormField

```tsx
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input type="email" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>;
```

### BAD: wrapping FormControl around a non-input

```tsx
<FormControl>
  <div>
    <Input {...field} />
  </div>
</FormControl>
```

Reason: `FormControl` is a Radix `Slot`; it injects `id` / `aria-describedby` into its single child. The `<div>` swallows them and the underlying `<input>` ends up unlabelled and unreachable from the description chain.

### GOOD: input is the direct child of FormControl

```tsx
<FormControl>
  <Input {...field} />
</FormControl>
```

### BAD: rendering errors manually

```tsx
{form.formState.errors.email && (
  <span className="text-red-500">{form.formState.errors.email.message}</span>
)}
```

Reason: hardcodes a colour, breaks the `aria-describedby` chain, and re-implements `FormMessage` poorly.

### GOOD: FormMessage handles it

```tsx
<FormMessage />
```

### BAD: submit via onClick

```tsx
<Button onClick={() => onSubmit(form.getValues())}>Save</Button>
```

Reason: bypasses `form.handleSubmit`, skipping validation. Invalid data reaches the handler.

### GOOD: type="submit" on a button inside the form

```tsx
<Button type="submit">Save</Button>
```

(Or `<Button type="submit" form="form-id">` if the button lives outside the `<form>` element, e.g. in a Dialog footer.)

## Migration notes

None. The Form API is stable since shadcn integration. The internal sub-component file structure (single `form.tsx` exporting all sub-components) matches the upstream convention.

## Related components

- `Input` / `Textarea` / `Select` / `Checkbox` / `RadioGroup` / `Switch` / `Combobox` / `Calendar` / `DatePicker` / `Slider` — the controls that go inside `FormControl`. Each has its own rules card.
- `Label` — used internally by `FormLabel`. Reach for it directly only when you have a label *outside* a Form (rare).
- `Button` — every form needs at least a submit button; see `button.md` for the `type="submit"` rules.
- `Dialog` — the most common host for a Form. See `dialog.md` for the `form` attribute pattern.
- `FormElements` (registry composition recipe) — when QBDS ships pre-composed field templates (e.g. `EmailField`, `PasswordField`), they will live there, not in `form.tsx`.
