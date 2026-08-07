// url=<QBDS_TOGGLE_TEXT>
// source=src/components/ui/toggle.tsx
// component=Toggle
//
// Same COMPONENT_SET as button-text (toggle-on is a Button state). Snippet must be
// correct for every cell — if this template wins over button-text in Dev Mode,
// non-toggle states still emit <Button>.
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('type', {
  primary: 'default',
  'primary-accent': 'accent',
  'secondary-filled': 'secondary',
  'secondary-outline': 'outline',
  ghost: 'ghost',
});

const size = instance.getEnum('size', {
  xxsm: 'xxs',
  xsm: 'xs',
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const state = instance.getEnum('state', {
  enabled: 'enabled',
  hover: 'enabled',
  focused: 'enabled',
  pressed: 'enabled',
  disabled: 'disabled',
  loading: 'enabled',
  'dropdown-open': 'open',
  'toggle-on': 'toggle-on',
});

const disabled = state === 'disabled';
const isToggle =
  state === 'toggle-on' &&
  (type === 'secondary' || type === 'outline' || type === 'ghost');

const openNote =
  state === 'open'
    ? figma.code`{/* data-state="open" from DropdownMenuTrigger — Button fill + IconShell tone follow that, not a Button prop */}`
    : figma.code``;

const label = instance.getString('label');

const showLeading = instance.getBoolean('showLeadingIcon');
const leading = showLeading ? instance.findInstance('Leading-Icon') : null;
let leadingCode: figma.ResultSection[] = [];

if (leading && leading.type === 'INSTANCE') {
  leadingCode = leading.executeTemplate().example;
}

const showTrailing = instance.getBoolean('showTrailingIcon');
const trailing = showTrailing ? instance.findInstance('Trailing-Icon') : null;
let trailingCode: figma.ResultSection[] = [];

if (trailing && trailing.type === 'INSTANCE') {
  trailingCode = trailing.executeTemplate().example;
}

export default {
  example: isToggle
    ? figma.code`
    <Toggle variant="${type}" size="${size}" pressed={true}${disabled ? ' disabled' : ''}>
      ${leadingCode}
      ${label}
      ${trailingCode}
    </Toggle>
  `
    : figma.code`
    ${openNote}
    <Button variant="${type}" size="${size}"${disabled ? ' disabled' : ''}>
      ${leadingCode}
      ${label}
      ${trailingCode}
    </Button>
  `,
  imports: isToggle
    ? ['import { Toggle } from "@/components/ui/toggle"']
    : ['import { Button } from "@/components/ui/button"'],
  id: 'toggle-text',
  metadata: { nestable: true },
};
