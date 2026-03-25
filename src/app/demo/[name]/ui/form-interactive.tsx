'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign, Link2, Mail, Search, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
import {
  Textarea,
  TextareaCounter,
  TextareaRoot,
} from '@/components/ui/textarea';

// Profile form schema
const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(30, { message: 'Username must not be longer than 30 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Must be a valid email address.' }),
  bio: z
    .string()
    .min(10, { message: 'Bio must be at least 10 characters.' })
    .max(160, { message: 'Bio must not exceed 160 characters.' }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
    },
  });

  function onSubmit(data: ProfileFormValues) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We&apos;ll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <TextareaRoot maxCharacters={160}>
                  <div className="flex items-center">
                    <TextareaCounter />
                  </div>
                  <Textarea placeholder="Tell us about yourself" {...field} />
                </TextareaRoot>
              </FormControl>
              <FormDescription>
                You can write up to 160 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}

// Settings form schema
const settingsFormSchema = z.object({
  marketing_emails: z.boolean(),
  security_emails: z.boolean(),
  mobile_notifications: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export function SettingsForm() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      marketing_emails: false,
      security_emails: true,
      mobile_notifications: false,
    },
  });

  function onSubmit(data: SettingsFormValues) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-8">
        <FormField
          control={form.control}
          name="marketing_emails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Marketing emails</FormLabel>
                <FormDescription>
                  Receive emails about new products, features, and more.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="security_emails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Security emails</FormLabel>
                <FormDescription>
                  Receive emails about your account security.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile_notifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Mobile Notifications</FormLabel>
                <FormDescription>
                  Receive push notifications on your mobile device.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Save preferences</Button>
      </form>
    </Form>
  );
}

// Login form schema
const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
  remember: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  function onSubmit(data: LoginFormValues) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Remember me</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  );
}

// Input Group Examples form schema
const inputGroupFormSchema = z.object({
  search: z.string().optional(),
  website: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .optional()
    .or(z.literal('')),
  amount: z.string().optional(),
  message: z.string().min(1, { message: 'Message is required.' }),
});

type InputGroupFormValues = z.infer<typeof inputGroupFormSchema>;

export function InputGroupForm() {
  const form = useForm<InputGroupFormValues>({
    resolver: zodResolver(inputGroupFormSchema),
    defaultValues: {
      search: '',
      website: '',
      email: '',
      amount: '',
      message: '',
    },
  });

  function onSubmit(data: InputGroupFormValues) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-6">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>
                      <Search className="size-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="Search for anything..."
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormDescription>Search with a leading icon</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>
                      <Link2 className="size-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="example.com" {...field} />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" variant="ghost">
                      <Send className="size-4" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormDescription>
                Input with both leading icon and trailing button
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>
                      <Mail className="size-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton size="xs">Verify</InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormDescription>
                Email input with verification button
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>
                      <DollarSign className="size-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    type="number"
                    placeholder="0.00"
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>USD</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormDescription>
                Currency input with icon prefix and text suffix
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quick Message</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    placeholder="Type your message..."
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton size="xs" type="submit">
                      Send
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormDescription>Simple input with send button</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit Form</Button>
      </form>
    </Form>
  );
}

// Inline Input Examples form schema
const inlineInputFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  search: z.string().optional(),
});

type InlineInputFormValues = z.infer<typeof inlineInputFormSchema>;

export function InlineInputForm() {
  const form = useForm<InlineInputFormValues>({
    resolver: zodResolver(inlineInputFormSchema),
    defaultValues: {
      name: '',
      email: '',
      search: '',
    },
  });

  function onSubmit(data: InlineInputFormValues) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name (Inline Variant)</FormLabel>
              <FormControl>
                <Input variant="inline" placeholder="Hint text" {...field} />
              </FormControl>
              <FormDescription>
                Simple inline input with bottom border on focus/typing
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (Inline with Icon)</FormLabel>
              <FormControl>
                <InputGroup variant="inline">
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>
                      <Mail className="size-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    variant="inline"
                    placeholder="Hint text"
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormDescription>
                Inline variant with leading icon
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search (Inline with Icons)</FormLabel>
              <FormControl>
                <InputGroup variant="inline">
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>
                      <Search className="size-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    variant="inline"
                    placeholder="Hint text"
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>
                      <Send className="size-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormDescription>
                Inline variant with leading and trailing icons
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit Form</Button>
      </form>
    </Form>
  );
}
