import { AttachMoney } from '@/components/icons/AttachMoney';
import { Cancel } from '@/components/icons/Cancel';
import { CheckCircle } from '@/components/icons/CheckCircle';
import { Info } from '@/components/icons/Info';
import { Mail } from '@/components/icons/Mail';
import { Person } from '@/components/icons/Person';
import { Search } from '@/components/icons/Search';
import { Send } from '@/components/icons/Send';
import { FieldDescription, FieldSet, FieldTitle } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

import { inputGroupFieldConfig } from './input-group-config';
import {
  InputGroupDeleteOnFocus,
  InputGroupStepperSizes,
  InputGroupStepperStates,
} from './input-group-examples';

const FIELD_WIDTH = 'w-[240px]';

export { inputGroupFieldConfig } from './input-group-config';

// Re-export client-side components
export {
  InputGroupDeleteOnFocus,
  InputGroupStepperSizes,
  InputGroupStepperStates,
} from './input-group-examples';

/** Leading icon addon shorthand */
function LeadingIcon({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <InputGroupAddon align="inline-start">
      <InputGroupText>{children}</InputGroupText>
    </InputGroupAddon>
  );
}

/** Default input group with search icon */
export function InputGroupDemo() {
  const { label, description, gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
      <FieldTitle className={label}>Label</FieldTitle>
      <InputGroup>
        <LeadingIcon>
          <Search className={`icon ${iconSize}`} />
        </LeadingIcon>
        <InputGroupInput placeholder="Placeholder" />
      </InputGroup>
      <FieldDescription className={description}>Helper text</FieldDescription>
    </FieldSet>
  );
}

/** Input group with leading icon */
export function InputGroupLeadingIcon() {
  const { label, description, gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <div className={`${FIELD_WIDTH} space-y-4`}>
      <FieldSet className={gap}>
        <FieldTitle className={label}>Label</FieldTitle>
        <InputGroup>
          <LeadingIcon>
            <Mail className={`icon ${iconSize}`} />
          </LeadingIcon>
          <InputGroupInput type="email" placeholder="Placeholder" />
        </InputGroup>
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldTitle className={label}>Label</FieldTitle>
        <InputGroup>
          <LeadingIcon>
            <Person className={`icon ${iconSize}`} />
          </LeadingIcon>
          <InputGroupInput placeholder="Placeholder" />
        </InputGroup>
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>
    </div>
  );
}

/** Input group with trailing elements */
export function InputGroupTrailing() {
  const { label, description, gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <div className={`${FIELD_WIDTH} space-y-4`}>
      <FieldSet className={gap}>
        <FieldTitle className={label}>Label</FieldTitle>
        <InputGroup>
          <InputGroupInput placeholder="Placeholder" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldTitle className={label}>Label</FieldTitle>
        <InputGroup>
          <InputGroupInput placeholder="Placeholder" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" variant="ghost">
              <Send className={`icon ${iconSize}`} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>
    </div>
  );
}

/** Input group with both sides */
export function InputGroupBothSides() {
  const { label, description, gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
      <FieldTitle className={label}>Label</FieldTitle>
      <InputGroup>
        <LeadingIcon>
          <AttachMoney className={`icon ${iconSize}`} />
        </LeadingIcon>
        <InputGroupInput type="number" placeholder="Placeholder" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription className={description}>Helper text</FieldDescription>
    </FieldSet>
  );
}

