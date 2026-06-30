// url=<QBDS_BADGE_DOT_LABEL>
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

const dotVariant = figma.selectedInstance.getEnum('type', {
  'high-emphasis': 'neutral',
  'brand-accent': 'neutral-brand',
  alternative: 'neutral',
  error: 'error',
  warning: 'warning',
  success: 'success',
});

const size = figma.selectedInstance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const dotSize = figma.selectedInstance.getEnum('size', {
  sm: 'sm',
  reg: 'sm',
  lg: 'default',
});

const valueText = figma.selectedInstance.findText('value');
const label = valueText.type === 'TEXT' ? valueText.textContent : undefined;

export default {
  id: 'BadgeDotLabel',
  imports: ["import { Badge, StatusBadge } from '@/components/ui/badge';"],
  example: figma.code`<Badge outline={true}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('variant', variant)} withDot>
      <StatusBadge ${figma.helpers.react.renderProp(
        'size',
        dotSize,
      )}${figma.helpers.react.renderProp('variant', dotVariant)}/>
      ${figma.helpers.react.renderChildren(label)}
    </Badge>`,
  metadata: { nestable: true },
};
