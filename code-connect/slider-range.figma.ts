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
  // gap-6 = Figma 16px label gap + 8px; absolute thumbs sit above the track box and eat into gap-4
  example: figma.code`
    <div className="flex w-full max-w-60 flex-col gap-6">
      ${
        showLabel
          ? figma.code`
        <div className="flex items-center justify-between">
          <Label htmlFor="slider">Label entry</Label>
          <span className="text-fg-primary label-regular-primary">${markLeftEntry} — ${markRightEntry}</span>
        </div>
      `
          : ''
      }
      <Slider
        ${showLabel ? 'id="slider"' : ''}
        defaultValue={[${defaultLeft}, ${defaultRight}]}
        max={100}
        step={1}
        showStepLabels
      />
    </div>
  `,
  imports: [
    ...(showLabel ? ['import { Label } from "@/components/ui/label"'] : []),
    'import { Slider } from "@/components/ui/slider"',
  ],
  id: 'slider-range',
  metadata: { nestable: true },
};
