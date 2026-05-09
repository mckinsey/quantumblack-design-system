import * as FormInteractive from './form-interactive';

export { ReactHookForm, TanStackForm } from './form-interactive';

export const examples = [
  {
    name: 'ReactHookForm',
    title: 'React Hook Form',
    description:
      'Full form using react-hook-form + zod with Controller, built on Field. Stacked (filled) input layout.',
  },
  {
    name: 'TanStackForm',
    title: 'TanStack Form',
    description:
      'Full form using @tanstack/react-form + zod with form.Field, built on Field. Inline (bottom-border) input layout.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const form = {
  name: 'form',
  components: {
    'React Hook Form': <FormInteractive.ReactHookForm />,
    'TanStack Form': <FormInteractive.TanStackForm />,
  },
};
