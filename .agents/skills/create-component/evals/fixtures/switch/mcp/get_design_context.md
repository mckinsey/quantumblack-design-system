# get_design_context — Switch default (`34082:106819`)

`disableCodeConnect: true`. Spec from Figma description / axes only.

## Component description (Switch · `34082:106669`)

Toggles an on/off setting that takes effect immediately. Best for instant preferences. Use Checkbox when changes apply on form submission.

Properties — Configuration:

- size (Variant): sm, reg, lg — default: reg
- on (Variant): false, true — default: false
- showLeftLabel (Boolean): true, false — default: false
- showRightLabel (Boolean): true, false — default: false
- leftEntry (String): label on the left of the switch — default: "Label"
- rightEntry (String): label on the right of the switch — default: "Label"

Properties — State:

- state (Variant): enabled, disabled, focused — default: enabled

Composition:

- Track — pill-shaped background that animates color when on
- Thumb — circular indicator that slides between sides
- Left/Right label — text labels (optional via showLeftLabel/showRightLabel)

Accessibility:

- ARIA: role="switch"; aria-checked reflects the on axis
- Keyboard: Space or Enter toggles on/off
- Focus: visible focus ring via focused state

## Reference structure (adapted)

Default variant `on=false, size=reg, state=enabled`. Optional left/right label text nodes gated by showLeftLabel / showRightLabel. Track + thumb live inside the switch control; labels sit beside it in a horizontal flex gap.
