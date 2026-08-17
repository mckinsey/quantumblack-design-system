'use client';

import { useRef, useState } from 'react';

import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
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

type FieldSize = keyof typeof inputGroupFieldConfig;

const getLabelClass = (
  size: FieldSize,
  variant: 'default' | 'inline' = 'default',
) => cn(variant === 'inline' && size !== 'sm' && 'mb-[-4px]');

export { inputGroupFieldConfig } from './input-group-config';

function LeadingIcon({ children }: Readonly<{ children: React.ReactNode }>) {
  return <InputGroupAddon align="inline-start">{children}</InputGroupAddon>;
}

function TrailingIcon({ children }: Readonly<{ children: React.ReactNode }>) {
  return <InputGroupAddon align="inline-end">{children}</InputGroupAddon>;
}

export function InputGroupDemo() {
  const { gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
      <FieldLabel htmlFor="ig-demo-default">Label</FieldLabel>
      <InputGroup>
        <LeadingIcon>
          <IconShell size={iconSize} type="neutral" variant="secondary">
            <Icon icon="search" />
          </IconShell>
        </LeadingIcon>
        <InputGroupInput id="ig-demo-default" placeholder="Placeholder" />
      </InputGroup>
      <FieldDescription>Helper text</FieldDescription>
    </FieldSet>
  );
}

