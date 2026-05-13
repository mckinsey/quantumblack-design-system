'use client';

import { useRef, useState } from 'react';

import { Add } from '@/components/icons/Add';
import { Backspace } from '@/components/icons/Backspace';
import { Remove } from '@/components/icons/Remove';
import { Search } from '@/components/icons/Search';
import { FieldDescription, FieldSet, FieldTitle } from '@/components/ui/field';
import { IconShell } from '@/components/ui/icon-shell';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { type DemoExample } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

import { inputGroupFieldConfig } from './input-group-config';

/** Stepper input - Default and inline variants side by side for all sizes */
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
        <InputGroup variant={variant} size={size} className={width}>
          <InputGroupAddon align="inline-start">
            <InputGroupButton
              size={buttonSize}
              variant="ghost"
              onClick={decrement}
              disabled={isDecrementDisabled}
              aria-label="Decrease">
              <IconShell
                size={iconShellSize}
                variant={isDecrementDisabled ? 'disabled' : 'secondary'}>
                <Remove />
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
              <IconShell size={iconShellSize} variant="secondary">
                <Add />
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

/** Stepper input - States (Error, Success, Warning) */
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
          className={cn('w-[160px]', inputGroupClass)}>
          <InputGroupAddon align="inline-start">
            <InputGroupButton
              size={buttonSize}
              variant="ghost"
              onClick={decrement}
              disabled={isDecrementDisabled}
              aria-label="Decrease">
              <IconShell
                size={iconShellSize}
                variant={isDecrementDisabled ? 'disabled' : 'secondary'}>
                <Remove />
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
              <IconShell size={iconShellSize} variant="secondary">
                <Add />
              </IconShell>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription className={`${descriptionClass} ${statusClass}`}>
          {statusMessage}
        </FieldDescription>
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

/** Trailing delete (Backspace) control; always mounted, shown via `:focus-within` (demo). */
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
    const [value, setValue] = useState('');
    const groupContainerRef = useRef<HTMLDivElement>(null);

    const focusControl = () => {
      const control =
        groupContainerRef.current?.querySelector<HTMLInputElement>(
          '[data-slot=input-group-control]',
        );

      control?.focus();
    };

    const deleteAddonVisibility = cn(
      'transition-[opacity,visibility] duration-150',
      'invisible opacity-0 pointer-events-none',
      'group-focus-within:visible group-focus-within:opacity-100 group-focus-within:pointer-events-auto',
    );

    return (
      <FieldSet className={`w-[240px] ${gap}`}>
        <FieldTitle className={labelClassName}>Label</FieldTitle>
        <div ref={groupContainerRef} className="group">
          <InputGroup variant={variant}>
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <Search className={`icon ${iconSize}`} aria-hidden />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              variant={variant}
              placeholder="Search…"
              value={value}
              autoComplete="off"
              onChange={e => setValue(e.target.value)}
            />
            <InputGroupAddon
              align="inline-end"
              className={deleteAddonVisibility}>
              <InputGroupButton
                type="button"
                size="icon-xs"
                variant="ghost"
                aria-label="Delete entered text"
                className="hover:bg-transparent active:bg-transparent"
                onClick={() => {
                  setValue('');
                  focusControl();
                }}>
                <IconShell size="sm" variant="secondary">
                  <Backspace aria-hidden />
                </IconShell>
              </InputGroupButton>
            </InputGroupAddon>
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

export const examples: DemoExample[] = [
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
