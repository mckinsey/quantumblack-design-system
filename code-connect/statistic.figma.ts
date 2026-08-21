// url=<QBDS_STATISTIC>
// source=src/components/ui/statistic.tsx
// component=Statistic
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  xsm: 'xsm',
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
  xl: 'xl',
});

const align = instance.getEnum('align', {
  start: 'start',
  end: 'end',
});

const unitPosition = instance.getEnum('unitPosition', {
  inline: 'inline',
  stacked: 'stacked',
});

const hasLabel = instance.getBoolean('hasLabel');
const hasStatIcon = instance.getBoolean('hasStatIcon');
const hasTrend = instance.getBoolean('hasTrend');

const statIconSlot = instance.getSlot('statIcon');
const statIconConnected = statIconSlot?.connectedInstances ?? [];
const statIconCode =
  statIconConnected.length > 0
    ? statIconConnected.map(n => n.executeTemplate().example).flat()
    : figma.code`
        <StatisticIcon>
          <IconShell size="${size === 'xsm' || size === 'sm' ? 'sm' : 'default'}" type="neutral" variant="secondary">
            <Icon icon="energy_savings_leaf" />
          </IconShell>
        </StatisticIcon>
      `;

const labelBlock = hasLabel
  ? figma.code`
      <StatisticLabel>
        Stat label
        <StatisticLabelTrailing>
          <IconShell size="sm" type="neutral" variant="secondary">
            <Icon icon="info" />
          </IconShell>
        </StatisticLabelTrailing>
      </StatisticLabel>
    `
  : figma.code``;

const iconBlock = hasStatIcon ? statIconCode : figma.code``;

const trendBlock = hasTrend
  ? figma.code`
      <StatisticTrend sentiment="positive">
        <StatisticTrendMark direction="up" />
        <StatisticTrendValue>
          <StatisticTrendDelta>+234</StatisticTrendDelta>
          <StatisticTrendPercentage>(+23.42%)</StatisticTrendPercentage>
        </StatisticTrendValue>
        <StatisticTrendContextText>since last reading</StatisticTrendContextText>
      </StatisticTrend>
    `
  : figma.code``;

const sizeProp = size === 'default' ? '' : ` size="${size}"`;
const alignProp = align === 'start' ? '' : ` align="${align}"`;
const unitProp =
  unitPosition === 'inline' ? '' : ` unitPosition="${unitPosition}"`;

export default {
  example: figma.code`
    <Statistic${sizeProp}${alignProp}${unitProp}>
      ${labelBlock}
      <StatisticContent>
        ${iconBlock}
        <StatisticValue>
          <StatisticValueContent>99.43</StatisticValueContent>
          <StatisticUnit>MWh</StatisticUnit>
        </StatisticValue>
        ${trendBlock}
      </StatisticContent>
    </Statistic>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Statistic, StatisticContent, StatisticIcon, StatisticLabel, StatisticLabelTrailing, StatisticTrend, StatisticTrendContextText, StatisticTrendDelta, StatisticTrendMark, StatisticTrendPercentage, StatisticTrendValue, StatisticUnit, StatisticValue, StatisticValueContent } from "@/components/ui/statistic"',
  ],
  id: 'statistic',
};
