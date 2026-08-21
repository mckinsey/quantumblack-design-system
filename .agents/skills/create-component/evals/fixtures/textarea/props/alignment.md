# Figma alignment — Textarea-Input

Treat as `get_metadata` + component-set description. Do **not** call Figma MCP.

Shipped gold: `src/components/ui/textarea.tsx`.

## Axes

| Axis                | Figma values                                           | Default |
| ------------------- | ------------------------------------------------------ | ------- |
| size                | sm, reg, lg                                            | reg     |
| isResizable         | true, false                                            | true    |
| showLabel           | true, false                                            | true    |
| showHelpText        | true, false                                            | true    |
| showHintText        | true, false                                            | true    |
| showFeedbackMessage | true, false                                            | true    |
| showScrollbar       | true, false                                            | true    |
| state               | enabled, hover, focus, active, filled, error, disabled | enabled |

## React API (gold)

| Export            | Prop                                       | Values                | Default   |
| ----------------- | ------------------------------------------ | --------------------- | --------- |
| `Textarea`        | `size`                                     | `sm`, `default`, `lg` | `default` |
| `Textarea`        | `variant`                                  | `default`             | `default` |
| `Textarea`        | `disabled` / `aria-invalid` / native attrs | —                     | —         |
| `TextareaRoot`    | `maxCharacters`, `size`                    | —                     | —         |
| `TextareaCounter` | (reads root context)                       | —                     | —         |

## Notes

- size: Figma `reg` → `default`.
- showLabel / showHelpText / showFeedbackMessage / counter → Field composition (`FieldTitle`, `FieldDescription`, `FieldError`) + `TextareaRoot` / `TextareaCounter` — not show\* props.
- showHintText → `placeholder`.
- isResizable / scrollbar → CSS / native textarea behavior, not public show\* props.
- no `state="…"` enum; error → `aria-invalid`; disabled → `disabled`.
