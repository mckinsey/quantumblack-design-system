// url=<QBDS_BADGE_HINT_DOT>
// source=https://github.com/mckinsey/quantumblack-design-system/blob/main/src/components/ui/badge.tsx
// component=StatusBadge
import figma from 'figma';

const variant = figma.selectedInstance.getEnum('status', {
  neutral: 'neutral',
  'neutral-brand': 'neutral-brand',
  error: 'error',
  warning: 'warning',
  success: 'success',
});

const size = figma.selectedInstance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
  xlg: 'xl',
});

const outline = figma.selectedInstance.getEnum('outlined', {
  true: true,
  false: false,
});

export default {
  id: 'StatusBadge',
  imports: ["import { StatusBadge } from '@/components/ui/badge';"],
  example: figma.code`<StatusBadge${figma.helpers.react.renderProp(
    'outline',
    outline,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('variant', variant)}/>`,
  metadata: { nestable: true },
};
