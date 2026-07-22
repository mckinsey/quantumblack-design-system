// url=<QBDS_TOGGLE_ICON>
// source=src/components/ui/toggle.tsx
// component=Toggle
//
// Figma models toggle-on as a Button-Icon state variant (secondary-filled, secondary-outline,
// ghost only). Code uses a separate Toggle (Base UI) — map state=toggle-on to
// pressed={true}. For non-toggle Button-Icon states, use button-icon.figma.ts instead.
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('type', {
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
  'toggle-on': false,
  disabled: true,
});

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
    <Toggle variant="${variant}" size="${size}" pressed={true}${className ? ` className="${className}"` : ''}${disabled ? ' disabled' : ''}>
      ${iconCode}
    </Toggle>
  `,
  imports: ['import { Toggle } from "@/components/ui/toggle"'],
  id: 'toggle-icon',
  metadata: { nestable: true },
};
