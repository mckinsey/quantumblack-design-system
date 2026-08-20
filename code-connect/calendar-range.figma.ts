// url=<QBDS_CALENDAR_RANGE>
// source=src/components/ui/calendar.tsx
// component=Calendar
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  sm: 'default',
  lg: 'lg',
});

export default {
  example: figma.code`
    <Calendar mode="range" size="${size}" numberOfMonths={2} />
  `,
  imports: ['import { Calendar } from "@/components/ui/calendar"'],
  id: 'calendar-range',
};
