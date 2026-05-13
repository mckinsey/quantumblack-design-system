import * as React from 'react';

import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  readonly className?: string;
}

export function Description({ className, ...props }: Readonly<IconProps>) {
  return (
    <svg
      className={cn('', className)}
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      {...props}>
      <path d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM160-80v-800h421l219 219v581H160Zm391-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
    </svg>
  );
}
