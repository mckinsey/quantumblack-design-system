import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const FIELD_WIDTH = 'w-[240px]';

// Per-size field layout config: typography + gap
const inputFieldConfig = {
  sm: {
    label: 'label-small-primary text-fg-secondary',
    description: 'paragraph-small-primary text-fg-tertiary',
    gap: 'gap-2',
  },
  default: {
    label: 'label-regular-primary text-fg-secondary',
    description: 'paragraph-regular-primary text-fg-tertiary',
    gap: 'gap-2',
  },
  lg: {
    label: 'label-large-primary text-fg-secondary',
    description: 'paragraph-regular-primary text-fg-tertiary',
    gap: 'gap-2',
  },
} as const;

const getInputLabelClass = (
  size: keyof typeof inputFieldConfig,
  variant: 'default' | 'inline' = 'default',
) => {
  return cn(
    inputFieldConfig[size].label,
    variant === 'inline' && size !== 'sm' && 'mb-[-4px]',
  );
};

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Default input example
 */
export function InputDemo() {
  const { description, gap } = inputFieldConfig.default;

  return (
    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
      <FieldLabel
        htmlFor="input-demo"
        className={getInputLabelClass('default')}>
        Label
      </FieldLabel>
      <Input id="input-demo" placeholder="Placeholder" />
      <FieldDescription className={description}>Helper text</FieldDescription>
    </FieldSet>
  );
}

/**
 * Input variants - default and inline
 */
export function InputVariants() {
  const { description, gap } = inputFieldConfig.default;

  return (
    <div className={`${FIELD_WIDTH} space-y-4`}>
      <FieldSet className={gap}>
        <FieldLabel
          htmlFor="input-variant-default"
          className={getInputLabelClass('default')}>
          Label
        </FieldLabel>
        <Input id="input-variant-default" placeholder="Placeholder" />
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldLabel
          htmlFor="input-variant-inline"
          className={getInputLabelClass('default', 'inline')}>
          Label
        </FieldLabel>
        <Input
          id="input-variant-inline"
          variant="inline"
          placeholder="Placeholder"
        />
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>
    </div>
  );
}

/**
 * Input sizes - default and inline variants side by side
 */
