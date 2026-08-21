import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Statistic,
  StatisticContent,
  StatisticIcon,
  StatisticLabel,
  StatisticLabelTrailing,
  StatisticTrend,
  StatisticTrendContextText,
  StatisticTrendDelta,
  StatisticTrendMark,
  StatisticTrendPercentage,
  StatisticTrendValue,
  StatisticUnit,
  StatisticValue,
  StatisticValueContent,
} from '@/components/ui/statistic';
import { type DemoExample } from '@/lib/demo-utils';

function InfoIcon() {
  return (
    <StatisticLabelTrailing>
      <IconShell size="sm" type="neutral" variant="secondary">
        <Icon icon="info" />
      </IconShell>
    </StatisticLabelTrailing>
  );
}

function StatIcon() {
  return (
    <StatisticIcon>
      <IconShell size="default" type="neutral" variant="secondary">
        <Icon icon="energy_savings_leaf" />
      </IconShell>
    </StatisticIcon>
  );
}

function TrendBlock({
  sentiment,
}: {
  sentiment: 'positive' | 'negative' | 'neutral';
}) {
  return (
    <StatisticTrend sentiment={sentiment}>
      <StatisticTrendMark direction="up" />
      <StatisticTrendValue>
        <StatisticTrendDelta>+234</StatisticTrendDelta>
        <StatisticTrendPercentage>(+23.42%)</StatisticTrendPercentage>
      </StatisticTrendValue>
      <StatisticTrendContextText>since last reading</StatisticTrendContextText>
    </StatisticTrend>
  );
}

function StatBlock({
  label = 'Stat label',
  value = '99.43',
  unit = 'MWh',
  withInfo = true,
  withIcon = true,
  withTrend = true,
  sentiment = 'positive' as const,
}) {
  return (
    <>
      <StatisticLabel>
        {label}
        {withInfo ? <InfoIcon /> : null}
      </StatisticLabel>
      <StatisticContent>
        {withIcon ? <StatIcon /> : null}
        <StatisticValue>
          <StatisticValueContent>{value}</StatisticValueContent>
          <StatisticUnit>{unit}</StatisticUnit>
        </StatisticValue>
        {withTrend ? <TrendBlock sentiment={sentiment} /> : null}
      </StatisticContent>
    </>
  );
}

export function StatisticDemo() {
  return (
    <Statistic>
      <StatBlock />
    </Statistic>
  );
}

export function StatisticSizes() {
  const sizes = ['xsm', 'sm', 'default', 'lg', 'xl'] as const;

  return (
    <div className="flex flex-col gap-8">
      {sizes.map(size => (
        <Statistic key={size} size={size}>
          <StatBlock
            label={`Size ${size}`}
            withInfo={false}
            withIcon={false}
            withTrend={false}
          />
        </Statistic>
      ))}
    </div>
  );
}

export function StatisticUnitPositions() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <Statistic unitPosition="inline">
        <StatBlock label="Inline unit" withTrend={false} />
      </Statistic>
      <Statistic unitPosition="stacked">
        <StatBlock label="Stacked unit" withTrend={false} />
      </Statistic>
    </div>
  );
}

export function StatisticAlignments() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Statistic align="start">
        <StatBlock label="Align start" />
      </Statistic>
      <Statistic align="end">
        <StatBlock label="Align end" />
      </Statistic>
    </div>
  );
}

export function StatisticTrendSentiments() {
  return (
    <div className="flex flex-col gap-6">
      <Statistic>
        <StatisticLabel>Positive trend</StatisticLabel>
        <StatisticContent>
          <StatisticValue>
            <StatisticValueContent>99.43</StatisticValueContent>
            <StatisticUnit>MWh</StatisticUnit>
          </StatisticValue>
          <TrendBlock sentiment="positive" />
        </StatisticContent>
      </Statistic>
      <Statistic>
        <StatisticLabel>Negative trend</StatisticLabel>
        <StatisticContent>
          <StatisticValue>
            <StatisticValueContent>99.43</StatisticValueContent>
            <StatisticUnit>MWh</StatisticUnit>
          </StatisticValue>
          <TrendBlock sentiment="negative" />
        </StatisticContent>
      </Statistic>
      <Statistic>
        <StatisticLabel>Neutral trend</StatisticLabel>
        <StatisticContent>
          <StatisticValue>
            <StatisticValueContent>99.43</StatisticValueContent>
            <StatisticUnit>MWh</StatisticUnit>
          </StatisticValue>
          <TrendBlock sentiment="neutral" />
        </StatisticContent>
      </Statistic>
    </div>
  );
}

export function StatisticMinimal() {
  return (
    <Statistic>
      <StatisticContent>
        <StatisticValue>
          <StatisticValueContent>112,893</StatisticValueContent>
        </StatisticValue>
      </StatisticContent>
    </Statistic>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'StatisticDemo',
    title: 'Default',
    description: 'Label, icon, value, unit, and positive trend.',
  },
  {
    name: 'StatisticMinimal',
    title: 'Value only',
    description: 'Minimal statistic with value only, Ant Design basic usage.',
  },
  {
    name: 'StatisticSizes',
    title: 'Sizes',
    description: 'All five size axes: xsm, sm, reg, lg, xl.',
  },
  {
    name: 'StatisticUnitPositions',
    title: 'Unit position',
    description: 'Inline and stacked unit placement.',
  },
  {
    name: 'StatisticAlignments',
    title: 'Alignment',
    description: 'Start and end alignment.',
  },
  {
    name: 'StatisticTrendSentiments',
    title: 'Trend sentiment',
    description: 'Positive, negative, and neutral trend rows.',
  },
];

export const statistic = {
  name: 'statistic',
  components: {
    Default: <StatisticDemo />,
    'Value only': <StatisticMinimal />,
    Sizes: <StatisticSizes />,
    'Unit position': <StatisticUnitPositions />,
    Alignment: <StatisticAlignments />,
    'Trend sentiment': <StatisticTrendSentiments />,
  },
};
