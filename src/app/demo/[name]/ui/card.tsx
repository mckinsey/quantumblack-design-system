import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Default card with login form
 */
export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription className="w-[80%]">
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="mt-1.5">
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="mt-4 flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * Simple card with just content
 */
export function CardSimple() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-fg-secondary text-sm">
          Check your inbox for the latest updates from your team.
        </p>
      </CardContent>
    </Card>
  );
}

/**
 * Card with action button in header
 */
export function CardWithAction() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Manage your team members and roles.</CardDescription>
        <CardAction>
          <Button size="sm">Add Member</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">John Doe</span>
            <span className="text-fg-secondary text-xs">Admin</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Jane Smith</span>
            <span className="text-fg-secondary text-xs">Member</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Card with footer buttons
 */
export function CardWithFooter() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Delete Project</CardTitle>
        <CardDescription>
          This action cannot be undone. This will permanently delete your
          project and remove all associated data.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="default">Delete</Button>
      </CardFooter>
    </Card>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'CardDemo',
    title: 'Default',
    description: 'Card with header, content, and footer actions.',
  },
  {
    name: 'CardSimple',
    title: 'Simple',
    description: 'Basic card with title, description, and content.',
  },
  {
    name: 'CardWithAction',
    title: 'With Action',
    description: 'Card with an action button in the header.',
  },
  {
    name: 'CardWithFooter',
    title: 'With Footer',
    description: 'Card with footer action buttons.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const card = {
  name: 'card',
  components: {
    Default: <CardDemo />,
    Simple: <CardSimple />,
    'With Action': <CardWithAction />,
    'With Footer': <CardWithFooter />,
  },
};
