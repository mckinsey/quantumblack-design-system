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
  listHeaderPy,
  listItemsPb,
  listLegendMb,
} from '@/lib/group-list';
import { cn } from '@/lib/utils';

const GROUP_ITEMS = [
  { value: 'item-1', label: 'Checkbox label', count: '01' },
  { value: 'item-2', label: 'Checkbox label', count: '02' },
  { value: 'item-3', label: 'Checkbox label', count: '03' },
  { value: 'item-4', label: 'Checkbox label', count: '04' },
  { value: 'item-5', label: 'Checkbox label', count: '05' },
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
            01
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
            01
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
            01
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
              01
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
  instanceId,
}: {
  density: ListDensity;
  size: ListSize;
  instanceId: string;
}) {
  const [value, setValue] = useState<string[]>([
    GROUP_ITEMS[1].value,
    GROUP_ITEMS[2].value,
  ]);

  const checkboxSize = itemCheckboxSize(size);
  const labelClass = itemLabelClass(size);
  const countLabel = `${value.length}/${ALL_VALUES.length}`;
  const headerId = `${instanceId}-header`;

  return (
    <FieldSet className="w-[220px] shrink-0 gap-0">
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
        className="gap-0">
        <Field
          orientation="horizontal"
          className={cn(
            'border-stroke-divider w-full items-center gap-2 border-b',
            listHeaderPy(density),
          )}>
          <Checkbox id={headerId} size={checkboxSize} parent />
          <FieldLabel htmlFor={headerId} className={cn(labelClass, 'flex-1')}>
            Checkbox label
          </FieldLabel>
          <span className={cn(labelClass, 'shrink-0')} aria-hidden>
            {countLabel}
          </span>
        </Field>
        <div
          className={cn(
            'flex flex-col',
            density === 'comfortable' ? 'gap-4' : 'gap-3',
            listItemsPb(density),
          )}>
          {GROUP_ITEMS.map(item => {
            const id = `${instanceId}-${item.value}`;

            return (
              <Field
                key={item.value}
                orientation="horizontal"
                className="w-full gap-2">
                <Checkbox id={id} size={checkboxSize} value={item.value} />
                <FieldLabel htmlFor={id} className={labelClass}>
                  {item.label}
                </FieldLabel>
                <span className={labelClass} aria-hidden>
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
  return (
    <CheckboxItemGroupVariant
      density="default"
      size="reg"
      instanceId="checkbox-item-group"
    />
  );
}

export function CheckboxItemGroupSection() {
  return (
    <div className="flex flex-col gap-10">
      {densityVariants.map(density => (
        <div key={density.key} className="flex flex-wrap gap-8">
          {sizeVariants.map(size => (
            <CheckboxItemGroupVariant
              key={`${density.key}-${size.key}`}
              density={density.key}
              size={size.key}
              instanceId={`${density.prefix}${size.prefix}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CheckboxHorizontal() {
  return (
    <div className="flex flex-col gap-10">
      {densityVariants.map(density => (
        <div key={density.key} className="flex flex-col gap-8">
          {sizeVariants.map(size => {
            const prefix = `${density.prefix}h${size.prefix}`;
            const ids = [1, 2, 3].map(i => `${prefix}-${i}`);
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
                    <Field key={id} orientation="horizontal" className="gap-2">
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