export function InputGroupAffixes() {
  const { gap, iconSize } = inputGroupFieldConfig.default;

  function AffixField({
    variant,
    fieldId,
  }: Readonly<{
    variant: 'default' | 'inline';
    fieldId: string;
  }>) {
    return (
      <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
        <FieldLabel
          htmlFor={fieldId}
          className={getLabelClass('default', variant)}>
          Label
        </FieldLabel>
        <InputGroup variant={variant}>
          <LeadingIcon>
            <IconShell size={iconSize} type="neutral" variant="secondary">
              <Icon icon="crop_free" />
            </IconShell>
          </LeadingIcon>
          <InputGroupAddon align="inline-start">
            <InputGroupText>PRE</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id={fieldId}
            variant={variant}
            placeholder="Hint text"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupText>SUF</InputGroupText>
          </InputGroupAddon>
          <TrailingIcon>
            <IconShell size={iconSize} type="neutral" variant="secondary">
              <Icon icon="crop_free" />
            </IconShell>
          </TrailingIcon>
        </InputGroup>
        <FieldDescription>Helper text</FieldDescription>
      </FieldSet>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AffixField variant="default" fieldId="ig-affix-default" />
      <AffixField variant="inline" fieldId="ig-affix-inline" />
    </div>
  );
}

export function InputGroupLeadingIcon() {
  const { gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <div className={`${FIELD_WIDTH} space-y-4`}>
      <FieldSet className={gap}>
        <FieldLabel htmlFor="ig-leading-email">Label</FieldLabel>
        <InputGroup>
          <LeadingIcon>
            <IconShell size={iconSize} type="neutral" variant="secondary">
              <Icon icon="mail" />
            </IconShell>
          </LeadingIcon>
          <InputGroupInput
            id="ig-leading-email"
            type="email"
            placeholder="Placeholder"
          />
        </InputGroup>
        <FieldDescription>Helper text</FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldLabel htmlFor="ig-leading-person">Label</FieldLabel>
        <InputGroup>
          <LeadingIcon>
            <IconShell size={iconSize} type="neutral" variant="secondary">
              <Icon icon="person" />
            </IconShell>
          </LeadingIcon>
          <InputGroupInput id="ig-leading-person" placeholder="Placeholder" />
        </InputGroup>
        <FieldDescription>Helper text</FieldDescription>
      </FieldSet>
    </div>
  );
}

export function InputGroupTrailing() {
  const { gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <div className={`${FIELD_WIDTH} space-y-4`}>
      <FieldSet className={gap}>
        <FieldLabel htmlFor="ig-trailing-usd">Label</FieldLabel>
        <InputGroup>
          <InputGroupInput id="ig-trailing-usd" placeholder="Placeholder" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Helper text</FieldDescription>
      </FieldSet>

      <FieldSet className={gap}>
        <FieldLabel htmlFor="ig-trailing-send">Label</FieldLabel>
        <InputGroup>
          <InputGroupInput id="ig-trailing-send" placeholder="Placeholder" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" variant="ghost">
              <IconShell size={iconSize} type="neutral" hoverable>
                <Icon icon="send" />
              </IconShell>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Helper text</FieldDescription>
      </FieldSet>
    </div>
  );
}

export function InputGroupBothSides() {
  const { gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
      <FieldLabel htmlFor="ig-both-sides">Label</FieldLabel>
      <InputGroup>
        <LeadingIcon>
          <IconShell size={iconSize} type="neutral" variant="secondary">
            <Icon icon="attach_money" />
          </IconShell>
        </LeadingIcon>
        <InputGroupInput
          id="ig-both-sides"
          type="number"
          placeholder="Placeholder"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Helper text</FieldDescription>
    </FieldSet>
  );
}

export function InputGroupSizes() {
  const sizes: Array<{ size: FieldSize }> = [
    { size: 'sm' },
    { size: 'default' },
    { size: 'lg' },
  ];

  return (
    <div className="space-y-6">
      {sizes.map(({ size }) => {
        const { gap, iconSize } = inputGroupFieldConfig[size];
        const fieldId = `ig-size-${size}`;

        return (
          <div key={size} className="flex gap-6">
            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldLabel htmlFor={`${fieldId}-default`} size={size}>
                Label
              </FieldLabel>
              <InputGroup size={size}>
                <LeadingIcon>
                  <IconShell size={iconSize} type="neutral" variant="secondary">
                    <Icon icon="search" />
                  </IconShell>
                </LeadingIcon>
                <InputGroupInput
                  id={`${fieldId}-default`}
                  size={size}
                  placeholder="Placeholder"
                />
              </InputGroup>
              <FieldDescription size={size}>Helper text</FieldDescription>
            </FieldSet>

            <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
              <FieldLabel
                htmlFor={`${fieldId}-inline`}
                size={size}
                className={getLabelClass(size, 'inline')}>
                Label
              </FieldLabel>
              <InputGroup variant="inline" size={size}>
                <LeadingIcon>
                  <IconShell size={iconSize} type="neutral" variant="secondary">
                    <Icon icon="search" />
                  </IconShell>
                </LeadingIcon>
                <InputGroupInput
                  id={`${fieldId}-inline`}
                  variant="inline"
                  size={size}
                  placeholder="Placeholder"
                />
              </InputGroup>
              <FieldDescription size={size}>Helper text</FieldDescription>
            </FieldSet>
          </div>
        );
      })}
    </div>
  );
}

export function InputGroupStatusStates() {
  const sizes: FieldSize[] = ['sm', 'default', 'lg'];

  const statuses = [
    {
      label: 'Error',
      icon: 'cancel',
      statusColor: 'text-status-error',
      tone: 'error' as const,
      defaultGroupClass: '',
      inlineGroupClass: '',
      inputProps: { 'aria-invalid': true as const, placeholder: 'Placeholder' },
    },
    {
      label: 'Warning',
      icon: 'info',
      statusColor: 'text-status-warning',
      tone: 'warning' as const,
      defaultGroupClass: 'border-stroke-status-warning',
      inlineGroupClass: 'border-b-stroke-status-warning',
      inputProps: { placeholder: 'Placeholder' },
    },
    {
      label: 'Success',
      icon: 'check_circle',
      statusColor: 'text-status-success',
      tone: 'success' as const,
      defaultGroupClass: 'border-stroke-status-success',
      inlineGroupClass: 'border-b-stroke-status-success',
      inputProps: { placeholder: 'Placeholder' },
    },
  ];

  return (
    <div className="space-y-8">
      {sizes.map(size => {
        const { gap, iconSize } = inputGroupFieldConfig[size];

        return (
          <div key={size} className="space-y-6">
            {statuses.map(
              ({
                label,
                icon: statusIcon,
                statusColor,
                tone,
                defaultGroupClass,
                inlineGroupClass,
                inputProps,
              }) => {
                const fieldId = `ig-status-${size}-${tone}`;

                return (
                  <div key={tone} className="flex gap-6">
                    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
                      <FieldLabel htmlFor={`${fieldId}-default`} size={size}>
                        {label}
                      </FieldLabel>
                      <InputGroup
                        size={size}
                        className={defaultGroupClass || undefined}>
                        <InputGroupInput
                          id={`${fieldId}-default`}
                          size={size}
                          {...inputProps}
                        />
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
                        <FieldError size={size}>
                          Feedback message here
                        </FieldError>
                      ) : (
                        <FieldDescription size={size} className={statusColor}>
                          Feedback message here
                        </FieldDescription>
                      )}
                    </FieldSet>

                    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
                      <FieldLabel
                        htmlFor={`${fieldId}-inline`}
                        size={size}
                        className={getLabelClass(size, 'inline')}>
                        {label}
                      </FieldLabel>
                      <InputGroup
                        variant="inline"
                        size={size}
                        className={inlineGroupClass || undefined}>
                        <InputGroupInput
                          id={`${fieldId}-inline`}
                          variant="inline"
                          size={size}
                          {...inputProps}
                        />
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
                        <FieldError size={size}>
                          Feedback message here
                        </FieldError>
                      ) : (
                        <FieldDescription size={size} className={statusColor}>
                          Feedback message here
                        </FieldDescription>
                      )}
                    </FieldSet>
                  </div>
                );
              },
            )}
          </div>
        );
      })}
    </div>
  );
}

