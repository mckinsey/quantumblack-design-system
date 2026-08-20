'use client';

import { useState } from 'react';

import { Calendar } from '@/components/ui/calendar';
import { FieldSet, FieldTitle } from '@/components/ui/field';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Default calendar
 */
export function CalendarDemo() {
  return <Calendar />;
}

/**
 * Range selection calendar
 */
export function CalendarRange() {
  return <Calendar mode="range" numberOfMonths={2} />;
}

/**
 * Calendar sizes
 */
export function CalendarSizes() {
  const sizes = [
    { key: 'default', label: 'Default' },
    { key: 'lg', label: 'Large' },
  ] as const;

  return (
    <div className="flex flex-wrap items-start gap-6">
      {sizes.map(({ key, label }) => (
        <FieldSet key={key} className="gap-2">
          <FieldTitle className="label-large-primary">{label}</FieldTitle>
          <Calendar size={key} />
        </FieldSet>
      ))}
    </div>
  );
}

/**
 * Calendar with a pre-selected date (today by default)
 */
export function CalendarPreSelected() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}

/**
 * Calendar with disabled past dates
 */
export function CalendarDisabledDays() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={{ before: new Date() }}
    />
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'CalendarDemo',
    title: 'Default',
    description: 'Basic calendar with single date selection.',
  },
  {
    name: 'CalendarRange',
    title: 'Range Selection',
    description: 'Calendar with date range selection and multiple months.',
  },
  {
    name: 'CalendarSizes',
    title: 'Sizes',
    description: 'Default and large calendar sizes.',
  },
  {
    name: 'CalendarPreSelected',
    title: 'Pre-selected Date',
    description: 'Calendar with today pre-selected.',
  },
  {
    name: 'CalendarDisabledDays',
    title: 'Disabled Past Dates',
    description: 'Calendar that prevents selection of past dates.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const calendar = {
  name: 'calendar',
  components: {
    Default: <CalendarDemo />,
    'Range Selection': <CalendarRange />,
    Sizes: <CalendarSizes />,
    'Pre-selected Date': <CalendarPreSelected />,
    'Disabled Past Dates': <CalendarDisabledDays />,
  },
};
