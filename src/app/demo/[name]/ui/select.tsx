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
  type SelectSize,
  SelectTrigger,
  SelectValue,
  useSelectContext,
} from '@/components/ui/select';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';

const fieldConfig = {
  sm: {
    label: 'label-small-primary text-fg-secondary',
    description: 'paragraph-small-primary text-fg-tertiary',
    error: 'paragraph-small-primary text-status-error',
    gap: 'gap-2',
  },
  default: {
    label: 'label-regular-primary text-fg-secondary',
    description: 'paragraph-regular-primary text-fg-tertiary',
    error: 'paragraph-regular-primary text-status-error',
    gap: 'gap-2',
  },
  lg: {
    label: 'label-large-primary text-fg-secondary',
    description: 'paragraph-large-primary text-fg-tertiary',
    error: 'paragraph-large-primary text-status-error',
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

const timezoneItems = [
  { label: 'Eastern Standard Time (EST)', value: 'est' },
  { label: 'Alaska Standard Time (AKST)', value: 'akst' },
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

const tagItems = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
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
  const sizeCtx = useSelectContext();
  const iconSize = sizeCtx?.size === 'lg' ? 'default' : 'sm';

  return (
    <SelectItem value={value} disabled={disabled}>
      <SelectItemText>{children}</SelectItemText>
      <SelectItemIndicator>
        <IconShell size={iconSize} variant="primary">
          <Icon icon="done" size={iconSize} />
        </IconShell>
      </SelectItemIndicator>
    </SelectItem>
  );
}

function SelectCheckboxItem({
  value,
  children,
  disabled,
  checked,
  counter,
}: {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  checked?: boolean;
  counter?: string;
}) {
  const sizeCtx = useSelectContext();
  const size = sizeCtx?.size ?? 'default';
  const checkboxSize = size === 'lg' ? 'lg' : 'default';

  return (
    <SelectItem
      value={value}
      disabled={disabled}
      className={cn(size === 'lg' && 'gap-2 py-2 pr-3 pl-2')}>
      <Checkbox
        size={checkboxSize}
        checked={checked}
        onCheckedChange={() => {}}
        tabIndex={-1}
        className="pointer-events-none"
      />

      <SelectItemText>{children}</SelectItemText>

      {counter !== undefined ? (
        <span
          className={cn(
            'text-fg-tertiary shrink-0 text-right',
            size === 'lg'
              ? 'paragraph-large-primary'
              : 'paragraph-regular-primary',
          )}>
          {counter}
        </span>
      ) : null}
    </SelectItem>
  );
}

function MultiValueDisplay({
  value,
  onClear,
}: {
  value: string[];
  onClear?: () => void;
}) {
  if (value.length === 0) {
    return null;
  }

  return (
    <span className="flex items-center gap-2">
      <Tag
        variant="secondary"
        size="xs"
        pill
        onRemove={
          onClear
            ? e => {
                e.stopPropagation();
                onClear();
              }
            : undefined
        }>
        <span className="pl-1">{value.length}</span>
      </Tag>

      <span className="truncate">items selected</span>
    </span>
  );
}

export function SelectDemo() {
  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldLabel htmlFor="select-demo" className={fieldConfig.default.label}>
        Label
      </FieldLabel>

      <Select items={themeItems}>
        <SelectTrigger id="select-demo" className="w-[240px]">
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

export function SelectInline() {
  return (
    <div className="mx-auto w-full max-w-sm space-y-4">
      <InlineField size="sm" label="Small" />
      <InlineField size="default" label="Default" />
      <InlineField size="lg" label="Large" />
    </div>
  );
}

function InlineField({ size, label }: { size: SelectSize; label: string }) {
  const cfg = fieldConfig[size];
  const id = `select-inline-${size}`;

  return (
    <FieldSet className={cfg.gap}>
      <FieldLabel htmlFor={id} className={cfg.label}>
        {label}
      </FieldLabel>

      <Select size={size} items={optionItems}>
        <SelectTrigger id={id} variant="inline" className="w-[240px]">
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

      <FieldDescription className={cfg.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

export function SelectSizes() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <FieldSet className={fieldConfig.sm.gap}>
        <FieldLabel htmlFor="select-size-sm" className={fieldConfig.sm.label}>
          Small Size
        </FieldLabel>

        <Select size="sm" items={optionItems}>
          <SelectTrigger id="select-size-sm" className="w-[240px]">
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
        <FieldLabel
          htmlFor="select-size-default"
          className={fieldConfig.default.label}>
          Default Size
        </FieldLabel>

        <Select items={optionItems}>
          <SelectTrigger id="select-size-default" className="w-[240px]">
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
        <FieldLabel htmlFor="select-size-lg" className={fieldConfig.lg.label}>
          Large Size
        </FieldLabel>

        <Select size="lg" items={optionItems}>
          <SelectTrigger id="select-size-lg" className="w-[240px]">
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

export function SelectHorizontal() {
  return (
    <Field orientation="horizontal" className="w-fit items-center gap-3">
      <FieldLabel
        htmlFor="select-horizontal"
        className={cn(fieldConfig.default.label, 'shrink-0')}>
        Field label
      </FieldLabel>

      <Select items={optionItems}>
        <SelectTrigger
          id="select-horizontal"
          variant="inline"
          className="w-[240px]">
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

const feedbackConfig = {
  error: {
    icon: 'cancel' as const,
    color: 'text-status-error',
    messageClass: 'text-status-error',
  },
  warning: {
    icon: 'error' as const,
    color: 'text-status-warning',
    messageClass: 'text-status-warning',
  },
  success: {
    icon: 'check_circle' as const,
    color: 'text-status-success',
    messageClass: 'text-status-success',
  },
} as const;

function SelectFeedbackIcon({ state }: { state: keyof typeof feedbackConfig }) {
  const sizeCtx = useSelectContext();
  const iconSize = sizeCtx?.size === 'lg' ? 'default' : 'sm';
  const { icon, color } = feedbackConfig[state];

  return (
    <IconShell
      size={iconSize}
      type="custom"
      variant="primary"
      className={cn('shrink-0', color)}
      data-slot="select-feedback-icon">
      <Icon icon={icon} size={iconSize} />
    </IconShell>
  );
}

export function SelectValidation() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <FieldSet className={fieldConfig.default.gap}>
        <FieldLabel htmlFor="select-disabled" disabled>
          Disabled
        </FieldLabel>

        <Select items={optionItems} defaultValue="option2" disabled>
          <SelectTrigger id="select-disabled" className="w-[240px]">
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

        <FieldDescription className="paragraph-regular-primary text-fg-disabled">
          Helper text
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldLabel
          htmlFor="select-error"
          className={fieldConfig.default.label}>
          Error
        </FieldLabel>

        <Select items={optionItems} defaultValue="option2">
          <SelectTrigger id="select-error" className="w-[240px]" aria-invalid>
            <SelectValue placeholder="Choose option" />
            <SelectFeedbackIcon state="error" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectOptionItem key={item.value} value={item.value}>
                {item.label}
              </SelectOptionItem>
            ))}
          </SelectContent>
        </Select>

        <FieldError className={fieldConfig.default.error}>
          Feedback message
        </FieldError>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldLabel
          htmlFor="select-warning"
          className={fieldConfig.default.label}>
          Warning
        </FieldLabel>

        <Select items={optionItems} defaultValue="option2">
          <SelectTrigger
            id="select-warning"
            className="!border-status-warning focus-visible:ring-stroke-status-warning data-[popup-open]:ring-stroke-status-warning w-[240px]">
            <SelectValue placeholder="Choose option" />
            <SelectFeedbackIcon state="warning" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectOptionItem key={item.value} value={item.value}>
                {item.label}
              </SelectOptionItem>
            ))}
          </SelectContent>
        </Select>

        <FieldDescription
          className={`paragraph-regular-primary ${feedbackConfig.warning.messageClass}`}>
          Feedback message
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldLabel
          htmlFor="select-success"
          className={fieldConfig.default.label}>
          Success
        </FieldLabel>

        <Select items={optionItems} defaultValue="option2">
          <SelectTrigger
            id="select-success"
            className="!border-status-success focus-visible:ring-stroke-status-success data-[popup-open]:ring-stroke-status-success w-[240px]">
            <SelectValue placeholder="Choose option" />
            <SelectFeedbackIcon state="success" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectOptionItem key={item.value} value={item.value}>
                {item.label}
              </SelectOptionItem>
            ))}
          </SelectContent>
        </Select>

        <FieldDescription
          className={`paragraph-regular-primary ${feedbackConfig.success.messageClass}`}>
          Feedback message
        </FieldDescription>
      </FieldSet>
    </div>
  );
}

