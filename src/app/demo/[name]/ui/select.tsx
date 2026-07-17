'use client';

import * as React from 'react';
import type { ReactNode } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldError,
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
  useSelectContext,
} from '@/components/ui/select';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';

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
  const sizeCtx = useSelectContext();
  const iconSize = sizeCtx?.size === 'lg' ? 'default' : 'sm';

  return (
    <SelectItem value={value} disabled={disabled}>
      <SelectItemText>{children}</SelectItemText>
      <SelectItemIndicator>
        <IconShell size={iconSize} variant="primary">
          <Icon icon="done" />
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
  leading,
  trailing,
}: {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  checked?: boolean;
  counter?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
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

      {leading ?? null}

      <SelectItemText>{children}</SelectItemText>

      {trailing ?? null}

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

function SlotIcon() {
  const sizeCtx = useSelectContext();
  const iconSize = sizeCtx?.size === 'lg' ? 'default' : 'sm';

  return (
    <IconShell size={iconSize} variant="secondary">
      <Icon icon="crop_free" size={iconSize} />
    </IconShell>
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
  const [multiValue, setMultiValue] = React.useState<string[]>([]);
  const [multiInlineValue, setMultiInlineValue] = React.useState<string[]>([]);

  return (
    <div className="grid w-full max-w-3xl grid-cols-2 gap-8">
      <div className="space-y-12">
        <FieldSet className={fieldConfig.default.gap}>
          <FieldTitle className={fieldConfig.default.label}>Default</FieldTitle>

          <Select items={themeItems}>
            <SelectTrigger className="w-full max-w-[240px]">
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

        <FieldSet className={fieldConfig.default.gap}>
          <FieldTitle className={fieldConfig.default.label}>Inline</FieldTitle>

          <Select items={themeItems}>
            <SelectTrigger variant="inline" className="w-full max-w-[240px]">
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
      </div>

      <div className="space-y-12">
        <FieldSet className={fieldConfig.default.gap}>
          <FieldTitle className={fieldConfig.default.label}>
            Multiple
          </FieldTitle>

          <Select
            multiple
            items={languageItems}
            value={multiValue}
            onValueChange={v => setMultiValue(v as string[])}>
            <SelectTrigger className="w-full max-w-[280px]">
              <SelectValue placeholder="Choose Options">
                {multiValue.length > 0 ? (
                  <MultiValueDisplay
                    value={multiValue}
                    onClear={() => setMultiValue([])}
                  />
                ) : null}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languageItems.map(item => (
                <SelectCheckboxItem
                  key={item.value}
                  value={item.value}
                  checked={multiValue.includes(item.value)}>
                  {item.label}
                </SelectCheckboxItem>
              ))}
            </SelectContent>
          </Select>

          <FieldDescription className={fieldConfig.default.description}>
            Multi-select with counter — tags/wrap use Combobox
          </FieldDescription>
        </FieldSet>

        <FieldSet className={fieldConfig.default.gap}>
          <FieldTitle className={fieldConfig.default.label}>
            Multiple Inline
          </FieldTitle>

          <Select
            multiple
            items={languageItems}
            value={multiInlineValue}
            onValueChange={v => setMultiInlineValue(v as string[])}>
            <SelectTrigger variant="inline" className="w-full max-w-[280px]">
              <SelectValue placeholder="Choose Options">
                {multiInlineValue.length > 0 ? (
                  <MultiValueDisplay
                    value={multiInlineValue}
                    onClear={() => setMultiInlineValue([])}
                  />
                ) : null}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languageItems.map(item => (
                <SelectCheckboxItem
                  key={item.value}
                  value={item.value}
                  checked={multiInlineValue.includes(item.value)}>
                  {item.label}
                </SelectCheckboxItem>
              ))}
            </SelectContent>
          </Select>

          <FieldDescription className={fieldConfig.default.description}>
            Multi-select inline trigger
          </FieldDescription>
        </FieldSet>
      </div>
    </div>
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

export function SelectHorizontal() {
  const rows = [
    { size: 'sm' as const, label: fieldConfig.sm.label },
    { size: 'default' as const, label: fieldConfig.default.label },
    { size: 'lg' as const, label: fieldConfig.lg.label },
  ];

  return (
    <div className="flex w-fit flex-col gap-8">
      {rows.map(({ size, label }) => (
        <Field
          key={size}
          orientation="horizontal"
          className="items-center gap-3">
          <FieldTitle className={cn(label, 'shrink-0')}>Field label</FieldTitle>

          <Select size={size} items={optionItems}>
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
      ))}
    </div>
  );
}

export function SelectInline() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <FieldSet className={fieldConfig.sm.gap}>
        <FieldTitle className={fieldConfig.sm.label}>Small</FieldTitle>

        <Select size="sm" items={optionItems}>
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

        <FieldDescription className={fieldConfig.sm.description}>
          Helper text
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Default</FieldTitle>

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

      <FieldSet className={fieldConfig.lg.gap}>
        <FieldTitle className={fieldConfig.lg.label}>Large</FieldTitle>

        <Select size="lg" items={optionItems}>
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
        <FieldTitle className="label-regular-primary text-fg-disabled">
          Disabled
        </FieldTitle>

        <Select items={optionItems} defaultValue="option2" disabled>
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

        <FieldDescription className="paragraph-regular-primary text-fg-disabled">
          Helper text
        </FieldDescription>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Error</FieldTitle>

        <Select items={optionItems} defaultValue="option2">
          <SelectTrigger className="w-[240px]" aria-invalid>
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

        <FieldError>Feedback message</FieldError>
      </FieldSet>

      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Warning</FieldTitle>

        <Select items={optionItems} defaultValue="option2">
          <SelectTrigger className="!border-status-warning w-[240px]">
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
        <FieldTitle className={fieldConfig.default.label}>Success</FieldTitle>

        <Select items={optionItems} defaultValue="option2">
          <SelectTrigger className="!border-status-success w-[240px]">
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

export function SelectMultipleSizes() {
  const [defaultValue, setDefaultValue] = React.useState<string[]>([]);
  const [lgValue, setLgValue] = React.useState<string[]>([]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>Default</FieldTitle>

        <Select
          multiple
          items={optionItems}
          value={defaultValue}
          onValueChange={v => setDefaultValue(v as string[])}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Choose options" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectCheckboxItem
                key={item.value}
                value={item.value}
                checked={defaultValue.includes(item.value)}>
                {item.label}
              </SelectCheckboxItem>
            ))}
          </SelectContent>
        </Select>
      </FieldSet>

      <FieldSet className={fieldConfig.lg.gap}>
        <FieldTitle className={fieldConfig.lg.label}>Large</FieldTitle>

        <Select
          multiple
          size="lg"
          items={optionItems}
          value={lgValue}
          onValueChange={v => setLgValue(v as string[])}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Choose options" />
          </SelectTrigger>
          <SelectContent>
            {optionItems.map(item => (
              <SelectCheckboxItem
                key={item.value}
                value={item.value}
                checked={lgValue.includes(item.value)}>
                {item.label}
              </SelectCheckboxItem>
            ))}
          </SelectContent>
        </Select>
      </FieldSet>
    </div>
  );
}

