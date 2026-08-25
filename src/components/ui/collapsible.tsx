'use client';

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import * as React from 'react';

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  asChild = false,
  children,
  ...props
}: CollapsiblePrimitive.Trigger.Props & { asChild?: boolean }) {
  const child = asChild && React.isValidElement(children) ? children : null;

  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      suppressHydrationWarning
      nativeButton={!child}
      render={child ?? undefined}
      {...props}>
      {child ? null : children}
    </CollapsiblePrimitive.Trigger>
  );
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      suppressHydrationWarning
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
