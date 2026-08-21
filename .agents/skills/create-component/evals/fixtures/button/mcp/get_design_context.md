# get_design_context — Button default (`34797:9014`)

`disableCodeConnect: true`. Spec from Figma description / axes only.

## Component description (Button · `34797:9013`)

Triggers an action or navigates to a new context. Available in five visual hierarchies: primary, primary-accent, secondary-filled, secondary-outline, and ghost. Supports leading/trailing icons, dropdown menus on four corners, and a tooltip.

Properties — Configuration:

- type (Variant): primary, primary-accent, secondary-filled, secondary-outline, ghost — default: primary
- size (Variant): xxsm, xsm, sm, reg, lg — default: reg
- showLabel (Boolean): true, false — default: true
- showLeadingIcon (Boolean): true, false — default: false
- showTrailingIcon (Boolean): true, false — default: false
- showBottomLeftMenu (Boolean): true, false — default: true
- showBottomRightMenu (Boolean): true, false — default: false
- showTopLeftMenu (Boolean): true, false — default: false
- showTopRightMenu (Boolean): true, false — default: false
- showTooltipTopCenter (Boolean): true, false — default: false
- showTooltipBottomCenter (Boolean): true, false — default: false
- label (String): button label — default: "Button"
- bottomLeftMenuSlot / bottomRightMenuSlot / topLeftMenuSlot / topRightMenuSlot (Slot): Menu/Context or Menu/Select — visible when matching show\*Menu is true

Properties — State:

- state (Variant): enabled, hover, focused, pressed, dropdown-open, toggle-on, disabled, loading — default: enabled

Composition:

- Leading-Icon — IconShell before the label (optional, showLeadingIcon)
- label — text content
- Trailing-Icon — IconShell after the label (optional, showTrailingIcon)
- State-Overlays — interaction state layer
- Tooltip slots — above/below when showTooltipTopCenter / showTooltipBottomCenter
- Menu slots — dropdown menus at four corners; one corner at a time

Accessibility:

- ARIA: role="button"; aria-pressed for toggle-on; aria-expanded for dropdown-open; aria-busy for loading; aria-haspopup="menu" when a menu slot is active
- Keyboard: Enter or Space; Down arrow opens attached menu
- Focus: visible focus ring via focused state

## Variant axes from get_metadata (symbol names)

Parsed from `type=…, size=…, state=…` on symbols under Button:

- type: primary, primary-accent, secondary-filled, secondary-outline, ghost
- size: xxsm, xsm, sm, reg, lg
- state: enabled, hover, focused, pressed, dropdown-open, toggle-on, disabled, loading

## Icon set (Button icon · `36167:9301`)

Same type axis. Icon-only sizes: icon-xxs, icon-xs, icon-sm, icon, icon-lg (ship on same React Button API).
