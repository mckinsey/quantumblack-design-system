'use client';

import * as React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Combobox,
  ComboboxAnchor,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/combobox';
import { FieldDescription, FieldSet, FieldTitle } from '@/components/ui/field';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
import { Tag } from '@/components/ui/tag';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

const FIELD_WIDTH = 'w-[240px]';

const fieldConfig = {
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

const getLabelClass = (
  size: keyof typeof fieldConfig,
  variant: 'default' | 'inline' = 'default',
) => {
  return cn(
    fieldConfig[size].label,
    variant === 'inline' && size !== 'sm' && 'mb-[-4px]',
  );
};

const frameworks = [
  'Next.js',
  'SvelteKit',
  'Nuxt.js',
  'Remix',
  'Astro',
  'React',
  'Vue',
  'Angular',
];

const sizes = [
  { label: 'Small', size: 'sm' as const },
  { label: 'Default', size: 'default' as const },
  { label: 'Large', size: 'lg' as const },
];

type OptionItem = { id: string; label: string; subLabel: string };

const optionItems: OptionItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `opt-${i + 1}`,
  label: `Option #`,
  subLabel: String(i + 1).padStart(2, '0'),
}));

const stopPropagationHandlers = {
  onClick: (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  },
  onKeyDown: (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
    }
  },
};

function ComboboxTriggerAddon() {
  return (
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        size="icon-xs"
        variant="ghost"
        asChild
        className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent">
        <ComboboxTrigger />
      </InputGroupButton>
    </InputGroupAddon>
  );
}

