'use client';

import { useEffect, useRef, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FieldDescription, FieldSet, FieldTitle } from '@/components/ui/field';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TimeInput } from '@/components/ui/time-input';
import {
  TimePickerItem,
  TimePickerList,
  TimePickerListContent,
} from '@/components/ui/time-picker';
import { cn } from '@/lib/utils';

const formatTwoDigits = (value: number): string =>
  String(value).padStart(2, '0');

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

/** Shared with {@link TimePickerFieldInput} — hour/minute options */
export const timePickerSampleHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const timePickerSampleMinutes = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
];

export const createTimeValueHandler = (
  setter: (value: number) => void,
): ((value: string) => void) => {
  return (value: string) => {
    if (value) {
      setter(Number.parseInt(value, 10));
    }
  };
};

export function TimePickerColumn({
  value,
  onValueChange,
  items,
  size,
}: Readonly<{
  value: number | null;
  onValueChange: (value: number) => void;
  items: number[];
  size: 'default' | 'lg';
}>) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checked = listRef.current?.querySelector<HTMLElement>(
      '[data-state="checked"]',
    );

    if (checked) {
      checked.scrollIntoView({ block: 'nearest' });
    }
  }, [value]);

  return (
    <div className="h-full w-fit">
      <ScrollArea className="animation-none h-full w-fit transition-none">
        <TimePickerList
          ref={listRef}
          size={size}
          value={value === null ? '' : String(value)}
          onValueChange={createTimeValueHandler(onValueChange)}>
          {items.map(item => (
            <TimePickerItem key={item} value={String(item)} size={size}>
              {formatTwoDigits(item)}
            </TimePickerItem>
          ))}
        </TimePickerList>
      </ScrollArea>
    </div>
  );
}

export function timePickerPreventCloseOnTimeInputOutside(event: {
  preventDefault: () => void;
}) {
  const custom = event as CustomEvent<{
    originalEvent: PointerEvent;
  }>;
  const target = custom.detail?.originalEvent?.target;

  if (
    target instanceof HTMLElement &&
    target.closest('[data-slot="time-input-root"]')
  ) {
    event.preventDefault();
  }
}

function parseTimeFieldString(value: string | undefined) {
  if (!value) {
    return { hour: null as number | null, minute: null as number | null };
  }

  const [h, m] = value.split(':');
  const hour = h ? Number.parseInt(h, 10) : null;
  const minute = m ? Number.parseInt(m, 10) : null;

  return {
    hour: Number.isFinite(hour) ? hour : null,
    minute: Number.isFinite(minute) ? minute : null,
  };
}

function formatTimeFieldValue(hour: number | null, minute: number | null) {
  if (hour === null && minute === null) {
    return '';
  }

  const hh = String(hour ?? 0).padStart(2, '0');
  const mm = String(minute ?? 0).padStart(2, '0');

  return `${hh}:${mm}`;
}

/**
 * TimeInput + scroll lists (see {@link TimePickerExample}), controlled as one
 * `HH:mm` string for form libraries. Exported camelCase so `extract-examples`
 * does not treat this as a demo entry.
 */
export const TimePickerFieldInput = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  'aria-invalid': ariaInvalid,
  variant = 'default',
  size = 'default',
}: Readonly<{
  id: string;
  name?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  onBlur?: () => void;
  'aria-invalid'?: boolean;
  variant?: 'default' | 'inline';
  size?: 'sm' | 'default' | 'lg';
}>) => {
  const [open, setOpen] = useState(false);
  const { hour, minute } = parseTimeFieldString(value);
  const dropdownSize: 'default' | 'lg' = size === 'lg' ? 'lg' : 'default';

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <TimeInput
          id={id}
          name={name}
          size={size}
          variant={variant}
          hour={hour}
          minute={minute}
          onHourChange={h => onChange(formatTimeFieldValue(h, minute))}
          onMinuteChange={m => onChange(formatTimeFieldValue(hour, m))}
          onBlur={onBlur}
          aria-invalid={ariaInvalid}
          data-open={open}
          className={variant === 'inline' ? undefined : 'w-fit justify-between'}
        />
      </DropdownMenuTrigger>

      <TimePickerListContent
        size={dropdownSize}
        className="z-10"
        sideOffset={4}
        align="start"
        onOpenAutoFocus={e => e.preventDefault()}
        onInteractOutside={timePickerPreventCloseOnTimeInputOutside}>
        <TimePickerColumn
          value={hour}
          onValueChange={h => onChange(formatTimeFieldValue(h, minute))}
          items={timePickerSampleHours}
          size={dropdownSize}
        />
        <TimePickerColumn
          value={minute}
          onValueChange={m => onChange(formatTimeFieldValue(hour, m))}
          items={timePickerSampleMinutes}
          size={dropdownSize}
        />
      </TimePickerListContent>
    </DropdownMenu>
  );
};

TimePickerFieldInput.displayName = 'TimePickerFieldInput';

