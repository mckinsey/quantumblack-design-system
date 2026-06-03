import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Gap between grouped buttons scales with the size variant to match the Figma
// spacing tokens (sm = 8px, default = 12px, lg = 16px).
const buttonGroupVariants = cva('flex w-fit', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col items-stretch',
    },
    size: {
      sm: 'gap-2',
      default: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'default',
  },
});

interface ButtonGroupProps
  extends
    React.ComponentProps<'div'>,
    VariantProps<typeof buttonGroupVariants> {}

/**
 * Groups related buttons together with consistent QBDS spacing.
 *
 * Place `Button` children inside and choose their variants (e.g. a primary
 * action paired with a secondary or ghost action). The group only controls
 * layout: `orientation` for direction and `size` for the inter-button gap.
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button variant="default">Save</Button>
 *   <Button variant="ghost">Cancel</Button>
 * </ButtonGroup>
 * ```
 */
function ButtonGroup({
  className,
  orientation,
  size,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      role="group"
      className={cn(buttonGroupVariants({ orientation, size }), className)}
      {...props}
    />
  );
}

export { ButtonGroup, buttonGroupVariants, type ButtonGroupProps };
