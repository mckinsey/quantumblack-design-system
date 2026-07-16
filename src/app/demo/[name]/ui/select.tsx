'use client';

import * as React from 'react';
import type { ReactNode } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldError,
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

function SelectOptionItem({
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
      <SelectItemText>{children}</SelectItemText>

      <SelectItemIndicator>
        <IconShell size={iconSize} variant="primary">
          <Icon icon="check" />
        </IconShell>
      </SelectItemIndicator>
    </SelectItem>
  );
}

export function SelectDemo() {
  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>

      <Select items={themeItems}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Choose option" />
        </SelectTrigger>
        <SelectContent>
          {themeItems.map(item => (
            <SelectOptionItem key={item.value} value={item.value}>
              {item.label}
            </SelectOptionItem>
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
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectOptionItem key={item.value} value={item.value}>
                {item.label}
              </SelectOptionItem>
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
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectOptionItem key={item.value} value={item.value}>
                {item.label}
              </SelectOptionItem>
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
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectOptionItem key={item.value} value={item.value}>
                {item.label}
              </SelectOptionItem>
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

export function SelectInline() {
  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>

      <Select items={optionItems}>
        <SelectTrigger variant="inline" className="w-[240px]">
          <SelectValue placeholder="Choose option" />
        </SelectTrigger>
        <SelectContent>
          {optionItems.map(item => (
            <SelectOptionItem key={item.value} value={item.value}>
              {item.label}
            </SelectOptionItem>
          ))}
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

export function SelectHorizontal() {
  return (
    <Field
      orientation="horizontal"
      className="w-full max-w-md items-center gap-2">
      <FieldTitle className={fieldConfig.default.label}>Field label</FieldTitle>

      <Select items={optionItems}>
        <SelectTrigger variant="inline" className="w-[240px]">
          <SelectValue placeholder="Choose option" />
        </SelectTrigger>
        <SelectContent>
          {optionItems.map(item => (
            <SelectOptionItem key={item.value} value={item.value}>
              {item.label}
            </SelectOptionItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

export function SelectWithDisabled() {
  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Label</FieldTitle>

      <Select items={themeItemsWithDisabled}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Choose option" />
        </SelectTrigger>
        <SelectContent>
          {themeItemsWithDisabled.map(item => (
            <SelectOptionItem
              key={item.value}
              value={item.value}
              disabled={item.value === 'disabled'}>
              {item.label}
            </SelectOptionItem>
          ))}
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

export function SelectValidation() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Error</FieldTitle>

        <Select items={optionItems}>
          <SelectTrigger className="w-[240px]" validationState="error">
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectOptionItem key={item.value} value={item.value}>
                {item.label}
              </SelectOptionItem>
            ))}
          </SelectContent>
        </Select>

        <FieldError>Feedback message</FieldError>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Warning</FieldTitle>

        <Select items={optionItems}>
          <SelectTrigger className="w-[240px]" validationState="warning">
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectOptionItem key={item.value} value={item.value}>
                {item.label}
              </SelectOptionItem>
            ))}
          </SelectContent>
        </Select>

        <FieldDescription className="paragraph-regular-primary text-status-warning">
          Feedback message
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Success</FieldTitle>

        <Select items={optionItems}>
          <SelectTrigger className="w-[240px]" validationState="success">
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectOptionItem key={item.value} value={item.value}>
                {item.label}
              </SelectOptionItem>
            ))}
          </SelectContent>
        </Select>

        <FieldDescription className="paragraph-regular-primary text-status-success">
          Feedback message
        </FieldDescription>
      </FieldSet>
    </div>
  );
}

export function SelectWithGroups() {
  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Timezone</FieldTitle>

      <Select items={timezoneItems}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Choose option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectOptionItem value="est">
              Eastern Standard Time (EST)
            </SelectOptionItem>
            <SelectOptionItem value="cst">
              Central Standard Time (CST)
            </SelectOptionItem>
            <SelectOptionItem value="pst">
              Pacific Standard Time (PST)
            </SelectOptionItem>
          </SelectGroup>

          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectOptionItem value="gmt">
              Greenwich Mean Time (GMT)
            </SelectOptionItem>
            <SelectOptionItem value="cet">
              Central European Time (CET)
            </SelectOptionItem>
            <SelectOptionItem value="eet">
              Eastern European Time (EET)
            </SelectOptionItem>
          </SelectGroup>

          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectOptionItem value="ist">
              India Standard Time (IST)
            </SelectOptionItem>
            <SelectOptionItem value="jst">
              Japan Standard Time (JST)
            </SelectOptionItem>
            <SelectOptionItem value="cst_china">
              China Standard Time (CST)
            </SelectOptionItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

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
          <SelectValue placeholder="Multi-select label">
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
        Multi-select with counter — tags/wrap use Combobox
      </FieldDescription>
    </FieldSet>
  );
}

export function SelectMultipleInline() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>Languages</FieldTitle>

      <Select
        multiple
        items={languageItems}
        value={value}
        onValueChange={v => setValue(v as string[])}>
        <SelectTrigger variant="inline" className="w-[280px]">
          <SelectValue placeholder="Multi-select label">
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
                id={`select-lang-inline-${item.value}`}
                size="default"
                checked={value.includes(item.value)}
                onCheckedChange={() => {}}
                tabIndex={-1}
                className="pointer-events-none"
              />

              <SelectItemText>
                <FieldLabel
                  htmlFor={`select-lang-inline-${item.value}`}
                  className="paragraph-regular-primary pointer-events-none">
                  {item.label}
                </FieldLabel>
              </SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Ghost multi-select with counter
      </FieldDescription>
    </FieldSet>
  );
}

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
    name: 'SelectInline',
    title: 'Inline',
    description: 'Ghost / underline select variant.',
  },
  {
    name: 'SelectHorizontal',
    title: 'Horizontal',
    description: 'Label and select in a horizontal Field row.',
  },
  {
    name: 'SelectWithDisabled',
    title: 'With Disabled Option',
    description: 'Select with a disabled option.',
  },
  {
    name: 'SelectValidation',
    title: 'Validation',
    description: 'Error, warning, and success validation states.',
  },
  {
    name: 'SelectWithGroups',
    title: 'Grouped Options',
    description: 'Select with grouped and labeled options.',
  },
  {
    name: 'SelectMultipleDemo',
    title: 'Multiple Selection',
    description: 'Multi-select with counter tag (not chip tags).',
  },
  {
    name: 'SelectMultipleInline',
    title: 'Multiple Inline',
    description: 'Ghost multi-select with counter.',
  },
];

export const select = {
  name: 'select',
  components: {
    Default: <SelectDemo />,
    Sizes: <SelectSizes />,
    Inline: <SelectInline />,
    Horizontal: <SelectHorizontal />,
    'With Disabled': <SelectWithDisabled />,
    Validation: <SelectValidation />,
    'Grouped Options': <SelectWithGroups />,
    'Multiple Selection': <SelectMultipleDemo />,
    'Multiple Inline': <SelectMultipleInline />,
  },
};
