// url=<QBDS_FORM>
// source=src/app/demo/[name]/ui/form-examples.tsx
// component=ReactHookForm
import figma from 'figma';

const instance = figma.selectedInstance;

const layout = (instance.getEnum('layout', {
  inline: 'inline',
  stacked: 'stacked',
}) ?? 'stacked') as 'inline' | 'stacked';

const title = instance.getString('Title');
const descriptor = instance.getString('Descriptor');

const headerTitle = instance.getBoolean('hasTitle', {
  true: figma.code`
    <h2 className="headings-h2-regular text-fg-primary">
      ${title}
    </h2>
  `,
  false: undefined,
});

const headerDescriptor = instance.getBoolean('hasDescriptor', {
  true: figma.code`
    <p className="paragraph-large-primary text-fg-secondary">
      ${descriptor}
    </p>
  `,
  false: undefined,
});

const header = instance.getBoolean('hasHeader', {
  true: figma.code`
    <div className="flex flex-col gap-4">
      ${headerTitle}
      ${headerDescriptor}
    </div>
  `,
  false: undefined,
});

const slot1Nodes = instance.getBoolean('showSlot1', {
  true: figma.properties.children(['InputGroup-Vertical']),
  false: undefined,
});

const slot2Nodes = instance.getBoolean('showSlot2', {
  true: figma.properties.children(['PickerGroup/Vertical']),
  false: undefined,
});

const slot3Nodes = instance.getBoolean('showSlot3', {
  true: figma.properties.children(['Textarea-Input']),
  false: undefined,
});

// CC template API: executeTemplate().example is ResultSection[], not a string —
// cannot .map().join(); index into vars (cap 3 = Form library slot, not a product rule).
// Treat this snippet as inspiration; build the real form from the Figma design.
const showSlot4 = instance.getBoolean('showSlot4');
const checkboxItems = showSlot4
  ? instance.findConnectedInstances(
      node => node.name === 'CheckboxGroup/Item',
      { traverseInstances: true },
    )
  : [];

let checkbox0: figma.ResultSection[] = [];
let checkbox1: figma.ResultSection[] = [];
let checkbox2: figma.ResultSection[] = [];

if (checkboxItems[0] && checkboxItems[0].type === 'INSTANCE') {
  checkbox0 = checkboxItems[0].executeTemplate().example;
}

if (checkboxItems[1] && checkboxItems[1].type === 'INSTANCE') {
  checkbox1 = checkboxItems[1].executeTemplate().example;
}

if (checkboxItems[2] && checkboxItems[2].type === 'INSTANCE') {
  checkbox2 = checkboxItems[2].executeTemplate().example;
}

const footer = instance.getBoolean('hasFooter', {
  true: figma.code`
    <ButtonGroup>
      <Button type="submit" form="form-demo">Submit</Button>
      <Button type="button" variant="outline">
        Cancel
      </Button>
    </ButtonGroup>
  `,
  false: undefined,
});

export default {
  example: figma.code`
    <div className="flex w-full max-w-[480px] min-w-[320px] flex-col gap-8 py-4">
      ${header}
      <form id="form-demo" data-layout="${layout}" className="flex w-full max-w-[420px] flex-col gap-8">
        ${
          slot1Nodes
            ? figma.code`
        <div className="flex flex-col gap-6">
          ${figma.helpers.react.renderChildren(slot1Nodes)}
        </div>
            `
            : ''
        }
        ${
          slot2Nodes
            ? figma.code`
        <div className="grid grid-cols-2 gap-6">
          ${figma.helpers.react.renderChildren(slot2Nodes)}
        </div>
            `
            : ''
        }
        ${slot3Nodes ? figma.helpers.react.renderChildren(slot3Nodes) : ''}
        ${
          showSlot4
            ? figma.code`
        <div className="flex flex-col gap-4">
          ${checkbox0}
          ${checkbox1}
          ${checkbox2}
        </div>
            `
            : ''
        }
      </form>
      ${footer}
    </div>
  `,
  imports: [
    'import { Button } from "@/components/ui/button"',
    'import { ButtonGroup } from "@/components/ui/button-group"',
    'import { Checkbox } from "@/components/ui/checkbox"',
    'import { Field, FieldDescription, FieldLabel, FieldSet, FieldTitle } from "@/components/ui/field"',
    'import { Input } from "@/components/ui/input"',
    'import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"',
    'import { Textarea } from "@/components/ui/textarea"',
  ],
  id: 'form',
  metadata: { nestable: false },
};
