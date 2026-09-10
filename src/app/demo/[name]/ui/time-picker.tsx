'use client';

import { useEffect, useRef, useState } from 'react';

import { FieldDescription, FieldSet, FieldTitle } from '@/components/ui/field';
import { Popover } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
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

export const sampleHours = Array.from({ length: 24 }, (_, i) => i);
export const sampleMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

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
      '[data-checked]',
    );

    if (checked) {
      checked.scrollIntoView({ block: 'nearest' });
    }
  }, []);

  return (
    <div className="h-full w-fit">
      <ScrollArea className="animation-none h-full w-fit transition-none">
        <TimePickerList
          ref={listRef}
          size={size}
          value={value === null ? null : String(value)}
          onValueChange={next => {
            if (next !== null && next !== undefined && next !== '') {
              onValueChange(Number.parseInt(String(next), 10));
            }
          }}>
          {items.map(item => (
            <TimePickerItem key={item} value={String(item)} size={size}>
              {formatTwoDigits(item)}
            </TimePickerItem>
          ))}
        </TimePickerList>
        <ScrollBar />
      </ScrollArea>
    </div>
  );
}

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
  const anchorRef = useRef<HTMLDivElement>(null);

  const pickerSize = size === 'lg' ? 'lg' : 'default';
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

      <Popover open={open} onOpenChange={setOpen}>
        <TimeInput
          ref={anchorRef}
          id={id}
          size={size}
          variant={variant}
          hour={selectedHour}
          minute={selectedMinute}
          onHourChange={setSelectedHour}
          onMinuteChange={setSelectedMinute}
          onTriggerClick={() => setOpen(prev => !prev)}
          data-open={open}
          className={variant === 'inline' ? undefined : 'w-fit'}
        />

        <TimePickerListContent
          size={pickerSize}
          className="z-10"
          anchor={anchorRef}>
          <TimePickerColumn
            value={selectedHour}
            onValueChange={setSelectedHour}
            items={sampleHours}
            size={pickerSize}
          />

          <TimePickerColumn
            value={selectedMinute}
            onValueChange={setSelectedMinute}
            items={sampleMinutes}
            size={pickerSize}
          />
        </TimePickerListContent>
      </Popover>

      <FieldDescription className={cfg.description}>
        Helper text
      </FieldDescription>
    </FieldSet>
  );
}

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
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <Popover open>
      <div
        ref={anchorRef}
        className="label-regular-primary text-fg-secondary capitalize">
        {size}
      </div>

      <TimePickerListContent
        size={size}
        sideOffset={10}
        anchor={anchorRef}
        finalFocus={false}>
        <TimePickerColumn
          value={selectedHour}
          onValueChange={setSelectedHour}
          items={sampleHours}
          size={size}
        />
        <TimePickerColumn
          value={selectedMinute}
          onValueChange={setSelectedMinute}
          items={sampleMinutes}
          size={size}
        />
      </TimePickerListContent>
    </Popover>
  );
}

export function TimePickerDemo() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <TimePickerExample id="tp-sm" label="Small" size="sm" />
      <TimePickerExample id="tp-default" label="Default" size="default" />
      <TimePickerExample id="tp-lg" label="Large" size="lg" />
    </div>
  );
}

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

export const examples = [
  {
    name: 'TimePickerDemo',
    title: 'Default',
    description: 'Time picker with input and popover — all sizes.',
  },
  {
    name: 'TimePickerInline',
    title: 'Inline',
    description: 'Inline variant with popover — all sizes.',
  },
  {
    name: 'TimePickerOverlaySizes',
    title: 'Overlay',
    description:
      'Scroll-wheel overlay without an input trigger — default and large sizes.',
  },
];

export const timePicker = {
  name: 'time-picker',
  components: {
    Default: <TimePickerDemo />,
    Inline: <TimePickerInline />,
    Overlay: <TimePickerOverlaySizes />,
  },
};