export function SelectMultipleWithSlots() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <FieldSet className={`w-full max-w-sm ${fieldConfig.default.gap}`}>
      <FieldTitle className={fieldConfig.default.label}>With slots</FieldTitle>

      <Select
        multiple
        items={optionItems}
        value={value}
        onValueChange={v => setValue(v as string[])}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Choose options" />
        </SelectTrigger>
        <SelectContent>
          {optionItems.map(item => (
            <SelectCheckboxItem
              key={item.value}
              value={item.value}
              checked={value.includes(item.value)}
              counter="01"
              leading={<SlotIcon />}
              trailing={<SlotIcon />}>
              {item.label}
            </SelectCheckboxItem>
          ))}
        </SelectContent>
      </Select>

      <FieldDescription className={fieldConfig.default.description}>
        Leading, trailing, and counter slots
      </FieldDescription>
    </FieldSet>
  );
}

export function SelectMultipleExamples() {
  const [tagsValue, setTagsValue] = React.useState<string[]>([
    'option2',
    'option3',
    'option4',
    'option5',
    'option1',
  ]);

  const [inlineTagsValue, setInlineTagsValue] = React.useState<string[]>([
    'option2',
    'option3',
    'option4',
    'option5',
    'option1',
  ]);

  const tagItems = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
  ];

  const tagsTriggerClass =
    'h-auto min-h-9 w-[280px] whitespace-normal *:data-[slot=select-value]:line-clamp-none *:data-[slot=select-value]:overflow-visible *:data-[slot=select-value]:whitespace-normal';

  const renderTags = (
    value: string[],
    items: { label: string; value: string }[],
    onRemove: (v: string) => void,
  ) =>
    value.length > 0 ? (
      <span className="flex flex-wrap gap-2">
        {value.map(v => {
          const label = items.find(i => i.value === v)?.label ?? v;

          return (
            <Tag
              key={v}
              variant="primary"
              size="xs"
              onRemove={() => onRemove(v)}>
              {label}
            </Tag>
          );
        })}
      </span>
    ) : null;

  return (
    <div className="w-full max-w-sm space-y-8">
      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>
          Open tags wrap
        </FieldTitle>

        <Select
          multiple
          items={tagItems}
          value={tagsValue}
          onValueChange={v => setTagsValue(v as string[])}>
          <SelectTrigger className={tagsTriggerClass}>
            <SelectValue placeholder="Choose options">
              {renderTags(tagsValue, tagItems, item =>
                setTagsValue(v => v.filter(x => x !== item)),
              )}
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

      <FieldSet className={fieldConfig.default.gap}>
        <FieldTitle className={fieldConfig.default.label}>
          Open tags wrap inline
        </FieldTitle>

        <Select
          multiple
          items={tagItems}
          value={inlineTagsValue}
          onValueChange={v => setInlineTagsValue(v as string[])}>
          <SelectTrigger variant="inline" className={tagsTriggerClass}>
            <SelectValue placeholder="Choose options">
              {renderTags(inlineTagsValue, tagItems, item =>
                setInlineTagsValue(v => v.filter(x => x !== item)),
              )}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {tagItems.map(item => (
              <SelectCheckboxItem
                key={item.value}
                value={item.value}
                checked={inlineTagsValue.includes(item.value)}
                counter="01">
                {item.label}
              </SelectCheckboxItem>
            ))}
          </SelectContent>
        </Select>

        <FieldDescription className={fieldConfig.default.description}>
          Inline trigger with dismissible wrapping tags
        </FieldDescription>
      </FieldSet>
    </div>
  );
}