export function SelectMultiple() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldLabel
        htmlFor="select-multiple"
        className={fieldConfig.default.label}>
        Label
      </FieldLabel>

      <Select
        multiple
        items={languageItems}
        value={value}
        onValueChange={v => setValue(v as string[])}>
        <SelectTrigger id="select-multiple" className="w-[280px]">
          <SelectValue placeholder="Choose Options">
            {value.length > 0 ? (
              <MultiValueDisplay value={value} onClear={() => setValue([])} />
            ) : null}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languageItems.map(item => (
            <SelectCheckboxItem
              key={item.value}
              value={item.value}
              checked={value.includes(item.value)}>
              {item.label}
            </SelectCheckboxItem>
          ))}
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Multi-select with counter
      </FieldDescription>
    </FieldSet>
  );
}

export function SelectTagsWrap() {
  const [tagsValue, setTagsValue] = React.useState<string[]>([
    'option2',
    'option3',
    'option4',
    'option5',
    'option1',
  ]);

  const tagsTriggerClass =
    'h-auto min-h-9 w-[280px] whitespace-normal *:data-[slot=select-value]:line-clamp-none *:data-[slot=select-value]:overflow-visible *:data-[slot=select-value]:whitespace-normal';

  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldLabel
        htmlFor="select-tags-wrap"
        className={fieldConfig.default.label}>
        Label
      </FieldLabel>

      <Select
        multiple
        items={tagItems}
        value={tagsValue}
        onValueChange={v => setTagsValue(v as string[])}>
        <SelectTrigger id="select-tags-wrap" className={tagsTriggerClass}>
          <SelectValue placeholder="Choose options">
            {tagsValue.length > 0 ? (
              <span className="flex flex-wrap gap-2">
                {tagsValue.map(v => {
                  const label = tagItems.find(i => i.value === v)?.label ?? v;

                  return (
                    <Tag
                      key={v}
                      variant="primary"
                      size="xs"
                      onRemove={() =>
                        setTagsValue(prev => prev.filter(x => x !== v))
                      }>
                      {label}
                    </Tag>
                  );
                })}
              </span>
            ) : null}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {tagItems.map(item => (
            <SelectCheckboxItem
              key={item.value}
              value={item.value}
              checked={tagsValue.includes(item.value)}
              counter="01">
              {item.label}
            </SelectCheckboxItem>
          ))}
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Dismissible tags wrap inside the trigger
      </FieldDescription>
    </FieldSet>
  );
}

