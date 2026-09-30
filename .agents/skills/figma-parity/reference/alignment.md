Build from **Figma + React API only** (not Code Connect). Then verify Code Connect against this table.

1. On the **component set** root: read designer **description** (`get_design_context` on set root; follow doc links / annotations).
2. `get_metadata` on the set — every variant, boolean, text, SLOT; note **defaults**.
3. Read `src/components/ui/<name>.tsx` — `cva`, props, `data-slot`, exports.
4. Prop names: [props.md](../../../docs/qbds-react-components/props.md) (`reg`→`default`, `xlg`→`xl`; `variant` uses `default` not `primary`).
5. If Code Connect exists: enum/size/variant mapping must match Figma + React columns — else fix via **code-connect** skill.
6. **Defaults:** Figma description, `cva` defaults, `registry.json` agree.
7. **Demos:** `examples[0]` can be simple; cover every alignment row; error/feedback per size when typography differs.

When Figma has Elements/* or `showLabel` / `showHelpText` / `showFeedbackMessage` / `showCounter`, fill `fieldChrome` (each slot at sm, default, lg).

## Output format

```jsonc
{
  "component": "",
  "figmaNodeId": "",
  "descriptionSummary": "",
  "rows": [
    {
      "axis": "variant | size | state | fieldSlots | slotProps | subComponents | …",
      "figma": [],
      "react": [],
      "codeConnect": [],
      "aligned": true,
      "notes": "",
    },
  ],
  "fieldChrome": [
    {
      "slot": "label | helper | feedback | counter",
      "figmaNode": "",
      "sm": "",
      "default": "",
      "lg": "",
      "codeTarget": "",
    },
  ],
  "defaultsAligned": true,
  "demoNotes": "",
  "redFlags": [],
}
```

**Field chrome red flags:** per-size label/description but not error; bare `<FieldError>` without `className` on sized sets; wrong `paragraph-*` vs Figma. **Not a red flag:** `text-status-*` on feedback / counter / required `*`.
