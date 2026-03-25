import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Calendar } from '@/components/ui/calendar';

const componentName = 'calendar';

afterEach(() => {
  cleanup();
});

describe(`${componentName} — all examples render`, () => {
  it.each(Object.entries(exampleComponentMaps[componentName]))(
    'renders "%s" without crashing',
    (_, Example) => {
      expect(() =>
        render(
          <Renderer>
            <Example />
          </Renderer>,
        ),
      ).not.toThrow();
    },
  );
});

describe(`${componentName} — structure`, () => {
  it('renders the calendar root element', () => {
    render(<Calendar mode="single" />);
    expect(
      document.querySelector('[data-slot="calendar"]'),
    ).toBeInTheDocument();
  });

  it('renders day buttons in the grid', () => {
    render(<Calendar mode="single" />);
    // CalendarDayButton uses data-day="yyyy-MM-dd" attribute
    const days = document.querySelectorAll('[data-day]');
    expect(days.length).toBeGreaterThan(0);
  });

  it('pre-selected date is marked as selected', () => {
    const date = new Date(2025, 0, 15); // Jan 15 2025
    // Pass defaultMonth so the calendar displays the month containing the selected date
    render(<Calendar mode="single" selected={date} defaultMonth={date} />);
    // Calendar marks selected day with data-selected-single="true"
    const selected = document.querySelector('[data-selected-single="true"]');
    expect(selected).toBeInTheDocument();
  });
});
