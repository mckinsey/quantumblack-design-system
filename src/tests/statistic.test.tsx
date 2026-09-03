import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  StatLabel,
  StatPeriodRange,
  StatTrendRow,
  StatValue,
  Statistic,
} from '@/components/ui/statistic';

const componentName = 'statistic';

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
  it('renders composed statistic with data-slot markers', () => {
    render(
      <Statistic data-testid="stat">
        <StatLabel>Revenue</StatLabel>
        <StatValue unit="MWh">99.43</StatValue>
        <StatTrendRow value="+1" percentage="(+1%)" context="vs last week" />
      </Statistic>,
    );

    expect(screen.getByTestId('stat')).toHaveAttribute(
      'data-slot',
      'statistic',
    );
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('99.43')).toBeInTheDocument();
    expect(screen.getByText('MWh')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('renders disabled stat label', () => {
    render(<StatLabel disabled>Stat label</StatLabel>);
    expect(
      screen.getByText('Stat label').closest('[data-slot="stat-label"]'),
    ).toHaveAttribute('data-disabled', 'true');
  });

  it('renders period range with qualifier', () => {
    render(<StatPeriodRange range="23 AUG – 23 SEP" qualifier="2026" />);
    expect(screen.getByText('23 AUG – 23 SEP')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it.each(['positive', 'negative', 'neutral'] as const)(
    'renders trend sentiment="%s" without crashing',
    sentiment => {
      expect(() =>
        render(
          <StatTrendRow
            sentiment={sentiment}
            direction={sentiment === 'negative' ? 'down' : 'up'}
            value="1"
          />,
        ),
      ).not.toThrow();
    },
  );
});
