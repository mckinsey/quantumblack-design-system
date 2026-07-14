// url=<QBDS_SLIDER_SINGLE_VALUE>
// source=src/components/ui/slider.tsx
// component=Slider
import figma from 'figma';

const instance = figma.selectedInstance;

const inlineInput = instance.getEnum('inline-input', {
  true: true,
  false: false,
});

const showLabel = instance.getBoolean('showLabel');
const showValue = instance.getBoolean('showValue');
const markActiveEntry = instance.getString('markActiveEntry');

const showLeading = instance.getBoolean('showLeadingIcon');
const leading = showLeading ? instance.findInstance('Leading-Icon') : null;
let leadingCode: figma.ResultSection[] = [];

if (leading && leading.type === 'INSTANCE') {
  leadingCode = leading.executeTemplate().example;
}

const showTrailing = instance.getBoolean('showTrailingIcon');
const trailing = showTrailing ? instance.findInstance('Trailing-Icon') : null;
let trailingCode: figma.ResultSection[] = [];

if (trailing && trailing.type === 'INSTANCE') {
  trailingCode = trailing.executeTemplate().example;
}

const sliderValue = Number.parseInt(markActiveEntry, 10);
const defaultValue = Number.isNaN(sliderValue) ? 50 : sliderValue;

export default {
  example: figma.code`
    <div className="flex w-full max-w-sm flex-col gap-2">
      ${
        showLabel
          ? figma.code`
        <div className="flex items-center justify-between">
          <span className="text-fg-primary text-sm">Label entry</span>
          ${showValue && !inlineInput ? figma.code`<span className="text-fg-primary text-sm">${markActiveEntry}</span>` : ''}
        </div>
      `
          : ''
      }
      <div className="flex items-center gap-2">
        ${leadingCode}
        <Slider
          defaultValue={[${defaultValue}]}
          max={100}
          step={1}
          className="flex-1"
          showStepLabels={false}
        />
        ${trailingCode}
        ${
          inlineInput && showValue
            ? figma.code`
          <Input
            variant="inline"
            size="sm"
            className="w-10 shrink-0 text-center"
            defaultValue="${markActiveEntry}"
          />
        `
            : ''
        }
      </div>
    </div>
  `,
  imports: [
    'import { Slider } from "@/components/ui/slider"',
    'import { Input } from "@/components/ui/input"',
  ],
  id: 'slider-single-value',
  metadata: { nestable: true },
};