/** Basic autocomplete combobox with leading/trailing icons and list item icons */
export function ComboboxDemo() {
  return (
    <FieldSet className={`${FIELD_WIDTH} ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>

      <Combobox items={frameworks}>
        <ComboboxAnchor>
          <InputGroup size="default" className="w-full">
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <IconShell
                  size="sm"
                  variant="secondary"
                  className="text-fill-active">
                  <Icon icon="search" />
                </IconShell>
              </InputGroupText>
            </InputGroupAddon>
            <ComboboxInput size="default" placeholder="Placeholder" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>
                <IconShell
                  size="sm"
                  variant="secondary"
                  className="text-fill-active">
                  <Icon icon="layers" />
                </IconShell>
              </InputGroupText>
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                asChild
                className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent">
                <ComboboxTrigger />
              </InputGroupButton>
              <ComboboxClear />
            </InputGroupAddon>
          </InputGroup>
        </ComboboxAnchor>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {item => (
              <ComboboxItem key={item} value={item}>
                <span className="flex items-center gap-2">
                  <Icon
                    icon="description"
                    className="text-fg-secondary size-4 shrink-0"
                    aria-hidden
                  />
                  {item}
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

/** Combobox in all three sizes */
export function ComboboxSizes() {
  return (
    <div className={`${FIELD_WIDTH} space-y-4`}>
      {sizes.map(({ size }) => {
        const cfg = fieldConfig[size];

        return (
          <FieldSet key={size} className={cfg.gap}>
            <FieldTitle className={getLabelClass(size)}>Label</FieldTitle>

            <Combobox items={frameworks}>
              <ComboboxAnchor>
                <InputGroup size={size} className="w-full">
                  <ComboboxInput size={size} placeholder="Placeholder" />
                  <ComboboxTriggerAddon />
                </InputGroup>
              </ComboboxAnchor>
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <FieldDescription className={cfg.description}>
              Helper text
            </FieldDescription>
          </FieldSet>
        );
      })}
    </div>
  );
}

/** Combobox inline variant in all three sizes */
export function ComboboxInline() {
  return (
    <div className={`${FIELD_WIDTH} space-y-4`}>
      {sizes.map(({ size }) => {
        const cfg = fieldConfig[size];

        return (
          <FieldSet key={size} className={cfg.gap}>
            <FieldTitle className={getLabelClass(size, 'inline')}>
              Label
            </FieldTitle>

            <Combobox items={frameworks}>
              <ComboboxAnchor>
                <InputGroup size={size} variant="inline" className="w-full">
                  <ComboboxInput
                    size={size}
                    variant="inline"
                    placeholder="Placeholder"
                  />
                  <ComboboxTriggerAddon />
                </InputGroup>
              </ComboboxAnchor>
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <FieldDescription className={cfg.description}>
              Helper text
            </FieldDescription>
          </FieldSet>
        );
      })}
    </div>
  );
}

/** Combobox items with checkbox (Option # / 01 style) */
export function ComboboxCustomCheckbox() {
  return (
    <FieldSet className={`${FIELD_WIDTH} gap-2`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>
      <Combobox
        items={optionItems}
        itemToStringValue={(opt: unknown) => {
          const item = opt as OptionItem;
          return item.label + item.subLabel;
        }}>
        <ComboboxAnchor>
          <InputGroup size="default" className="w-full">
            <ComboboxInput size="default" placeholder="Placeholder" />
            <ComboboxTriggerAddon />
          </InputGroup>
        </ComboboxAnchor>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {item => (
              <ComboboxItem key={item.id} value={item}>
                <span
                  className="flex w-full cursor-default items-center gap-2"
                  {...stopPropagationHandlers}>
                  <Checkbox id={`cb-${item.id}`} size="default" />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-fg-secondary">{item.subLabel}</span>
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription className={fieldConfig.default.description}>
        Custom items with checkbox and labels.
      </FieldDescription>
    </FieldSet>
  );
}

/** Combobox items with icon, label and toggle */
export function ComboboxCustomToggle() {
  return (
    <FieldSet className={`${FIELD_WIDTH} gap-2`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>
      <Combobox
        items={optionItems}
        itemToStringValue={(opt: unknown) => {
          const item = opt as OptionItem;
          return item.label + item.subLabel;
        }}>
        <ComboboxAnchor>
          <InputGroup size="default" className="w-full">
            <ComboboxInput size="default" placeholder="Placeholder" />
            <ComboboxTriggerAddon />
          </InputGroup>
        </ComboboxAnchor>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {item => (
              <ComboboxItem key={item.id} value={item}>
                <span
                  className="flex w-full cursor-default items-center gap-2"
                  {...stopPropagationHandlers}>
                  <span
                    className="text-fg-secondary [&_svg]:size-4"
                    aria-hidden>
                    <IconShell
                      size="sm"
                      variant="secondary"
                      className="text-fill-active">
                      <Icon icon="search" />
                    </IconShell>
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <span className="text-fg-secondary">{item.subLabel}</span>
                  <Switch id={`sw-${item.id}`} size="sm" className="shrink-0" />
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription className={fieldConfig.default.description}>
        Custom items with icon and toggle.
      </FieldDescription>
    </FieldSet>
  );
}

const multiOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];

/** Multi-select combobox with chips — default (bordered) variant */
export function ComboboxMultiSelect() {
  const [value, setValue] = React.useState<string[]>([]);

  const removeItem = (item: string) => setValue(v => v.filter(i => i !== item));

  return (
    <FieldSet className={`${FIELD_WIDTH} gap-2`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>
      <Combobox
        items={multiOptions}
        multiple
        value={value}
        onValueChange={v => setValue(v as string[])}>
        <ComboboxAnchor>
          <InputGroup size="default" className="h-auto w-full">
            <ComboboxChips className="flex-1">
              {value.map(item => (
                <Tag key={item} size="xs" onRemove={() => removeItem(item)}>
                  {item}
                </Tag>
              ))}
              <ComboboxChipsInput placeholder="Placeholder" />
            </ComboboxChips>
            <ComboboxTriggerAddon />
          </InputGroup>
        </ComboboxAnchor>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {item => (
              <ComboboxItem key={item} value={item}>
                <span className="flex w-full items-center gap-2">
                  <Checkbox
                    size="default"
                    checked={value.includes(item)}
                    onCheckedChange={() => {}}
                  />
                  {item}
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

/** Multi-select combobox with chips — inline (underline) variant */
export function ComboboxMultiSelectInline() {
  const [value, setValue] = React.useState<string[]>([]);

  const removeItem = (item: string) => setValue(v => v.filter(i => i !== item));

  return (
    <FieldSet className={`${FIELD_WIDTH} gap-2`}>
      <FieldTitle className={cn(fieldConfig.default.label, 'mb-[-4px]')}>
        Label
      </FieldTitle>
      <Combobox
        items={multiOptions}
        multiple
        value={value}
        onValueChange={v => setValue(v as string[])}>
        <ComboboxAnchor>
          <InputGroup size="default" variant="inline" className="h-auto w-full">
            <ComboboxChips className="flex-1">
              {value.map(item => (
                <Tag key={item} size="xs" onRemove={() => removeItem(item)}>
                  {item}
                </Tag>
              ))}
              <ComboboxChipsInput placeholder="Placeholder" />
            </ComboboxChips>
            <ComboboxTriggerAddon />
          </InputGroup>
        </ComboboxAnchor>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {item => (
              <ComboboxItem key={item} value={item}>
                <span className="flex w-full items-center gap-2">
                  <Checkbox
                    size="default"
                    checked={value.includes(item)}
                    onCheckedChange={() => {}}
                  />
                  {item}
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

/** Select-style multi-select with counter tag — default (bordered) variant */
export function ComboboxSelectMulti() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <FieldSet className={`${FIELD_WIDTH} gap-2`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>
      <Combobox
        items={multiOptions}
        multiple
        value={value}
        onValueChange={v => setValue(v as string[])}>
        <ComboboxAnchor>
          <InputGroup size="default" className="w-full">
            <div className="flex flex-1 items-center gap-2 px-2.5">
              {value.length > 0 ? (
                <>
                  <Tag
                    variant="secondary"
                    size="xs"
                    pill
                    onRemove={() => setValue([])}>
                    {value.length}
                  </Tag>
                  <span className="paragraph-regular-primary text-fg-primary truncate">
                    items selected
                  </span>
                </>
              ) : (
                <span className="paragraph-regular-primary text-fg-tertiary">
                  Multi-select label
                </span>
              )}
            </div>
            <ComboboxTriggerAddon />
          </InputGroup>
        </ComboboxAnchor>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {item => (
              <ComboboxItem key={item} value={item}>
                <span className="flex w-full items-center gap-2">
                  <Checkbox
                    size="default"
                    checked={value.includes(item)}
                    onCheckedChange={() => {}}
                  />
                  {item}
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

/** Select-style multi-select with counter tag — inline variant */
export function ComboboxSelectMultiInline() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <FieldSet className={`${FIELD_WIDTH} gap-2`}>
      <FieldTitle className={cn(fieldConfig.default.label, 'mb-[-4px]')}>
        Label
      </FieldTitle>
      <Combobox
        items={multiOptions}
        multiple
        value={value}
        onValueChange={v => setValue(v as string[])}>
        <ComboboxAnchor>
          <InputGroup size="default" variant="inline" className="w-full">
            <div className="flex flex-1 items-center gap-2 px-2.5">
              {value.length > 0 ? (
                <>
                  <Tag
                    variant="secondary"
                    size="xs"
                    pill
                    onRemove={() => setValue([])}>
                    {value.length}
                  </Tag>
                  <span className="paragraph-regular-primary text-fg-primary truncate">
                    items selected
                  </span>
                </>
              ) : (
                <span className="paragraph-regular-primary text-fg-tertiary">
                  Multi-select label
                </span>
              )}
            </div>
            <ComboboxTriggerAddon />
          </InputGroup>
        </ComboboxAnchor>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {item => (
              <ComboboxItem key={item} value={item}>
                <span className="flex w-full items-center gap-2">
                  <Checkbox
                    size="default"
                    checked={value.includes(item)}
                    onCheckedChange={() => {}}
                  />
                  {item}
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'ComboboxDemo',
    title: 'Default',
    description:
      'Combobox with leading and trailing icons (search, trigger, clear) and list items with icons.',
  },
  {
    name: 'ComboboxSizes',
    title: 'Sizes',
    description: 'Small, default, and large combobox sizes.',
  },
  {
    name: 'ComboboxInline',
    title: 'Inline Variant',
    description: 'Inline variant in all three sizes.',
  },
  {
    name: 'ComboboxCustomCheckbox',
    title: 'Custom Items (Checkbox)',
    description: 'List items with checkbox and Option # / 01 labels.',
  },
  {
    name: 'ComboboxCustomToggle',
    title: 'Custom Items (Toggle)',
    description: 'List items with icon, label, and toggle.',
  },
  {
    name: 'ComboboxMultiSelect',
    title: 'Multi-Select',
    description: 'Multi-select combobox with removable chips.',
  },
  {
    name: 'ComboboxMultiSelectInline',
    title: 'Multi-Select Inline',
    description: 'Multi-select inline variant with removable chips.',
  },
  {
    name: 'ComboboxSelectMulti',
    title: 'Select Multi-Select',
    description:
      'Select-style trigger with removable tags — no inline search input.',
  },
  {
    name: 'ComboboxSelectMultiInline',
    title: 'Select Multi-Select Inline',
    description:
      'Select-style inline trigger with removable tags — no inline search input.',
  },
];

export const combobox = createLegacyDemo('combobox', examples, {
  ComboboxDemo: <ComboboxDemo />,
  ComboboxSizes: <ComboboxSizes />,
  ComboboxInline: <ComboboxInline />,
  ComboboxCustomCheckbox: <ComboboxCustomCheckbox />,
  ComboboxCustomToggle: <ComboboxCustomToggle />,
  ComboboxMultiSelect: <ComboboxMultiSelect />,
  ComboboxMultiSelectInline: <ComboboxMultiSelectInline />,
  ComboboxSelectMulti: <ComboboxSelectMulti />,
  ComboboxSelectMultiInline: <ComboboxSelectMultiInline />,
});
