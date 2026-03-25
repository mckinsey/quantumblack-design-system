'use client';

import { useMemo } from 'react';

import { demos } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import type { Component } from '@/lib/registry';

export function PreviewContent({ component }: { component: Component }) {
  const demo = useMemo(() => demos[component.name], [component.name]);

  if (!demo || !demo.components) {
    return (
      <div className="text-fg-secondary p-8 text-center">
        No preview available for this component.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 p-10">
      {Object.entries(demo.components).map(([key, node]) => {
        return (
          <div className="relative mb-4 w-full" key={key}>
            <Renderer>{node}</Renderer>
          </div>
        );
      })}
    </div>
  );
}
