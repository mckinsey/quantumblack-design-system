'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const buttonGroupVariants = cva(
  [
    'isolate flex w-fit items-stretch',
    '*:focus-visible:relative *:focus-visible:z-10',
    'has-[>[data-slot=button-group]]:gap-2',
    'has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-reg',
    "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
    '[&>input]:flex-1',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      spacing: {
        attached: 'gap-px',
        spaced: 'gap-3',
      },
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        spacing: 'attached',
        className: [
          '*:data-slot:rounded-r-none',
          '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-reg!',
          '[&>[data-slot]~[data-slot]]:rounded-l-none',
        ].join(' '),
      },
      {
        orientation: 'vertical',
        spacing: 'attached',
        className: [
          '*:data-slot:rounded-b-none',
          '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-reg!',
          '[&>[data-slot]~[data-slot]]:rounded-t-none',
        ].join(' '),
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      spacing: 'spaced',
    },
  },
);

interface ButtonGroupProps
  extends
    React.ComponentProps<'div'>,
    VariantProps<typeof buttonGroupVariants> {}

function ButtonGroup({
  className,
  orientation,
  spacing,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation ?? 'horizontal'}
      data-spacing={spacing ?? 'spaced'}
      className={cn(buttonGroupVariants({ orientation, spacing }), className)}
      {...props}
    />
  );
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(
          'flex items-center gap-2 rounded-reg border border-stroke-secondary bg-fill-muted px-2.5 paragraph-regular-primary [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4',
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: 'button-group-text',
    },
  });
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        'bg-stroke-secondary relative self-stretch data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto',
        className,
      )}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
  type ButtonGroupProps,
};
