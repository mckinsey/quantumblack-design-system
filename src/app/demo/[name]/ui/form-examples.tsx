'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { format, isValid, parse } from 'date-fns';
import * as React from 'react';
import { Controller, useForm as useRhfForm } from 'react-hook-form';
import * as z from 'zod';

import { CalendarMonth } from '@/components/icons/CalendarMonth';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { IconShell } from '@/components/ui/icon-shell';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { TimeInput } from '@/components/ui/time-input';
import { cn } from '@/lib/utils';

import { dateInputClassName } from './date-picker';
import { inputGroupFieldConfig } from './input-group-config';

// ============================================================================
// Schema, defaults, copy
// ============================================================================

const BIO_MAX_CHARACTERS = 150;

const formSchema = z.object({
  field1: z.string().min(1, 'This field is required.'),
  field2: z.string().min(1, 'This field is required.'),
  date: z.string().min(1, 'Date is required.'),
  time: z.string().min(1, 'Time is required.'),
  bio: z
    .string()
    .min(1, 'Required.')
    .max(BIO_MAX_CHARACTERS, `Max ${BIO_MAX_CHARACTERS} characters.`),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms.',
  }),
  newsletter: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  field1: '',
  field2: '',
  date: '',
  time: '',
  bio: '',
  acceptTerms: true,
  newsletter: false,
};

/**
 * Copy mirrors the Figma "Form layout" template (node 40809:80578).
 * Generic placeholder text is intentional — this is a layout primitive
 * downstream apps fill in.
 */
const formCopy = {
  header: {
    title: 'Form Title Goes Here',
    description:
      'Fill in the fields below so we can verify your details and provide the most relevant results. Please ensure all information is accurate to avoid any processing delays.',
  },
  fields: {
    field1: { label: 'Field label', description: 'Helper text' },
    field2: { label: 'Field label', description: 'Helper text' },
    date: { label: 'Select date', description: 'Helper text' },
    time: { label: 'Select time', description: 'Helper text' },
    bio: {
      label: 'Field label',
      placeholder: 'Hint text',
      description: 'Helper text',
    },
    acceptTerms: 'I accept the Terms and Conditions',
    newsletter: 'Sign me up for news and exclusive updates.',
  },
  /** Text-input placeholders differ by variant: default → "Placeholder", inline → "Hint text". */
  placeholders: {
    text: { default: 'Placeholder', inline: 'Hint text' },
  },
  submit: 'Submit',
  cancel: 'Cancel',
} as const;

// ============================================================================
// Layout shell + label/description style maps
// ============================================================================

const formFieldDefault = inputGroupFieldConfig.default;
const formFieldDefaultLabel = formFieldDefault.label;
const formFieldDefaultDescription = formFieldDefault.description;
const formFieldInlineLabel = cn(formFieldDefault.label, 'mb-[-4px]');

/** Match {@link DatePickerDemo} label styling */
const datePickerLabel = 'label-regular-primary';

/** Match {@link DatePickerInlineSizes} default row */
const datePickerInlineLabel = cn(datePickerLabel, 'mb-[-4px]');

const formDemoShell = {
  root: 'flex w-full max-w-[420px] min-w-[320px] flex-col gap-8 py-4',
  form: 'flex w-[420px] flex-col gap-8',
  fieldsColumn: 'flex flex-col gap-6',
  dateTimeGrid: 'grid grid-cols-2 gap-6',
  checksColumn: 'flex flex-col gap-4',
  checkboxBlock: 'flex flex-col gap-1',
} as const;

function FormDemoContainer(props: Readonly<React.ComponentProps<'div'>>) {
  const { className, ...rest } = props;

  return <div className={cn(formDemoShell.root, className)} {...rest} />;
}

function FormDemoForm(props: Readonly<React.ComponentProps<'form'>>) {
  const { className, ...rest } = props;

  return <form className={cn(formDemoShell.form, className)} {...rest} />;
}

function FormShellHeader() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="headings-h2-regular text-fg-primary">
        {formCopy.header.title}
      </h2>
      <p className="paragraph-large-primary text-fg-secondary">
        {formCopy.header.description}
      </p>
    </div>
  );
}

function FormShellFooter({
  formId,
  onReset,
}: Readonly<{ formId: string; onReset: () => void }>) {
  return (
    <div className="flex gap-2">
      <Button type="submit" form={formId}>
        {formCopy.submit}
      </Button>
      <Button type="button" variant="outline" onClick={onReset}>
        {formCopy.cancel}
      </Button>
    </div>
  );
}

function FormBioCharCount({
  current,
  max,
}: Readonly<{ current: number; max: number }>) {
  const over = current > max;

  return (
    <div className="text-fg-secondary ml-auto flex items-center gap-0.5">
      <span
        className={cn(
          current > 0 && !over && 'text-fg-primary',
          over && 'text-status-error',
        )}>
        {current}
      </span>
      <span>/</span>
      <span>{max}</span>
    </div>
  );
}

// ============================================================================
// Library-agnostic error normalization
// ============================================================================

