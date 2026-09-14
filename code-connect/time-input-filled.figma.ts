// url=<QBDS_TIME_FILLED>
// source=src/components/ui/time-input.tsx
// component=TimeInput
import figma from 'figma';

const instance = figma.selectedInstance;

type Size = 'sm' | 'default' | 'lg';

const size = (instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
}) ?? 'default') as Size;

const state =
  instance.getEnum('state', {
    enabled: 'enabled',
    hover: 'hover',
    focus: 'focus',
    active: 'active',
    open: 'open',
    filled: 'filled',
    disabled: 'disabled',
    error: 'error',
    warning: 'warning',
    success: 'success',
  }) ?? 'enabled';

const showHintText = instance.getBoolean('hasHintText');
const showFeedback = instance.getBoolean('hasFeedbackMessage');

const hhPh = JSON.stringify(String(instance.getString('hh') ?? 'hh'));
const mmPh = JSON.stringify(String(instance.getString('mm') ?? 'mm'));
const hhFilled = String(instance.getString('hhFilled') ?? '01');
const mmFilled = String(instance.getString('mmFilled') ?? '10');
const hhActive = String(instance.getString('hhActive') ?? 'hh');
const mmActive = String(instance.getString('mmActive') ?? 'mm');

const disabled = state === 'disabled';
const invalid = state === 'error';
const isOpen = state === 'open';
const isLive = state === 'active' || state === 'focus' || isOpen;
const hasFilledValue =
  state === 'filled' ||
  state === 'error' ||
  state === 'warning' ||
  state === 'success' ||
  state === 'disabled';

const parseSeg = (raw: string): number | null => {
  const n = Number.parseInt(raw.replace(/\|/g, ''), 10);
  return Number.isNaN(n) ? null : n;
};

const hour = isLive
  ? parseSeg(hhActive)
  : hasFilledValue
    ? parseSeg(hhFilled)
    : null;
const minute = isLive
  ? parseSeg(mmActive)
  : hasFilledValue
    ? parseSeg(mmFilled)
    : null;

const validationProp =
  state === 'error'
    ? ' validationState="error"'
    : state === 'warning'
      ? ' validationState="warning"'
      : state === 'success'
        ? ' validationState="success"'
        : '';

const sizeProp = size === 'default' ? '' : ` size="${size}"`;
const disabledProp = disabled ? ' disabled' : '';
const openProp = isOpen ? ' data-open={true}' : '';
const hourProp = hour === null ? '' : ` hour={${hour}}`;
const minuteProp = minute === null ? '' : ` minute={${minute}}`;
const phHourProp =
  showHintText || hour === null ? ` placeholderHour={${hhPh}}` : '';
const phMinuteProp =
  showHintText || minute === null ? ` placeholderMinute={${mmPh}}` : '';

const helpInst = instance.findInstance('Elements/Help-Text', {
  traverseInstances: true,
});
const statusInst = instance.findInstance('Elements/Status-Messages', {
  traverseInstances: true,
});

const helperText =
  helpInst?.type === 'INSTANCE'
    ? JSON.stringify(helpInst.getString('helperText') || 'Helper text')
    : null;
const statusMessage =
  statusInst?.type === 'INSTANCE'
    ? JSON.stringify(
        statusInst.getString('statusMessage') || 'This field is required',
      )
    : null;

const showErrorFooter = Boolean(invalid && showFeedback && statusMessage);
const showHintFooter = Boolean(
  !invalid && showHintText && helperText && !showErrorFooter,
);

const overflow = instance.findInstance('Overflow-TimePicker', {
  traverseInstances: true,
});

let overflowCode: figma.ResultSection[] = [];

if (
  isOpen &&
  overflow?.type === 'INSTANCE' &&
  overflow.hasCodeConnect()
) {
  overflowCode = overflow.executeTemplate().example;
}

const timeInput = figma.code`<TimeInput${sizeProp}${disabledProp}${validationProp}${openProp}${hourProp}${minuteProp}${phHourProp}${phMinuteProp} className="w-fit" />`;

const fieldBody =
  isOpen && overflowCode.length > 0
    ? figma.code`
  <Popover open>
    <PopoverAnchor className="w-fit">
      ${timeInput}
    </PopoverAnchor>
    ${figma.helpers.react.renderChildren(overflowCode)}
  </Popover>
`
    : timeInput;

const footer = showErrorFooter
  ? figma.code`<FieldError>${statusMessage}</FieldError>`
  : showHintFooter
    ? figma.code`<FieldDescription>${helperText}</FieldDescription>`
    : figma.code``;

const hasFooter = showErrorFooter || showHintFooter;

const example = hasFooter
  ? figma.code`<FieldSet className="gap-2">${fieldBody}${footer}</FieldSet>`
  : fieldBody;

const fieldImports = showErrorFooter
  ? ['import { FieldError, FieldSet } from "@/components/ui/field"']
  : showHintFooter
    ? ['import { FieldDescription, FieldSet } from "@/components/ui/field"']
    : [];

const openImports =
  isOpen && overflowCode.length > 0
    ? [
        'import { Popover, PopoverAnchor } from "@/components/ui/popover"',
        'import { TimePickerItem, TimePickerList, TimePickerListContent } from "@/components/ui/time-picker"',
      ]
    : [];

export default {
  example,
  imports: [
    'import { TimeInput } from "@/components/ui/time-input"',
    ...openImports,
    ...fieldImports,
  ],
  id: 'time-input-filled',
  metadata: { nestable: true },
};
