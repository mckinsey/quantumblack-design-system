import figma from '@figma/code-connect/react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// `.base/Tab` (a single tab) → TabsTrigger.
// Figma `size` reg/lg/xlg → code sm/default/lg: reg→default, lg→lg, xlg→lg
// (code TabSize has no xl, so xlg falls back to the nearest `lg`).
figma.connect(TabsTrigger, '<QBDS_TABS>', {
  props: {
    size: figma.enum('size', {
      reg: 'default',
      lg: 'lg',
      xlg: 'lg',
    }),
    disabled: figma.enum('state', {
      enabled: false,
      hover: false,
      focused: false,
      active: false,
      disabled: true,
    }),
    label: figma.string('tabEntry'),
    icon: figma.boolean('showLeadingIcon', {
      true: figma.children('Icon/Leading/*'),
      false: undefined,
    }),
  },
  example: ({ size, disabled, label, icon }) => (
    <TabsTrigger disabled={disabled} size={size} value="tab">
      {icon}
      {label}
    </TabsTrigger>
  ),
});

// `Tab-Group` (the tab list) → Tabs + TabsList. The child `.base/Tab` instances
// are rendered via figma.children so they flow through the TabsTrigger connect
// above. `align` (left/center) has no code prop, so it is intentionally omitted.
figma.connect(Tabs, '<QBDS_TABS_GROUP>', {
  props: {
    size: figma.enum('size', {
      reg: 'default',
      lg: 'lg',
      xlg: 'lg',
    }),
    padded: figma.enum('padding', {
      true: true,
      false: false,
    }),
    tabs: figma.children('*'),
  },
  example: ({ size, padded, tabs }) => (
    <Tabs defaultValue="tab-1" padded={padded} size={size}>
      <TabsList>{tabs}</TabsList>
    </Tabs>
  ),
});
