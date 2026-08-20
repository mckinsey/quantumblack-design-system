'use client';

import { type FocusEvent, type ReactNode, useRef, useState } from 'react';

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

import {
  type DemoAxis,
  DemoAxisRow,
  DemoExpandControls,
  resolveAxisOptions,
  useDemoExpandState,
} from './demo-expand-controls';
import { inputGroupFieldConfig } from './input-group-config';

const FIELD_WIDTH = 'w-[240px]';

const variantAxis: DemoAxis<'default' | 'inline'> = {
  key: 'variant',
  label: 'Variants',
  options: ['default', 'inline'],
  defaultOption: 'default',
};

type FieldSize = keyof typeof inputGroupFieldConfig;

const getLabelClass = (
  size: FieldSize,
  variant: 'default' | 'inline' = 'default',
) => cn(variant === 'inline' && size !== 'sm' && 'mb-[-4px]');

function LeadingIcon({ children }: Readonly<{ children: ReactNode }>) {
  return <InputGroupAddon align="inline-start">{children}</InputGroupAddon>;
}

function TrailingIcon({ children }: Readonly<{ children: ReactNode }>) {
  return <InputGroupAddon align="inline-end">{children}</InputGroupAddon>;
}

function DeleteOnFocusField({
  variant,
  fieldId,
}: Readonly<{
  variant: 'default' | 'inline';
  fieldId: string;
}>) {
  const { gap, iconSize } = inputGroupFieldConfig.default;
  const [value, setValue] = useState('Search text');
  const [focused, setFocused] = useState(false);
  const groupContainerRef = useRef<HTMLDivElement>(null);
  const showDelete = focused && value.length > 0;

  const focusControl = () => {
    const control = groupContainerRef.current?.querySelector<HTMLInputElement>(
      '[data-slot=input-group-control]',
    );

    control?.focus();
  };

  const handleFocusCapture = () => setFocused(true);

  const handleBlurCapture = (e: FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget;

    if (next instanceof Node && !groupContainerRef.current?.contains(next)) {
      setFocused(false);
    }
  };

  return (
    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
      <FieldLabel
        htmlFor={fieldId}
        className={getLabelClass('default', variant)}>
        Label
      </FieldLabel>
      <div
        ref={groupContainerRef}
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}>
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
                <IconShell size="sm" type="neutral" hoverable aria-hidden>
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

export function InputGroupDemo() {
  const { gap, iconSize } = inputGroupFieldConfig.default;

  return (
    <FieldSet className={`${FIELD_WIDTH} ${gap}`}>
      <FieldLabel htmlFor="ig-demo-default">Label</FieldLabel>
      <InputGroup>
        <LeadingIcon>
          <IconShell
            size={iconSize}
            type="neutral"
            variant="secondary"
            aria-hidden>
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
            <IconShell
              size={iconSize}
              type="neutral"
              variant="secondary"
              aria-hidden>
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
            <IconShell
              size={iconSize}
              type="neutral"
              variant="secondary"
              aria-hidden>
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
            <IconShell
              size={iconSize}
              type="neutral"
              variant="secondary"
              aria-hidden>
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
            <IconShell
              size={iconSize}
              type="neutral"
              variant="secondary"
              aria-hidden>
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
            <InputGroupButton size="icon-xs" variant="ghost" aria-label="Send">
              <IconShell size={iconSize} type="neutral" hoverable aria-hidden>
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
          <IconShell
            size={iconSize}
            type="neutral"
            variant="secondary"
            aria-hidden>
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
                  <IconShell
                    size={iconSize}
                    type="neutral"
                    variant="secondary"
                    aria-hidden>
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
                  <IconShell
                    size={iconSize}
                    type="neutral"
                    variant="secondary"
                    aria-hidden>
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
  const { gap, iconSize } = inputGroupFieldConfig.default;
  const { expanded, setAxisExpanded } = useDemoExpandState([variantAxis]);
  const variants = resolveAxisOptions(variantAxis, expanded.variant ?? false);

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
    {
      label: 'Disabled',
      tone: 'disabled' as const,
      showAffixes: true,
      defaultGroupClass: '',
      inlineGroupClass: '',
      inputProps: { disabled: true, placeholder: 'Placeholder' },
      helper: 'This field is disabled',
    },
  ];

  return (
    <div className="space-y-6">
      <DemoExpandControls
        axes={[variantAxis]}
        expanded={expanded}
        onExpandedChange={setAxisExpanded}
      />

      {statuses.map(
        ({
          label,
          icon: statusIcon,
          statusColor,
          tone,
          showAffixes,
          defaultGroupClass,
          inlineGroupClass,
          inputProps,
          helper,
        }) => {
          const isDisabled = Boolean(inputProps.disabled);

          return (
            <DemoAxisRow key={tone}>
              {variants.map(variant => {
                const fieldId = `ig-status-${tone}-${variant}`;
                const groupClass =
                  variant === 'inline' ? inlineGroupClass : defaultGroupClass;

                return (
                  <FieldSet key={variant} className={`${FIELD_WIDTH} ${gap}`}>
                    <FieldLabel
                      htmlFor={fieldId}
                      disabled={isDisabled}
                      className={getLabelClass('default', variant)}>
                      {label}
                    </FieldLabel>
                    <InputGroup
                      variant={variant}
                      className={groupClass || undefined}>
                      {showAffixes ? (
                        <LeadingIcon>
                          <IconShell
                            size={iconSize}
                            type="neutral"
                            variant="secondary"
                            disabled={isDisabled}
                            aria-hidden>
                            <Icon icon="crop_free" />
                          </IconShell>
                        </LeadingIcon>
                      ) : null}
                      {showAffixes ? (
                        <InputGroupAddon align="inline-start">
                          <InputGroupText>PRE</InputGroupText>
                        </InputGroupAddon>
                      ) : null}
                      <InputGroupInput
                        id={fieldId}
                        variant={variant}
                        {...inputProps}
                      />
                      {showAffixes ? (
                        <InputGroupAddon align="inline-end">
                          <InputGroupText>SUF</InputGroupText>
                        </InputGroupAddon>
                      ) : null}
                      {showAffixes ? (
                        <TrailingIcon>
                          <IconShell
                            size={iconSize}
                            type="neutral"
                            variant="secondary"
                            disabled={isDisabled}
                            aria-hidden>
                            <Icon icon="crop_free" />
                          </IconShell>
                        </TrailingIcon>
                      ) : statusIcon ? (
                        <InputGroupAddon align="inline-end">
                          <IconShell
                            size={iconSize}
                            type="custom"
                            className={statusColor}
                            disabled={isDisabled}
                            aria-hidden>
                            <Icon icon={statusIcon} />
                          </IconShell>
                        </InputGroupAddon>
                      ) : null}
                    </InputGroup>
                    {tone === 'error' ? (
                      <FieldError>Feedback message here</FieldError>
                    ) : helper ? (
                      <FieldDescription disabled={isDisabled}>
                        {helper}
                      </FieldDescription>
                    ) : (
                      <FieldDescription className={statusColor}>
                        Feedback message here
                      </FieldDescription>
                    )}
                  </FieldSet>
                );
              })}
            </DemoAxisRow>
          );
        },
      )}
    </div>
  );
}

export function InputGroupDeleteOnFocus() {
  return (
    <div className="flex flex-col gap-6">
      <DeleteOnFocusField variant="default" fieldId="ig-delete-default" />
      <DeleteOnFocusField variant="inline" fieldId="ig-delete-inline" />
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'InputGroupDemo',
    title: 'Default',
    description: 'Search field with a leading icon.',
  },
  {
    name: 'InputGroupLeadingIcon',
    title: 'Leading icon',
    description: 'Icon before the input (filled and inline).',
  },
  {
    name: 'InputGroupTrailing',
    title: 'Trailing action',
    description: 'Text, button, or icon after the input.',
  },
  {
    name: 'InputGroupBothSides',
    title: 'Both sides',
    description: 'Leading icon and trailing suffix together.',
  },
  {
    name: 'InputGroupAffixes',
    title: 'Prefix and suffix',
    description: 'Fixed text before and after the value (with icons).',
  },
  {
    name: 'InputGroupSizes',
    title: 'Sizes',
    description: 'Small, default, and large (filled and inline).',
  },
  {
    name: 'InputGroupStatusStates',
    title: 'Validation',
    description:
      'Error, warning, success, and disabled states. Toggle Variants to compare default and inline.',
  },
  {
    name: 'InputGroupDeleteOnFocus',
    title: 'Clear on focus',
    description:
      'Backspace control appears when the field is focused and has text.',
  },
];

export const inputGroup = createLegacyDemo('input-group', examples, {
  InputGroupDemo: <InputGroupDemo />,
  InputGroupLeadingIcon: <InputGroupLeadingIcon />,
  InputGroupTrailing: <InputGroupTrailing />,
  InputGroupBothSides: <InputGroupBothSides />,
  InputGroupAffixes: <InputGroupAffixes />,
  InputGroupSizes: <InputGroupSizes />,
  InputGroupStatusStates: <InputGroupStatusStates />,
  InputGroupDeleteOnFocus: <InputGroupDeleteOnFocus />,
});
