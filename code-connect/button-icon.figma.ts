// url=<QBDS_BUTTON_ICON>
// source=src/components/ui/button.tsx
// component=Button
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
  xxsm: 'icon-xxs',
  xsm: 'icon-xs',
  sm: 'icon-sm',
  reg: 'icon',
  lg: 'icon-lg',
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

const className = instance.getEnum('shape', {
  square: undefined,
  circle: 'rounded-full',
});

const icon = instance.findInstance('IconShell');
let iconCode: figma.ResultSection[] = [];

if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example;
}

export default {
  example: isToggle
    ? figma.code`
    <Toggle variant="${type}" size="${size}" pressed={true}${className ? ` className="${className}"` : ''}${disabled ? ' disabled' : ''}>
      ${iconCode}
    </Toggle>
  `
    : figma.code`
    ${openNote}
    <Button variant="${type}" size="${size}"${className ? ` className="${className}"` : ''}${disabled ? ' disabled' : ''}>
      ${iconCode}
    </Button>
  `,
  imports: isToggle
    ? ['import { Toggle } from "@/components/ui/toggle"']
    : ['import { Button } from "@/components/ui/button"'],
  id: 'button-icon',
  metadata: { nestable: true },
};
