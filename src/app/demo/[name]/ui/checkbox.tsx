'use client';

import { useMemo, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { cn } from '@/lib/utils';

const CHECKBOX_GROUP_ITEMS = [
  { id: 'group-1', label: 'Checkbox label', suffix: '01' },
  { id: 'group-2', label: 'Checkbox label', suffix: '01' },
  { id: 'group-3', label: 'Checkbox label', suffix: '01' },
  { id: 'group-4', label: 'Checkbox label', suffix: '01' },
  { id: 'group-5', label: 'Checkbox label', suffix: '01' },
];

type Density = 'compact' | 'relaxed';
type ItemGroupSize = 'sm' | 'default' | 'lg';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Default checkbox example – single option with Field
 */
export function CheckboxDemo() {
  return (
    <FieldSet>
      <Field orientation="horizontal" className="gap-2">
        <Checkbox id="terms-demo" />
        <FieldLabel htmlFor="terms-demo" className="paragraph-medium-primary">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldSet>
  );
}

/**
 * CheckboxGroup/Item – single item with label + suffix in 3 variants (Figma node 36287-497).
 * Shows unchecked, checked, and indeterminate states.
 */
export function CheckboxGroupItem() {
  return (
    <FieldSet>
      <FieldLegend variant="label">CheckboxGroup/Item</FieldLegend>
      <FieldDescription>
        Three variants: unchecked, checked, indeterminate.
      </FieldDescription>
      <FieldGroup data-slot="checkbox-group" className="gap-3">
        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox id="item-unchecked" />
          <FieldLabel
            htmlFor="item-unchecked"
            className="paragraph-medium-primary">
            Checkbox label
          </FieldLabel>
          <span
            className="text-fg-secondary paragraph-medium-primary"
            aria-hidden>
            01
          </span>
        </Field>

        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox id="item-checked" checked />
          <FieldLabel
            htmlFor="item-checked"
            className="paragraph-medium-primary">
            Checkbox label
          </FieldLabel>
          <span
            className="text-fg-primary paragraph-medium-primary"
            aria-hidden>
            01
          </span>
        </Field>

        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox id="item-indeterminate" checked="indeterminate" />
          <FieldLabel
            htmlFor="item-indeterminate"
            className="paragraph-medium-primary">
            Checkbox label
          </FieldLabel>
          <span
            className="text-fg-secondary paragraph-medium-primary"
            aria-hidden>
            01
          </span>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

/**
 * CheckboxGroup/Item – 3 sizes (Figma node 36287-497).
 * Same item pattern (label + suffix) at small, default, and large.
 */
export function CheckboxItemSizes() {
  return (
    <FieldSet>
      <FieldLegend variant="label">Checkbox item sizes</FieldLegend>
      <FieldDescription>
        Checkbox item with label and suffix at small, default, and large sizes.
      </FieldDescription>
      <FieldGroup data-slot="checkbox-group" className="gap-3">
        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox id="item-size-sm" size="default" />
          <FieldLabel
            htmlFor="item-size-sm"
            className="paragraph-small-primary">
            Checkbox label
          </FieldLabel>
          <span
            className="text-fg-secondary paragraph-small-primary"
            aria-hidden>
            01
          </span>
        </Field>

        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox id="item-size-default" size="default" />
          <FieldLabel
            htmlFor="item-size-default"
            className="paragraph-medium-primary">
            Checkbox label
          </FieldLabel>
          <span
            className="text-fg-secondary paragraph-medium-primary"
            aria-hidden>
            01
          </span>
        </Field>

        <Field orientation="horizontal" className="w-[220px] gap-2">
          <Checkbox id="item-size-lg" size="lg" />
          <FieldLabel
            htmlFor="item-size-lg"
            className="paragraph-large-primary">
            Checkbox label
          </FieldLabel>
          <span
            className="text-fg-secondary paragraph-large-primary"
            aria-hidden>
            01
          </span>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

/**
 * Checkbox Item Group – header with underline + list of items (Figma node 34046-126637).
 * Main header has checkbox (select-all), label, count (e.g. 2/5), and underline below.
 */
export function CheckboxItemGroup() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set([CHECKBOX_GROUP_ITEMS[1].id, CHECKBOX_GROUP_ITEMS[2].id]),
  );

  const { checked, indeterminate } = useMemo(() => {
    const total = CHECKBOX_GROUP_ITEMS.length;
    const count = selectedIds.size;

    if (count === 0) {
      return { checked: false, indeterminate: false };
    }

    if (count === total) {
      return { checked: true, indeterminate: false };
    }

    return { checked: false, indeterminate: true };
  }, [selectedIds]);

  const onHeaderChange = (checkedState: boolean | 'indeterminate') => {
    if (checkedState === true) {
      setSelectedIds(new Set(CHECKBOX_GROUP_ITEMS.map(item => item.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const onItemChange = (id: string, isChecked: boolean) => {
    setSelectedIds((prev: Set<string>) => {
      const next = new Set(prev);
      if (isChecked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const countLabel = `${selectedIds.size}/${CHECKBOX_GROUP_ITEMS.length}`;

  return (
    <FieldSet>
      <Field
        orientation="horizontal"
        className="border-stroke-divider w-[220px] gap-2 border-b pt-2 pb-3">
        <Checkbox
          id="checkbox-item-group-header"
          checked={indeterminate ? 'indeterminate' : checked}
          onCheckedChange={onHeaderChange}
        />
        <span className="min-w-0 flex-1">
          <FieldLabel
            htmlFor="checkbox-item-group-header"
            className="paragraph-medium-primary">
            Checkbox label
          </FieldLabel>
        </span>
        <span
          className="text-fg-secondary paragraph-medium-primary shrink-0"
          aria-hidden>
          {countLabel}
        </span>
      </Field>
      <FieldGroup data-slot="checkbox-group" className="gap-3">
        {CHECKBOX_GROUP_ITEMS.map(item => {
          const isChecked = selectedIds.has(item.id);

          return (
            <Field
              key={item.id}
              orientation="horizontal"
              className="w-[220px] gap-2">
              <Checkbox
                id={item.id}
                checked={isChecked}
                onCheckedChange={(value: boolean | 'indeterminate') =>
                  onItemChange(item.id, value === true)
                }
              />
              <FieldLabel
                htmlFor={item.id}
                className="paragraph-medium-primary">
                {item.label}
              </FieldLabel>
              <span
                className={cn(
                  'paragraph-medium-primary',
                  isChecked ? 'text-fg-primary' : 'text-fg-secondary',
                )}
                aria-hidden>
                {item.suffix}
              </span>
            </Field>
          );
        })}
      </FieldGroup>
    </FieldSet>
  );
}

// ---------------------------------------------------------------------------
// Checkbox Item Group Section – constants (kept here so they’re visible with
// the example below; must be at module scope so they’re defined at runtime).
// ---------------------------------------------------------------------------

const HEADER_LABEL_CLASS_BY_SIZE_ITEM_GROUP: Record<ItemGroupSize, string> = {
  sm: 'paragraph-small-primary',
  default: 'paragraph-medium-primary',
  lg: 'paragraph-large-primary',
};

const ITEM_LABEL_CLASS_BY_SIZE_ITEM_GROUP: Record<ItemGroupSize, string> = {
  sm: 'paragraph-small-primary',
  default: 'paragraph-medium-primary',
  lg: 'paragraph-large-primary',
};

const SUFFIX_CLASS_BY_SIZE: Record<ItemGroupSize, string> = {
  sm: 'paragraph-small-primary',
  default: 'paragraph-medium-primary',
  lg: 'paragraph-large-primary',
};

/**
 * Spacing for CheckboxItemGroup by density and size.
 *
 * Figma spec uses asymmetric header padding for reg size, and the item gap
 * differs for sm vs reg/lg. See Figma node 34046-126578.
 */
function getCheckboxItemGroupSpacing(density: Density, size: ItemGroupSize) {
  if (density === 'compact') {
    return {
      headerPaddingY: size === 'default' ? 'pt-2 pb-3' : 'pt-3 pb-3',
      gapBetweenItems: size === 'sm' ? 'gap-2' : 'gap-3',
      itemsBottomPadding: 'pb-3',
      gapBetweenSections: 'gap-3',
    };
  }

  const relaxedHeaderPadding: Record<ItemGroupSize, string> = {
    sm: 'pt-3 pb-3',
    default: 'pt-3 pb-4',
    lg: 'pt-4 pb-4',
  };

  return {
    headerPaddingY: relaxedHeaderPadding[size],
    gapBetweenItems: size === 'sm' ? 'gap-3' : 'gap-4',
    itemsBottomPadding: size === 'sm' ? 'pb-3' : 'pb-4',
    gapBetweenSections: size === 'sm' ? 'gap-3' : 'gap-4',
  };
}

/**
 * Checkbox Item Group Section – 2 densities × 3 sizes in 2 rows (Figma 34046-126578).
 * Row 1: compact density with sm, default, lg. Row 2: relaxed with sm, default, lg.
 *
 * CHECKBOX_ITEM_GROUP_SPACING and HEADER/ITEM_LABEL_CLASS_BY_SIZE_ITEM_GROUP are
 * defined just above so the full example (constants + variant + section) stays together.
 */
export function CheckboxItemGroupSection() {
  /**
   * Single Checkbox Item Group with density and size.
   * Renders one group (header + list) using CHECKBOX_ITEM_GROUP_SPACING for padding/gaps.
   */
  function CheckboxItemGroupVariant({
    density,
    size,
    instanceId,
  }: {
    density: Density;
    size: ItemGroupSize;
    instanceId: string;
  }) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
      new Set([CHECKBOX_GROUP_ITEMS[1].id, CHECKBOX_GROUP_ITEMS[2].id]),
    );

    const { checked, indeterminate } = useMemo(() => {
      const total = CHECKBOX_GROUP_ITEMS.length;
      const count = selectedIds.size;

      if (count === 0) {
        return { checked: false, indeterminate: false };
      }

      if (count === total) {
        return { checked: true, indeterminate: false };
      }

      return { checked: false, indeterminate: true };
    }, [selectedIds]);

    const onHeaderChange = (checkedState: boolean | 'indeterminate') => {
      if (checkedState === true) {
        setSelectedIds(new Set(CHECKBOX_GROUP_ITEMS.map(item => item.id)));
      } else {
        setSelectedIds(new Set());
      }
    };

    const onItemChange = (id: string, isChecked: boolean) => {
      setSelectedIds((prev: Set<string>) => {
        const next = new Set(prev);
        if (isChecked) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });
    };

    const countLabel = `${selectedIds.size}/${CHECKBOX_GROUP_ITEMS.length}`;
    const headerId = `checkbox-item-group-${instanceId}-header`;

    const spacing = getCheckboxItemGroupSpacing(density, size);

    const headerBorderClass = 'border-stroke-divider border-b';

    const checkboxSize = size === 'lg' ? 'lg' : 'default';
    const headerLabelClass = HEADER_LABEL_CLASS_BY_SIZE_ITEM_GROUP[size];
    const itemLabelClass = ITEM_LABEL_CLASS_BY_SIZE_ITEM_GROUP[size];
    const suffixClass = SUFFIX_CLASS_BY_SIZE[size];

    return (
      <div
        className={cn(
          'flex w-[220px] shrink-0 flex-col',
          spacing.gapBetweenSections,
        )}>
        <Field
          orientation="horizontal"
          className={cn(
            'w-full items-center gap-2',
            spacing.headerPaddingY,
            headerBorderClass,
          )}>
          <Checkbox
            id={headerId}
            size={checkboxSize}
            checked={indeterminate ? 'indeterminate' : checked}
            onCheckedChange={onHeaderChange}
          />
          <span className="min-w-0 flex-1">
            <FieldLabel htmlFor={headerId} className={headerLabelClass}>
              Checkbox label
            </FieldLabel>
          </span>
          <span
            className={cn('text-fg-secondary shrink-0', suffixClass)}
            aria-hidden>
            {countLabel}
          </span>
        </Field>
        <FieldGroup
          data-slot="checkbox-group"
          className={cn(
            'flex flex-col',
            spacing.gapBetweenItems,
            spacing.itemsBottomPadding,
          )}>
          {CHECKBOX_GROUP_ITEMS.map(item => {
            const isItemChecked = selectedIds.has(item.id);

            return (
              <Field
                key={item.id}
                orientation="horizontal"
                className="w-full gap-2">
                <Checkbox
                  id={`checkbox-item-group-${instanceId}-${item.id}`}
                  size={checkboxSize}
                  checked={isItemChecked}
                  onCheckedChange={(value: boolean | 'indeterminate') =>
                    onItemChange(item.id, value === true)
                  }
                />
                <FieldLabel
                  htmlFor={`checkbox-item-group-${instanceId}-${item.id}`}
                  className={itemLabelClass}>
                  {item.label}
                </FieldLabel>
                <span
                  className={cn(
                    suffixClass,
                    isItemChecked ? 'text-fg-primary' : 'text-fg-secondary',
                  )}
                  aria-hidden>
                  {item.suffix}
                </span>
              </Field>
            );
          })}
        </FieldGroup>
      </div>
    );
  }

  return (
    <FieldSet>
      <FieldLegend variant="label">Checkbox Item Group Section</FieldLegend>
      <FieldDescription>
        2 densities × 3 sizes (6 variants). Row 1: compact. Row 2: relaxed.
      </FieldDescription>
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap gap-8">
          <CheckboxItemGroupVariant
            density="compact"
            size="sm"
            instanceId="compact-sm"
          />
          <CheckboxItemGroupVariant
            density="compact"
            size="default"
            instanceId="compact-default"
          />
          <CheckboxItemGroupVariant
            density="compact"
            size="lg"
            instanceId="compact-lg"
          />
        </div>
        <div className="flex flex-wrap gap-8">
          <CheckboxItemGroupVariant
            density="relaxed"
            size="sm"
            instanceId="relaxed-sm"
          />
          <CheckboxItemGroupVariant
            density="relaxed"
            size="default"
            instanceId="relaxed-default"
          />
          <CheckboxItemGroupVariant
            density="relaxed"
            size="lg"
            instanceId="relaxed-lg"
          />
        </div>
      </div>
    </FieldSet>
  );
}

/**
 * Checkbox sizes – 2 variants: default and large (Field group).
 */
export function CheckboxSizes() {
  return (
    <FieldSet>
      <FieldLegend variant="label">Checkbox sizes</FieldLegend>
      <FieldDescription>Default and large.</FieldDescription>
      <FieldGroup data-slot="checkbox-group" className="gap-3">
        <Field orientation="horizontal" className="gap-2">
          <Checkbox id="size-default" size="default" />
          <FieldLabel
            htmlFor="size-default"
            className="paragraph-medium-primary">
            Default size
          </FieldLabel>
        </Field>

        <Field orientation="horizontal" className="gap-2">
          <Checkbox id="size-lg" size="lg" />
          <FieldLabel htmlFor="size-lg" className="paragraph-large-primary">
            Large size
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

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
      'Group with header (select-all, label, count), underline below header, and list of items (Figma 34046-126637).',
  },
  {
    name: 'CheckboxItemGroupSection',
    title: 'Checkbox Item Group Section',
    description:
      '2 densities × 3 sizes (6 variants) in 2 rows. Row 1: compact; row 2: relaxed (Figma 34046-126578).',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const checkbox = {
  name: 'checkbox',
  components: {
    'Normal checkbox': <CheckboxDemo />,
    'Checkbox size': <CheckboxSizes />,
    'Checkbox item': <CheckboxGroupItem />,
    'Checkbox item sizes': <CheckboxItemSizes />,
    'Checkbox Item Group': <CheckboxItemGroup />,
    'Checkbox Item Group Section': <CheckboxItemGroupSection />,
  },
};
