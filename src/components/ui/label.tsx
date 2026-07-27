'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'flex items-center font-normal gap-1 select-none data-[disabled=true]:pointer-events-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'label-small-primary',
        default: 'label-regular-primary',
        lg: 'label-large-primary',
      },
      disabled: {
        false: 'text-fg-secondary',
        true: 'text-fg-disabled cursor-not-allowed',
      },
    },
    defaultVariants: {
      disabled: false,
      size: 'default',
    },
  },
);

export interface LabelProps
  extends
    React.ComponentPropsWithoutRef<'label'>,
    VariantProps<typeof labelVariants> {}

function Label({ className, size, disabled, ...props }: LabelProps) {
  return (
    <label
      className={cn(labelVariants({ size, disabled }), className)}
      data-slot="label"
      data-disabled={disabled ? true : undefined}
      {...props}
    />
  );
}

export { Label, labelVariants };
