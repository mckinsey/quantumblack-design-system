import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Default dialog with form
 */
export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit Profile</Button>} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="button">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Simple confirmation dialog
 */
export function DialogConfirmation() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Delete Item</Button>} />
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the item
            from your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button variant="default">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Dialog with custom content
 */
export function DialogCustomContent() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Share</Button>} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share document</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this document.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://example.com/share/abc123"
              readOnly
            />
          </div>
          <Button type="button" size="sm" className="px-3">
            Copy
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose
            render={
              <Button type="button" variant="secondary">
                Close
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'DialogDemo',
    title: 'Default',
    description: 'Dialog with form inputs and footer actions.',
  },
  {
    name: 'DialogConfirmation',
    title: 'Confirmation',
    description: 'Simple confirmation dialog for destructive actions.',
  },
  {
    name: 'DialogCustomContent',
    title: 'Custom Content',
    description: 'Dialog with custom content layout.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const dialog = {
  name: 'dialog',
  components: {
    Default: <DialogDemo />,
    Confirmation: <DialogConfirmation />,
    'Custom Content': <DialogCustomContent />,
  },
};
