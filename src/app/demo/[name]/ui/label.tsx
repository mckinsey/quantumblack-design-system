import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Default label with checkbox
 */
export function LabelDemo() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Label</Label>
    </div>
  );
}

/**
 * Label sizes with checkboxes
 */
export function LabelSizes() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Checkbox id="terms-sm" />
        <Label htmlFor="terms-sm" size="sm">
          Label small
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="terms-default" />
        <Label htmlFor="terms-default">Label regular</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="terms-lg" size="lg" />
        <Label htmlFor="terms-lg" size="lg">
          Label large
        </Label>
      </div>
    </div>
  );
}

/**
 * Disabled labels
 */
export function LabelDisabled() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Checkbox id="disabled-sm" disabled />
        <Label disabled htmlFor="disabled-sm" size="sm">
          Label disabled small
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="disabled-default" disabled />
        <Label disabled htmlFor="disabled-default">
          Label disabled default
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="disabled-lg" disabled size="lg" />
        <Label disabled htmlFor="disabled-lg" size="lg">
          Label disabled large
        </Label>
      </div>
    </div>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'LabelDemo',
    title: 'Default',
    description: 'Basic label with checkbox.',
  },
  {
    name: 'LabelSizes',
    title: 'Sizes',
    description: 'Small, regular, and large label sizes.',
  },
  {
    name: 'LabelDisabled',
    title: 'Disabled',
    description: 'Disabled labels in all sizes.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const label = {
  name: 'label',
  components: {
    Default: <LabelDemo />,
    Sizes: <LabelSizes />,
    Disabled: <LabelDisabled />,
  },
};
