import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { DateInput } from '@/components/ui/date-input';

const componentName = 'date-input';

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
  it('renders root and trigger', () => {
    render(<DateInput day={1} month={4} year={2025} />);

    expect(
      document.querySelector('[data-slot="date-input-root"]'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Choose date' }),
    ).toBeInTheDocument();
  });

  it('renders range separator in range mode', () => {
    render(
      <DateInput
        mode="range"
        day={1}
        month={4}
        year={2025}
        endDay={16}
        endMonth={4}
        endYear={2025}
      />,
    );

    expect(
      document.querySelector('[data-slot="date-range-separator"]'),
    ).toBeInTheDocument();
  });

  it('respects disabled', () => {
    render(<DateInput disabled day={1} month={4} year={2025} />);

    expect(
      document.querySelector('[data-slot="date-input-root"]'),
    ).toHaveAttribute('data-disabled', 'true');
    expect(screen.getByRole('button', { name: 'Choose date' })).toBeDisabled();
  });
});