export const examples = [
  {
    name: 'SelectDemo',
    title: 'Default',
    description: 'Default, inline, multiple, and multiple inline.',
  },
  {
    name: 'SelectSizes',
    title: 'Sizes',
    description: 'Small, default, and large select sizes.',
  },
  {
    name: 'SelectInline',
    title: 'Inline',
    description: 'Ghost / underline select (Field/SingleSelect-Ghost).',
  },
  {
    name: 'SelectHorizontal',
    title: 'Horizontal',
    description:
      'SelectGroup/Horizontal — label + inline select, sm / default / lg.',
  },
  {
    name: 'SelectWithDisabled',
    title: 'With Disabled Option',
    description: 'Select with a disabled option.',
  },
  {
    name: 'SelectValidation',
    title: 'States',
    description:
      'Disabled, error, warning, and success — last rows of the Figma matrix.',
  },
  {
    name: 'SelectWithGroups',
    title: 'Grouped Options',
    description: 'Select with grouped and labeled options.',
  },
  {
    name: 'SelectMultipleSizes',
    title: 'Multiple Sizes',
    description: 'Multi-select default and large checkbox item sizes.',
  },
  {
    name: 'SelectMultipleWithSlots',
    title: 'Multiple With Slots',
    description: 'Leading, trailing icons and counter on checkbox items.',
  },
  {
    name: 'SelectMultipleExamples',
    title: 'Multiple select examples',
    description: 'Pre-selected, open tags wrap, and inline tags wrap.',
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
    States: <SelectValidation />,
    'Grouped Options': <SelectWithGroups />,
    'Multiple Sizes': <SelectMultipleSizes />,
    'Multiple With Slots': <SelectMultipleWithSlots />,
    'Multiple select examples': <SelectMultipleExamples />,
  },
};
