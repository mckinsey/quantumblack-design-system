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
import { cn } from '@/lib/utils';

import { dateInputClassName } from './date-picker';
import { inputGroupFieldConfig } from './input-group-config';
import { TimePickerFieldInput } from './time-picker';

const formFieldDefault = inputGroupFieldConfig.default;
const formFieldInlineLabelClass = cn(formFieldDefault.label, 'mb-[-4px]');

/** Match {@link DatePickerDemo} label styling */
const datePickerLabelClassName = 'label-regular-primary';

/** Match {@link DatePickerInlineSizes} default row */
const datePickerInlineLabelClassName = cn(
  datePickerLabelClassName,
  'mb-[-4px]',
);

const BIO_MAX_CHARACTERS = 150;

/** Form-demo-only counter; avoids TextareaRoot until textarea primitive is simplified. */
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

const formSchema = z.object({
  field1: z.string().min(1, 'This field is required.'),
  field2: z.string().min(1, 'This field is required.'),
  date: z.string().min(1, 'Date is required.'),
  time: z.string().min(1, 'Time is required.'),
  bio: z
    .string()
    .min(1, 'Required.')
    .max(BIO_MAX_CHARACTERS, 'Max 150 characters.'),
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

// ============================================================================
// Shared visual shell
// ============================================================================

function FormShellHeader() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="headings-h2-regular text-fg-primary">
        Form Title Goes Here
      </h2>
      <p className="paragraph-large-primary text-fg-secondary">
        Fill in the fields below so we can verify your details and provide the
        most relevant results. Please ensure all information is accurate to
        avoid any processing delays.
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
        Submit
      </Button>
      <Button type="button" variant="outline" onClick={onReset}>
        Cancel
      </Button>
    </div>
  );
}

