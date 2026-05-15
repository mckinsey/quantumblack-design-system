'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { Controller, useForm as useRhfForm } from 'react-hook-form';

import {
  BIO_MAX_CHARACTERS,
  CheckboxFieldRow,
  DateFieldRow,
  FormDemoContainer,
  FormDemoForm,
  FormShellFooter,
  FormShellHeader,
  type FormValues,
  TextFieldRow,
  TextareaFieldRow,
  TimeFieldRow,
  defaultValues,
  formCopy,
  formSchema,
  getTanStackFieldStatus,
} from './form-shared';

const RHF_FORM_ID = 'form-rhf-demo';
const TS_FORM_ID = 'form-tanstack-demo';

// ============================================================================
// React Hook Form recipe (stacked / default layout)
//
// Validation strategy: `onTouched` — errors appear after first blur and then
// re-validate on every change. Matches the TanStack recipe so both demos
// behave the same way for the user; only the binding layer differs.
// ============================================================================

export function ReactHookForm() {
  const form = useRhfForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <FormDemoContainer>
      <FormShellHeader />

      <FormDemoForm id={RHF_FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <Controller
            control={form.control}
            name="field1"
            render={({ field, fieldState }) => (
              <TextFieldRow
                id={field.name}
                name={field.name}
                label={formCopy.fields.field1.label}
                placeholder={formCopy.placeholders.text.default}
                description={formCopy.fields.field1.description}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                invalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={form.control}
            name="field2"
            render={({ field, fieldState }) => (
              <TextFieldRow
                id={field.name}
                name={field.name}
                label={formCopy.fields.field2.label}
                placeholder={formCopy.placeholders.text.default}
                description={formCopy.fields.field2.description}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                invalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Controller
            control={form.control}
            name="date"
            render={({ field, fieldState }) => (
              <DateFieldRow
                id={field.name}
                name={field.name}
                label={formCopy.fields.date.label}
                description={formCopy.fields.date.description}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                invalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={form.control}
            name="time"
            render={({ field, fieldState }) => (
              <TimeFieldRow
                id={field.name}
                name={field.name}
                label={formCopy.fields.time.label}
                description={formCopy.fields.time.description}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                invalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="bio"
          render={({ field, fieldState }) => (
            <TextareaFieldRow
              id={field.name}
              name={field.name}
              label={formCopy.fields.bio.label}
              placeholder={formCopy.fields.bio.placeholder}
              description={formCopy.fields.bio.description}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              invalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              maxChars={BIO_MAX_CHARACTERS}
            />
          )}
        />

        <div className="flex flex-col gap-4">
          <Controller
            control={form.control}
            name="acceptTerms"
            render={({ field, fieldState }) => (
              <CheckboxFieldRow
                id={field.name}
                name={field.name}
                label={formCopy.fields.acceptTerms}
                checked={Boolean(field.value)}
                onChange={field.onChange}
                invalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={form.control}
            name="newsletter"
            render={({ field }) => (
              <CheckboxFieldRow
                id={field.name}
                name={field.name}
                label={formCopy.fields.newsletter}
                checked={Boolean(field.value)}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </FormDemoForm>

      <FormShellFooter
        formId={RHF_FORM_ID}
        onReset={() => form.reset(defaultValues)}
      />
    </FormDemoContainer>
  );
}

// ============================================================================
// TanStack Form recipe (inline / bottom-border layout)
//
// Uses the same FieldRow components as the RHF recipe with `variant="inline"`,
// so the visible diff between recipes is purely the binding layer.
// ============================================================================

export function TanStackForm() {
  const form = useTanStackForm({
    defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <FormDemoContainer>
      <FormShellHeader />

      <FormDemoForm
        id={TS_FORM_ID}
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}>
        <div className="flex flex-col gap-6">
          <form.Field name="field1">
            {field => {
              const status = getTanStackFieldStatus(field.state.meta);
              return (
                <TextFieldRow
                  id={field.name}
                  name={field.name}
                  label={formCopy.fields.field1.label}
                  placeholder={formCopy.placeholders.text.inline}
                  description={formCopy.fields.field1.description}
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  invalid={status.isInvalid}
                  errorMessage={status.errors[0]?.message}
                  variant="inline"
                />
              );
            }}
          </form.Field>

          <form.Field name="field2">
            {field => {
              const status = getTanStackFieldStatus(field.state.meta);
              return (
                <TextFieldRow
                  id={field.name}
                  name={field.name}
                  label={formCopy.fields.field2.label}
                  placeholder={formCopy.placeholders.text.inline}
                  description={formCopy.fields.field2.description}
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  invalid={status.isInvalid}
                  errorMessage={status.errors[0]?.message}
                  variant="inline"
                />
              );
            }}
          </form.Field>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <form.Field name="date">
            {field => {
              const status = getTanStackFieldStatus(field.state.meta);
              return (
                <DateFieldRow
                  id={field.name}
                  name={field.name}
                  label={formCopy.fields.date.label}
                  description={formCopy.fields.date.description}
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  invalid={status.isInvalid}
                  errorMessage={status.errors[0]?.message}
                  variant="inline"
                />
              );
            }}
          </form.Field>

          <form.Field name="time">
            {field => {
              const status = getTanStackFieldStatus(field.state.meta);
              return (
                <TimeFieldRow
                  id={field.name}
                  name={field.name}
                  label={formCopy.fields.time.label}
                  description={formCopy.fields.time.description}
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  invalid={status.isInvalid}
                  errorMessage={status.errors[0]?.message}
                  variant="inline"
                />
              );
            }}
          </form.Field>
        </div>

        <form.Field name="bio">
          {field => {
            const status = getTanStackFieldStatus(field.state.meta);
            return (
              <TextareaFieldRow
                id={field.name}
                name={field.name}
                label={formCopy.fields.bio.label}
                placeholder={formCopy.fields.bio.placeholder}
                description={formCopy.fields.bio.description}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                invalid={status.isInvalid}
                errorMessage={status.errors[0]?.message}
                maxChars={BIO_MAX_CHARACTERS}
              />
            );
          }}
        </form.Field>

        <div className="flex flex-col gap-4">
          <form.Field name="acceptTerms">
            {field => {
              const status = getTanStackFieldStatus(field.state.meta);
              return (
                <CheckboxFieldRow
                  id={field.name}
                  name={field.name}
                  label={formCopy.fields.acceptTerms}
                  checked={Boolean(field.state.value)}
                  onChange={field.handleChange}
                  invalid={status.isInvalid}
                  errorMessage={status.errors[0]?.message}
                />
              );
            }}
          </form.Field>

          <form.Field name="newsletter">
            {field => (
              <CheckboxFieldRow
                id={field.name}
                name={field.name}
                label={formCopy.fields.newsletter}
                checked={Boolean(field.state.value)}
                onChange={field.handleChange}
              />
            )}
          </form.Field>
        </div>
      </FormDemoForm>

      <FormShellFooter formId={TS_FORM_ID} onReset={() => form.reset()} />
    </FormDemoContainer>
  );
}
