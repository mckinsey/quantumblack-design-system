// url=<QBDS_DATE_RANGE_FILLED>
// source=src/components/ui/date-input.tsx
// component=DateInput
import figma from 'figma';

const instance = figma.selectedInstance;

const size = (instance.getEnum('size', {
  sm: 'sm',
  reg: 'default',
  lg: 'lg',
}) ?? 'default') as 'sm' | 'default' | 'lg';

const state = instance.getEnum('state', {
  enabled: 'enabled',
  hover: 'hover',
  focus: 'focus',
  active: 'active',
  'open-start': 'open-start',
  'open-range': 'open-range',
  filled: 'filled',
  error: 'error',
  warning: 'warning',
  success: 'success',
  disabled: 'disabled',
});

const showFeedback = instance.getBoolean('hasFeedbackMessage');

const disabled = state === 'disabled';
const invalid = state === 'error';
const open = state === 'open-start' || state === 'open-range';
const hasFilled =
  state === 'filled' ||
  state === 'error' ||
  state === 'warning' ||
  state === 'success' ||
  state === 'disabled' ||
  state === 'active' ||
  open;

const statusClass =
  state === 'warning'
    ? 'border-stroke-status-warning'
    : state === 'success'
      ? 'border-stroke-status-success'
      : '';

const sizeProp = size === 'default' ? '' : ` size="${size}"`;
const valueProp = hasFilled ? ' value="2025-04-01"' : '';
const endValueProp =
  hasFilled && state !== 'open-start' ? ' endValue="2025-04-16"' : '';
const classProp = statusClass ? ` className="${statusClass}"` : '';
const openProp = open ? ' open' : '';

const statusInst = instance.findInstance('Elements/Status-Messages', {
  traverseInstances: true,
});

const statusMessage =
  statusInst?.type === 'INSTANCE'
    ? JSON.stringify(
        statusInst.getString('statusMessage') ?? 'Feedback message',
      )
    : null;

const showErrorFooter = Boolean(invalid && showFeedback && statusMessage);

const footer = showErrorFooter
  ? figma.code`<FieldError>{${statusMessage}}</FieldError>`
  : figma.code``;

const hasFooter = showErrorFooter;

const calendarInst = instance.findInstance(
  '.base/datePicker/DaySelectionRange',
  { traverseInstances: true },
);

const connectedCalendar =
  calendarInst?.type === 'INSTANCE' && calendarInst.hasCodeConnect()
    ? calendarInst.executeTemplate().example
    : null;

const calendarSize = size === 'lg' ? 'lg' : 'default';
const calendarFallback =
  calendarInst?.type === 'INSTANCE' && !connectedCalendar
    ? figma.code`
        <Calendar mode="range" size="${calendarSize}" numberOfMonths={2} />
      `
    : figma.code``;

const hasCalendar = calendarInst?.type === 'INSTANCE';

const dateInput = figma.code`
  <DateInput
    mode="range"
    ${sizeProp}
    ${disabled ? 'disabled' : ''}
    ${invalid ? 'aria-invalid' : ''}
    ${openProp}
    ${valueProp}
    ${endValueProp}
    ${classProp}
  />
`;

const body = hasCalendar
  ? figma.code`
      <Popover defaultOpen>
        ${dateInput}
        <PopoverContent
          className="w-auto overflow-hidden border-none p-0"
          align="start"
          sideOffset={4}>
          ${
            connectedCalendar
              ? figma.helpers.react.renderChildren(connectedCalendar)
              : calendarFallback
          }
        </PopoverContent>
      </Popover>
    `
  : dateInput;

const example = hasFooter
  ? figma.code`<FieldSet className="gap-2">${body}${footer}</FieldSet>`
  : body;

const baseImports = ['import { DateInput } from "@/components/ui/date-input"'];

const pickerImports = hasCalendar
  ? [
      ...(connectedCalendar
        ? []
        : ['import { Calendar } from "@/components/ui/calendar"']),
      ...baseImports,
      'import { Popover, PopoverContent } from "@/components/ui/popover"',
    ]
  : baseImports;

const imports = hasFooter
  ? [
      ...pickerImports,
      'import { FieldError, FieldSet } from "@/components/ui/field"',
    ]
  : pickerImports;

export default {
  example,
  imports,
  id: 'date-range-filled',
  metadata: { nestable: true },
};
