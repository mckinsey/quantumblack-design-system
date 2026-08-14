'use client';

import { useRef, useState } from 'react';

import {
  FieldDescription,
  FieldError,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
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

const FIELD_WIDTH = 'w-[240px]';
const STEPPER_GAP = 'gap-1';

export { inputGroupFieldConfig } from './input-group-config';

function LeadingIcon({ children }: Readonly<{ children: React.ReactNode }>) {
  return <InputGroupAddon align="inline-start">{children}</InputGroupAddon>;
}

function TrailingIcon({ children }: Readonly<{ children: React.ReactNode }>) {
  return <InputGroupAddon align="inline-end">{children}</InputGroupAddon>;
}

export function InputGroupDemo() {
  const { label, description, gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
      <FieldTitle className={label}>Label</FieldTitle>
      <InputGroup>
        <LeadingIcon>
          <IconShell size={iconSize} type="neutral" variant="secondary">
            <Icon icon="search" />
          </IconShell>
        </LeadingIcon>
        <InputGroupInput placeholder="Placeholder" />
      </InputGroup>
      <FieldDescription className={description}>Helper text</FieldDescription>
    </FieldSet>
  );
}

export function InputGroupAffixes() {
  const { label, description, gap, iconSize } = inputGroupFieldConfig.default;
  const inlineLabelClass = cn(label, 'mb-[-4px]');

  function AffixField({
    variant,
    labelClassName,
  }: Readonly<{
    variant: 'default' | 'inline';
    labelClassName: string;
  }>) {
    return (
      <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
        <FieldTitle className={labelClassName}>Label</FieldTitle>
        <InputGroup variant={variant}>
          <LeadingIcon>
            <IconShell size={iconSize} type="neutral" variant="secondary">
              <Icon icon="crop_free" />
            </IconShell>
          </LeadingIcon>
          <InputGroupAddon align="inline-start">
            <InputGroupText>PRE</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput variant={variant} placeholder="Hint text" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>SUF</InputGroupText>
          </InputGroupAddon>
          <TrailingIcon>
            <IconShell size={iconSize} type="neutral" variant="secondary">
              <Icon icon="crop_free" />
            </IconShell>
          </TrailingIcon>
        </InputGroup>
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AffixField variant="default" labelClassName={label} />
      <AffixField variant="inline" labelClassName={inlineLabelClass} />
    </div>
  );
}

export function InputGroupLeadingIcon() {
  const { label, description, gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <div className={`${FIELD_WIDTH} space-y-4`}>
      <FieldSet className={gap}>
        <FieldTitle className={label}>Label</FieldTitle>
        <InputGroup>
          <LeadingIcon>
            <IconShell size={iconSize} type="neutral" variant="secondary">
              <Icon icon="mail" />
            </IconShell>
          </LeadingIcon>
          <InputGroupInput type="email" placeholder="Placeholder" />
        </InputGroup>
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldTitle className={label}>Label</FieldTitle>
        <InputGroup>
          <LeadingIcon>
            <IconShell size={iconSize} type="neutral" variant="secondary">
              <Icon icon="person" />
            </IconShell>
          </LeadingIcon>
          <InputGroupInput placeholder="Placeholder" />
        </InputGroup>
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>
    </div>
  );
}

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
              <IconShell size={iconSize} type="neutral" hoverable>
                <Icon icon="send" />
              </IconShell>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>
    </div>
  );
}

export function InputGroupBothSides() {
  const { label, description, gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
      <FieldTitle className={label}>Label</FieldTitle>
      <InputGroup>
        <LeadingIcon>
          <IconShell size={iconSize} type="neutral" variant="secondary">
            <Icon icon="attach_money" />
          </IconShell>
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
                  <IconShell size={iconSize} type="neutral" variant="secondary">
                    <Icon icon="search" />
                  </IconShell>
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
                  <IconShell size={iconSize} type="neutral" variant="secondary">
                    <Icon icon="search" />
                  </IconShell>
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
      icon: 'cancel',
      statusColor: 'text-status-error',
      tone: 'error' as const,
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
      icon: 'info',
      statusColor: 'text-status-warning',
      tone: 'warning' as const,
      defaultInputProps: { placeholder: 'Placeholder' },
      inlineInputProps: { placeholder: 'Placeholder' },
      defaultGroupClass: '!border-status-warning !border',
      inlineGroupClass: '!border-b-status-warning !border-b',
    },
    {
      label: 'Success',
      icon: 'check_circle',
      statusColor: 'text-status-success',
      tone: 'success' as const,
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
          icon: statusIcon,
          statusColor,
          tone,
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
                  <IconShell
                    size={iconSize}
                    type="custom"
                    className={statusColor}>
                    <Icon icon={statusIcon} />
                  </IconShell>
                </InputGroupAddon>
              </InputGroup>
              {tone === 'error' ? (
                <FieldError className={`${descriptionClass} ${statusColor}`}>
                  Feedback message here
                </FieldError>
              ) : (
                <FieldDescription
                  className={`${descriptionClass} ${statusColor}`}>
                  Feedback message here
                </FieldDescription>
              )}
            </FieldSet>

            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldTitle className={inlineLabelClass}>Label</FieldTitle>
              <InputGroup
                variant="inline"
                className={inlineGroupClass || undefined}>
                <InputGroupInput variant="inline" {...inlineInputProps} />
                <InputGroupAddon align="inline-end">
                  <IconShell
                    size={iconSize}
                    type="custom"
                    className={statusColor}>
                    <Icon icon={statusIcon} />
                  </IconShell>
                </InputGroupAddon>
              </InputGroup>
              {tone === 'error' ? (
                <FieldError className={`${descriptionClass} ${statusColor}`}>
                  Feedback message here
                </FieldError>
              ) : (
                <FieldDescription
                  className={`${descriptionClass} ${statusColor}`}>
                  Feedback message here
                </FieldDescription>
              )}
            </FieldSet>
          </div>
        ),
      )}
    </div>
  );
}

