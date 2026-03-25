import { cn } from '@/lib/utils';

import QbLogoBlack from './qb-logo-black.svg';
import QbLogoWhite from './qb-logo-white.svg';

export function RegistryLogo({ className }: { className?: string }) {
  return (
    <span className={cn('h-8 w-8 flex-shrink-0 rounded-md', className)}>
      {/* Show black logo on light mode, white logo on dark mode */}
      <img
        src={QbLogoBlack}
        alt="qb logo"
        height={24}
        className="block h-full w-full dark:hidden"
      />
      <img
        src={QbLogoWhite}
        alt="qb logo"
        width={24}
        height={24}
        className="hidden h-full w-full dark:block"
      />
    </span>
  );
}