export function InputSizes() {
  const sizes = [
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
  ];

  return (
    <div className="space-y-6">
      {sizes.map(({ size }) => {
        const { description, gap } = inputFieldConfig[size];

        return (
          <div key={size} className="flex gap-6">
            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldLabel
                htmlFor={`input-size-${size}`}
                className={getInputLabelClass(size)}>
                Label
              </FieldLabel>
              <Input
                id={`input-size-${size}`}
                size={size}
                placeholder="Placeholder"
              />
              <FieldDescription className={description}>
                Helper text
              </FieldDescription>
            </FieldSet>

            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldLabel
                htmlFor={`input-size-${size}-inline`}
                className={getInputLabelClass(size, 'inline')}>
                Label
              </FieldLabel>
              <Input
                id={`input-size-${size}-inline`}
                size={size}
                variant="inline"
                placeholder="Placeholder"
              />
              <FieldDescription className={description}>
                Helper text
              </FieldDescription>
            </FieldSet>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Input states — default variant
 */
export function InputStates() {
  const { description: descriptionClass, gap } = inputFieldConfig.default;

  const states = [
    {
      label: 'Filled',
      props: { defaultValue: 'Some text value' },
      helper: 'Value has been entered',
    },
    {
      label: 'Disabled',
      props: { disabled: true, placeholder: 'Placeholder' },
      helper: 'This field is disabled',
    },
    {
      label: 'Error',
      props: { 'aria-invalid': true, placeholder: 'Placeholder' } as const,
      feedback: {
        tone: 'error' as const,
        text: 'Please correct this field',
      },
    },
    {
      label: 'Warning',
      props: {
        className: 'border-stroke-status-warning',
        placeholder: 'Placeholder',
      },
      feedback: {
        tone: 'warning' as const,
        text: 'Please review this value',
      },
    },
    {
      label: 'Success',
      props: {
        className: 'border-stroke-status-success',
        placeholder: 'Placeholder',
      },
      feedback: {
        tone: 'success' as const,
        text: 'Looks good',
      },
    },
  ];

  const feedbackClass = {
    error: 'text-status-error',
    warning: 'text-status-warning',
    success: 'text-status-success',
  } as const;

  return (
    <div className="space-y-6">
      {states.map(({ label, props, helper, feedback }) => {
        const stateId = `input-state-${label.toLowerCase()}`;

        return (
          <FieldSet key={label} className={`${FIELD_WIDTH} ${gap}`}>
            <FieldLabel
              htmlFor={stateId}
              className={getInputLabelClass('default')}>
              {label}
            </FieldLabel>
            <Input id={stateId} {...props} />
            {feedback ? (
              feedback.tone === 'error' ? (
                <FieldError
                  className={`${descriptionClass} ${feedbackClass.error}`}>
                  {feedback.text}
                </FieldError>
              ) : (
                <FieldDescription
                  className={`${descriptionClass} ${feedbackClass[feedback.tone]}`}>
                  {feedback.text}
                </FieldDescription>
              )
            ) : (
              <FieldDescription className={descriptionClass}>
                {helper}
              </FieldDescription>
            )}
          </FieldSet>
        );
      })}
    </div>
  );
}

/**
 * Input types — default variant
 */
export function InputTypes() {
  const { description, gap } = inputFieldConfig.default;

  const types = [
    {
      label: 'Email',
      type: 'email' as const,
      placeholder: 'name@example.com',
      helper: 'Enter a valid email address',
    },
    {
      label: 'Password',
      type: 'password' as const,
      placeholder: 'Enter password',
      helper: 'Must be at least 8 characters',
    },
    {
      label: 'Number',
      type: 'number' as const,
      placeholder: '0',
      helper: 'Enter a numeric value',
    },
  ];

  return (
    <div className="space-y-6">
      {types.map(({ label, type, placeholder, helper }) => (
        <FieldSet key={type} className={`${FIELD_WIDTH} ${gap}`}>
          <FieldLabel
            htmlFor={`input-type-${type}`}
            className={getInputLabelClass('default')}>
            {label}
          </FieldLabel>
          <Input
            id={`input-type-${type}`}
            type={type}
            placeholder={placeholder}
          />
          <FieldDescription className={description}>{helper}</FieldDescription>
        </FieldSet>
      ))}
    </div>
  );
}

/**
 * Horizontal — label beside inline input (InputGroup-Horizontal)
 */
export function InputHorizontal() {
  const { label } = inputFieldConfig.default;

  return (
    <Field orientation="horizontal" className="w-fit items-center gap-3">
      <FieldLabel htmlFor="input-horizontal" className={cn(label, 'shrink-0')}>
        Field label
      </FieldLabel>
      <Input
        id="input-horizontal"
        variant="inline"
        placeholder="Hint text"
        className={FIELD_WIDTH}
      />
    </Field>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'InputDemo',
    title: 'Default',
    description: 'Basic input field with placeholder.',
  },
  {
    name: 'InputVariants',
    title: 'Variants',
    description: 'Default and inline input variants.',
  },
  {
    name: 'InputSizes',
    title: 'Sizes',
    description:
      'Small, default, and large input sizes with default and inline variants side by side.',
  },
  {
    name: 'InputStates',
    title: 'States',
    description:
      'Input states (filled, disabled, error, warning, success) with the default variant.',
  },
  {
    name: 'InputTypes',
    title: 'Input Types',
    description:
      'Input types (email, password, number) with the default variant.',
  },
  {
    name: 'InputHorizontal',
    title: 'Horizontal',
    description:
      'Horizontal layout — field label beside inline input (default size).',
  },
];

export const input = {
  name: 'input',
  components: {
    Default: <InputDemo />,
    Variants: <InputVariants />,
    Sizes: <InputSizes />,
    States: <InputStates />,
    'Input Types': <InputTypes />,
    Horizontal: <InputHorizontal />,
  },
};
