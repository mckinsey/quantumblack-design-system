// url=<QBDS_STATISTIC_TREND_ROW>
// source=src/components/ui/statistic.tsx
// component=StatisticTrend
//
// Figma: baseStat/TrendRow — hasTrendMark, hasTrendValue, hasTrendContext
import figma from 'figma';

const instance = figma.selectedInstance;

const sentiment = (instance.getEnum('sentiment', {
  positive: 'positive',
  negative: 'negative',
  neutral: 'neutral',
}) ?? 'positive') as 'positive' | 'negative' | 'neutral';

const hasTrendMark = instance.getBoolean('hasTrendMark');
const hasTrendValue = instance.getBoolean('hasTrendValue');
const hasTrendContext = instance.getBoolean('hasTrendContext');

const trendValueInst = instance.findInstance('baseStat/TrendValue');
const contextInst = instance.findInstance('baseStat/TrendContext');

const valueKey =
  sentiment === 'negative'
    ? 'valueNegative'
    : sentiment === 'neutral'
      ? 'valueNeutral'
      : 'valuePositive';

const pctKey =
  sentiment === 'negative'
    ? 'valuePercentageNegative'
    : sentiment === 'neutral'
      ? 'valuePercentageNeutral'
      : 'valuePercentagePositive';

const markIcons = {
  positive: 'arrow_circle_up',
  negative: 'arrow_circle_down',
  neutral: 'remove_circle_outline',
} as const;

const markBlock = hasTrendMark
  ? figma.code`<StatisticMark><Icon icon="${markIcons[sentiment]}" /></StatisticMark>`
  : figma.code``;

let valueBlock = figma.code``;

if (hasTrendValue && trendValueInst?.type === 'INSTANCE') {
  const val = JSON.stringify(trendValueInst.getString(valueKey) ?? '+234');
  const pct = trendValueInst.getString(pctKey);

  valueBlock = pct
    ? figma.code`<StatisticTrendValue value={${val}} percentage={${JSON.stringify(pct)}} />`
    : figma.code`<StatisticTrendValue value={${val}} />`;
}

let contextBlock = figma.code``;

if (hasTrendContext && contextInst?.type === 'INSTANCE') {
  const context = JSON.stringify(
    contextInst.getString('context') ?? 'since last reading',
  );
  contextBlock = figma.code`<StatisticTrendContext>{${context}}</StatisticTrendContext>`;
}

const sentimentProp =
  sentiment !== 'positive' ? ` sentiment="${sentiment}"` : '';

export default {
  example: figma.code`
    <StatisticTrend${sentimentProp}>
      ${markBlock}
      ${valueBlock}
      ${contextBlock}
    </StatisticTrend>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { StatisticMark, StatisticTrend, StatisticTrendContext, StatisticTrendValue } from "@/components/ui/statistic"',
  ],
  id: 'statistic-trend-row',
  metadata: { nestable: true },
};
