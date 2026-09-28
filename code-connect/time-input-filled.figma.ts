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
const hhFilled = String(instance.getString('hhFilled') ?? '');
const mmFilled = String(instance.getString('mmFilled') ?? '');
const hhActive = String(instance.getString('hhActive') ?? '');
const mmActive = String(instance.getString('mmActive') ?? '');

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

const statusClass =
  state === 'warning'
    ? 'border border-stroke-status-warning'
    : state === 'success'
      ? 'border border-stroke-status-success'
      : '';

const pickerSize = size === 'lg' ? 'lg' : 'default';
const sizeProp = size === 'default' ? '' : ` size="${size}"`;
const pickerSizeProp = pickerSize === 'default' ? '' : ` size="${pickerSize}"`;
const disabledProp = disabled ? ' disabled' : '';
const invalidProp = invalid ? ' aria-invalid' : '';
const classProp = statusClass
  ? ` className="w-fit ${statusClass}"`
  : ' className="w-fit"';
const openProp = isOpen ? ' open' : '';
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

if (overflow?.type === 'INSTANCE' && overflow.hasCodeConnect()) {
  overflowCode = overflow.executeTemplate().example;
}

const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));

const hourItems = Array.from(
  { length: 24 },
  (_, i) =>
    figma.code`<TimePickerItem value="${String(i)}"${pickerSizeProp}>${pad2(i)}</TimePickerItem>`,
) as unknown as figma.ResultSection[];

const minuteItems = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
  i =>
    figma.code`<TimePickerItem value="${String(i)}"${pickerSizeProp}>${pad2(i)}</TimePickerItem>`,
) as unknown as figma.ResultSection[];

const overflowFallback = figma.code`
  <TimePickerListContent${pickerSizeProp} finalFocus={false}>
    <ScrollArea className="h-full w-fit">
      <TimePickerList${pickerSizeProp} aria-label="Hours">
        ${figma.helpers.react.renderChildren(hourItems)}
      </TimePickerList>
      <ScrollBar />
    </ScrollArea>
    <ScrollArea className="h-full w-fit">
      <TimePickerList${pickerSizeProp} aria-label="Minutes">
        ${figma.helpers.react.renderChildren(minuteItems)}
      </TimePickerList>
      <ScrollBar />
    </ScrollArea>
  </TimePickerListContent>
`;

const timeInput = figma.code`<TimeInput${sizeProp}${disabledProp}${invalidProp}${openProp}${hourProp}${minuteProp}${phHourProp}${phMinuteProp}${classProp} />`;

const overflowContent =
  overflowCode.length > 0
    ? figma.helpers.react.renderChildren(overflowCode)
    : overflow?.type === 'INSTANCE'
      ? overflowFallback
      : null;

const fieldBody =
  isOpen && overflowContent
    ? figma.code`
  <Popover open>
    <PopoverAnchor className="w-fit">
      ${timeInput}
    </PopoverAnchor>
    ${overflowContent}
  </Popover>
`
    : timeInput;

const footer = showErrorFooter
  ? figma.code`<FieldError size="${size}">{${statusMessage}}</FieldError>`
  : showHintFooter
    ? figma.code`<FieldDescription size="${size}">{${helperText}}</FieldDescription>`
    : figma.code``;

const hasFooter = showErrorFooter || showHintFooter;

const example = hasFooter
  ? figma.code`<FieldSet className="gap-2">${fieldBody}${footer}</FieldSet>`
  : fieldBody;

const openImports =
  isOpen && overflowContent
    ? [
        'import { Popover, PopoverAnchor } from "@/components/ui/popover"',
        'import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"',
        'import { TimePickerItem, TimePickerList, TimePickerListContent } from "@/components/ui/time-picker"',
      ]
    : [];

const fieldImports = showErrorFooter
  ? ['import { FieldError, FieldSet } from "@/components/ui/field"']
  : showHintFooter
    ? ['import { FieldDescription, FieldSet } from "@/components/ui/field"']
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
