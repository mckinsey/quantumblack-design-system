// url=<QBDS_FIELD_LABEL>
// source=src/components/ui/field.tsx
// component=FieldTitle
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
});

const disabled = instance.getEnum('state', {
  enabled: false,
  disabled: true,
});

const align = instance.getEnum('align', {
  start: 'left',
  end: 'right',
});

const hasRequired = instance.getBoolean('hasRequired');
const showInfoLeft = instance.getBoolean('hasInfoLeft');
const showCounter = instance.getBoolean('hasCounter');
const showMisc = instance.getBoolean('hasMiscInfoSlot');
const label = instance.getString('label') || 'Field label';

let infoCode: figma.ResultSection[] = [];

if (showInfoLeft) {
  const info = instance.findInstance('Info-Icon');

  if (info?.type === 'INSTANCE') {
    infoCode = info.executeTemplate().example;
  }
}

const requiredMark = hasRequired
  ? figma.code`
      <span className="text-status-error" aria-hidden>*</span>
    `
  : figma.code``;

const counterCode = showCounter
  ? instance.getSlot('infoCounterSlot')
  : undefined;

const miscCode = showMisc ? instance.getSlot('infoMiscsSlot') : undefined;

const alignClass = align === 'right' ? ' flex-row-reverse' : '';

export default {
  example: figma.code`
    <FieldTitle size="${size}"${disabled ? ' disabled' : ''} className="w-full justify-between${alignClass}">
      <span className="flex items-center gap-1">
        ${label}
        ${requiredMark}
        ${infoCode}
        ${miscCode}
      </span>
      ${counterCode}
    </FieldTitle>
  `,
  imports: ['import { FieldTitle } from "@/components/ui/field"'],
  id: 'field-label',
  metadata: { nestable: true },
};
