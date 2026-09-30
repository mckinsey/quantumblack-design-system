One row per meaningful **variant × state** cell (every Figma `state` enum value, including `dropdown-open`, `toggle-on`, loading, etc.).

## Per cell

1. **Tokens** — `get_variable_defs` on the cell node: enabled, hover, focus, pressed, disabled, and all other states on the set. Map via [TOKENS.md](../../../docs/TOKENS.md); light + dark. Flag wrong `-inverse`, hex, primitives, wrong token name.
2. **Layout** — `get_design_context` on the cell (and nested Elements/* for field sets):

| Property | Figma | Code |
| -------- | ----- | ---- |
| Height / min size | auto-layout | `size-*`, `min-h`, padding + line-height |
| Padding / gap | spacing vars | `p-*`, `gap-*` on 4px scale |
| Icons | frame + IconShell type/state | re-read on open/toggle when fill flips |
| Typography (control) | text style name | `cta-*` / `paragraph-*` |
| Typography (feedback) | Paragraph/* + Text/Error | per-size `paragraph-*` + `text-status-*` |
| CTA underline | see table below | per variant × state |

**CTA underline (mandatory per cell)**

| Figma enabled / state cell | Code |
| -------------------------- | ---- |
| `CTA/button-01\|02\|03` at enabled | No underline at rest; underline only if hover/focus/pressed/open cells use `CTA/button-link-*` |
| `CTA/button-link-*` at enabled | Permanent underline (`cta-button-link-*` or always-on) |
| Disabled uses `button-*`, enabled used `-link` | `disabled:…:no-underline` |

**Spacing**

- Record **pl** and **pr** separately; do not infer from total width.
- Padding on inner **State-Overlays** frame.
- Map each `Spacing/N` to its side; shared `cva` ≠ shared spacing across siblings.

**Interactive states**

| State | Verify |
| ----- | ------ |
| Hover / pressed | overlay tokens (+ `-inverse`) |
| Focus | ring; compare **focused** cell — fill/icons usually vs enabled |
| Dropdown-open | **≠ focus** — do not copy `focus-visible` onto `data-[state=open]` without comparing cells; IconShell type/opacity |
| Toggle-on / selected | `data-[state=*]` / `aria-*`; icon tone |
| Disabled | muted fill, text, overlay |
| Error (field) | `border-stroke-status-*` / `bg-status-*` + `text-status-*` per size |

Split buttons / menu triggers: open state on the segment with `data-state=open`.

**Visual pass:** `npm run dev` demo vs Figma / `get_screenshot` per cell; fix or document **≥2px** drift.

## Output format

```jsonc
{
  "component": "",
  "cells": [
    {
      "variantKey": "",
      "state": "",
      "tokens": "pass | drift",
      "layout": "pass | drift",
      "underline": "pass | drift | n/a",
      "notes": "",
    },
  ],
  "visualPass": true,
  "redFlags": [],
}
```

Red flag examples: `focus-visible` and `data-[state=open]` share classes without Figma comparison; ghost variant uses link underline at enabled but code uses hover-only for all variants.
