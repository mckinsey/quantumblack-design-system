// url=<QBDS_SLIDER_RANGE>
// source=src/components/ui/slider.tsx
// component=Slider
import figma from 'figma';

const instance = figma.selectedInstance;

const showLabel = instance.getBoolean('showLabel');
const markLeftEntry = instance.getString('markLeftEntry');
const markRightEntry = instance.getString('markRightEntry');

const leftValue = Number.parseInt(markLeftEntry, 10);
const rightValue = Number.parseInt(markRightEntry, 10);
const defaultLeft = Number.isNaN(leftValue) ? 21 : leftValue;
const defaultRight = Number.isNaN(rightValue) ? 78 : rightValue;

export default {
  example: figma.code`
    <div className="flex w-full max-w-sm flex-col gap-2">
      ${
        showLabel
          ? figma.code`
        <div className="flex items-center justify-between">
          <span className="text-fg-primary text-sm">Label entry</span>
          <span className="text-fg-primary text-sm">${markLeftEntry} — ${markRightEntry}</span>
        </div>
      `
          : ''
      }
      <Slider
        defaultValue={[${defaultLeft}, ${defaultRight}]}
        max={100}
        step={1}
        showStepLabels
      />
    </div>
  `,
  imports: ['import { Slider } from "@/components/ui/slider"'],
  id: 'slider-range',
  metadata: { nestable: true },
};
