// url=<QBDS_STATISTIC>
// source=src/components/ui/statistic.tsx
// component=Statistic
//
// Figma-only: hasLabel, hasStatIcon, hasTrend, statIcon slot
import figma from 'figma';

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  xsm: 'xs',
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
  xl: 'xl',
}) ?? 'default') as 'xs' | 'sm' | 'default' | 'lg' | 'xl';

const align =
  instance.getEnum('align', {
    start: 'start',
    end: 'end',
  }) ?? 'start';

const unitPosition =
  instance.getEnum('unitPosition', {
    inline: 'inline',
    stacked: 'stacked',
  }) ?? 'inline';

const hasLabel = instance.getBoolean('hasLabel');
const hasStatIcon = instance.getBoolean('hasStatIcon');
const hasTrend = instance.getBoolean('hasTrend');

const labelInst = instance.findInstance('baseStat/Label');
const valueInst = instance.findInstance('baseStat/StatValue');
const trendInst = instance.findInstance('baseStat/TrendRow');
const statIconSlot = instance.getSlot('statIcon');
const statIconConnected = statIconSlot?.connectedInstances ?? [];
const statIconChildren =
  statIconConnected.length > 0
    ? statIconConnected.map(n => n.executeTemplate().example).flat()
    : [];

const shellSize = size === 'xs' ? 'sm' : 'lg';

let labelBlock = figma.code``;

if (hasLabel) {
  if (labelInst?.type === 'INSTANCE') {
    const label = JSON.stringify(
      labelInst.getString('labelField') ?? 'Energy output',
    );
    const disabled =
      labelInst.getEnum('state', {
        disabled: 'disabled',
        enabled: 'enabled',
      }) === 'disabled';
    const labelAlign =
      labelInst.getEnum('align', {
        left: 'start',
        right: 'end',
      }) ?? 'start';
    const alignProp = labelAlign !== 'start' ? ` align="${labelAlign}"` : '';
    const disabledProp = disabled ? ' disabled' : '';

    labelBlock = figma.code`<StatisticLabel${alignProp}${disabledProp}>{${label}}</StatisticLabel>`;
  } else {
    labelBlock = figma.code`<StatisticLabel>Energy output</StatisticLabel>`;
  }
}

const fallbackIcon = figma.code`
  <IconShell size="${shellSize}" type="neutral" variant="secondary">
    <Icon icon="energy_savings_leaf" />
  </IconShell>
`;

const iconBlock = hasStatIcon
  ? figma.code`
      <StatisticIcon>
        ${
          statIconChildren.length > 0
            ? figma.helpers.react.renderChildren(statIconChildren)
            : fallbackIcon
        }
      </StatisticIcon>
    `
  : figma.code``;

let valueBlock = figma.code`<StatisticValue value="99.43" unit="MWh" />`;

if (valueInst?.type === 'INSTANCE') {
  const val = JSON.stringify(valueInst.getString('value') ?? '99.43');
  const unit = valueInst.getString('unit');
  const hasUnit = valueInst.getBoolean('hasUnit');

  valueBlock =
    hasUnit && unit
      ? figma.code`<StatisticValue value={${val}} unit={${JSON.stringify(unit)}} />`
      : figma.code`<StatisticValue value={${val}} />`;
}

const fallbackTrend = figma.code`
  <StatisticTrend sentiment="positive">
    <StatisticMark><Icon icon="arrow_circle_up" /></StatisticMark>
    <StatisticTrendValue value="+234" />
    <StatisticTrendContext>since last reading</StatisticTrendContext>
  </StatisticTrend>
`;

const sizeProp = size !== 'default' ? ` size="${size}"` : '';
const alignProp = align !== 'start' ? ` align="${align}"` : '';
const unitProp =
  unitPosition !== 'inline' ? ` unitPosition="${unitPosition}"` : '';

export default {
  example: figma.code`
    <Statistic${sizeProp}${alignProp}${unitProp}>
      ${labelBlock}
      ${iconBlock}
      ${valueBlock}
      ${
        hasTrend
          ? trendInst?.type === 'INSTANCE'
            ? trendInst.executeTemplate().example
            : fallbackTrend
          : figma.code``
      }
    </Statistic>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Statistic, StatisticIcon, StatisticLabel, StatisticMark, StatisticTrend, StatisticTrendContext, StatisticTrendValue, StatisticValue } from "@/components/ui/statistic"',
  ],
  id: 'statistic',
  metadata: { nestable: true },
};
