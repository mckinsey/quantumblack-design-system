import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  StatLabel,
  StatPeriodRange,
  StatTrendRow,
  StatValue,
  Statistic,
} from '@/components/ui/statistic';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

function InfoTrailing() {
  return (
    <IconShell size="sm" type="neutral" variant="secondary">
      <Icon icon="info" />
    </IconShell>
  );
}

function DefaultStatistic() {
  return (
    <Statistic>
      <StatLabel trailing={<InfoTrailing />}>Stat label</StatLabel>
      <StatValue unit="MWh">99.43</StatValue>
      <StatTrendRow
        sentiment="positive"
        direction="up"
        value="+234"
        percentage="(+23.42%)"
        context="since last reading"
      />
    </Statistic>
  );
}

export function StatisticDemo() {
  return <DefaultStatistic />;
}

const statisticSizes = ['xsm', 'sm', 'default', 'lg', 'xl'] as const;

export function StatisticSizes() {
  return (
    <div className="flex flex-col gap-8">
      {statisticSizes.map(size => (
        <Statistic key={size} size={size}>
          <StatLabel trailing={<InfoTrailing />}>Stat label</StatLabel>
          <StatValue unit="MWh">99.43</StatValue>
          <StatTrendRow
            sentiment="positive"
            direction="up"
            value="+234"
            percentage="(+23.42%)"
            context="since last reading"
          />
        </Statistic>
      ))}
    </div>
  );
}

export function StatisticAlignment() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Statistic align="start">
        <StatLabel trailing={<InfoTrailing />}>Stat label</StatLabel>
        <StatValue unit="MWh">99.43</StatValue>
        <StatTrendRow
          sentiment="positive"
          direction="up"
          value="+234"
          percentage="(+23.42%)"
          context="since last reading"
        />
      </Statistic>
      <Statistic align="end">
        <StatLabel trailing={<InfoTrailing />}>Stat label</StatLabel>
        <StatValue unit="MWh">99.43</StatValue>
        <StatTrendRow
          sentiment="positive"
          direction="up"
          value="+234"
          percentage="(+23.42%)"
          context="since last reading"
        />
      </Statistic>
    </div>
  );
}

export function StatisticUnitPosition() {
  return (
    <div className="flex flex-wrap gap-12">
      <Statistic unitPosition="inline">
        <StatLabel>Stat label</StatLabel>
        <StatValue unit="MWh">99.43</StatValue>
      </Statistic>
      <Statistic unitPosition="stacked" align="end">
        <StatLabel>Stat label</StatLabel>
        <StatValue unit="MWh">99.43</StatValue>
      </Statistic>
    </div>
  );
}

export function StatisticTrendSentiments() {
  const rows = [
    {
      sentiment: 'positive' as const,
      direction: 'up' as const,
      value: '+234',
      percentage: '(+23.42%)',
    },
    {
      sentiment: 'negative' as const,
      direction: 'down' as const,
      value: '-234',
      percentage: '(-23.42%)',
    },
    {
      sentiment: 'neutral' as const,
      direction: 'neutral' as const,
      value: '00.00',
      percentage: '(0.00%)',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {rows.map(row => (
        <StatTrendRow
          key={row.sentiment}
          sentiment={row.sentiment}
          direction={row.direction}
          value={row.value}
          percentage={row.percentage}
          context="since last reading"
        />
      ))}
    </div>
  );
}

export function StatLabelStates() {
  return (
    <div className="flex flex-col gap-4">
      <StatLabel trailing={<InfoTrailing />}>Stat label</StatLabel>
      <StatLabel disabled trailing={<InfoTrailing />}>
        Stat label
      </StatLabel>
    </div>
  );
}

export function StatPeriodRangeDemo() {
  return (
    <div className="flex flex-col gap-3">
      <StatPeriodRange range="23 AUG – 23 SEP" qualifier="2026" />
      <StatPeriodRange range="Last 30 days" qualifier="30d" />
      <StatPeriodRange range="Year to date" qualifier="YTD" />
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'StatisticDemo',
    title: 'Default',
    description:
      'KPI block with label, value, unit, and trend row — default size and inline unit.',
  },
  {
    name: 'StatisticSizes',
    title: 'Sizes',
    description: 'xsm through xl density for the composed statistic.',
  },
  {
    name: 'StatisticAlignment',
    title: 'Alignment',
    description: 'Start- and end-aligned statistic stacks.',
  },
  {
    name: 'StatisticUnitPosition',
    title: 'Unit position',
    description: 'Inline and stacked unit placement on the value row.',
  },
  {
    name: 'StatisticTrendSentiments',
    title: 'Trend sentiments',
    description: 'Positive, negative, and neutral trend rows.',
  },
  {
    name: 'StatLabelStates',
    title: 'Label states',
    description: 'Enabled and disabled stat labels with trailing info icon.',
  },
  {
    name: 'StatPeriodRangeDemo',
    title: 'Period range',
    description: 'Date and period qualifier text for KPI cards.',
  },
];

export const statistic = createLegacyDemo('statistic', examples, {
  StatisticDemo: <StatisticDemo />,
  StatisticSizes: <StatisticSizes />,
  StatisticAlignment: <StatisticAlignment />,
  StatisticUnitPosition: <StatisticUnitPosition />,
  StatisticTrendSentiments: <StatisticTrendSentiments />,
  StatLabelStates: <StatLabelStates />,
  StatPeriodRangeDemo: <StatPeriodRangeDemo />,
});
