import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// All Text Style classes from globals.css registered as a single conflict group.
// This ensures cn('label-regular-primary', 'label-small-primary') → 'label-small-primary'
const twMerge = extendTailwindMerge<'typography'>({
  extend: {
    classGroups: {
      // Custom radius theme key (--radius-reg) so it conflicts with standard
      // rounded-* utilities and className overrides win.
      rounded: ['rounded-reg'],
      typography: [
        // Display
        'display-d1-regular',
        'display-d2-regular',
        'display-d3-regular',
        // Headings
        'headings-h1-regular',
        'headings-h2-semibold',
        'headings-h2-regular',
        'headings-h3-regular',
        'headings-h3-semibold',
        'headings-h4-regular',
        'headings-h4-semibold',
        // Labels
        'label-large-primary',
        'label-regular-primary',
        'label-small-primary',
        // Paragraph
        'paragraph-large-primary',
        'paragraph-large-primary-link',
        'paragraph-large-emphasised',
        'paragraph-regular-primary',
        'paragraph-regular-primary-link',
        'paragraph-regular-emphasised-600',
        'paragraph-small-primary',
        'paragraph-small-primary-link',
        'paragraph-small-emphasised',
        'paragraph-code-text',
        // CTA Buttons
        'cta-button-01',
        'cta-button-link-01',
        'cta-button-02',
        'cta-button-link-02',
        'cta-button-03',
        'cta-button-link-03',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
