// url=<QBDS_TIME_PICKER>
// source=src/components/ui/time-picker.tsx
// component=TimePickerListContent
import figma from 'figma';

const instance = figma.selectedInstance;

type Size = 'default' | 'lg';

const size = (instance.getEnum('size', {
  'reg-sm': 'default',
  'regular+small': 'default',
  large: 'lg',
  reg: 'default',
  sm: 'default',
  lg: 'lg',
}) ?? 'default') as Size;

const sizeProp = size === 'default' ? '' : ` size="${size}"`;

const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));

const hourItems = Array.from({ length: 24 }, (_, i) =>
  figma.code`<TimePickerItem value="${String(i)}"${sizeProp}>${pad2(i)}</TimePickerItem>`,
);

const minuteItems = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(i =>
  figma.code`<TimePickerItem value="${String(i)}"${sizeProp}>${pad2(i)}</TimePickerItem>`,
);

export default {
  example: figma.code`
    <TimePickerListContent${sizeProp}>
      <ScrollArea className="h-full w-fit">
        <TimePickerList${sizeProp} aria-label="Hours">
          ${figma.helpers.react.renderChildren(hourItems)}
        </TimePickerList>
        <ScrollBar />
      </ScrollArea>
      <ScrollArea className="h-full w-fit">
        <TimePickerList${sizeProp} aria-label="Minutes">
          ${figma.helpers.react.renderChildren(minuteItems)}
        </TimePickerList>
        <ScrollBar />
      </ScrollArea>
    </TimePickerListContent>
  `,
  imports: [
    'import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"',
    'import { TimePickerItem, TimePickerList, TimePickerListContent } from "@/components/ui/time-picker"',
  ],
  id: 'time-picker-overflow',
  metadata: { nestable: true },
};
