'use client';

import type * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('flex flex-col gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

/**
 * Optional Form header. Maps to the `headerSlot` property in the QBDS Figma
 * `Form` component set; use it for the form's title, description, or any
 * leading content above the sections.
 */
function FormHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="form-header"
      className={cn('flex flex-col gap-1', className)}
      {...props}
    />
  );
}

/**
 * Optional Form section. Repeat as many times as needed to cover the
 * `sectionSlot1`, `sectionSlot2`, `sectionSlot3`, and `sectionSlot4`
 * properties in the QBDS Figma `Form` component set; in code the count is
 * unbounded by design (Figma caps at 4 because Figma slots must be named).
 */
function FormSection({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="form-section"
      className={cn('flex flex-col gap-4', className)}
      {...props}
    />
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn(
        'text-fg-secondary text-xs leading-4 font-normal',
        'data-[error=true]:text-status-error',
        className,
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn(
        'text-fg-secondary text-xs leading-4 font-light',
        className,
      )}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn(
        'text-status-error text-xs leading-4 font-light',
        className,
      )}
      {...props}>
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormHeader,
  FormSection,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
