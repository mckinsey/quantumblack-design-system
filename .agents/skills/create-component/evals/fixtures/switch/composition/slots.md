# Figma slots fixture — Switch

Treat this as Figma SLOT / `show*` / composition output. Do **not** call Figma MCP.

## Optional chrome

| Figma                       | Kind                                                 |
| --------------------------- | ---------------------------------------------------- |
| showLeftLabel / leftEntry   | boolean + string — label to the left of the control  |
| showRightLabel / rightEntry | boolean + string — label to the right of the control |
| Track / Thumb               | internal control chrome — not consumer props         |

## Shared axes (root)

- size → React `size` (`reg` → `default`)
- on → `checked` / `defaultChecked`
- state → CSS + `disabled`

## How to compose (expected direction)

- No `showLeftLabel` / `showRightLabel` / `leftEntry` / `rightEntry` on Switch.
- Labels: `<div className="flex …"><Label htmlFor="…">…</Label><Switch id="…" /></div>` (or label on the right).
- Label typography / gap vary by size in the demo layer — not Switch props.
