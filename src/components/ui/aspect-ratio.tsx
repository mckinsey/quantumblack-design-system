'use client';

import type * as React from 'react';

import { cn } from '@/lib/utils';

function AspectRatio({
  ratio,
  className,
  style,
  ...props
}: React.ComponentProps<'div'> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      className={cn(className)}
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    />
  );
}

export { AspectRatio };