export function InputGroupDeleteOnFocus() {
  const { label, description, gap, iconSize } = inputGroupFieldConfig.default;
  const inlineLabelClass = cn(label, 'mb-[-4px]');

  function DeleteOnFocusField({
    variant,
    labelClassName,
  }: Readonly<{
    variant: 'default' | 'inline';
    labelClassName: string;
  }>) {
    const [value, setValue] = useState('Search text');
    const [focused, setFocused] = useState(false);
    const groupContainerRef = useRef<HTMLDivElement>(null);
    const showDelete = focused && value.length > 0;

    const focusControl = () => {
      const control =
        groupContainerRef.current?.querySelector<HTMLInputElement>(
          '[data-slot=input-group-control]',
        );

      control?.focus();
    };

    return (
      <FieldSet className={`w-[240px] ${gap}`}>
        <FieldTitle className={labelClassName}>Label</FieldTitle>
        <div ref={groupContainerRef}>
          <InputGroup variant={variant}>
            <InputGroupAddon align="inline-start">
              <IconShell
                size={iconSize}
                type="neutral"
                variant="secondary"
                aria-hidden>
                <Icon icon="search" />
              </IconShell>
            </InputGroupAddon>
            <InputGroupInput
              variant={variant}
              placeholder="Search…"
              value={value}
              autoComplete="off"
              onChange={e => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            {showDelete ? (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  aria-label="Delete entered text"
                  className="hover:bg-transparent active:bg-transparent"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    setValue('');
                    focusControl();
                  }}>
                  <IconShell size="sm" type="neutral" hoverable>
                    <Icon icon="backspace" />
                  </IconShell>
                </InputGroupButton>
              </InputGroupAddon>
            ) : null}
          </InputGroup>
        </div>
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <DeleteOnFocusField variant="default" labelClassName={label} />
      <DeleteOnFocusField variant="inline" labelClassName={inlineLabelClass} />
    </div>
  );
}

export function InputGroupStepperSizes() {
  const sizes = [
    { label: 'Small', size: 'sm' as const, width: 'w-[160px]' },
    { label: 'Default', size: 'default' as const, width: 'w-[160px]' },
    { label: 'Large', size: 'lg' as const, width: 'w-[160px]' },
  ];

  function StepperItem({
    size,
    width,
    variant,
  }: Readonly<{
    size: 'sm' | 'default' | 'lg';
    width: string;
    variant: 'default' | 'inline';
  }>) {
    const { label: labelClass, description, gap } = inputGroupFieldConfig[size];
    const labelClassName = cn(
      labelClass,
      variant === 'inline' &&
        (size === 'default' || size === 'lg') &&
        'mb-[-4px]',
    );
    const [value, setValue] = useState(0);

    const increment = () => {
      setValue(prev => prev + 1);
    };

    const decrement = () => {
      setValue(prev => Math.max(0, prev - 1));
    };

    const buttonSize = size === 'lg' ? 'icon-xs' : 'icon-xxs';
    const iconShellSize = size === 'lg' ? 'default' : 'sm';
    const isDecrementDisabled = value === 0;

    return (
      <FieldSet className={`${width} ${gap}`}>
        <FieldTitle className={labelClassName}>Label</FieldTitle>
        <InputGroup
          variant={variant}
          size={size}
          className={cn(width, STEPPER_GAP)}>
          <InputGroupAddon align="inline-start">
            <InputGroupButton
              size={buttonSize}
              variant="ghost"
              onClick={decrement}
              disabled={isDecrementDisabled}
              aria-label="Decrease">
              <IconShell
                size={iconShellSize}
                type="neutral"
                variant="secondary"
                disabled={isDecrementDisabled}>
                <Icon icon="remove" />
              </IconShell>
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupInput
            type="number"
            variant={variant}
            size={size}
            value={value}
            onChange={e => setValue(Number(e.target.value) || 0)}
            min={0}
            className="text-center"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size={buttonSize}
              variant="ghost"
              onClick={increment}
              aria-label="Increase">
              <IconShell size={iconShellSize} type="neutral" hoverable>
                <Icon icon="add" />
              </IconShell>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription className={description}>Helper text</FieldDescription>
      </FieldSet>
    );
  }

  return (
    <div className="w-full space-y-6">
      {sizes.map(({ size, width }) => (
        <div key={size} className="flex justify-center gap-[200px]">
          <StepperItem size={size} width={width} variant="default" />
          <StepperItem size={size} width={width} variant="inline" />
        </div>
      ))}
    </div>
  );
}

