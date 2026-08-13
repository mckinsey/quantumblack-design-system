import {
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
 * Input states - default and inline variants side by side
 */
export function InputStates() {
  const { description: descriptionClass, gap } = inputFieldConfig.default;

  const states = [
    {
      label: 'With Value',
      props: { defaultValue: 'Some text value' },
      inlineProps: { defaultValue: 'Some text value' },
    },
    {
      label: 'Disabled',
      props: { disabled: true, placeholder: 'Placeholder' },
      inlineProps: { disabled: true, placeholder: 'Placeholder' },
    },
    {
      label: 'Error',
      props: { 'aria-invalid': true, placeholder: 'Placeholder' } as const,
      inlineProps: {
        'aria-invalid': true,
        placeholder: 'Placeholder',
      } as const,
      feedback: {
        tone: 'error' as const,
        text: 'Feedback message here',
      },
    },
    {
      label: 'Warning',
      props: {
        className: '!border-stroke-status-warning',
        placeholder: 'Placeholder',
      },
      inlineProps: {
        className: '!border-b-stroke-status-warning',
        placeholder: 'Placeholder',
      },
      feedback: {
        tone: 'warning' as const,
        text: 'Feedback message here',
      },
    },
    {
      label: 'Success',
      props: {
        className: '!border-stroke-status-success',
        placeholder: 'Placeholder',
      },
      inlineProps: {
        className: '!border-b-stroke-status-success',
        placeholder: 'Placeholder',
      },
      feedback: {
        tone: 'success' as const,
        text: 'Feedback message here',
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
      {states.map(({ label, props, inlineProps, feedback }) => {
        const stateIdBase = `input-state-${label.toLowerCase().replaceAll(' ', '-')}`;

        const footer = (key: string) =>
          feedback ? (
            feedback.tone === 'error' ? (
              <FieldError
                key={key}
                className={`${descriptionClass} ${feedbackClass.error}`}>
                {feedback.text}
              </FieldError>
            ) : (
              <FieldDescription
                key={key}
                className={`${descriptionClass} ${feedbackClass[feedback.tone]}`}>
                {feedback.text}
              </FieldDescription>
            )
          ) : (
            <FieldDescription key={key} className={descriptionClass}>
              Helper text
            </FieldDescription>
          );

        return (
          <div key={label} className="flex gap-6">
            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldLabel
                htmlFor={stateIdBase}
                className={getInputLabelClass('default')}>
                Label
              </FieldLabel>
              <Input id={stateIdBase} {...props} />
              {footer(`${stateIdBase}-footer`)}
            </FieldSet>

            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldLabel
                htmlFor={`${stateIdBase}-inline`}
                className={getInputLabelClass('default', 'inline')}>
                Label
              </FieldLabel>
              <Input
                id={`${stateIdBase}-inline`}
                variant="inline"
                {...inlineProps}
              />
              {footer(`${stateIdBase}-inline-footer`)}
            </FieldSet>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Input types - default and inline variants side by side
 */
export function InputTypes() {
  const { description, gap } = inputFieldConfig.default;

  const types = [
    { label: 'Email', type: 'email' as const },
    { label: 'Password', type: 'password' as const },
    { label: 'Number', type: 'number' as const },
    { label: 'Search', type: 'search' as const },
  ];

  return (
    <div className="space-y-6">
      {types.map(({ type }) => (
        <div key={type} className="flex gap-6">
          <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
            <FieldLabel
              htmlFor={`input-type-${type}`}
              className={getInputLabelClass('default')}>
              Label
            </FieldLabel>
            <Input
              id={`input-type-${type}`}
              type={type}
              placeholder="Placeholder"
            />
            <FieldDescription className={description}>
              Helper text
            </FieldDescription>
          </FieldSet>

          <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
            <FieldLabel
              htmlFor={`input-type-${type}-inline`}
              className={getInputLabelClass('default', 'inline')}>
              Label
            </FieldLabel>
            <Input
              id={`input-type-${type}-inline`}
              type={type}
              variant="inline"
              placeholder="Placeholder"
            />
            <FieldDescription className={description}>
              Helper text
            </FieldDescription>
          </FieldSet>
        </div>
      ))}
    </div>
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
      'Input states (filled, disabled, error, warning, success) with default and inline variants side by side.',
  },
  {
    name: 'InputTypes',
    title: 'Input Types',
    description:
      'Input types (email, password, number, search) with default and inline variants side by side.',
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
  },
};