// ============================================================================
// Shared Time Picker Example
// ============================================================================

function TimePickerExample({
  id,
  label,
  size = 'default',
  variant = 'default',
  defaultHour = null,
  defaultMinute = null,
}: Readonly<{
  id: string;
  label: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'inline';
  defaultHour?: number | null;
  defaultMinute?: number | null;
}>) {
  const [open, setOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(defaultHour);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(
    defaultMinute,
  );

  const dropdownSize = size === 'lg' ? 'lg' : 'default';
  const cfg = fieldConfig[size];
  const labelClassName = cn(
    cfg.label,
    variant === 'inline' &&
      (size === 'default' || size === 'lg') &&
      'mb-[-4px]',
  );

  return (
    <FieldSet className={cfg.gap}>
      <FieldTitle className={labelClassName}>{label}</FieldTitle>

      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <TimeInput
            id={id}
            size={size}
            variant={variant}
            hour={selectedHour}
            minute={selectedMinute}
            onHourChange={setSelectedHour}
            onMinuteChange={setSelectedMinute}
            data-open={open}
            className={variant === 'inline' ? undefined : 'w-fit'}
          />
        </DropdownMenuTrigger>

        <TimePickerListContent
          size={dropdownSize}
          className="z-10"
          sideOffset={4}
          align="start"
          onOpenAutoFocus={e => e.preventDefault()}
          onInteractOutside={timePickerPreventCloseOnTimeInputOutside}>
          <TimePickerColumn
            value={selectedHour}
            onValueChange={setSelectedHour}
            items={timePickerSampleHours}
            size={dropdownSize}
          />

          <TimePickerColumn
            value={selectedMinute}
            onValueChange={setSelectedMinute}
            items={timePickerSampleMinutes}
            size={dropdownSize}
          />
        </TimePickerListContent>
      </DropdownMenu>

      <FieldDescription className={cfg.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

// ============================================================================
// Standalone Overlay (no input)
// ============================================================================

function TimePickerOverlay({
  size,
  defaultHour,
  defaultMinute,
}: Readonly<{
  size: 'default' | 'lg';
  defaultHour: number;
  defaultMinute: number;
}>) {
  const [selectedHour, setSelectedHour] = useState<number>(defaultHour);
  const [selectedMinute, setSelectedMinute] = useState<number>(defaultMinute);

  return (
    <DropdownMenu open modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="label-regular-primary text-fg-secondary capitalize">
          {size}
        </div>
      </DropdownMenuTrigger>

      <TimePickerListContent
        size={size}
        sideOffset={10}
        align="start"
        onOpenAutoFocus={e => e.preventDefault()}
        onCloseAutoFocus={e => e.preventDefault()}>
        <TimePickerColumn
          value={selectedHour}
          onValueChange={setSelectedHour}
          items={timePickerSampleHours}
          size={size}
        />
        <TimePickerColumn
          value={selectedMinute}
          onValueChange={setSelectedMinute}
          items={timePickerSampleMinutes}
          size={size}
        />
      </TimePickerListContent>
    </DropdownMenu>
  );
}

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * All sizes — default variant
 */
export function TimePickerDemo() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <TimePickerExample id="tp-sm" label="Small" size="sm" />
      <TimePickerExample id="tp-default" label="Default" size="default" />
      <TimePickerExample id="tp-lg" label="Large" size="lg" />
    </div>
  );
}

/**
 * All sizes — inline variant
 */
export function TimePickerInline() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <TimePickerExample
        id="tp-inline-sm"
        label="Small"
        size="sm"
        variant="inline"
      />

      <TimePickerExample
        id="tp-inline-default"
        label="Default"
        size="default"
        variant="inline"
      />

      <TimePickerExample
        id="tp-inline-lg"
        label="Large"
        size="lg"
        variant="inline"
      />
    </div>
  );
}

/**
 * Both overlay sizes side by side
 */
export function TimePickerOverlaySizes() {
  return (
    <div className="flex min-h-[240px] gap-32">
      <div className="flex flex-col items-center gap-3">
        <TimePickerOverlay size="default" defaultHour={1} defaultMinute={5} />
      </div>

      <div className="flex flex-col items-center gap-3">
        <TimePickerOverlay size="lg" defaultHour={1} defaultMinute={5} />
      </div>
    </div>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'TimePickerDemo',
    title: 'Default',
    description: 'Time picker with input and dropdown — all sizes.',
  },
  {
    name: 'TimePickerInline',
    title: 'Inline',
    description: 'Inline variant with dropdown — all sizes.',
  },
  {
    name: 'TimePickerOverlaySizes',
    title: 'Overlay',
    description:
      'Scroll-wheel overlay without an input trigger — default and large sizes.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const timePicker = {
  name: 'time-picker',
  components: {
    Default: <TimePickerDemo />,
    Inline: <TimePickerInline />,
    Overlay: <TimePickerOverlaySizes />,
  },
};
