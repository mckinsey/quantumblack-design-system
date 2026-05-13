import * as React from 'react';

import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  readonly className?: string;
}

export function PageInfo({ className, ...props }: Readonly<IconProps>) {
  return (
    <svg
      className={cn('', className)}
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      {...props}>
      <path d="M710-140q-63 0-106.5-43.5T560-290q0-63 43.5-106.5T710-440q63 0 106.5 43.5T860-290q0 63-43.5 106.5T710-140Zm0-60q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Zm-590-60v-60h360v60H120Zm130-260q-63 0-106.5-43.5T100-670q0-63 43.5-106.5T250-820q63 0 106.5 43.5T400-670q0 63-43.5 106.5T250-520Zm0-60q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Zm230-60v-60h360v60H480Zm230 350ZM250-670Z" />
    </svg>
  );
}
