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

const showSlot4 = instance.getBoolean('showSlot4');

const checkboxItems = showSlot4
  ? instance
      .findConnectedInstances(node => node.name === 'CheckboxGroup/Item', {
        traverseInstances: true,
      })
      .map(item => item.executeTemplate().example)
  : [];

const showFooter = instance.getBoolean('hasFooter');

const footerGroup = showFooter
  ? instance.findInstance('ButtonsGroup/CTAs', { traverseInstances: true })
  : null;

let footer: figma.ResultSection[] = [];

if (footerGroup && footerGroup.type === 'INSTANCE') {
  footer = footerGroup.executeTemplate().example;
}

export default {
  example: figma.code`
    {/* Outer shell widths/gaps are demo chrome (hardcoded). Adapt max-w / min-w / gap to your layout — Form is a composition recipe, not an exported component. */}
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
          ${checkboxItems.flat()}
        </div>
            `
            : ''
        }
      </form>
      ${footer}
    </div>
  `,
  imports: [],
  id: 'form',
  metadata: { nestable: false },
};
