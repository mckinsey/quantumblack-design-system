'use client';

import { useState } from 'react';

import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox';
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { cn } from '@/lib/utils';

type ListSize = 'sm' | 'default' | 'lg';
type ListDensity = 'default' | 'comfortable';

const GROUP_ITEMS = [
  { value: 'item-1', label: 'Checkbox label' },
  { value: 'item-2', label: 'Checkbox label' },
  { value: 'item-3', label: 'Checkbox label' },
  { value: 'item-4', label: 'Checkbox label' },
  { value: 'item-5', label: 'Checkbox label' },
];

const ALL_VALUES = GROUP_ITEMS.map(item => item.value);

const legendMb = {
  sm: { default: 'mb-3', comfortable: 'mb-4' },
  default: { default: 'mb-3', comfortable: 'mb-4' },
  lg: { default: 'mb-4', comfortable: 'mb-5' },
} as const;

const itemStackGap = {
  sm: { default: 'gap-2', comfortable: 'gap-3' },
  default: { default: 'gap-3', comfortable: 'gap-4' },
  lg: { default: 'gap-3', comfortable: 'gap-4' },
} as const;

function listLegendMb(size: ListSize, density: ListDensity) {
  return legendMb[size][density];
}

const sizeVariants = [
  {
    key: 'sm' as const,
    label: 'Small',
    prefix: 's',
    checkboxSize: 'default' as const,
    labelClass: 'text-fg-secondary paragraph-small-primary',
    legendClass: 'label-small-primary',
  },
  {
    key: 'default' as const,
    label: 'Regular',
    prefix: 'r',
    checkboxSize: 'default' as const,
    labelClass: 'text-fg-secondary paragraph-regular-primary',
    legendClass: 'label-regular-primary',
  },
  {
    key: 'lg' as const,
    label: 'Large',
    prefix: 'l',
    checkboxSize: 'lg' as const,
    labelClass: 'text-fg-secondary paragraph-large-primary',
    legendClass: 'label-large-primary',
  },
];

const densityVariants = [
  { key: 'default' as const, label: 'default', prefix: 'd' },
  { key: 'comfortable' as const, label: 'comfortable', prefix: 'c' },
];

export function CheckboxDemo() {
  return (
    <FieldSet className="w-full max-w-xs">
      <Field orientation="horizontal" className="gap-2">
        <Checkbox id="terms-demo" />
        <FieldLabel
          htmlFor="terms-demo"
          className="text-fg-secondary label-regular-primary">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldSet>
  );
}

export function CheckboxGroupItem() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label" className="label-regular-primary mb-3">
        Checkbox item
      </FieldLegend>
      <CheckboxGroup defaultValue={['item-checked']}>
        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox id="item-unchecked" value="item-unchecked" />
          <FieldLabel
            htmlFor="item-unchecked"
            className="text-fg-secondary paragraph-regular-primary">
            Unchecked
          </FieldLabel>
        </Field>
        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox id="item-checked" value="item-checked" />
          <FieldLabel
            htmlFor="item-checked"
            className="text-fg-secondary paragraph-regular-primary">
            Checked
          </FieldLabel>
        </Field>
        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox
            id="item-indeterminate"
            checked="indeterminate"
            value="item-indeterminate"
          />
          <FieldLabel
            htmlFor="item-indeterminate"
            className="text-fg-secondary paragraph-regular-primary">
            Indeterminate
          </FieldLabel>
        </Field>
      </CheckboxGroup>
    </FieldSet>
  );
}

export function CheckboxItemSizes() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label" className="label-regular-primary mb-3">
        Checkbox item sizes
      </FieldLegend>
      <CheckboxGroup>
        {sizeVariants.map(size => (
          <Field
            key={size.key}
            orientation="horizontal"
            className="w-[220px] gap-2">
            <Checkbox
              id={`item-size-${size.key}`}
              size={size.checkboxSize}
              value={`item-size-${size.key}`}
            />
            <FieldLabel
              htmlFor={`item-size-${size.key}`}
              className={size.labelClass}>
              {size.key === 'sm'
                ? 'Small size'
                : size.key === 'lg'
                  ? 'Large size'
                  : 'Default size'}
            </FieldLabel>
          </Field>
        ))}
      </CheckboxGroup>
    </FieldSet>
  );
}

