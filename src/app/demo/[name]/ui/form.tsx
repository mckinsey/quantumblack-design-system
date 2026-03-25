import {
  InlineInputForm,
  InputGroupForm,
  LoginForm,
  ProfileForm,
  SettingsForm,
} from './form-interactive';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Profile form example
 */
export function FormProfile() {
  return <ProfileForm />;
}

/**
 * Settings form with various controls
 */
export function FormSettings() {
  return <SettingsForm />;
}

/**
 * Login form example
 */
export function FormLogin() {
  return <LoginForm />;
}

/**
 * Form with input groups
 */
export function FormInputGroup() {
  return <InputGroupForm />;
}

/**
 * Form with inline inputs
 */
export function FormInline() {
  return <InlineInputForm />;
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'FormProfile',
    title: 'Profile Form',
    description: 'User profile editing form.',
  },
  {
    name: 'FormSettings',
    title: 'Settings Form',
    description: 'Application settings with various input types.',
  },
  {
    name: 'FormLogin',
    title: 'Login Form',
    description: 'Authentication login form.',
  },
  {
    name: 'FormInputGroup',
    title: 'Input Groups',
    description: 'Form using input groups with icons.',
  },
  {
    name: 'FormInline',
    title: 'Inline Inputs',
    description: 'Form with inline input styling.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const form = {
  name: 'form',
  components: {
    'Profile Form': <FormProfile />,
    'Settings Form': <FormSettings />,
    'Login Form': <FormLogin />,
    'Input Groups': <FormInputGroup />,
    'Inline Inputs': <FormInline />,
  },
};
