// url=<QBDS_STAT_LABEL>
// source=src/components/ui/statistic.tsx
// component=StatLabel
import figma from 'figma';

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
}) ?? 'default') as 'sm' | 'default' | 'lg';

const align = (instance.getEnum('align', {
  left: 'start',
  right: 'end',
}) ?? 'start') as 'start' | 'end';

const disabled =
  instance.getEnum('state', {
    enabled: 'enabled',
    disabled: 'disabled',
  }) === 'disabled';

const hasTrailing = instance.getBoolean('hasTrailing') ?? false;
const label = JSON.stringify(instance.getString('labelField') ?? 'Stat label');

const trailingSlot = instance.getSlot('trailingSlot');
const trailingConnected = trailingSlot?.connectedInstances ?? [];
const trailingChildren =
  trailingConnected.length > 0
    ? trailingConnected.map(n => n.executeTemplate().example).flat()
    : figma.code`
        <IconShell size="sm" type="neutral" variant="secondary">
          <Icon icon="info" />
        </IconShell>
      `;

const sizeProp = size === 'default' ? '' : ` size="${size}"`;
const alignProp = align === 'start' ? '' : ` align="${align}"`;
const disabledProp = disabled ? ' disabled' : '';
const trailingProp = hasTrailing ? ` trailing={${trailingChildren}}` : '';

export default {
  example: figma.code`
    <StatLabel${sizeProp}${alignProp}${disabledProp}${trailingProp}>{${label}}</StatLabel>
  `,
  imports: [
    'import { Icon } from "@/components/ui/icon"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { StatLabel } from "@/components/ui/statistic"',
  ],
  id: 'stat-label',
  metadata: { nestable: true },
};
