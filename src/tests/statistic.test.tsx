import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import {
  Statistic,
  StatisticContent,
  StatisticLabel,
  StatisticTrend,
  StatisticTrendDelta,
  StatisticTrendMark,
  StatisticUnit,
  StatisticValue,
  StatisticValueContent,
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
  it('renders value, unit, and label text', () => {
    render(
      <Statistic>
        <StatisticLabel>Active users</StatisticLabel>
        <StatisticContent>
          <StatisticValue>
            <StatisticValueContent>112,893</StatisticValueContent>
            <StatisticUnit>users</StatisticUnit>
          </StatisticValue>
        </StatisticContent>
      </Statistic>,
    );

    expect(screen.getByText('Active users')).toBeInTheDocument();
    expect(screen.getByText('112,893')).toBeInTheDocument();
    expect(screen.getByText('users')).toBeInTheDocument();
  });

  it('applies root data attributes for size, align, and unit position', () => {
    render(
      <Statistic
        size="lg"
        align="end"
        unitPosition="stacked"
        data-testid="stat">
        <StatisticContent>
          <StatisticValue>
            <StatisticValueContent>1</StatisticValueContent>
          </StatisticValue>
        </StatisticContent>
      </Statistic>,
    );

    const root = screen.getByTestId('stat');

    expect(root).toHaveAttribute('data-slot', 'statistic');
    expect(root).toHaveAttribute('data-size', 'lg');
    expect(root).toHaveAttribute('data-align', 'end');
    expect(root).toHaveAttribute('data-unit-position', 'stacked');
  });

  it('hides trend mark for neutral sentiment', () => {
    const { container } = render(
      <Statistic>
        <StatisticContent>
          <StatisticTrend sentiment="neutral">
            <StatisticTrendMark direction="up" />
            <StatisticTrendDelta>0</StatisticTrendDelta>
          </StatisticTrend>
        </StatisticContent>
      </Statistic>,
    );

    expect(
      container.querySelector('[data-slot="statistic-trend-mark"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