const formDemoShell = {
  /** Outer page column (demo max width) */
  root: 'flex w-full max-w-[420px] min-w-[320px] flex-col gap-8 py-4',
  /** Native form layout */
  form: 'flex w-[420px] flex-col gap-8',
  /** First block: stacked text fields */
  fieldsColumn: 'flex flex-col gap-6',
  /** Date + time row */
  dateTimeGrid: 'grid grid-cols-2 gap-6',
  /** Checkbox group */
  checksColumn: 'flex flex-col gap-4',
  /** Single checkbox + error */
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

const RHF_FORM_ID = 'form-rhf-demo';

export function ReactHookForm() {
  const form = useRhfForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const [dateOpen, setDateOpen] = React.useState(false);
  const [rhfDateMonth, setRhfDateMonth] = React.useState<Date | undefined>(
    undefined,
  );

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
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor={field.name}
                  className={formFieldDefault.label}>
                  Field label
                </FieldLabel>
                <Input
                  id={field.name}
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Placeholder"
                />
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription className={formFieldDefault.description}>
                    Helper text
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="field2"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor={field.name}
                  className={formFieldDefault.label}>
                  Field label
                </FieldLabel>
                <Input
                  id={field.name}
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Placeholder"
                />
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription className={formFieldDefault.description}>
                    Helper text
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </div>

        <div className={formDemoShell.dateTimeGrid}>
          <Controller
            control={form.control}
            name="date"
            render={({ field, fieldState }) => {
              const parsedDate = field.value
                ? parse(field.value, 'yyyy-MM-dd', new Date())
                : undefined;

              const selected =
                parsedDate && isValid(parsedDate) ? parsedDate : undefined;

              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className={cn('min-w-0 gap-2')}>
                  <FieldLabel
                    htmlFor={field.name}
                    className={datePickerLabelClassName}>
                    Select Date
                  </FieldLabel>
                  <Popover
                    open={dateOpen}
                    onOpenChange={open => {
                      setDateOpen(open);

                      if (open) {
                        const raw = field.value;
                        const parsed = raw
                          ? parse(raw, 'yyyy-MM-dd', new Date())
                          : undefined;

                        if (parsed && isValid(parsed)) {
                          setRhfDateMonth(parsed);
                        }
                      }
                    }}>
                    <PopoverTrigger asChild>
                      <InputGroup
                        data-open={dateOpen}
                        className="cursor-pointer">
                        <InputGroupInput
                          id={field.name}
                          type="date"
                          value={field.value ?? ''}
                          onChange={e => {
                            const v = e.target.value;
                            field.onChange(v);

                            if (!v) {
                              return;
                            }

                            const parsed = parse(v, 'yyyy-MM-dd', new Date());

                            if (isValid(parsed)) {
                              setRhfDateMonth(parsed);
                            }
                          }}
                          onBlur={field.onBlur}
                          data-empty={field.value ? 'false' : 'true'}
                          className={dateInputClassName}
                          aria-invalid={fieldState.invalid}
                          aria-label="Date"
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
                        month={rhfDateMonth}
                        onMonthChange={setRhfDateMonth}
                        selected={selected}
                        onSelect={d => {
                          field.onChange(d ? format(d, 'yyyy-MM-dd') : '');

                          if (d) {
                            setRhfDateMonth(d);
                          }

                          setDateOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.error ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>Helper text</FieldDescription>
                  )}
                </Field>
              );
            }}
          />

          <Controller
            control={form.control}
            name="time"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor={field.name}
                  className={formFieldDefault.label}>
                  Select Time
                </FieldLabel>
                <TimePickerFieldInput
                  id={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  aria-invalid={fieldState.invalid}
                  variant="default"
                />
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription className={formFieldDefault.description}>
                    Helper text
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="bio"
          render={({ field, fieldState }) => {
            const len = field.value?.length ?? 0;
            const overMax = len > BIO_MAX_CHARACTERS;
            const zodMessage = fieldState.error?.message;
            const descriptionMessage =
              zodMessage ??
              (overMax ? `Max ${BIO_MAX_CHARACTERS} characters.` : null);
            const descriptionIsError = Boolean(descriptionMessage);

            return (
              <Field
                data-invalid={fieldState.invalid || overMax}
                className="gap-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className={cn(
                      formFieldDefault.label,
                      'flex w-full items-center justify-between',
                    )}>
                    Field label
                    <FormBioCharCount current={len} max={BIO_MAX_CHARACTERS} />
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    {...field}
                    aria-invalid={fieldState.invalid || overMax}
                    placeholder="Hint text"
                    rows={4}
                  />
                </div>
                {descriptionIsError ? (
                  <FieldError>{descriptionMessage}</FieldError>
                ) : (
                  <FieldDescription className={formFieldDefault.description}>
                    Helper text
                  </FieldDescription>
                )}
              </Field>
            );
          }}
        />

        <div className={formDemoShell.checksColumn}>
          <Controller
            control={form.control}
            name="acceptTerms"
            render={({ field, fieldState }) => (
              <div className={formDemoShell.checkboxBlock}>
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="gap-2">
                  <Checkbox
                    id={field.name}
                    checked={Boolean(field.value)}
                    onCheckedChange={v => field.onChange(v === true)}
                  />
                  <FieldLabel
                    htmlFor={field.name}
                    className="paragraph-regular-primary">
                    I accept the Terms and Conditions
                  </FieldLabel>
                </Field>
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="newsletter"
            render={({ field }) => (
              <Field orientation="horizontal" className="gap-2">
                <Checkbox
                  id={field.name}
                  checked={Boolean(field.value)}
                  onCheckedChange={v => field.onChange(v === true)}
                />
                <FieldLabel
                  htmlFor={field.name}
                  className="paragraph-regular-primary">
                  Sign me up for news and exclusive updates.
                </FieldLabel>
              </Field>
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

const TS_FORM_ID = 'form-tanstack-demo';

type TanStackFieldErrors = Array<
  string | { message?: string } | null | undefined
>;

function normalizeTanStackErrors(errors: TanStackFieldErrors) {
  return errors
    .filter((e): e is string | { message?: string } => Boolean(e))
    .map(e => (typeof e === 'string' ? { message: e } : e));
}

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

  const [dateOpen, setDateOpen] = React.useState(false);
  const [tsDateMonth, setTsDateMonth] = React.useState<Date | undefined>(
    undefined,
  );

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
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className={formFieldInlineLabelClass}>
                    Field label
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    variant="inline"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Hint text"
                  />
                  {isInvalid ? (
                    <FieldError
                      errors={normalizeTanStackErrors(field.state.meta.errors)}
                    />
                  ) : (
                    <FieldDescription className={formFieldDefault.description}>
                      Helper text
                    </FieldDescription>
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="field2">
            {field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className={formFieldInlineLabelClass}>
                    Field label
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    variant="inline"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Hint text"
                  />
                  {isInvalid ? (
                    <FieldError
                      errors={normalizeTanStackErrors(field.state.meta.errors)}
                    />
                  ) : (
                    <FieldDescription className={formFieldDefault.description}>
                      Helper text
                    </FieldDescription>
                  )}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <div className={formDemoShell.dateTimeGrid}>
          <form.Field name="date">
            {field => {
              const dateErrors = normalizeTanStackErrors(
                field.state.meta.errors,
              );
              const hasDateError = dateErrors.length > 0;

              const value = field.state.value ?? '';
              const parsedDate = value
                ? parse(value, 'yyyy-MM-dd', new Date())
                : undefined;
              const selected =
                parsedDate && isValid(parsedDate) ? parsedDate : undefined;

              return (
                <Field
                  data-invalid={hasDateError}
                  className={cn('min-w-0 gap-2')}>
                  <FieldLabel
                    htmlFor={field.name}
                    className={datePickerInlineLabelClassName}>
                    Select Date
                  </FieldLabel>
                  <Popover
                    open={dateOpen}
                    onOpenChange={open => {
                      setDateOpen(open);

                      if (open) {
                        const raw = field.state.value;
                        const parsed = raw
                          ? parse(raw, 'yyyy-MM-dd', new Date())
                          : undefined;

                        if (parsed && isValid(parsed)) {
                          setTsDateMonth(parsed);
                        }
                      }
                    }}>
                    <PopoverTrigger asChild>
                      <InputGroup
                        variant="inline"
                        data-open={dateOpen}
                        className="cursor-pointer">
                        <InputGroupInput
                          id={field.name}
                          name={field.name}
                          type="date"
                          variant="inline"
                          value={value}
                          onChange={e => {
                            const v = e.target.value;
                            field.handleChange(v);

                            if (!v) {
                              return;
                            }

                            const parsed = parse(v, 'yyyy-MM-dd', new Date());

                            if (isValid(parsed)) {
                              setTsDateMonth(parsed);
                            }
                          }}
                          onBlur={field.handleBlur}
                          data-empty={value ? 'false' : 'true'}
                          className={dateInputClassName}
                          aria-invalid={hasDateError}
                          aria-label="Date"
                        />
                        <InputGroupAddon align="inline-end">
                          <span
                            className={cn(
                              'flex cursor-pointer items-center justify-center',
                            )}>
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
                        month={tsDateMonth}
                        onMonthChange={setTsDateMonth}
                        selected={selected}
                        onSelect={d => {
                          field.handleChange(d ? format(d, 'yyyy-MM-dd') : '');

                          if (d) {
                            setTsDateMonth(d);
                          }

                          setDateOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {hasDateError ? (
                    <FieldError errors={dateErrors} />
                  ) : (
                    <FieldDescription>Helper text</FieldDescription>
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="time">
            {field => {
              const timeErrors = normalizeTanStackErrors(
                field.state.meta.errors,
              );
              const hasTimeError = timeErrors.length > 0;

              return (
                <Field data-invalid={hasTimeError} className="gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className={formFieldInlineLabelClass}>
                    Select Time
                  </FieldLabel>
                  <TimePickerFieldInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    aria-invalid={hasTimeError}
                    variant="inline"
                  />
                  {hasTimeError ? (
                    <FieldError errors={timeErrors} />
                  ) : (
                    <FieldDescription className={formFieldDefault.description}>
                      Helper text
                    </FieldDescription>
                  )}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="bio">
          {field => {
            const len = field.state.value?.length ?? 0;
            const overMax = len > BIO_MAX_CHARACTERS;
            const isSchemaInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const isInvalid = overMax || isSchemaInvalid;
            const errors = normalizeTanStackErrors(field.state.meta.errors);
            const schemaMessage = errors
              .map(e => e.message)
              .filter(Boolean)
              .at(0);
            const descriptionMessage =
              schemaMessage ??
              (overMax ? `Max ${BIO_MAX_CHARACTERS} characters.` : null);
            const descriptionIsError = Boolean(descriptionMessage);

            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className={cn(
                      formFieldDefault.label,
                      'flex w-full items-center justify-between',
                    )}>
                    Field label
                    <FormBioCharCount current={len} max={BIO_MAX_CHARACTERS} />
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Hint text"
                    rows={4}
                  />
                </div>
                {descriptionIsError ? (
                  <FieldError>{descriptionMessage}</FieldError>
                ) : (
                  <FieldDescription className={formFieldDefault.description}>
                    Helper text
                  </FieldDescription>
                )}
              </Field>
            );
          }}
        </form.Field>

        <div className={formDemoShell.checksColumn}>
          <form.Field name="acceptTerms">
            {field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className={formDemoShell.checkboxBlock}>
                  <Field
                    orientation="horizontal"
                    data-invalid={isInvalid}
                    className="gap-2">
                    <Checkbox
                      id={field.name}
                      checked={Boolean(field.state.value)}
                      onCheckedChange={v => field.handleChange(v === true)}
                    />
                    <FieldLabel
                      htmlFor={field.name}
                      className="paragraph-regular-primary">
                      I accept the Terms and Conditions
                    </FieldLabel>
                  </Field>
                  {isInvalid ? (
                    <FieldError
                      errors={normalizeTanStackErrors(field.state.meta.errors)}
                    />
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          <form.Field name="newsletter">
            {field => (
              <Field orientation="horizontal" className="gap-2">
                <Checkbox
                  id={field.name}
                  checked={Boolean(field.state.value)}
                  onCheckedChange={v => field.handleChange(v === true)}
                />
                <FieldLabel
                  htmlFor={field.name}
                  className="paragraph-regular-primary">
                  Sign me up for news and exclusive updates.
                </FieldLabel>
              </Field>
            )}
          </form.Field>
        </div>
      </FormDemoForm>

      <FormShellFooter formId={TS_FORM_ID} onReset={() => form.reset()} />
    </FormDemoContainer>
  );
}
