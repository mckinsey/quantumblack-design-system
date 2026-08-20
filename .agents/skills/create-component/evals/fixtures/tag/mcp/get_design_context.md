# get_design_context — Tag-Dismissable default (`34197:94148`)

`disableCodeConnect: true`. Spec from Figma description / axes only. Full set metadata in `get_metadata.xml`.

## Component description (Tag-Dismissable · `34197:94087`)

Removable label for filters, selections, or applied criteria. Includes a close affordance for user removal. Use Badge for system-generated status counts.

Properties — Configuration:

- type (Variant): primary, accent, high-emphasis — default: primary
- size (Variant): xsm, sm, reg, lg — default: reg
- outline (Variant): true, false — default: false
- pill (Variant): true, false — default: false
- showLeadingIcon (Boolean): true, false — default: true
- label (String): any text — default: "Label"

Properties — State:

- state (Variant): enabled, hover, focus, pressed, disabled — default: enabled

Composition:

- State-Overlays — interaction state layer
- Leading-Icon — icon before the label (optional)
- Label — text content
- Dismiss — close trigger

Accessibility:

- ARIA: dismissible chip pattern; close button needs aria-label="Remove [label]"
- Keyboard: Backspace or Delete on focused tag triggers removal; close button activates on Enter or Space
- Focus: visible focus ring via focus state

## Variant axes from get_metadata (symbol names)

- type: primary, high-emphasis, accent
- size: xsm, sm, reg, lg
- outline: true, false
- pill: true, false
- state: enabled, hover, focus, pressed, disabled
