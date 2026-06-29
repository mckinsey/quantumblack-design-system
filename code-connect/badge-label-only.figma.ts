// url=<QBDS_BADGE_LABEL_ONLY>
// source=https://github.com/mckinsey/quantumblack-design-system/blob/main/src/components/ui/badge.tsx
// component=Badge
import figma from 'figma';

const variant = figma.selectedInstance.getEnum('type', {
  'high-emphasis': 'high-emphasis',
  'brand-accent': 'brand-accent',
  alternative: 'alternative',
  error: 'error',
  warning: 'warning',
  success: 'success',
});

const size = figma.selectedInstance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
});

const outline = figma.selectedInstance.getEnum('outline', {
  true: true,
  false: false,
});

const label = figma.selectedInstance.getString('label');

export default {
  id: 'BadgeLabelOnly',
  imports: ["import { Badge } from '@/components/ui/badge';"],
  example: figma.code`<Badge${figma.helpers.react.renderProp(
    'outline',
    outline,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('variant', variant)}>
      ${figma.helpers.react.renderChildren(label)}
    </Badge>`,
  metadata: { nestable: true },
};
