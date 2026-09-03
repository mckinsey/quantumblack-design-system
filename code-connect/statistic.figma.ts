// url=<QBDS_STATISTIC>
// source=src/components/ui/statistic.tsx
// component=Statistic
import figma from 'figma';

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  xsm: 'xsm',
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
  xl: 'xl',
}) ?? 'default') as 'xsm' | 'sm' | 'default' | 'lg' | 'xl';

const align = (instance.getEnum('align', {
  start: 'start',
  end: 'end',
}) ?? 'start') as 'start' | 'end';

const unitPosition = (instance.getEnum('unitPosition', {
  inline: 'inline',
  stacked: 'stacked',
}) ?? 'inline') as 'inline' | 'stacked';

const hasLabel = instance.getBoolean('hasLabel') ?? true;
const hasTrend = instance.getBoolean('hasTrend') ?? true;

const label = JSON.stringify(instance.getString('labelField') ?? 'Stat label');
const value = JSON.stringify(instance.getString('value') ?? '99.43');
const unit = JSON.stringify(instance.getString('unit') ?? 'MWh');

const statIconSlot = instance.getSlot('statIcon');
const statIconConnected = statIconSlot?.connectedInstances ?? [];
const statIconChildren =
  statIconConnected.length > 0
    ? statIconConnected.map(n => n.executeTemplate().example).flat()
    : figma.code`
        <IconShell size="sm" type="neutral" variant="secondary">
          <Icon icon="info" />
        </IconShell>
      `;

const labelBlock = hasLabel
  ? figma.code`
      <StatLabel trailing={${statIconChildren}}>{${label}}</StatLabel>
    `
  : figma.code``;

const trendBlock = hasTrend
  ? figma.code`
      <StatTrendRow
        sentiment="positive"
        direction="up"
        value="+234"
        percentage="(+23.42%)"
        context="since last reading"
      />
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
      <StatValue unit={${unit}}>{${value}}</StatValue>
      ${trendBlock}
    </Statistic>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { StatLabel, Statistic, StatTrendRow, StatValue } from "@/components/ui/statistic"',
  ],
  id: 'statistic',
  metadata: { nestable: true },
};
