import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const buttonGroupVariants = cva('flex w-fit gap-3', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col items-stretch',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
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
 * layout: `orientation` for direction with a constant 12px gap. Size the
 * child `Button`s directly.
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button variant="default">Save</Button>
 *   <Button variant="ghost">Cancel</Button>
 * </ButtonGroup>
 * ```
 */
function ButtonGroup({ className, orientation, ...props }: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      role="group"
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

export { ButtonGroup, buttonGroupVariants, type ButtonGroupProps };
