'use client';

import * as React from 'react';
import type { ReactNode } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  useSelectSizeContext,
} from '@/components/ui/select';
import { Tag } from '@/components/ui/tag';

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

const themeItems = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

const optionItems = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const themeItemsWithDisabled = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Disabled Option', value: 'disabled' },
  { label: 'System', value: 'system' },
];

const timezoneItems = [
  { label: 'Eastern Standard Time (EST)', value: 'est' },
  { label: 'Central Standard Time (CST)', value: 'cst' },
  { label: 'Pacific Standard Time (PST)', value: 'pst' },
  { label: 'Greenwich Mean Time (GMT)', value: 'gmt' },
  { label: 'Central European Time (CET)', value: 'cet' },
  { label: 'Eastern European Time (EET)', value: 'eet' },
  { label: 'India Standard Time (IST)', value: 'ist' },
  { label: 'Japan Standard Time (JST)', value: 'jst' },
  { label: 'China Standard Time (CST)', value: 'cst_china' },
];

const languageItems = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Rust', value: 'rust' },
  { label: 'Go', value: 'go' },
  { label: 'Java', value: 'java' },
  { label: 'C#', value: 'csharp' },
  { label: 'Ruby', value: 'ruby' },
];

function SelectItemWithIcon({
  value,
  children,
  disabled,
}: {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  const sizeCtx = useSelectSizeContext();
  const iconSize = sizeCtx?.size === 'lg' ? 'default' : 'sm';

  return (
    <SelectItem value={value} disabled={disabled}>
      <Icon
        icon="crop_free"
        size={iconSize}
        className="text-fg-secondary"
        aria-hidden
      />

      <SelectItemText>{children}</SelectItemText>

      <SelectItemIndicator>
        <IconShell
          size={iconSize}
          variant="primary"
          className="text-fill-active">
          <Icon icon="check" />
        </IconShell>
      </SelectItemIndicator>
    </SelectItem>
  );
}

// ============================================================================
// Example Components
// ============================================================================

export function SelectDemo() {
  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>

      <Select items={themeItems}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          {themeItems.map(item => (
            <SelectItemWithIcon key={item.value} value={item.value}>
              {item.label}
            </SelectItemWithIcon>
          ))}
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

export function SelectSizes() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <FieldSet className={fieldConfig.sm.gap}>
        <FieldTitle className={fieldConfig.sm.label}>Small Size</FieldTitle>

        <Select size="sm" items={optionItems}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectItemWithIcon key={item.value} value={item.value}>
                {item.label}
              </SelectItemWithIcon>
            ))}
          </SelectContent>
        </Select>

        <FieldDescription className={fieldConfig.sm.description}>
          Helper text
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>
          Default Size
        </FieldTitle>

        <Select items={optionItems}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectItemWithIcon key={item.value} value={item.value}>
                {item.label}
              </SelectItemWithIcon>
            ))}
          </SelectContent>
        </Select>

        <FieldDescription className={fieldConfig.default.description}>
          Helper text
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.lg.gap}>
        <FieldTitle className={fieldConfig.lg.label}>Large Size</FieldTitle>

        <Select size="lg" items={optionItems}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectItemWithIcon key={item.value} value={item.value}>
                {item.label}
              </SelectItemWithIcon>
            ))}
          </SelectContent>
        </Select>

        <FieldDescription className={fieldConfig.lg.description}>
          Helper text
        </FieldDescription>
      </FieldSet>
    </div>
  );
}

export function SelectWithDisabled() {
  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>

      <Select items={themeItemsWithDisabled}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          {themeItemsWithDisabled.map(item => (
            <SelectItemWithIcon
              key={item.value}
              value={item.value}
              disabled={item.value === 'disabled'}>
              {item.label}
            </SelectItemWithIcon>
          ))}
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

export function SelectWithGroups() {
  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Timezone</FieldTitle>

      <Select items={timezoneItems}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItemWithIcon value="est">
              Eastern Standard Time (EST)
            </SelectItemWithIcon>
            <SelectItemWithIcon value="cst">
              Central Standard Time (CST)
            </SelectItemWithIcon>
            <SelectItemWithIcon value="pst">
              Pacific Standard Time (PST)
            </SelectItemWithIcon>
          </SelectGroup>

          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItemWithIcon value="gmt">
              Greenwich Mean Time (GMT)
            </SelectItemWithIcon>
            <SelectItemWithIcon value="cet">
              Central European Time (CET)
            </SelectItemWithIcon>
            <SelectItemWithIcon value="eet">
              Eastern European Time (EET)
            </SelectItemWithIcon>
          </SelectGroup>

          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItemWithIcon value="ist">
              India Standard Time (IST)
            </SelectItemWithIcon>
            <SelectItemWithIcon value="jst">
              Japan Standard Time (JST)
            </SelectItemWithIcon>
            <SelectItemWithIcon value="cst_china">
              China Standard Time (CST)
            </SelectItemWithIcon>
          </SelectGroup>
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

/**
 * Multi-select using the built-in `multiple` prop.
 * Items use a checkbox indicator; the trigger shows a count tag.
 */
export function SelectMultipleDemo() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Languages</FieldTitle>

      <Select
        multiple
        items={languageItems}
        value={value}
        onValueChange={v => setValue(v as string[])}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select languages">
            {value.length > 0 ? (
              <span className="flex items-center gap-2">
                <Tag
                  variant="secondary"
                  size="xs"
                  pill
                  onRemove={e => {
                    e.stopPropagation();
                    setValue([]);
                  }}>
                  <span className="pl-1">{value.length}</span>
                </Tag>

                <span className="truncate">items selected</span>
              </span>
            ) : null}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {languageItems.map(item => (
            <SelectItem key={item.value} value={item.value}>
              <Checkbox
                id={`select-lang-${item.value}`}
                size="default"
                checked={value.includes(item.value)}
                onCheckedChange={() => {}}
                tabIndex={-1}
                className="pointer-events-none"
              />

              <SelectItemText>
                <FieldLabel
                  htmlFor={`select-lang-${item.value}`}
                  className="paragraph-regular-primary pointer-events-none">
                  {item.label}
                </FieldLabel>
              </SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Select one or more programming languages
      </FieldDescription>
    </FieldSet>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'SelectDemo',
    title: 'Default',
    description: 'Basic select with options.',
  },
  {
    name: 'SelectSizes',
    title: 'Sizes',
    description: 'Small, default, and large select sizes.',
  },
  {
    name: 'SelectWithDisabled',
    title: 'With Disabled Option',
    description: 'Select with a disabled option.',
  },
  {
    name: 'SelectWithGroups',
    title: 'Grouped Options',
    description: 'Select with grouped and labeled options.',
  },
  {
    name: 'SelectMultipleDemo',
    title: 'Multiple Selection',
    description:
      'Multi-select with checkboxes using the built-in multiple prop.',
  },
];

export const select = {
  name: 'select',
  components: {
    Default: <SelectDemo />,
    Sizes: <SelectSizes />,
    'With Disabled': <SelectWithDisabled />,
    'Grouped Options': <SelectWithGroups />,
    'Multiple Selection': <SelectMultipleDemo />,
  },
};
