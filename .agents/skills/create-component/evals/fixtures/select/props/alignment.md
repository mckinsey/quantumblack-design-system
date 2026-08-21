# Figma alignment — Field/SingleSelect-Filled (+ ghost)

Treat as `get_metadata` + component-set description. Do **not** call Figma MCP.

Shipped gold: `src/components/ui/select.tsx`.

## Axes (Filled set `40240:45135`)

| Axis                | Figma values                                                                                      | Default         |
| ------------------- | ------------------------------------------------------------------------------------------------- | --------------- |
| size                | sm, reg, lg                                                                                       | reg             |
| showLeadingIcon     | true, false                                                                                       | false           |
| showEntryText       | true, false                                                                                       | true            |
| showFeedbackIcon    | true, false                                                                                       | true            |
| showFeedbackMessage | true, false                                                                                       | false           |
| placeholderText     | string                                                                                            | "Choose option" |
| state               | enabled, filled, hover, focus, open, filled-hover, filled-open, success, warning, error, disabled | enabled         |

## Ghost / inline (set `40240:46289`)

Same sizes. Ships as `SelectTrigger` `variant="inline"` (filled = `variant="default"`).

## React API (gold)

| Export          | Prop                                            | Values                | Default              |
| --------------- | ----------------------------------------------- | --------------------- | -------------------- |
| `Select`        | `size`                                          | `sm`, `default`, `lg` | `default`            |
| `Select`        | `disabled`                                      | boolean               | —                    |
| `SelectTrigger` | `variant`                                       | `default`, `inline`   | `default`            |
| `SelectTrigger` | `size`                                          | `sm`, `default`, `lg` | inherits / `default` |
| Parts           | `SelectValue`, `SelectContent`, `SelectItem`, … | composition           | —                    |

## Notes

- size: Figma `reg` → `default` on `Select` / trigger.
- showLeadingIcon / entry / feedback → composition (children + FieldError / FieldDescription), not show\* props.
- placeholder → `SelectValue` `placeholder`.
- open/hover/focus/filled → CSS / `data-popup-open` / primitive; error → `aria-invalid`; disabled → `disabled` on `Select`.
- no public `state="…"` enum.
