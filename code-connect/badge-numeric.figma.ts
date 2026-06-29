// url=<QBDS_BADGE_NUMERIC>
// source=https://github.com/mckinsey/quantumblack-design-system/blob/main/src/components/ui/badge.tsx
// component=NumericBadge
import figma from 'figma';

const variant = figma.selectedInstance.getEnum('type', {
  primary: 'primary',
  secondary: 'secondary',
  accent: 'accent',
});

const size = figma.selectedInstance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const outline = figma.selectedInstance.getEnum('outline', {
  true: true,
  false: false,
});

const counterLabel = figma.selectedInstance.getString('counterLabel');

export default {
  id: 'NumericBadge',
  imports: ["import { NumericBadge } from '@/components/ui/badge';"],
  example: figma.code`<NumericBadge${figma.helpers.react.renderProp(
    'outline',
    outline,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('variant', variant)}>
      ${figma.helpers.react.renderChildren(counterLabel)}
    </NumericBadge>`,
  metadata: { nestable: true },
};
