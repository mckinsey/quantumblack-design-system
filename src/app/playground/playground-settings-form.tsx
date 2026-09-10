import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';

type PlaygroundSettingsFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PlaygroundSettingsForm({
  open,
  onOpenChange,
}: PlaygroundSettingsFormProps) {
  const [name, setName] = useState('Playground workspace');
  const [notes, setNotes] = useState('');
  const [denseCards, setDenseCards] = useState(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-surface-primary w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Playground settings</SheetTitle>
          <SheetDescription>
            Tune the shell layout. Component demos can plug into the main area
            later.
          </SheetDescription>
        </SheetHeader>

        <form
          className="flex flex-1 flex-col gap-6 overflow-y-auto px-4"
          onSubmit={event => {
            event.preventDefault();
            onOpenChange(false);
          }}>
          <Field>
            <FieldLabel htmlFor="playground-name">Workspace name</FieldLabel>
            <Input
              id="playground-name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <FieldDescription>
              Shown in the header for quick context.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="playground-notes">Notes</FieldLabel>
            <Textarea
              id="playground-notes"
              placeholder="What are you testing?"
              value={notes}
              onChange={event => setNotes(event.target.value)}
            />
          </Field>

          <Field orientation="horizontal">
            <Checkbox
              id="playground-dense"
              checked={denseCards}
              onCheckedChange={checked => setDenseCards(checked === true)}
            />
            <FieldLabel htmlFor="playground-dense">
              Compact card grid
            </FieldLabel>
          </Field>

          <SheetFooter className="mt-auto px-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
