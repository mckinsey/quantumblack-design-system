import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Icon } from '@/components/ui/icon';
import {
  Statistic,
  StatisticLabel,
  StatisticMark,
  StatisticPeriodRange,
  StatisticTrend,
  StatisticTrendContext,
  StatisticTrendValue,
  StatisticTrendValueItem,
  StatisticValue,
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
  it('exposes role="group" on the root element', () => {
    render(
      <Statistic>
        <StatisticLabel>Energy output</StatisticLabel>
        <StatisticValue value="99.43" unit="MWh" />
      </Statistic>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('exposes data-slot on composed parts', () => {
    const { container } = render(
      <Statistic>
        <StatisticLabel>Energy output</StatisticLabel>
        <StatisticValue value="99.43" unit="MWh" />
        <StatisticTrend sentiment="positive">
          <StatisticMark>
            <Icon icon="arrow_circle_up" />
          </StatisticMark>
          <StatisticTrendValue value="+234" />
          <StatisticTrendContext>since last reading</StatisticTrendContext>
        </StatisticTrend>
        <StatisticMark sentiment="positive">
          <Icon icon="arrow_circle_up" />
        </StatisticMark>
        <StatisticPeriodRange>
          <span>23 AUG – 23 SEP</span>
          <span>2026</span>
        </StatisticPeriodRange>
      </Statistic>,
    );

    const slots = [
      'statistic',
      'statistic-label',
      'statistic-value',
      'statistic-trend',
      'statistic-mark',
      'statistic-trend-value',
      'statistic-trend-value-item',
      'statistic-trend-context',
      'statistic-period-range',
    ];

    for (const slot of slots) {
      expect(
        container.querySelector(`[data-slot="${slot}"]`),
      ).toBeInTheDocument();
    }
  });

  it('renders label, value, unit, and trend text', () => {
    render(
      <Statistic>
        <StatisticLabel>Energy output</StatisticLabel>
        <StatisticValue value="99.43" unit="MWh" />
        <StatisticTrend sentiment="positive">
          <StatisticTrendValue value="+234" />
          <StatisticTrendContext>since last reading</StatisticTrendContext>
        </StatisticTrend>
      </Statistic>,
    );

    expect(screen.getByText('Energy output')).toBeInTheDocument();
    expect(screen.getByText('99.43')).toBeInTheDocument();
    expect(screen.getByText('MWh')).toBeInTheDocument();
    expect(screen.getByText('+234')).toBeInTheDocument();
    expect(screen.getByText('since last reading')).toBeInTheDocument();
  });

  it('applies default size via data-size', () => {
    const { container } = render(
      <Statistic>
        <StatisticValue value="1" />
      </Statistic>,
    );
    expect(container.querySelector('[data-slot="statistic"]')).toHaveAttribute(
      'data-size',
      'default',
    );
  });

  it('applies end alignment to child slots via group-data', () => {
    const { container } = render(
      <Statistic align="end">
        <StatisticLabel>Right aligned</StatisticLabel>
        <StatisticValue value="99.43" unit="MWh" />
        <StatisticTrend sentiment="positive">
          <StatisticMark>
            <Icon icon="arrow_circle_up" />
          </StatisticMark>
          <StatisticTrendValue value="+234" />
        </StatisticTrend>
      </Statistic>,
    );

    const root = container.querySelector('[data-slot="statistic"]');
    const label = container.querySelector('[data-slot="statistic-label"]');
    const icon = container.querySelector('[data-slot="statistic-icon"]');
    const trend = container.querySelector('[data-slot="statistic-trend"]');

    expect(root).toHaveAttribute('data-align', 'end');
    expect(root?.className).toContain('items-end');
    expect(label?.className).toContain('justify-end');
    expect(icon).toBeNull();
    expect(trend?.className).toContain('justify-end');
  });

  it('applies align and unit position via data attributes', () => {
    const { container } = render(
      <Statistic align="end" unitPosition="stacked">
        <StatisticValue value="1" unit="%" />
      </Statistic>,
    );
    const root = container.querySelector('[data-slot="statistic"]');
    expect(root).toHaveAttribute('data-align', 'end');
    expect(root).toHaveAttribute('data-unit-position', 'stacked');
  });

  it('marks disabled labels via data-disabled', () => {
    const { container } = render(
      <Statistic>
        <StatisticLabel disabled>Unavailable</StatisticLabel>
      </Statistic>,
    );
    expect(
      container.querySelector('[data-slot="statistic-label"]'),
    ).toHaveAttribute('data-disabled', 'true');
  });

  it('hides trend mark from assistive tech', () => {
    const { container } = render(
      <StatisticTrend sentiment="positive">
        <StatisticMark>
          <Icon icon="arrow_circle_up" />
        </StatisticMark>
      </StatisticTrend>,
    );
    expect(
      container.querySelector('[data-slot="statistic-mark"]'),
    ).toHaveAttribute('aria-hidden');
  });

  it('renders trend value items with variant data attributes', () => {
    const { container } = render(
      <StatisticTrend sentiment="positive">
        <StatisticTrendValue>
          <StatisticTrendValueItem>+234</StatisticTrendValueItem>
          <StatisticTrendValueItem variant="secondary">
            (+3.2%)
          </StatisticTrendValueItem>
        </StatisticTrendValue>
      </StatisticTrend>,
    );

    expect(
      container.querySelector(
        '[data-slot="statistic-trend-value-item"][data-variant="primary"]',
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        '[data-slot="statistic-trend-value-item"][data-variant="secondary"]',
      ),
    ).toBeInTheDocument();
  });
});
