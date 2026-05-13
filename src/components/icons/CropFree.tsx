import * as React from 'react';

import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  readonly className?: string;
}

export function CropFree({ className, ...props }: Readonly<IconProps>) {
  return (
    <svg
      className={cn('', className)}
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      {...props}>
      <path d="M120-120v-232h60v172h172v60H120Zm488 0v-60h172v-172h60v232H608ZM120-608v-232h232v60H180v172h-60Zm660 0v-172H608v-60h232v232h-60Z" />
    </svg>
  );
}
