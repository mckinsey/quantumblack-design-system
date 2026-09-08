// url=<QBDS_CALENDAR_SINGLE>
// source=src/components/ui/calendar.tsx
// component=Calendar
import figma from 'figma';

const instance = figma.selectedInstance;

const size =
  instance.getEnum('size', {
    sm: 'default',
    lg: 'lg',
  }) ?? 'default';

export default {
  example: figma.code`
    <Calendar mode="single" size="${size}" />
  `,
  imports: ['import { Calendar } from "@/components/ui/calendar"'],
  id: 'calendar-single',
};