function CheckboxItemGroupVariant({
  density,
  size,
}: {
  density: ListDensity;
  size: ListSize;
}) {
  const [value, setValue] = useState<string[]>([
    GROUP_ITEMS[1].value,
    GROUP_ITEMS[2].value,
  ]);

  const sizeCfg = sizeVariants.find(s => s.key === size)!;
  const densityGap = itemStackGap[size][density];

  return (
    <FieldSet className="w-[240px] shrink-0 gap-0">
      <FieldLegend
        variant="label"
        className={cn(sizeCfg.legendClass, listLegendMb(size, density))}>
        List label
      </FieldLegend>
      <CheckboxGroup
        allValues={ALL_VALUES}
        value={value}
        onValueChange={setValue}
        density={density}
        size={size}>
        <div className={cn('flex w-full flex-col', densityGap)}>
          <Field orientation="horizontal" className="w-full items-center gap-2">
            <FieldLabel
              className={cn(
                sizeCfg.labelClass,
                'flex min-w-0 flex-1 cursor-pointer items-center gap-2',
              )}>
              <Checkbox size={sizeCfg.checkboxSize} parent />
              <span className="min-w-0 flex-1">Checkbox label</span>
            </FieldLabel>
            <span className={cn(sizeCfg.labelClass, 'shrink-0')} aria-hidden>
              <span className="text-fg-primary">{value.length}</span>
              <span>/{ALL_VALUES.length}</span>
            </span>
          </Field>
          <div
            className="border-stroke-divider flex h-2 w-full flex-col"
            role="separator"
            aria-orientation="horizontal">
            <div className="border-stroke-divider h-1 w-full border-b" />
            <div className="h-1 w-full" />
          </div>
        </div>
        <div className={cn('flex w-full flex-col', densityGap)}>
          {GROUP_ITEMS.map(item => {
            return (
              <Field
                key={item.value}
                orientation="horizontal"
                className="w-full gap-2">
                <FieldLabel
                  className={cn(
                    sizeCfg.labelClass,
                    'flex min-w-0 flex-1 cursor-pointer items-center gap-2',
                  )}>
                  <Checkbox size={sizeCfg.checkboxSize} value={item.value} />
                  <span className="min-w-0 flex-1">{item.label}</span>
                </FieldLabel>
              </Field>
            );
          })}
        </div>
      </CheckboxGroup>
    </FieldSet>
  );
}

export function CheckboxItemGroup() {
  return <CheckboxItemGroupVariant density="default" size="default" />;
}

export function CheckboxItemGroupSection() {
  return (
    <div className="flex flex-col gap-10">
      {densityVariants.map(density => (
        <div
          key={density.key}
          className="border-stroke-tertiary border-b pb-6 last:border-b-0 last:pb-0">
          <h4 className="label-regular-primary mb-4">
            Density: {density.label}
          </h4>
          <div className="flex flex-wrap justify-center gap-12">
            {sizeVariants.map(size => (
              <CheckboxItemGroupVariant
                key={`${density.key}-${size.key}`}
                density={density.key}
                size={size.key}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CheckboxHorizontal() {
  return (
    <div className="flex flex-col gap-10">
      {densityVariants.map(density => (
        <div
          key={density.key}
          className="border-stroke-tertiary border-b pb-6 last:border-b-0 last:pb-0">
          <h4 className="label-regular-primary mb-4">
            Density: {density.label}
          </h4>
          <div className="flex flex-col gap-12">
            {sizeVariants.map(size => {
              const prefix = `${density.prefix}h${size.prefix}`;
              const ids = [1, 2, 3].map(n => `${prefix}-${n}`);

              return (
                <FieldSet key={prefix} className="w-auto">
                  <FieldLegend
                    variant="label"
                    className={cn(
                      size.legendClass,
                      listLegendMb(size.key, density.key),
                    )}>
                    {size.label}
                  </FieldLegend>
                  <CheckboxGroup
                    orientation="horizontal"
                    density={density.key}
                    size={size.key}
                    defaultValue={[ids[1], ids[2]]}>
                    {ids.map(id => (
                      <Field
                        key={id}
                        orientation="horizontal"
                        className="gap-2">
                        <Checkbox id={id} size={size.checkboxSize} value={id} />
                        <FieldLabel htmlFor={id} className={size.labelClass}>
                          Checkbox label
                        </FieldLabel>
                      </Field>
                    ))}
                  </CheckboxGroup>
                </FieldSet>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export const examples = [
  {
    name: 'CheckboxDemo',
    title: 'Normal checkbox',
    description: 'A normal checkbox with label.',
  },
  {
    name: 'CheckboxGroupItem',
    title: 'Checkbox item',
    description: 'Unchecked, checked, and indeterminate.',
  },
  {
    name: 'CheckboxItemSizes',
    title: 'Checkbox item sizes',
    description: 'Small, default, and large.',
  },
  {
    name: 'CheckboxItemGroup',
    title: 'Checkbox Item Group',
    description:
      'Group with parent select-all, label, count, underline, and list of items.',
  },
  {
    name: 'CheckboxItemGroupSection',
    title: 'Checkbox Item Group Section',
    description:
      'Small, regular, and large in default and comfortable density.',
  },
  {
    name: 'CheckboxHorizontal',
    title: 'Checkbox Horizontal List',
    description:
      'Inline checkbox groups by size (small, regular, large) and density.',
  },
];

export const checkbox = {
  name: 'checkbox',
  components: {
    'Normal checkbox': <CheckboxDemo />,
    'Checkbox item': <CheckboxGroupItem />,
    'Checkbox item sizes': <CheckboxItemSizes />,
    'Checkbox Item Group': <CheckboxItemGroup />,
    'Checkbox Item Group Section': <CheckboxItemGroupSection />,
    'Checkbox Horizontal List': <CheckboxHorizontal />,
  },
};
