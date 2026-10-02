// url=<QBDS_BADGE_DOT_LABEL>
// source=https://github.com/mckinsey/quantumblack-design-system/blob/main/src/components/ui/badge.tsx
// component=Badge
import figma from 'figma';

const variant = figma.selectedInstance.getEnum('type', {
  'high-emphasis': 'high-emphasis',
  'brand-accent': 'brand-accent',
  muted: 'alternative',
  error: 'error',
  warning: 'warning',
  success: 'success',
});

const dotVariant = figma.selectedInstance.getEnum('type', {
  'high-emphasis': 'neutral',
  'brand-accent': 'neutral-brand',
  muted: 'neutral',
  error: 'error',
  warning: 'warning',
  success: 'success',
});

const size = figma.selectedInstance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
});

const label = figma.selectedInstance.getString('label');

export default {
  id: 'BadgeDotLabel',
  imports: ["import { Badge, StatusBadge } from '@/components/ui/badge';"],
  example: figma.code`<Badge outline${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('variant', variant)} withDot>
      <StatusBadge ${figma.helpers.react.renderProp(
        'size',
        size,
      )}${figma.helpers.react.renderProp('variant', dotVariant)}/>
      ${figma.helpers.react.renderChildren(label)}
    </Badge>`,
  metadata: { nestable: true },
};
