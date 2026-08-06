// url=<QBDS_BUTTON_ICON>
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
});

const disabled = state === 'disabled';

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
  example: figma.code`
    ${openNote}
    <Button variant="${variant}" size="${size}"${className ? ` className="${className}"` : ''}${disabled ? ' disabled' : ''}>
      ${iconCode}
    </Button>
  `,
  imports: ['import { Button } from "@/components/ui/button"'],
  id: 'button-icon',
  metadata: { nestable: true },
};
