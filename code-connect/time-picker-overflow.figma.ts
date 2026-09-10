// url=<QBDS_TIME_PICKER>
// source=src/components/ui/time-picker.tsx
// component=TimePickerListContent
import figma from 'figma';

const instance = figma.selectedInstance;

type Size = 'default' | 'lg';

const size = (instance.getEnum('size', {
  'regular+small': 'default',
  large: 'lg',
  reg: 'default',
  sm: 'default',
  lg: 'lg',
}) ?? 'default') as Size;

const sizeProp = size === 'default' ? '' : ` size="${size}"`;

export default {
  example: figma.code`
    <TimePickerListContent${sizeProp}>
      <TimePickerList${sizeProp}>
        <TimePickerItem value="0"${sizeProp}>00</TimePickerItem>
        <TimePickerItem value="1"${sizeProp}>01</TimePickerItem>
        <TimePickerItem value="2"${sizeProp}>02</TimePickerItem>
      </TimePickerList>
      <TimePickerList${sizeProp}>
        <TimePickerItem value="0"${sizeProp}>00</TimePickerItem>
        <TimePickerItem value="5"${sizeProp}>05</TimePickerItem>
        <TimePickerItem value="10"${sizeProp}>10</TimePickerItem>
      </TimePickerList>
    </TimePickerListContent>
  `,
  imports: [
    'import { TimePickerItem, TimePickerList, TimePickerListContent } from "@/components/ui/time-picker"',
  ],
  id: 'time-picker-overflow',
  metadata: { nestable: true },
};
