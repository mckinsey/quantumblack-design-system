import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Default switch
 */
export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}

/**
 * Switch sizes
 */
export function SwitchSizes() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="switch-sm" size="sm" />
        <Label htmlFor="switch-sm" size="sm">
          Small
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="switch-default" size="default" />
        <Label htmlFor="switch-default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="switch-lg" size="lg" />
        <Label htmlFor="switch-lg" size="lg">
          Large
        </Label>
      </div>
    </div>
  );
}

/**
 * Checked switches
 */
export function SwitchChecked() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="checked-sm" size="sm" checked />
        <Label htmlFor="checked-sm" size="sm">
          Small Checked
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="checked-default" size="default" checked />
        <Label htmlFor="checked-default">Default Checked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="checked-lg" size="lg" checked />
        <Label htmlFor="checked-lg" size="lg">
          Large Checked
        </Label>
      </div>
    </div>
  );
}

/**
 * Disabled switches
 */
export function SwitchDisabled() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off" disabled>
          Disabled Off
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" disabled checked />
        <Label htmlFor="disabled-on" disabled>
          Disabled On
        </Label>
      </div>
    </div>
  );
}

/**
 * All switch states
 */
export function SwitchStates() {
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-8">
      <div className="space-y-4">
        <Label className="text-fg-secondary text-xs">Unchecked</Label>
        <div className="flex flex-col items-start gap-3">
          <div>
            <Switch size="sm" />
          </div>
          <div>
            <Switch size="default" />
          </div>
          <div>
            <Switch size="lg" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Label className="text-fg-secondary text-xs">Checked</Label>
        <div className="flex flex-col items-start gap-3">
          <div>
            <Switch size="sm" checked />
          </div>
          <div>
            <Switch size="default" checked />
          </div>
          <div>
            <Switch size="lg" checked />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Label className="text-fg-secondary text-xs">Disabled Off</Label>
        <div className="flex flex-col items-start gap-3">
          <div>
            <Switch size="sm" disabled />
          </div>
          <div>
            <Switch size="default" disabled />
          </div>
          <div>
            <Switch size="lg" disabled />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Label className="text-fg-secondary text-xs">Disabled On</Label>
        <div className="flex flex-col items-start gap-3">
          <div>
            <Switch size="sm" disabled checked />
          </div>
          <div>
            <Switch size="default" disabled checked />
          </div>
          <div>
            <Switch size="lg" disabled checked />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'SwitchDemo',
    title: 'Default',
    description: 'Basic switch with label.',
  },
  {
    name: 'SwitchSizes',
    title: 'Sizes',
    description: 'Small, default, and large switch sizes.',
  },
  {
    name: 'SwitchChecked',
    title: 'Checked',
    description: 'Switches in checked state.',
  },
  {
    name: 'SwitchDisabled',
    title: 'Disabled',
    description: 'Disabled switches in on and off states.',
  },
  {
    name: 'SwitchStates',
    title: 'All States',
    description: 'All switch states and sizes comparison.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const switchComponent = {
  name: 'switch',
  components: {
    Default: <SwitchDemo />,
    Sizes: <SwitchSizes />,
    Checked: <SwitchChecked />,
    Disabled: <SwitchDisabled />,
    'All States': <SwitchStates />,
  },
};
