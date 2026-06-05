import { cn } from '@/lib/utils';

const logoLight = `${import.meta.env.BASE_URL}assets/logos/qb-logo-black.svg`;
const logoDark = `${import.meta.env.BASE_URL}assets/logos/qb-logo-white.svg`;

export function RegistryLogo({ className }: { className?: string }) {
  return (
    <span className={cn('h-8 w-8 flex-shrink-0 rounded-md', className)}>
      {/* Show light-mode logo on light theme, dark-mode logo on dark theme */}
      <img
        src={logoLight}
        alt="qb logo"
        height={24}
        className="block h-full w-full dark:hidden"
      />
      <img
        src={logoDark}
        alt="qb logo"
        width={24}
        height={24}
        className="hidden h-full w-full dark:block"
      />
    </span>
  );
}
