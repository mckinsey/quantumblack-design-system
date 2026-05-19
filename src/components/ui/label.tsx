'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'flex items-center font-normal gap-1 select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'text-xs leading-4',
        default: 'text-sm leading-5 tracking-[-0.112px]',
        lg: 'text-base leading-6 tracking-[-0.128px]',
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
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /**
   * Optional content rendered after the label, right-aligned. Maps to the
   * `infoCounterSlot` property in the QBDS Figma `Elements/Label` component
   * set (e.g. `12 / 50` character counter).
   */
  infoCounter?: React.ReactNode;
  /**
   * Optional content rendered after the label, right-aligned, sitting beside
   * `infoCounter` when both are present. Maps to the `infoMiscsSlot` property
   * in the QBDS Figma `Elements/Label` component set (e.g. an info icon or
   * "Optional" hint).
   */
  infoMiscs?: React.ReactNode;
}

function Label({
  className,
  size,
  disabled,
  infoCounter,
  infoMiscs,
  children,
  ...props
}: LabelProps) {
  const hasInfo = infoCounter !== undefined || infoMiscs !== undefined;

  return (
    <LabelPrimitive.Root
      className={cn(labelVariants({ size, disabled }), className)}
      data-slot="label"
      {...props}>
      {children}
      {hasInfo && (
        <span
          data-slot="label-info"
          className="ml-auto inline-flex items-center gap-1">
          {infoCounter !== undefined && (
            <span data-slot="label-info-counter">{infoCounter}</span>
          )}
          {infoMiscs !== undefined && (
            <span data-slot="label-info-miscs">{infoMiscs}</span>
          )}
        </span>
      )}
    </LabelPrimitive.Root>
  );
}

export { Label, labelVariants };
