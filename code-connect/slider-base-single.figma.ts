// url=<QBDS_SLIDER_BASE_SINGLE>
// source=src/components/ui/slider.tsx
// component=Slider
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('type', {
  default: 'default',
  'marks-and-steps': 'marks-and-steps',
  'marks-midpoint': 'marks-midpoint',
  'marks-off': 'marks-off',
  'styled-marks': 'styled-marks',
});

const showStepMarkers = type === 'marks-and-steps' || type === 'styled-marks';
const showStepLabels = type !== 'marks-off';

let step = 1;

if (type === 'marks-midpoint') {
  step = 50;
} else if (type === 'marks-and-steps' || type === 'styled-marks') {
  step = 25;
}

export default {
  example: figma.code`
    <Slider
      defaultValue={[50]}
      max={100}
      step={${step}}
      ${showStepMarkers ? 'showStepMarkers' : ''}
      ${showStepLabels ? 'showStepLabels' : 'showStepLabels={false}'}
    />
  `,
  imports: ['import { Slider } from "@/components/ui/slider"'],
  id: 'slider-base-single',
  metadata: { nestable: true },
};
