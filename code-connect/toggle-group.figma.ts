// url=<QBDS_TOGGLE_GROUP>
// source=src/components/ui/toggle-group.tsx
// component=ToggleGroup
//
// SegmentedControls slot uses Button instances (toggle-on = selected segment). Do not
// renderChildren(segments) — that runs button-text/toggle-text and emits loose Toggle/Button
// nodes. Map each slot instance to ToggleGroupItem instead.
import figma from 'figma';

const instance = figma.selectedInstance;

const type =
  instance.getEnum('type', {
    'secondary-filled': 'secondary',
    ghost: 'ghost',
  }) ?? 'secondary';

const size =
  instance.getEnum('size', {
    reg: 'default',
    sm: 'sm',
    xsm: 'xs',
    xxs: 'xxs',
  }) ?? 'default';

function segmentValue(label: string, index: number) {
  const trimmed = label.trim();

  if (trimmed && trimmed !== 'Button') {
    return trimmed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  return `option-${index + 1}`;
}

function segmentBody(node: figma.InstanceHandle) {
  const label = String(node.getString('label') ?? 'Button');
  const lit = JSON.stringify(label);

  const showLeading = node.getBoolean('hasLeadingIcon');
  const leading = showLeading ? node.findInstance('Leading-Icon') : null;
  let leadingCode: figma.ResultSection[] = [];

  if (leading && leading.type === 'INSTANCE') {
    leadingCode = leading.executeTemplate().example;
  }

  const showTrailing = node.getBoolean('hasTrailingIcon');
  const trailing = showTrailing ? node.findInstance('Trailing-Icon') : null;
  let trailingCode: figma.ResultSection[] = [];

  if (trailing && trailing.type === 'INSTANCE') {
    trailingCode = trailing.executeTemplate().example;
  }

  return { lit, leadingCode, trailingCode };
}

const slot = instance.getSlot('segmentedButtonSlot');
const connected = slot?.connectedInstances ?? [];

const segmentNodes = connected.filter(
  (node): node is figma.InstanceHandle => node.type === 'INSTANCE',
);

const segmentItems =
  segmentNodes.length > 0
    ? segmentNodes
        .map((node, index) => {
          const valueKey = segmentValue(
            String(node.getString('label') ?? ''),
            index,
          );
          const state =
            node.getEnum('state', {
              enabled: 'enabled',
              hover: 'enabled',
              focused: 'enabled',
              pressed: 'enabled',
              disabled: 'disabled',
              loading: 'enabled',
              'dropdown-open': 'enabled',
              'toggle-on': 'toggle-on',
            }) ?? 'enabled';
          const disabled = state === 'disabled';
          const { lit, leadingCode, trailingCode } = segmentBody(node);

          return figma.code`
      <ToggleGroupItem value="${valueKey}"${disabled ? ' disabled' : ''}>
        ${leadingCode}
        {${lit}}
        ${trailingCode}
      </ToggleGroupItem>
    `;
        })
        .flat()
    : [
        figma.code`
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    `,
      ];

const selectedValue = segmentNodes
  .map((node, index) => {
    const state =
      node.getEnum('state', {
        enabled: 'enabled',
        hover: 'enabled',
        focused: 'enabled',
        pressed: 'enabled',
        disabled: 'disabled',
        loading: 'enabled',
        'dropdown-open': 'enabled',
        'toggle-on': 'toggle-on',
      }) ?? 'enabled';

    if (state !== 'toggle-on') {
      return null;
    }

    return segmentValue(String(node.getString('label') ?? ''), index);
  })
  .find((value): value is string => Boolean(value));

const defaultValueAttr = selectedValue
  ? `defaultValue={[${JSON.stringify(selectedValue)}]}`
  : segmentNodes.length === 0
    ? `defaultValue={['week']}`
    : '';

const hasIcons = segmentNodes.some(node => {
  return (
    node.getBoolean('hasLeadingIcon') || node.getBoolean('hasTrailingIcon')
  );
});

export default {
  example: figma.code`
    <ToggleGroup
      variant="${type}"
      size="${size}"
      ${defaultValueAttr}
      aria-label="Options">
      ${segmentItems}
    </ToggleGroup>
  `,
  imports: hasIcons
    ? [
        'import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"',
        'import { Icon } from "@/components/ui/icon"',
        'import { IconShell } from "@/components/ui/icon-shell"',
      ]
    : [
        'import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"',
      ],
  id: 'toggle-group',
  metadata: { nestable: false },
};
