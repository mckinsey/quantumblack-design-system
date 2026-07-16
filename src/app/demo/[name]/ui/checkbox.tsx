'use client';

import { useState } from 'react';

import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox';
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import {
  type ListDensity,
  type ListSize,
  groupLegendClass,
  itemCheckboxSize,
  itemLabelClass,
  listDensityGap,
  listLegendMb,
  listSectionGap,
} from '@/lib/group-list';
import { cn } from '@/lib/utils';

const GROUP_ITEMS = [
  { value: 'item-1', label: 'Checkbox label', count: '1' },
  { value: 'item-2', label: 'Checkbox label', count: '1' },
  { value: 'item-3', label: 'Checkbox label', count: '1' },
  { value: 'item-4', label: 'Checkbox label', count: '1' },
  { value: 'item-5', label: 'Checkbox label', count: '1' },
];

const ALL_VALUES = GROUP_ITEMS.map(item => item.value);

const sizeVariants: {
  key: ListSize;
  label: string;
  prefix: string;
}[] = [
  { key: 'reg', label: 'Regular', prefix: 'r' },
  { key: 'sm', label: 'Small', prefix: 's' },
  { key: 'lg', label: 'Large', prefix: 'l' },
];

const densityVariants: {
  key: ListDensity;
  label: string;
  prefix: string;
}[] = [
  { key: 'default', label: 'default', prefix: 'd' },
  { key: 'comfortable', label: 'comfortable', prefix: 'c' },
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

export function CheckboxSizes() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label" className="label-regular-primary mb-3">
        Checkbox sizes
      </FieldLegend>
      <CheckboxGroup>
        <Field orientation="horizontal" className="gap-2">
          <Checkbox id="size-default" size="default" />
          <FieldLabel
            htmlFor="size-default"
            className="text-fg-secondary label-regular-primary">
            Default size
          </FieldLabel>
        </Field>
        <Field orientation="horizontal" className="gap-2">
          <Checkbox id="size-lg" size="lg" />
          <FieldLabel
            htmlFor="size-lg"
            className="text-fg-secondary label-large-primary">
            Large size
          </FieldLabel>
        </Field>
      </CheckboxGroup>
    </FieldSet>
  );
}

export function CheckboxGroupItem() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label" className="label-regular-primary mb-3">
        CheckboxGroup/Item
      </FieldLegend>
      <CheckboxGroup defaultValue={['item-checked']}>
        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox id="item-unchecked" value="item-unchecked" />
          <FieldLabel
            htmlFor="item-unchecked"
            className="text-fg-secondary paragraph-regular-primary">
            Checkbox label
          </FieldLabel>
          <span
            className="text-fg-secondary paragraph-regular-primary"
            aria-hidden>
            1
          </span>
        </Field>
        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox id="item-checked" value="item-checked" />
          <FieldLabel
            htmlFor="item-checked"
            className="text-fg-secondary paragraph-regular-primary">
            Checkbox label
          </FieldLabel>
          <span
            className="text-fg-secondary paragraph-regular-primary"
            aria-hidden>
            1
          </span>
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
            Checkbox label
          </FieldLabel>
          <span
            className="text-fg-secondary paragraph-regular-primary"
            aria-hidden>
            1
          </span>
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
              size={itemCheckboxSize(size.key)}
              value={`item-size-${size.key}`}
            />
            <FieldLabel
              htmlFor={`item-size-${size.key}`}
              className={itemLabelClass(size.key)}>
              Checkbox label
            </FieldLabel>
            <span className={itemLabelClass(size.key)} aria-hidden>
              1
            </span>
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

  const checkboxSize = itemCheckboxSize(size);
  const labelClass = itemLabelClass(size);
  const densityGap = listDensityGap(size, density);
  const sectionGap = listSectionGap(size, density);

  return (
    <FieldSet className="w-[240px] shrink-0 gap-0">
      <FieldLegend
        variant="label"
        className={cn(
          groupLegendClass(size),
          listLegendMb(size, density, 'vertical'),
        )}>
        List label
      </FieldLegend>
      <CheckboxGroup
        allValues={ALL_VALUES}
        value={value}
        onValueChange={setValue}
        density={density}
        className={sectionGap}>
        <div className={cn('flex w-full flex-col', densityGap)}>
          <Field orientation="horizontal" className="w-full items-center gap-2">
            <FieldLabel
              className={cn(
                labelClass,
                'flex min-w-0 flex-1 cursor-pointer items-center gap-2',
              )}>
              <Checkbox size={checkboxSize} parent />
              <span className="min-w-0 flex-1">Checkbox label</span>
            </FieldLabel>
            <span className={cn(labelClass, 'shrink-0')} aria-hidden>
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
                    labelClass,
                    'flex min-w-0 flex-1 cursor-pointer items-center gap-2',
                  )}>
                  <Checkbox size={checkboxSize} value={item.value} />
                  <span className="min-w-0 flex-1">{item.label}</span>
                </FieldLabel>
                <span className={cn(labelClass, 'shrink-0')} aria-hidden>
                  {item.count}
                </span>
              </Field>
            );
          })}
        </div>
      </CheckboxGroup>
    </FieldSet>
  );
}