/** Input group sizes - default and inline variants side by side */
export function InputGroupSizes() {
  const sizes = [
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
  ];

  return (
    <div className="space-y-6">
      {sizes.map(({ size }) => {
        const {
          label: labelClass,
          description,
          gap,
          iconSize,
        } = inputGroupFieldConfig[size];
        const inlineLabelClass = cn(labelClass, size !== 'sm' && 'mb-[-4px]');

        return (
          <div key={size} className="flex gap-6">
            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldTitle className={labelClass}>Label</FieldTitle>
              <InputGroup size={size}>
                <LeadingIcon>
                  <Search className={`icon ${iconSize}`} />
                </LeadingIcon>
                <InputGroupInput size={size} placeholder="Placeholder" />
              </InputGroup>
              <FieldDescription className={description}>
                Helper text
              </FieldDescription>
            </FieldSet>

            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldTitle className={inlineLabelClass}>Label</FieldTitle>
              <InputGroup variant="inline" size={size}>
                <LeadingIcon>
                  <Search className={`icon ${iconSize}`} />
                </LeadingIcon>
                <InputGroupInput
                  variant="inline"
                  size={size}
                  placeholder="Placeholder"
                />
              </InputGroup>
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

/** Input group status states - error, warning, success with default and inline side by side */
export function InputGroupStatusStates() {
  const {
    label: labelClass,
    description: descriptionClass,
    gap,
    iconSize,
  } = inputGroupFieldConfig.default;
  const inlineLabelClass = cn(labelClass, 'mb-[-4px]');

  const statuses = [
    {
      label: 'Error',
      icon: Cancel,
      statusColor: 'text-status-error',
      defaultInputProps: {
        'aria-invalid': true,
        placeholder: 'Placeholder',
      } as const,
      inlineInputProps: {
        'aria-invalid': true,
        placeholder: 'Placeholder',
      } as const,
      defaultGroupClass: '',
      inlineGroupClass: '',
    },
    {
      label: 'Warning',
      icon: Info,
      statusColor: 'text-status-warning',
      defaultInputProps: { placeholder: 'Placeholder' },
      inlineInputProps: { placeholder: 'Placeholder' },
      defaultGroupClass: '!border-status-warning !border',
      inlineGroupClass: '!border-b-status-warning !border-b',
    },
    {
      label: 'Success',
      icon: CheckCircle,
      statusColor: 'text-status-success',
      defaultInputProps: { placeholder: 'Placeholder' },
      inlineInputProps: { placeholder: 'Placeholder' },
      defaultGroupClass: '!border-status-success !border',
      inlineGroupClass: '!border-b-status-success !border-b',
    },
  ];

  return (
    <div className="space-y-6">
      {statuses.map(
        ({
          label,
          icon: StatusIcon,
          statusColor,
          defaultInputProps,
          inlineInputProps,
          defaultGroupClass,
          inlineGroupClass,
        }) => (
          <div key={label} className="flex gap-6">
            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldTitle className={labelClass}>Label</FieldTitle>
              <InputGroup className={defaultGroupClass || undefined}>
                <InputGroupInput {...defaultInputProps} />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>
                    <StatusIcon className={`${iconSize} ${statusColor}`} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription
                className={`${descriptionClass} ${statusColor}`}>
                Feedback message here
              </FieldDescription>
            </FieldSet>

            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldTitle className={inlineLabelClass}>Label</FieldTitle>
              <InputGroup
                variant="inline"
                className={inlineGroupClass || undefined}>
                <InputGroupInput variant="inline" {...inlineInputProps} />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>
                    <StatusIcon className={`${iconSize} ${statusColor}`} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription
                className={`${descriptionClass} ${statusColor}`}>
                Feedback message here
              </FieldDescription>
            </FieldSet>
          </div>
        ),
      )}
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'InputGroupDemo',
    title: 'Default',
    description: 'Basic input group with search icon.',
  },
  {
    name: 'InputGroupLeadingIcon',
    title: 'Leading Icons',
    description: 'Input groups with leading icons.',
  },
  {
    name: 'InputGroupTrailing',
    title: 'Trailing Elements',
    description: 'Input groups with trailing text, buttons, or icons.',
  },
  {
    name: 'InputGroupBothSides',
    title: 'Both Sides',
    description: 'Input group with elements on both sides.',
  },
  {
    name: 'InputGroupSizes',
    title: 'Sizes',
    description:
      'Small, default, and large input group sizes with default and inline variants side by side.',
  },
  {
    name: 'InputGroupStatusStates',
    title: 'Status States',
    description:
      'Error, warning, and success states with default and inline variants side by side.',
  },
  {
    name: 'InputGroupDeleteOnFocus',
    title: 'Input with delete icon on focus',
    description:
      'Trailing delete control (Backspace icon) shown with CSS :focus-within — control stays mounted for predictable focus; default and inline, stacked vertically.',
  },
  {
    name: 'InputGroupStepperSizes',
    title: 'Stepper Sizes',
    description:
      'Stepper input with default and inline variants side by side for all sizes.',
  },
  {
    name: 'InputGroupStepperStates',
    title: 'Stepper States',
    description:
      'Stepper input showing error, success, and warning states with both default and inline variants.',
  },
];

export const inputGroup = createLegacyDemo('input-group', examples, {
  InputGroupDemo: <InputGroupDemo />,
  InputGroupLeadingIcon: <InputGroupLeadingIcon />,
  InputGroupTrailing: <InputGroupTrailing />,
  InputGroupBothSides: <InputGroupBothSides />,
  InputGroupSizes: <InputGroupSizes />,
  InputGroupStatusStates: <InputGroupStatusStates />,
  InputGroupDeleteOnFocus: <InputGroupDeleteOnFocus />,
  InputGroupStepperSizes: <InputGroupStepperSizes />,
  InputGroupStepperStates: <InputGroupStepperStates />,
});
