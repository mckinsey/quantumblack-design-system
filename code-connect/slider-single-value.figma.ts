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
const showTrailing = instance.getBoolean('showTrailingIcon');

const shells = instance.findConnectedInstances(
  n => n.type === 'INSTANCE' && n.codeConnectId() === 'icon-shell',
  { traverseInstances: true },
);

let leadingCode: figma.ResultSection[] = [];
let trailingCode: figma.ResultSection[] = [];

if (showLeading && shells[0]?.type === 'INSTANCE') {
  leadingCode = shells[0].executeTemplate().example;
}

if (showTrailing && shells[1]?.type === 'INSTANCE') {
  trailingCode = shells[1].executeTemplate().example;
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
