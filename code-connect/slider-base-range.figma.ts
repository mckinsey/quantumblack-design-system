// url=<QBDS_SLIDER_BASE_RANGE>
// source=src/components/ui/slider.tsx
// component=Slider
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('type', {
  default: 'default',
  'marks-off': 'marks-off',
  'styled-marks': 'styled-marks',
});

const showStepMarkers = type === 'styled-marks';
const showStepLabels = type !== 'marks-off';

export default {
  example: figma.code`
    <Slider
      defaultValue={[21, 78]}
      max={100}
      step={1}
      ${showStepMarkers ? 'showStepMarkers' : ''}
      ${showStepLabels ? 'showStepLabels' : 'showStepLabels={false}'}
    />
  `,
  imports: ['import { Slider } from "@/components/ui/slider"'],
  id: 'slider-base-range',
  metadata: { nestable: true },
};