type TanStackFieldErrors = ReadonlyArray<
  string | { message?: string } | null | undefined
>;

type NormalizedFieldError = { message?: string };

function normalizeTanStackErrors(
  errors: TanStackFieldErrors,
): NormalizedFieldError[] {
  return errors
    .filter((e): e is string | { message?: string } => Boolean(e))
    .map(e => (typeof e === 'string' ? { message: e } : e));
}

function getTanStackFieldStatus(meta: {
  isTouched: boolean;
  isValid: boolean;
  errors: TanStackFieldErrors;
}): { isInvalid: boolean; errors: NormalizedFieldError[] } {
  const isInvalid = meta.isTouched && !meta.isValid;
  return { isInvalid, errors: normalizeTanStackErrors(meta.errors) };
}

// ============================================================================
// Time-string helpers (form value is "HH:mm"; TimeInput is hour + minute)
// ============================================================================

function parseTimeFieldString(value: string | undefined) {
  if (!value) {
    return { hour: null as number | null, minute: null as number | null };
  }

  const [h, m] = value.split(':');
  const hour = h ? Number.parseInt(h, 10) : null;
  const minute = m ? Number.parseInt(m, 10) : null;

  return {
    hour: Number.isFinite(hour) ? hour : null,
    minute: Number.isFinite(minute) ? minute : null,
  };
}

function formatTimeFieldValue(hour: number | null, minute: number | null) {
  if (hour === null && minute === null) {
    return '';
  }

  const hh = String(hour ?? 0).padStart(2, '0');
  const mm = String(minute ?? 0).padStart(2, '0');

  return `${hh}:${mm}`;
}

// ============================================================================
// Shared date popover plumbing
// ============================================================================

function useDatePickerField(value: string) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(undefined);

  const parsedDate = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined;
  const selectedDate =
    parsedDate && isValid(parsedDate) ? parsedDate : undefined;

  const syncMonthFromValue = React.useCallback((raw: string) => {
    if (!raw) {
      return;
    }

    const parsed = parse(raw, 'yyyy-MM-dd', new Date());

    if (isValid(parsed)) {
      setMonth(parsed);
    }
  }, []);

  return {
    open,
    setOpen,
    month,
    setMonth,
    selectedDate,
    syncMonthFromValue,
  };
}

// ============================================================================
// FieldRow adapters — library-agnostic field renderers.
// Each recipe maps its library's state into these props so the rendered
// shape stays identical and the diff between recipes is purely the binding
// layer (RHF Controller vs TanStack form.Field).
// ============================================================================

type CommonRowProps = {
  id: string;
  name: string;
  label: string;
  description?: string;
  errorMessage?: string;
  invalid: boolean;
};

type TextLikeRowProps = CommonRowProps & {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  variant?: 'default' | 'inline';
};

function TextFieldRow({
  id,
  name,
  label,
  description,
  errorMessage,
  invalid,
  placeholder,
  value,
  onChange,
  onBlur,
  variant = 'default',
}: Readonly<TextLikeRowProps>) {
  const labelClass =
    variant === 'inline' ? formFieldInlineLabel : formFieldDefaultLabel;

  return (
    <Field data-invalid={invalid} className="gap-2">
      <FieldLabel htmlFor={id} className={labelClass}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        variant={variant === 'inline' ? 'inline' : undefined}
        aria-invalid={invalid}
        placeholder={placeholder}
      />
      {errorMessage ? (
        <FieldError>{errorMessage}</FieldError>
      ) : description ? (
        <FieldDescription className={formFieldDefaultDescription}>
          {description}
        </FieldDescription>
      ) : null}
    </Field>
  );
}

type DateRowProps = CommonRowProps & {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  variant?: 'default' | 'inline';
};

function DateFieldRow({
  id,
  name,
  label,
  description,
  errorMessage,
  invalid,
  value,
  onChange,
  onBlur,
  variant = 'default',
}: Readonly<DateRowProps>) {
  const labelClass =
    variant === 'inline' ? datePickerInlineLabel : datePickerLabel;
  const inputGroupVariant = variant === 'inline' ? 'inline' : undefined;
  const inputVariant = variant === 'inline' ? 'inline' : undefined;

  const { open, setOpen, month, setMonth, selectedDate, syncMonthFromValue } =
    useDatePickerField(value);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);

    if (next) {
      syncMonthFromValue(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    onChange(next);
    syncMonthFromValue(next);
  };

  const handleCalendarSelect = (d: Date | undefined) => {
    onChange(d ? format(d, 'yyyy-MM-dd') : '');

    if (d) {
      setMonth(d);
    }

    setOpen(false);
  };

  return (
    <Field data-invalid={invalid} className={cn('min-w-0 gap-2')}>
      <FieldLabel htmlFor={id} className={labelClass}>
        {label}
      </FieldLabel>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <InputGroup
            variant={inputGroupVariant}
            data-open={open}
            className="cursor-pointer">
            <InputGroupInput
              id={id}
              name={name}
              type="date"
              variant={inputVariant}
              value={value}
              onChange={handleInputChange}
              onBlur={onBlur}
              data-empty={value ? 'false' : 'true'}
              className={dateInputClassName}
              aria-invalid={invalid}
              aria-label={label}
            />
            <InputGroupAddon align="inline-end">
              <span className="flex size-5 cursor-pointer items-center justify-center">
                <IconShell size="sm">
                  <CalendarMonth className="text-[length:inherit]" />
                </IconShell>
              </span>
            </InputGroupAddon>
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}
          onOpenAutoFocus={e => e.preventDefault()}>
          <Calendar
            mode="single"
            size="default"
            month={month}
            onMonthChange={setMonth}
            selected={selectedDate}
            onSelect={handleCalendarSelect}
          />
        </PopoverContent>
      </Popover>
      {errorMessage ? (
        <FieldError>{errorMessage}</FieldError>
      ) : description ? (
        <FieldDescription>{description}</FieldDescription>
      ) : null}
    </Field>
  );
}

