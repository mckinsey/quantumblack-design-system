// url=<QBDS_BUTTON_TEXT>
// source=src/components/ui/button.tsx
// component=Button
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('type', {
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
});

const disabled = state === 'disabled';

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
  example: figma.code`
    ${openNote}
    <Button variant="${variant}" size="${size}"${disabled ? ' disabled' : ''}>
      ${leadingCode}
      ${label}
      ${trailingCode}
    </Button>
  `,
  imports: ['import { Button } from "@/components/ui/button"'],
  id: 'button-text',
  metadata: { nestable: true },
};
