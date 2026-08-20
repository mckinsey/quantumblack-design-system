# get_design_context — Textarea default (`22719:203384`)

`disableCodeConnect: true`. Spec from Figma description / axes only.

## Component description (Textarea-Input · `15990:112587`)

Multi-line text input for long-form content. Supports optional label, help text, hint text, feedback message, scrollbar, and resize affordance. Use Field/Text inputs when the content is single-line.

Properties — Configuration:

- size (Variant): sm, reg, lg — default: reg
- isResizable (Boolean): true, false — default: true
- showLabel (Boolean): true, false — default: true
- showHelpText (Boolean): true, false — default: true
- showHintText (Boolean): true, false — default: true
- showFeedbackMessage (Boolean): true, false — default: true
- showScrollbar (Boolean): true, false — default: true
- entryFilled (String): filled body text — default: lorem ipsum sample

Properties — State:

- state (Variant): enabled, hover, focus, active, filled, error, disabled — default: enabled

Composition:

- Elements/Label — field label slot (optional via showLabel)
- base-text-area — multi-line input area
- text-input-footer — scrollbar and resize handle row
- Elements/Help-Text — guidance below the field (optional)
- infoCounterSlot — character counter slot (optional)

Accessibility:

- ARIA: role="textbox" with aria-multiline="true"; aria-required when required; aria-invalid when in error state
- Keyboard: standard text-area editing; Tab moves focus out
- Focus: visible focus ring via focus state

## Variant axes from get_metadata (symbol names)

- size: sm, reg, lg
- state: enabled, hover, focus, active, filled, error, disabled