type TimeRowProps = CommonRowProps & {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  variant?: 'default' | 'inline';
};

function TimeFieldRow({
  id,
  name,
  label,
  description,
  errorMessage,
  invalid,
  value,
  onChange,
  onBlur,
  variant = 'default',
}: Readonly<TimeRowProps>) {
  const labelClass =
    variant === 'inline' ? formFieldInlineLabel : formFieldDefaultLabel;
  const { hour, minute } = parseTimeFieldString(value);

  return (
    <Field data-invalid={invalid} className="gap-2">
      <FieldLabel htmlFor={id} className={labelClass}>
        {label}
      </FieldLabel>
      <TimeInput
        id={id}
        name={name}
        hour={hour}
        minute={minute}
        onHourChange={h => onChange(formatTimeFieldValue(h, minute))}
        onMinuteChange={m => onChange(formatTimeFieldValue(hour, m))}
        onBlur={onBlur}
        aria-invalid={invalid}
        variant={variant === 'inline' ? 'inline' : 'default'}
      />
      {errorMessage ? (
        <FieldError>{errorMessage}</FieldError>
      ) : description ? (
        <FieldDescription className={formFieldDefaultDescription}>
          {description}
        </FieldDescription>
      ) : null}
    </Field>
  );
}

type TextareaRowProps = CommonRowProps & {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  maxChars: number;
};

function TextareaFieldRow({
  id,
  name,
  label,
  description,
  errorMessage,
  invalid,
  placeholder,
  value,
  onChange,
  onBlur,
  maxChars,
}: Readonly<TextareaRowProps>) {
  const length = value?.length ?? 0;
  const overMax = length > maxChars;
  const effectiveInvalid = invalid || overMax;
  const overflowMessage =
    !errorMessage && overMax ? `Max ${maxChars} characters.` : undefined;
  const displayedMessage = errorMessage ?? overflowMessage;

  return (
    <Field data-invalid={effectiveInvalid} className="gap-2">
      <div className="flex flex-col gap-2">
        <FieldLabel
          htmlFor={id}
          className={cn(
            formFieldDefaultLabel,
            'flex w-full items-center justify-between',
          )}>
          {label}
          <FormBioCharCount current={length} max={maxChars} />
        </FieldLabel>
        <Textarea
          id={id}
          name={name}
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={effectiveInvalid}
          placeholder={placeholder}
          rows={4}
        />
      </div>
      {displayedMessage ? (
        <FieldError>{displayedMessage}</FieldError>
      ) : description ? (
        <FieldDescription className={formFieldDefaultDescription}>
          {description}
        </FieldDescription>
      ) : null}
    </Field>
  );
}

type CheckboxRowProps = {
  id: string;
  name: string;
  label: string;
  errorMessage?: string;
  invalid?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function CheckboxFieldRow({
  id,
  name,
  label,
  errorMessage,
  invalid,
  checked,
  onChange,
}: Readonly<CheckboxRowProps>) {
  return (
    <div className={formDemoShell.checkboxBlock}>
      <Field orientation="horizontal" data-invalid={invalid} className="gap-2">
        <Checkbox
          id={id}
          name={name}
          checked={checked}
          onCheckedChange={v => onChange(v === true)}
        />
        <FieldLabel htmlFor={id} className="paragraph-regular-primary">
          {label}
        </FieldLabel>
      </Field>
      {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}
    </div>
  );
}

// ============================================================================
// React Hook Form recipe (stacked / default layout)
//
// Validation strategy: `onTouched` — errors appear after first blur and then
// re-validate on every change. Matches the TanStack recipe so both demos
// behave the same way for the user; only the binding layer differs.
// ============================================================================

const RHF_FORM_ID = 'form-rhf-demo';

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
        <div className={formDemoShell.fieldsColumn}>
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

        <div className={formDemoShell.dateTimeGrid}>
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

        <div className={formDemoShell.checksColumn}>
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

const TS_FORM_ID = 'form-tanstack-demo';

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
        <div className={formDemoShell.fieldsColumn}>
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

        <div className={formDemoShell.dateTimeGrid}>
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

        <div className={formDemoShell.checksColumn}>
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
