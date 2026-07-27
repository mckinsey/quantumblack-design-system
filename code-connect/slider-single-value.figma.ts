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

const showInlineInput = inlineInput && showValue;

export default {
  // gap-6 = Figma 16px label gap + 8px; absolute thumbs sit above the track box and eat into gap-4
  example: figma.code`
    <div className="flex w-full max-w-60 flex-col gap-6">
      ${
        showLabel
          ? figma.code`
        <div className="flex items-center justify-between">
          <Label htmlFor="slider">Label entry</Label>
          ${showValue && !inlineInput ? figma.code`<span className="text-fg-primary label-regular-primary">${markActiveEntry}</span>` : ''}
        </div>
      `
          : ''
      }
      <div className="flex items-center gap-2">
        ${leadingCode}
        <Slider
          ${showLabel ? 'id="slider"' : ''}
          defaultValue={[${defaultValue}]}
          max={100}
          step={1}
          className="flex-1"
          showStepLabels={false}
        />
        ${trailingCode}
        ${
          showInlineInput
            ? figma.code`
          <Input
            variant="inline"
            size="default"
            className="w-6 shrink-0 text-center"
            defaultValue="${markActiveEntry}"
          />
        `
            : ''
        }
      </div>
    </div>
  `,
  imports: [
    ...(showLabel ? ['import { Label } from "@/components/ui/label"'] : []),
    'import { Slider } from "@/components/ui/slider"',
    ...(showInlineInput
      ? ['import { Input } from "@/components/ui/input"']
      : []),
  ],
  id: 'slider-single-value',
  metadata: { nestable: true },
};