export function SelectWithGroups() {
  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldLabel
        htmlFor="select-grouped"
        className={fieldConfig.default.label}>
        Timezone
      </FieldLabel>

      <Select items={timezoneItems}>
        <SelectTrigger id="select-grouped" className="w-[240px]">
          <SelectValue placeholder="Choose option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectOptionItem value="est">
              Eastern Standard Time (EST)
            </SelectOptionItem>
            <SelectOptionItem value="akst" disabled>
              Alaska Standard Time (AKST)
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

export const examples = [
  {
    name: 'SelectDemo',
    title: 'Default',
    description: 'Filled single select.',
  },
  {
    name: 'SelectInline',
    title: 'Inline',
    description: 'Ghost / underline select in small, default, and large sizes.',
  },
  {
    name: 'SelectSizes',
    title: 'Sizes',
    description: 'Small, default, and large — filled only.',
  },
  {
    name: 'SelectHorizontal',
    title: 'Horizontal',
    description: 'SelectGroup/Horizontal — label + inline select.',
  },
  {
    name: 'SelectValidation',
    title: 'States',
    description:
      'Disabled, error, warning, and success — last rows of the Figma matrix.',
  },
  {
    name: 'SelectMultiple',
    title: 'Multiple',
    description: 'Multi-select with counter in the trigger.',
  },
  {
    name: 'SelectTagsWrap',
    title: 'Tags wrap',
    description: 'Multi-select with dismissible tags in the trigger.',
  },
  {
    name: 'SelectWithGroups',
    title: 'Grouped',
    description: 'Grouped options with one disabled item.',
  },
];

export const select = {
  name: 'select',
  components: {
    Default: <SelectDemo />,
    Inline: <SelectInline />,
    Sizes: <SelectSizes />,
    Horizontal: <SelectHorizontal />,
    States: <SelectValidation />,
    Multiple: <SelectMultiple />,
    'Tags wrap': <SelectTagsWrap />,
    Grouped: <SelectWithGroups />,
  },
};
