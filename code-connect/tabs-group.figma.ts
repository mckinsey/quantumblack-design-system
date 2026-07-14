// url=<QBDS_TABS_GROUP>
// source=src/components/ui/tabs.tsx
// component=Tabs
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  reg: 'default',
  lg: 'lg',
  xlg: 'xl',
});

const padded = instance.getEnum('padding', {
  true: true,
  false: false,
});

const align = instance.getEnum('align', {
  left: 'left',
  center: 'center',
});

const listClass = align === 'center' ? 'justify-center' : '';
const tabs = figma.properties.children(['.base/Tab']);

export default {
  example: figma.code`
    <Tabs defaultValue="tab-1" size="${size}" padded={${padded}}>
      <TabsList${listClass ? ` className="${listClass}"` : ''}>
        ${figma.helpers.react.renderChildren(tabs)}
      </TabsList>
    </Tabs>
  `,
  imports: [
    'import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"',
    'import { IconShell } from "@/components/ui/icon-shell"',
    'import { Icon } from "@/components/ui/icon"',
  ],
  id: 'tabs-group',
  metadata: { nestable: false },
};
