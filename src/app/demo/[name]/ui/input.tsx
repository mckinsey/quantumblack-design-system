import { FieldDescription, FieldSet, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const FIELD_WIDTH = 'w-[240px]';

// Per-size field layout config: typography + gap (matches Figma spec — spacing/8 = 8px for all sizes)
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
      <FieldTitle className={getInputLabelClass('default')}>Label</FieldTitle>
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
        <FieldTitle className={getInputLabelClass('default')}>Label</FieldTitle>
        <Input id="input-variant-default" placeholder="Placeholder" />
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldTitle className={getInputLabelClass('default', 'inline')}>
          Label
        </FieldTitle>
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
              <FieldTitle className={getInputLabelClass(size)}>
                Label
              </FieldTitle>
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
              <FieldTitle className={getInputLabelClass(size, 'inline')}>
                Label
              </FieldTitle>
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
      statusDescriptionClass: 'text-status-error',
      descriptionText: 'Feedback message here',
    },
    {
      label: 'Warning',
      props: {
        className: '!border-status-warning',
        placeholder: 'Placeholder',
      },
      inlineProps: {
        className: '!border-b-status-warning',
        placeholder: 'Placeholder',
      },
      statusDescriptionClass: 'text-status-warning',
      descriptionText: 'Feedback message here',
    },
    {
      label: 'Success',
      props: {
        className: '!border-status-success',
        placeholder: 'Placeholder',
      },
      inlineProps: {
        className: '!border-b-status-success',
        placeholder: 'Placeholder',
      },
      statusDescriptionClass: 'text-status-success',
      descriptionText: 'Feedback message here',
    },
  ];

  return (
    <div className="space-y-6">
      {states.map(
        ({
          label,
          props,
          inlineProps,
          statusDescriptionClass,
          descriptionText,
        }) => (
          <div key={label} className="flex gap-6">
            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldTitle className={getInputLabelClass('default')}>
                Label
              </FieldTitle>
              <Input
                id={`input-state-${label.toLowerCase().replaceAll(' ', '-')}`}
                {...props}
              />
              <FieldDescription
                className={`${descriptionClass} ${statusDescriptionClass ?? ''}`}>
                {descriptionText ?? 'Helper text'}
              </FieldDescription>
            </FieldSet>

            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldTitle className={getInputLabelClass('default', 'inline')}>
                Label
              </FieldTitle>
              <Input
                id={`input-state-${label.toLowerCase().replaceAll(' ', '-')}-inline`}
                variant="inline"
                {...inlineProps}
              />
              <FieldDescription
                className={`${descriptionClass} ${statusDescriptionClass ?? ''}`}>
                {descriptionText ?? 'Helper text'}
              </FieldDescription>
            </FieldSet>
          </div>
        ),
      )}
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
            <FieldTitle className={getInputLabelClass('default')}>
              Label
            </FieldTitle>
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
            <FieldTitle className={getInputLabelClass('default', 'inline')}>
              Label
            </FieldTitle>
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
