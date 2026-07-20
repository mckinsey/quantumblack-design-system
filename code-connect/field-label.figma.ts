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
  left: 'left',
  right: 'right',
});

const isRequired = instance.getBoolean('isRequired');
const showInfoLeft = instance.getBoolean('showInfoLeft');
const showCounter = instance.getBoolean('showCounter');
const showMisc = instance.getBoolean('showMiscInfoSlot');
const label = instance.getString('labelField') || 'Field label';

let infoCode: figma.ResultSection[] = [];

if (showInfoLeft) {
  const info = instance.findInstance('Info-Icon');

  if (info?.type === 'INSTANCE') {
    infoCode = info.executeTemplate().example;
  }
}

const requiredMark = isRequired
  ? figma.code`
      <span className="text-error" aria-hidden>*</span>
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
