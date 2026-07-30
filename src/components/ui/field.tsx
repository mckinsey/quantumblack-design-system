'use client';

import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

function FieldSet({ className, ...props }: FieldsetPrimitive.Root.Props) {
  return (
    <FieldsetPrimitive.Root
      data-slot="field-set"
      className={cn('flex flex-col', className)}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: FieldsetPrimitive.Legend.Props & { variant?: 'legend' | 'label' }) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn('text-fg-secondary', className)}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-7 [&>[data-slot=field-group]]:gap-4',
        className,
      )}
      {...props}
    />
  );
}

const fieldVariants = cva(
  'group/field flex w-full gap-3 data-[invalid=true]:text-status-error',
  {
    variants: {
      orientation: {
        vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
        horizontal: [
          'flex-row items-center',
          '[&>[data-slot=field-label]]:flex-auto',
          'has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
          'has-[>[data-slot=radio-group-item]]:gap-1 has-[>[data-size=lg][data-slot=radio-group-item]]:gap-2',
        ],
        responsive: [
          'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto',
          '@md/field-group:[&>[data-slot=field-label]]:flex-auto',
          '@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
          '@md/field-group:has-[>[data-slot=radio-group-item]]:gap-1 @md/field-group:has-[>[data-size=lg][data-slot=radio-group-item]]:gap-2',
        ],
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
);

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        'group/field-content flex flex-1 flex-col gap-1.5 leading-snug',
        className,
      )}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn('flex w-fit items-center gap-2', className)}
      {...props}
    />
  );
}

const fieldTitleVariants = cva(
  'text-fg-secondary flex w-fit items-center gap-2',
  {
    variants: {
      size: {
        sm: 'label-small-primary',
        default: 'label-regular-primary',
        lg: 'label-large-primary',
      },
      disabled: {
        false: 'text-fg-secondary',
        true: 'text-fg-disabled',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

function FieldTitle({
  className,
  size,
  disabled,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldTitleVariants>) {
  return (
    <div
      data-slot="field-title"
      className={cn(fieldTitleVariants({ size, disabled }), className)}
      {...props}
    />
  );
}

const fieldDescriptionVariants = cva(
  [
    'group-has-[[data-orientation=horizontal]]/field:text-balance',
    'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
    '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
  ],
  {
    variants: {
      size: {
        sm: 'paragraph-small-primary',
        default: 'paragraph-regular-primary',
        lg: 'paragraph-large-primary',
      },
      disabled: {
        false: 'text-fg-tertiary',
        true: 'text-fg-disabled',
      },
    },
    defaultVariants: {
      size: 'default',
      disabled: false,
    },
  },
);

function FieldDescription({
  className,
  size,
  disabled,
  ...props
}: React.ComponentProps<'p'> & VariantProps<typeof fieldDescriptionVariants>) {
  return (
    <p
      data-slot="field-description"
      data-disabled={disabled ? true : undefined}
      aria-disabled={disabled || undefined}
      className={cn(fieldDescriptionVariants({ size, disabled }), className)}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        'relative -my-2 h-5 group-data-[variant=outline]/field-group:-mb-2',
        className,
      )}
      {...props}>
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-surface-base text-fg-secondary relative mx-auto block w-fit px-2"
          data-slot="field-separator-content">
          {children}
        </span>
      )}
    </div>
  );
}

const fieldErrorVariants = cva('text-status-error', {
  variants: {
    size: {
      sm: 'paragraph-small-primary',
      default: 'paragraph-regular-primary',
      lg: 'paragraph-large-primary',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

function FieldError({
  className,
  children,
  errors,
  size,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof fieldErrorVariants> & {
    errors?: Array<{ message?: string } | undefined>;
  }) {
  const content = React.useMemo(() => {
    if (children !== undefined && children !== null) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map(error => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (content === undefined || content === null) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      data-slot="field-error"
      className={cn(fieldErrorVariants({ size }), className)}
      {...props}>
      {content}
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};
