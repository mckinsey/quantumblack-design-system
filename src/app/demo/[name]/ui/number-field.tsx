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

  const feedbackClass = {
    error: 'text-status-error',
    warning: 'text-status-warning',
    success: 'text-status-success',
  } as const;

  const states = [
    {
      label: 'Error',
      tone: 'error' as const,
      defaultGroupClass: '',
      inlineGroupClass: '',
      inputProps: { 'aria-invalid': true as const },
      feedback: { tone: 'error' as const, text: 'Please correct this field' },
    },
    {
      label: 'Warning',
      tone: 'warning' as const,
      defaultGroupClass: 'border-stroke-status-warning',
      inlineGroupClass: 'border-b-stroke-status-warning',
      feedback: { tone: 'warning' as const, text: 'Please review this value' },
    },
    {
      label: 'Success',
      tone: 'success' as const,
      defaultGroupClass: 'border-stroke-status-success',
      inlineGroupClass: 'border-b-stroke-status-success',
      feedback: { tone: 'success' as const, text: 'Looks good' },
    },
    {
      label: 'Disabled',
      tone: 'disabled' as const,
      defaultGroupClass: '',
      inlineGroupClass: '',
      disabled: true,
      helper: 'This field is disabled',
    },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-6 self-stretch">
        {states.map(
          ({
            label,
            tone,
            defaultGroupClass,
            inlineGroupClass,
            disabled,
            inputProps,
            feedback,
            helper,
          }) => {
            const isDisabled = Boolean(disabled);

            const renderField = (variant: 'default' | 'inline') => {
              const fieldId = `number-field-state-${tone}-${variant}`;
              const groupClass =
                variant === 'inline' ? inlineGroupClass : defaultGroupClass;

              return (
                <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
                  <FieldLabel
                    htmlFor={fieldId}
                    disabled={isDisabled}
                    className={getLabelClass('default', variant)}>
                    {label}
                  </FieldLabel>
                  <NumberField
                    id={fieldId}
                    defaultValue={234}
                    min={0}
                    max={999}
                    disabled={isDisabled}>
                    <NumberFieldGroup
                      variant={variant}
                      className={groupClass || undefined}>
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
                      <FieldDescription
                        className={feedbackClass[feedback.tone]}>
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
            };

            return (
              <div
                key={tone}
                className="flex flex-wrap items-start justify-center gap-6">
                {renderField('default')}
                {renderField('inline')}
              </div>
            );
          },
        )}
    </div>
  );
}

export function NumberFieldBounds() {
  const { gap } = numberFieldFieldConfig.default;

  const bounds = [
    {
      label: 'At minimum',
      id: 'number-field-at-min',
      defaultValue: 0,
      helper: 'Decrement disabled at 0',
    },
    {
      label: 'At maximum',
      id: 'number-field-at-max',
      defaultValue: 10,
      helper: 'Increment disabled at 10',
    },
  ] as const;

  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {bounds.map(({ label, id, defaultValue, helper }) => (
        <FieldSet key={id} className={`${FIELD_WIDTH} ${gap}`}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <NumberField id={id} defaultValue={defaultValue} min={0} max={10}>
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput placeholder="0" />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
          <FieldDescription>{helper}</FieldDescription>
        </FieldSet>
      ))}
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
    name: 'NumberFieldBounds',
    title: 'Min / Max',
    description:
      'Stepper buttons disable at bounds. Decrement at min, increment at max.',
  },
  {
    name: 'NumberFieldStates',
    title: 'Validation',
    description:
      'Error, warning, success, and disabled states in filled and ghost variants.',
  },
];

export const numberField = createLegacyDemo('number-field', examples, {
  NumberFieldDemo: <NumberFieldDemo />,
  NumberFieldVariants: <NumberFieldVariants />,
  NumberFieldSizes: <NumberFieldSizes />,
  NumberFieldBounds: <NumberFieldBounds />,
  NumberFieldStates: <NumberFieldStates />,
});