export function InputGroupDeleteOnFocus() {
  const { gap, iconSize } = inputGroupFieldConfig.default;

  function DeleteOnFocusField({
    variant,
    fieldId,
  }: Readonly<{
    variant: 'default' | 'inline';
    fieldId: string;
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
        <FieldLabel
          htmlFor={fieldId}
          className={getLabelClass('default', variant)}>
          Label
        </FieldLabel>
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
              id={fieldId}
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
        <FieldDescription>Helper text</FieldDescription>
      </FieldSet>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <DeleteOnFocusField variant="default" fieldId="ig-delete-default" />
      <DeleteOnFocusField variant="inline" fieldId="ig-delete-inline" />
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
    const { gap } = inputGroupFieldConfig[size];
    const fieldId = `ig-stepper-${size}-${variant}`;
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
        <FieldLabel
          htmlFor={fieldId}
          size={size}
          className={getLabelClass(size, variant)}>
          Label
        </FieldLabel>
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
            id={fieldId}
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
        <FieldDescription size={size}>Helper text</FieldDescription>
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
  const { gap } = inputGroupFieldConfig.default;

  const stepperStates = [
    {
      label: 'Error',
      status: 'error' as const,
      statusMessage: 'Feedback here',
      statusClass: 'text-status-error',
      defaultInputGroupClass: '',
      inlineInputGroupClass: '',
    },
    {
      label: 'Warning',
      status: 'warning' as const,
      statusMessage: 'Feedback here',
      statusClass: 'text-status-warning',
      defaultInputGroupClass: 'border-stroke-status-warning',
      inlineInputGroupClass: 'border-b-stroke-status-warning',
    },
    {
      label: 'Success',
      status: 'success' as const,
      statusMessage: 'Feedback here',
      statusClass: 'text-status-success',
      defaultInputGroupClass: 'border-stroke-status-success',
      inlineInputGroupClass: 'border-b-stroke-status-success',
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
    const fieldId = `ig-stepper-state-${status}-${variant}`;

    return (
      <FieldSet className={`w-[160px] ${gap}`}>
        <FieldLabel
          htmlFor={fieldId}
          size="default"
          className={getLabelClass('default', variant)}>
          Label
        </FieldLabel>
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
            id={fieldId}
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
          <FieldError size="default" className={statusClass}>
            {statusMessage}
          </FieldError>
        ) : (
          <FieldDescription size="default" className={statusClass}>
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
