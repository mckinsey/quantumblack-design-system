// Per-size field layout config: typography + gap + icon size (matches Figma spec)
export const inputGroupFieldConfig = {
  sm: {
    label: 'label-small-primary text-fg-secondary',
    description: 'paragraph-small-primary text-fg-tertiary',
    gap: 'gap-2',
    iconSize: 'text-[16px]',
  },
  default: {
    label: 'label-medium-primary text-fg-secondary',
    description: 'paragraph-medium-primary text-fg-tertiary',
    gap: 'gap-2',
    iconSize: 'text-[16px]',
  },
  lg: {
    label: 'label-large-primary text-fg-secondary',
    description: 'paragraph-medium-primary text-fg-tertiary',
    gap: 'gap-2',
    iconSize: 'text-[24px]',
  },
} as const;
