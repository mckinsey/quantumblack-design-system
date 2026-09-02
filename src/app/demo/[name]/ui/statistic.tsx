import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Statistic,
  StatisticIcon,
  StatisticLabel,
  StatisticMark,
  type StatisticSentiment,
  type StatisticSize,
  StatisticTrend,
  StatisticTrendContext,
  StatisticTrendValue,
  StatisticValue,
} from '@/components/ui/statistic';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

const sizes = [
  'xs',
  'sm',
  'default',
  'lg',
  'xl',
] as const satisfies readonly StatisticSize[];

function iconSize(size: StatisticSize) {
  return size === 'xs' ? 'sm' : 'lg';
}

function trendIcon(sentiment: StatisticSentiment) {
  if (sentiment === 'negative') {
    return 'arrow_circle_down';
  }

  if (sentiment === 'neutral') {
    return 'remove_circle_outline';
  }

  return 'arrow_circle_up';
}

function KpiStat({
  size = 'default',
  align = 'start',
  unitPosition = 'inline',
  label = 'Energy output',
  value = '99.43',
  unit = 'MWh',
  sentiment = 'positive',
  trendValue = '+234',
  trendContext = 'since last reading',
  withIcon = true,
  withTrend = true,
}: {
  size?: StatisticSize;
  align?: 'start' | 'end';
  unitPosition?: 'inline' | 'stacked';
  label?: string;
  value?: string;
  unit?: string;
  sentiment?: StatisticSentiment;
  trendValue?: string;
  trendContext?: string;
  withIcon?: boolean;
  withTrend?: boolean;
}) {
  return (
    <Statistic size={size} align={align} unitPosition={unitPosition}>
      <StatisticLabel>{label}</StatisticLabel>
      {withIcon ? (
        <StatisticIcon>
          <IconShell size={iconSize(size)} type="neutral" variant="secondary">
            <Icon icon="energy_savings_leaf" />
          </IconShell>
        </StatisticIcon>
      ) : null}
      <StatisticValue value={value} unit={unit} />
      {withTrend ? (
        <StatisticTrend sentiment={sentiment}>
          <StatisticMark>
            <Icon icon={trendIcon(sentiment)} />
          </StatisticMark>
          <StatisticTrendValue value={trendValue} />
          <StatisticTrendContext>{trendContext}</StatisticTrendContext>
        </StatisticTrend>
      ) : null}
    </Statistic>
  );
}

export function StatisticDemo() {
  return <KpiStat />;
}

export function StatisticSizes() {
  return (
    <div className="flex flex-col items-start gap-8">
      {sizes.map(size => (
        <KpiStat key={size} size={size} />
      ))}
    </div>
  );
}

export function StatisticAlign() {
  return (
    <div className="flex flex-wrap items-start gap-12">
      <KpiStat align="start" />
      <KpiStat align="end" label="Right aligned" />
    </div>
  );
}

export function StatisticUnitPosition() {
  return (
    <div className="flex flex-wrap items-start gap-12">
      <KpiStat unitPosition="inline" />
      <KpiStat unitPosition="stacked" />
    </div>
  );
}

export function StatisticTrendSentiments() {
  const rows: {
    sentiment: StatisticSentiment;
    trendValue: string;
    label: string;
  }[] = [
    { sentiment: 'positive', trendValue: '+234', label: 'Positive' },
    { sentiment: 'negative', trendValue: '-234', label: 'Negative' },
    { sentiment: 'neutral', trendValue: '00.00', label: 'Neutral' },
  ];

  return (
    <div className="flex flex-wrap items-start gap-10">
      {rows.map(row => (
        <KpiStat
          key={row.sentiment}
          label={row.label}
          sentiment={row.sentiment}
          trendValue={row.trendValue}
        />
      ))}
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'StatisticDemo',
    title: 'Default',
    description:
      'Standard KPI card with label, category icon, value, unit, and trend row.',
  },
  {
    name: 'StatisticSizes',
    title: 'Sizes',
    description: 'xs through xl stacked vertically.',
  },
  {
    name: 'StatisticAlign',
    title: 'Alignment',
    description: 'Start- and end-aligned content.',
  },
  {
    name: 'StatisticUnitPosition',
    title: 'Unit position',
    description: 'Inline and stacked unit layouts.',
  },
  {
    name: 'StatisticTrendSentiments',
    title: 'Trend sentiments',
    description: 'Positive, negative, and neutral trend rows.',
  },
];

export const statistic = createLegacyDemo('statistic', examples, {
  StatisticDemo: <StatisticDemo />,
  StatisticSizes: <StatisticSizes />,
  StatisticAlign: <StatisticAlign />,
  StatisticUnitPosition: <StatisticUnitPosition />,
  StatisticTrendSentiments: <StatisticTrendSentiments />,
});