export function InputGroupStepperStates() {
  const {
    label: labelClass,
    description: descriptionClass,
    gap,
  } = inputGroupFieldConfig.default;

  const stepperStates = [
    {
      label: 'Error',
      status: 'error' as const,
      statusMessage: 'Feedback here',
      statusClass: 'text-status-error',
      defaultInputGroupClass: '',
      inlineInputGroupClass:
        'has-[[data-slot][aria-invalid=true]]:!border-b has-[[data-slot][aria-invalid=true]]:!border-b-status-error',
    },
    {
      label: 'Warning',
      status: 'warning' as const,
      statusMessage: 'Feedback here',
      statusClass: 'text-status-warning',
      defaultInputGroupClass: '!border !border-status-warning',
      inlineInputGroupClass: '!border-b !border-b-status-warning',
    },
    {
      label: 'Success',
      status: 'success' as const,
      statusMessage: 'Feedback here',
      statusClass: 'text-status-success',
      defaultInputGroupClass: '!border !border-status-success',
      inlineInputGroupClass: '!border-b !border-b-status-success',
    },
  ];

  function StepperStateItem({
    status,
    statusMessage,
    statusClass,
    variant,
    inputGroupClass,
  }: Readonly<{
    status: 'error' | 'warning' | 'success';
    statusMessage: string;
    statusClass: string;
    variant: 'default' | 'inline';
    inputGroupClass: string;
  }>) {
    const [value, setValue] = useState(234);

    const increment = () => {
      setValue(prev => prev + 1);
    };

    const decrement = () => {
      setValue(prev => Math.max(0, prev - 1));
    };

    const buttonSize = 'icon-xxs';
    const iconShellSize = 'sm';
    const isDecrementDisabled = value === 0;
    const stateLabelClassName = cn(
      labelClass,
      variant === 'inline' && 'mb-[-4px]',
    );

    return (
      <FieldSet className={`w-[160px] ${gap}`}>
        <FieldTitle className={stateLabelClassName}>Label</FieldTitle>
        <InputGroup
          variant={variant}
          size="default"
          className={cn('w-[160px]', STEPPER_GAP, inputGroupClass)}>
          <InputGroupAddon align="inline-start">
            <InputGroupButton
              size={buttonSize}
              variant="ghost"
              onClick={decrement}
              disabled={isDecrementDisabled}
              aria-label="Decrease">
              <IconShell
                size={iconShellSize}
                hoverable
                disabled={isDecrementDisabled}>
                <Icon icon="remove" />
              </IconShell>
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupInput
            type="number"
            variant={variant}
            size="default"
            value={value}
            onChange={e => setValue(Number(e.target.value) || 0)}
            min={0}
            className="text-center"
            aria-invalid={status === 'error' ? true : undefined}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size={buttonSize}
              variant="ghost"
              onClick={increment}
              aria-label="Increase">
              <IconShell size={iconShellSize} hoverable>
                <Icon icon="add" />
              </IconShell>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {status === 'error' ? (
          <FieldError className={`${descriptionClass} ${statusClass}`}>
            {statusMessage}
          </FieldError>
        ) : (
          <FieldDescription className={`${descriptionClass} ${statusClass}`}>
            {statusMessage}
          </FieldDescription>
        )}
      </FieldSet>
    );
  }

  return (
    <div className="w-full space-y-6">
      {stepperStates.map(
        ({
          status,
          statusMessage,
          statusClass,
          defaultInputGroupClass,
          inlineInputGroupClass,
        }) => (
          <div key={status} className="flex justify-center gap-[200px]">
            <StepperStateItem
              status={status}
              statusMessage={statusMessage}
              statusClass={statusClass}
              variant="default"
              inputGroupClass={defaultInputGroupClass}
            />

            <StepperStateItem
              status={status}
              statusMessage={statusMessage}
              statusClass={statusClass}
              variant="inline"
              inputGroupClass={inlineInputGroupClass}
            />
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
    name: 'InputGroupAffixes',
    title: 'Prefix & Suffix',
    description:
      'TextVariant composition: leading icon, PRE, entry, SUF, trailing icon — default and inline.',
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
    title: 'Clear on focus with text',
    description:
      'Trailing backspace control when focused and the field has text — default and inline.',
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
  InputGroupAffixes: <InputGroupAffixes />,
  InputGroupLeadingIcon: <InputGroupLeadingIcon />,
  InputGroupTrailing: <InputGroupTrailing />,
  InputGroupBothSides: <InputGroupBothSides />,
  InputGroupSizes: <InputGroupSizes />,
  InputGroupStatusStates: <InputGroupStatusStates />,
  InputGroupDeleteOnFocus: <InputGroupDeleteOnFocus />,
  InputGroupStepperSizes: <InputGroupStepperSizes />,
  InputGroupStepperStates: <InputGroupStepperStates />,
});
