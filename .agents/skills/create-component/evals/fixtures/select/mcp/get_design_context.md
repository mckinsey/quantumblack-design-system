# get_design_context — Select default (`40240:45306`)

`disableCodeConnect: true`. Spec from Figma description / axes only.

## Component description (Field/SingleSelect-Filled · `40240:45135`)

Dropdown selecting one option with filled background. Includes label, help text, and validation states.

Properties — Configuration:

- size (Variant): sm, reg, lg — default: reg
- showLeadingIcon (Boolean): true, false — default: false
- showEntryText (Boolean): true, false — default: true
- showFeedbackIcon (Boolean): true, false — default: true
- showFeedbackMessage (Boolean): true, false — default: false
- placeholderText (String): unselected hint — default: "Choose option"
- optionSelected (String): selected option text — default: "Option 2"

Properties — State:

- state (Variant): enabled, filled, hover, focus, open, filled-hover, filled-open, success, warning, error, disabled — default: enabled

Composition:

- Leading-Icon — IconShell before the entry (optional)
- Entry — selected option or placeholder
- Trailing chevron — open/close affordance
- Feedback row — feedback message + icon (optional)

Accessibility:

- ARIA: role="combobox" with aria-haspopup="listbox"; aria-expanded reflects open / filled-open; aria-invalid for error
- Keyboard: Up/Down arrows open menu and move selection; Enter selects; Esc closes
- Focus: visible focus ring via focus state

## Variant axes from get_metadata (symbol names)

- size: sm, reg, lg
- state: enabled, filled, hover, focus, open, filled-hover, filled-open, success, warning, error, disabled
