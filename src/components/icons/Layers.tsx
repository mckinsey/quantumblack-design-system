import * as React from 'react';

import { cn } from '../../lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  readonly className?: string;
}

export function Layers({ className, ...props }: Readonly<IconProps>) {
  return (
    <svg
      className={cn('', className)}
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      {...props}>
      <path d="M480-130 120-410l50-37 310 241 310-241 50 37-360 280Zm0-152L120-562l360-280 360 280-360 280Zm0-301Zm0 225 262-204-262-204-262 204 262 204Z" />
    </svg>
  );
}
