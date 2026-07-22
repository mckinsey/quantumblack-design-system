import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Default tabs demo
 */
export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}

/**
 * Tab sizes demonstration
 */
export function TabsSizes() {
  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue="account" className="w-[400px]" hideBaseline>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Default tabs content.</TabsContent>
        <TabsContent value="password">Password content.</TabsContent>
      </Tabs>

      <Tabs defaultValue="account" className="w-[400px]" size="lg" hideBaseline>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Large tabs content.</TabsContent>
        <TabsContent value="password">Password content.</TabsContent>
      </Tabs>

      <Tabs defaultValue="account" className="w-[400px]" size="xl" hideBaseline>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Extra large tabs content.</TabsContent>
        <TabsContent value="password">Password content.</TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * Tabs with and without baseline
 */
export function TabsBaseline() {
  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">With baseline.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="settings">Manage your settings.</TabsContent>
      </Tabs>

      <Tabs defaultValue="account" className="w-[400px]" hideBaseline>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Without baseline.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="settings">Manage your settings.</TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * Centered tabs
 */
export function TabsCentered() {
  return (
    <Tabs defaultValue="account" className="w-[500px]">
      <TabsList className="justify-center">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Centered tabs content.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsContent value="settings">Manage your settings.</TabsContent>
    </Tabs>
  );
}

/**
 * Compact tabs (no horizontal padding, gap between tabs)
 */
export function TabsCompact() {
  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue="account" className="w-[400px]" padded={false}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Default compact tabs.</TabsContent>
        <TabsContent value="password">Password content.</TabsContent>
        <TabsContent value="settings">Settings content.</TabsContent>
      </Tabs>

      <Tabs
        defaultValue="account"
        className="w-[400px]"
        size="lg"
        padded={false}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Large compact tabs.</TabsContent>
        <TabsContent value="password">Password content.</TabsContent>
        <TabsContent value="settings">Settings content.</TabsContent>
      </Tabs>

      <Tabs
        defaultValue="account"
        className="w-[400px]"
        size="xl"
        padded={false}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Extra large compact tabs.</TabsContent>
        <TabsContent value="password">Password content.</TabsContent>
        <TabsContent value="settings">Settings content.</TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * Disabled tabs
 */
export function TabsDisabled() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled>
          Password
        </TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Accessible tab content.</TabsContent>
      <TabsContent value="password">Disabled tab content.</TabsContent>
      <TabsContent value="settings">Accessible tab content.</TabsContent>
    </Tabs>
  );
}

export function TabsWithIcons() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">
          <IconShell size="sm">
            <Icon icon="person" />
          </IconShell>
          Account
        </TabsTrigger>
        <TabsTrigger value="password">
          <IconShell size="sm">
            <Icon icon="lock" />
          </IconShell>
          Password
        </TabsTrigger>
        <TabsTrigger value="settings">
          <IconShell size="sm">
            <Icon icon="settings" />
          </IconShell>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account with leading icons.</TabsContent>
      <TabsContent value="password">Password with leading icons.</TabsContent>
      <TabsContent value="settings">Settings with leading icons.</TabsContent>
    </Tabs>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'TabsDemo',
    title: 'Default',
    description: 'Basic tabs with content panels.',
  },
  {
    name: 'TabsSizes',
    title: 'Sizes',
    description: 'Default, large, and extra large tab sizes.',
  },
  {
    name: 'TabsBaseline',
    title: 'Baseline',
    description:
      'hideBaseline=false shows the full-width divider under the tab row; hideBaseline=true removes it.',
  },
  {
    name: 'TabsCentered',
    title: 'Centered',
    description: 'Tabs centered within the container.',
  },
  {
    name: 'TabsCompact',
    title: 'Compact (No Padding)',
    description:
      'padded={false}: no horizontal padding on triggers and gap between tabs. padded={true} (default) adds px on each trigger with no inter-tab gap.',
  },
  {
    name: 'TabsDisabled',
    title: 'Disabled',
    description: 'Tabs with some disabled options.',
  },
  {
    name: 'TabsWithIcons',
    title: 'With Icons',
    description:
      'Leading IconShell + Icon as TabsTrigger children (Figma showLeadingIcon).',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const tabs = {
  name: 'tabs',
  components: {
    Default: <TabsDemo />,
    Sizes: <TabsSizes />,
    Baseline: <TabsBaseline />,
    Centered: <TabsCentered />,
    'Compact (No Padding)': <TabsCompact />,
    Disabled: <TabsDisabled />,
    'With Icons': <TabsWithIcons />,
  },
};