export function CheckboxItemGroup() {
  return <CheckboxItemGroupVariant density="default" size="reg" />;
}

export function CheckboxItemGroupSection() {
  return (
    <div className="flex flex-col gap-10">
      {densityVariants.map(density => (
        <div key={density.key} className="flex flex-col gap-4">
          <p className="label-small-primary text-fg-secondary capitalize">
            {density.label}
          </p>
          <div className="flex flex-wrap gap-8">
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
        <div key={density.key} className="flex flex-col gap-4">
          <p className="label-small-primary text-fg-secondary capitalize">
            {density.label}
          </p>
          <div className="flex flex-col gap-8">
            {sizeVariants.map(size => {
              const prefix = `${density.prefix}h${size.prefix}`;
              const ids = [1, 2, 3].map(n => `${prefix}-${n}`);
              const checkboxSize = itemCheckboxSize(size.key);
              const labelClass = itemLabelClass(size.key);

              return (
                <FieldSet key={prefix} className="w-auto gap-0">
                  <FieldLegend
                    variant="label"
                    className={cn(
                      groupLegendClass(size.key),
                      listLegendMb(size.key, density.key, 'horizontal'),
                    )}>
                    List label
                  </FieldLegend>
                  <CheckboxGroup
                    orientation="horizontal"
                    density={density.key}
                    defaultValue={[ids[1], ids[2]]}>
                    {ids.map(id => (
                      <Field
                        key={id}
                        orientation="horizontal"
                        className="gap-2">
                        <Checkbox id={id} size={checkboxSize} value={id} />
                        <FieldLabel htmlFor={id} className={labelClass}>
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
    name: 'CheckboxSizes',
    title: 'Checkbox size',
    description: '2 variants: default and large.',
  },
  {
    name: 'CheckboxGroupItem',
    title: 'Checkbox item',
    description:
      'Checkbox item with label and suffix in unchecked, checked, indeterminate.',
  },
  {
    name: 'CheckboxItemSizes',
    title: 'Checkbox item sizes',
    description: '3 sizes: small, default, and large.',
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
    description: '2 densities × 3 sizes (6 variants). default and comfortable.',
  },
  {
    name: 'CheckboxHorizontal',
    title: 'Checkbox Horizontal List',
    description:
      '2 densities × 3 sizes. Horizontal CheckboxGroup with list labels.',
  },
];

export const checkbox = {
  name: 'checkbox',
  components: {
    'Normal checkbox': <CheckboxDemo />,
    'Checkbox size': <CheckboxSizes />,
    'Checkbox item': <CheckboxGroupItem />,
    'Checkbox item sizes': <CheckboxItemSizes />,
    'Checkbox Item Group': <CheckboxItemGroup />,
    'Checkbox Item Group Section': <CheckboxItemGroupSection />,
    'Checkbox Horizontal List': <CheckboxHorizontal />,
  },
};
