import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const GITHUB_REPO_URL =
  'https://github.com/mckinsey/quantumblack-design-system';

/** GitHub mark — official path, scales cleanly at icon sizes. */
function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 98 96"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('block size-4 shrink-0', className)}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.66.339-3.587.339-3.587 4.909.346 7.517 5.074 7.517 5.074 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.067-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.114-13.193-.52-1.252 2.17-5.638-.5-11.786 0 0 4.17-1.189 13.66 5.052 3.976-.209 8.238-.314 12.465-.314 4.224 0 8.479.105 12.446.314 8.496-6.256 13.66-5.052 13.66-5.052 2.67 6.148.98 10.534.48 11.786 3.166 3.413 5.05 7.815 5.05 13.193 0 18.943-11.54 23.064-22.378 24.192 1.736 1.433 3.286 4.607 3.286 9.293 0 6.621-.06 11.98-.06 13.517 0 1.304.89 2.853 3.326 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      />
    </svg>
  );
}

export function GitHubLink({ className }: { className?: string }) {
  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View source on GitHub"
      className={cn(
        buttonVariants({ variant: 'outline', size: 'icon' }),
        'text-fg-primary',
        className,
      )}>
      <GitHubMark />
    </a>
  );
}
