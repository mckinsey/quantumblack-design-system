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

const disabled = instance.getEnum('state', {
  enabled: false,
  hover: false,
  focused: false,
  pressed: false,
  disabled: true,
  loading: false,
  'toggle-on': false,
});

const className = instance.getEnum('shape', {
  square: undefined,
  circle: 'rounded-full',
});

const icon = instance.findInstance('IconShell');
let iconCode: figma.ResultSection[];

if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example;
}

export default {
  example: figma.code`
    <Button variant="${variant}" size="${size}"${className ? ` className="${className}"` : ''}${disabled ? ' disabled' : ''}>
      ${iconCode}
    </Button>
  `,
  imports: ['import { Button } from "@/components/ui/button"'],
  id: 'button-icon',
  metadata: { nestable: true },
};
