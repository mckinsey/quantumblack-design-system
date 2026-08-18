'use client';

import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

const FIELD_WIDTH = 'w-[240px]';

const numberFieldFieldConfig = {
  sm: { gap: 'gap-2' },
  default: { gap: 'gap-2' },
  lg: { gap: 'gap-2' },
} as const;

const getLabelClass = (
  size: keyof typeof numberFieldFieldConfig,
  variant: 'default' | 'inline' = 'default',
) => cn(variant === 'inline' && size !== 'sm' && 'mb-[-4px]');

export function NumberFieldDemo() {
  const { gap } = numberFieldFieldConfig.default;

  return (
    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
      <FieldLabel htmlFor="number-field-demo">Label</FieldLabel>
      <NumberField id="number-field-demo" defaultValue={234} min={0} max={999}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput placeholder="000" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <FieldDescription>Helper text</FieldDescription>
    </FieldSet>
  );
}

export function NumberFieldVariants() {
  const { gap } = numberFieldFieldConfig.default;

  return (
    <div className={`${FIELD_WIDTH} space-y-4`}>
      <FieldSet className={gap}>
        <FieldLabel htmlFor="number-field-filled">Label</FieldLabel>
        <NumberField
          id="number-field-filled"
          defaultValue={234}
          min={0}
          max={999}>
          <NumberFieldGroup variant="default">
            <NumberFieldDecrement />
            <NumberFieldInput placeholder="000" />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
        <FieldDescription>Helper text</FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldLabel
          htmlFor="number-field-ghost"
          className={getLabelClass('default', 'inline')}>
          Label
        </FieldLabel>
        <NumberField
          id="number-field-ghost"
          defaultValue={234}
          min={0}
          max={999}>
          <NumberFieldGroup variant="inline">
            <NumberFieldDecrement />
            <NumberFieldInput placeholder="000" />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
        <FieldDescription>Helper text</FieldDescription>
      </FieldSet>
    </div>
  );
}

export function NumberFieldSizes() {
  const sizes = [
    { size: 'sm' as const },
    { size: 'default' as const },
    { size: 'lg' as const },
  ];

  return (
    <div className="space-y-6">
      {sizes.map(({ size }) => {
        const { gap } = numberFieldFieldConfig[size];
        const fieldId = `number-field-size-${size}`;

        return (
          <div key={size} className="flex gap-6">
            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldLabel htmlFor={`${fieldId}-filled`} size={size}>
                Label
              </FieldLabel>
              <NumberField
                id={`${fieldId}-filled`}
                defaultValue={234}
                min={0}
                max={999}>
                <NumberFieldGroup size={size}>
                  <NumberFieldDecrement />
                  <NumberFieldInput placeholder="000" />
                  <NumberFieldIncrement />
                </NumberFieldGroup>
              </NumberField>
              <FieldDescription size={size}>Helper text</FieldDescription>
            </FieldSet>

            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldLabel
                htmlFor={`${fieldId}-ghost`}
                size={size}
                className={getLabelClass(size, 'inline')}>
                Label
              </FieldLabel>
              <NumberField
                id={`${fieldId}-ghost`}
                defaultValue={234}
                min={0}
                max={999}>
                <NumberFieldGroup variant="inline" size={size}>
                  <NumberFieldDecrement />
                  <NumberFieldInput placeholder="000" />
                  <NumberFieldIncrement />
                </NumberFieldGroup>
              </NumberField>
              <FieldDescription size={size}>Helper text</FieldDescription>
            </FieldSet>
          </div>
        );
      })}
    </div>
  );
}

export function NumberFieldStates() {
  const { gap } = numberFieldFieldConfig.default;

  const states = [
    {
      label: 'Filled',
      fieldProps: { defaultValue: 234 },
      helper: 'Value has been entered',
    },
    {
      label: 'Disabled',
      fieldProps: { defaultValue: 234, disabled: true },
      helper: 'This field is disabled',
    },
    {
      label: 'Error',
      fieldProps: { defaultValue: 234 },
      inputProps: { 'aria-invalid': true as const },
      feedback: { tone: 'error' as const, text: 'Please correct this field' },
    },
    {
      label: 'Warning',
      fieldProps: { defaultValue: 234 },
      groupClass: 'border-stroke-status-warning',
      feedback: { tone: 'warning' as const, text: 'Please review this value' },
    },
    {
      label: 'Success',
      fieldProps: { defaultValue: 234 },
      groupClass: 'border-stroke-status-success',
      feedback: { tone: 'success' as const, text: 'Looks good' },
    },
  ];

  const feedbackClass = {
    error: 'text-status-error',
    warning: 'text-status-warning',
    success: 'text-status-success',
  } as const;

  return (
    <div className="space-y-6">
      {states.map(
        ({ label, fieldProps, helper, inputProps, groupClass, feedback }) => {
          const fieldId = `number-field-state-${label.toLowerCase()}`;
          const isDisabled = Boolean(fieldProps.disabled);

          return (
            <FieldSet key={label} className={`${FIELD_WIDTH} ${gap}`}>
              <FieldLabel
                htmlFor={fieldId}
                disabled={isDisabled}
                className={getLabelClass('default')}>
                {label}
              </FieldLabel>
              <NumberField id={fieldId} min={0} max={999} {...fieldProps}>
                <NumberFieldGroup className={groupClass}>
                  <NumberFieldDecrement />
                  <NumberFieldInput placeholder="000" {...inputProps} />
                  <NumberFieldIncrement />
                </NumberFieldGroup>
              </NumberField>
              {feedback ? (
                feedback.tone === 'error' ? (
                  <FieldError className={feedbackClass.error}>
                    {feedback.text}
                  </FieldError>
                ) : (
                  <FieldDescription className={feedbackClass[feedback.tone]}>
                    {feedback.text}
                  </FieldDescription>
                )
              ) : (
                <FieldDescription disabled={isDisabled}>
                  {helper}
                </FieldDescription>
              )}
            </FieldSet>
          );
        },
      )}
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'NumberFieldDemo',
    title: 'Default',
    description: 'Numeric stepper with increment and decrement controls.',
  },
  {
    name: 'NumberFieldVariants',
    title: 'Variants',
    description: 'Filled and ghost (inline) stepper styles.',
  },
  {
    name: 'NumberFieldSizes',
    title: 'Sizes',
    description: 'Small, default, and large in both variants.',
  },
  {
    name: 'NumberFieldStates',
    title: 'Validation',
    description: 'Error, warning, success, and disabled states.',
  },
];

export const numberField = createLegacyDemo('number-field', examples, {
  NumberFieldDemo: <NumberFieldDemo />,
  NumberFieldVariants: <NumberFieldVariants />,
  NumberFieldSizes: <NumberFieldSizes />,
  NumberFieldStates: <NumberFieldStates />,
});
