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

const state = instance.getEnum('state', {
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

const hour =
  isLive ? parseSeg(hhActive) : hasFilledValue ? parseSeg(hhFilled) : null;
const minute =
  isLive ? parseSeg(mmActive) : hasFilledValue ? parseSeg(mmFilled) : null;

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
const phHourProp = showHintText || hour === null ? ` placeholderHour={${hhPh}}` : '';
const phMinuteProp =
  showHintText || minute === null ? ` placeholderMinute={${mmPh}}` : '';

const pickerSize = size === 'lg' ? 'lg' : 'default';

const overflow = instance.findInstance('Overflow-TimePicker', {
  traverseInstances: true,
});

let overflowCode: figma.ResultSection[] = [];

if (isOpen && overflow && overflow.type === 'INSTANCE') {
  overflowCode = overflow.executeTemplate().example;
}

const timeInput = figma.code`<TimeInput${sizeProp}${disabledProp}${validationProp}${openProp}${hourProp}${minuteProp}${phHourProp}${phMinuteProp} className="w-fit" />`;

const fieldBody =
  isOpen && overflowCode.length > 0
    ? figma.code`
  <Popover open>
    ${timeInput}
    ${figma.helpers.react.renderChildren(overflowCode)}
  </Popover>
`
    : isOpen
      ? figma.code`
  <Popover open>
    ${timeInput}
    <TimePickerListContent size="${pickerSize}">
      <TimePickerList size="${pickerSize}">
        <TimePickerItem value="0" size="${pickerSize}">00</TimePickerItem>
        <TimePickerItem value="1" size="${pickerSize}">01</TimePickerItem>
      </TimePickerList>
      <TimePickerList size="${pickerSize}">
        <TimePickerItem value="0" size="${pickerSize}">00</TimePickerItem>
        <TimePickerItem value="5" size="${pickerSize}">05</TimePickerItem>
      </TimePickerList>
    </TimePickerListContent>
  </Popover>
`
      : timeInput;

const footer =
  invalid && showFeedback
    ? figma.code`<FieldError>Feedback message</FieldError>`
    : showHintText && !invalid
      ? figma.code`<FieldDescription>Helper text</FieldDescription>`
      : figma.code``;

const hasFooter = (invalid && showFeedback) || (showHintText && !invalid);

const example = hasFooter
  ? figma.code`<FieldSet className="gap-2">${fieldBody}${footer}</FieldSet>`
  : fieldBody;

const fieldImports =
  invalid && showFeedback
    ? ['import { FieldError, FieldSet } from "@/components/ui/field"']
    : showHintText && !invalid
      ? ['import { FieldDescription, FieldSet } from "@/components/ui/field"']
      : [];

const openImports = isOpen
  ? [
      'import { Popover } from "@/components/ui/popover"',
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
