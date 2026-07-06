// url=<QBDS_TOGGLE_TEXT>
// source=src/components/ui/toggle.tsx
// component=Toggle
//
// Figma models toggle-on as a Button state variant (secondary-filled, secondary-outline,
// ghost only). Code uses a separate Toggle component (Radix) — map state=toggle-on to
// pressed={true}. For non-toggle Button states, use button-text.figma.ts instead.
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('type', {
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

const disabled = instance.getEnum('state', {
  'toggle-on': false,
  disabled: true,
});

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
    <Toggle variant="${variant}" size="${size}" pressed={true}${disabled ? ' disabled' : ''}>
      ${leadingCode}
      ${label}
      ${trailingCode}
    </Toggle>
  `,
  imports: ['import { Toggle } from "@/components/ui/toggle"'],
  id: 'toggle-text',
  metadata: { nestable: true },
};
