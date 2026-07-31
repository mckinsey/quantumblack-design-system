// url=<QBDS_SLIDER_BASE_ACTIVE_TRACK>
// source=src/components/ui/slider.tsx
// component=Slider
import figma from 'figma';

const instance = figma.selectedInstance;

const trackType = instance.getEnum('type', {
  'single-value': 'single',
  range: 'range',
});

const isRange = trackType === 'range';

export default {
  example: figma.code`
    <Slider
      defaultValue={[${isRange ? '25, 75' : '50'}]}
      max={100}
      step={1}
      showStepLabels={false}
    />
  `,
  imports: ['import { Slider } from "@/components/ui/slider"'],
  id: 'slider-base-active-track',
  metadata: { nestable: true },
};
