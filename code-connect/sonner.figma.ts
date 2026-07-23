// url=<QBDS_SONNER>
// source=src/components/ui/sonner.tsx
// component=toast
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('type', {
  error: 'error',
  message: 'info',
  neutral: 'default',
  success: 'success',
  warning: 'warning',
});

const message = JSON.stringify(instance.getString('primaryMessage'));
const isDismissable = instance.getBoolean('isDismissable');
const showIcon = instance.getBoolean('showNotificationIcon');

const iconShell = showIcon ? instance.findInstance('IconShell') : null;
let iconCode: figma.ResultSection[] = [];

if (iconShell && iconShell.type === 'INSTANCE') {
  iconCode = iconShell.executeTemplate().example;
}

const setup = figma.code`
  // 1. Mount <Toaster /> once at app root (e.g. main.tsx or root layout)
  //    import { Toaster } from "@/components/ui/sonner"
  //    <Toaster />
  //
  // 2. Import toast from @/components/ui/sonner (QBDS wrapper — not "sonner" directly)
  //
  // 3. Call toast from an event handler, effect, or async callback:
`;

let call = figma.code`toast.${type}(${message})`;

if (showIcon && isDismissable && iconCode.length) {
  call = figma.code`toast.${type}(${message}, { icon: ${iconCode} })`;
} else if (showIcon && !isDismissable && iconCode.length) {
  call = figma.code`toast.${type}(${message}, { icon: ${iconCode}, cancel: null })`;
} else if (showIcon && !isDismissable) {
  call = figma.code`toast.${type}(${message}, { cancel: null })`;
} else if (!showIcon && isDismissable) {
  call = figma.code`toast.${type}(${message}, { icon: null })`;
} else if (!showIcon && !isDismissable) {
  call = figma.code`toast.${type}(${message}, { icon: null, cancel: null })`;
}

const trigger = figma.code`
  //
  // Example trigger (optional — wire your own UI):
  // <Button variant="outline" onClick={() => toast.${type}(${message})}>
  //   Show Toast
  // </Button>
`;

const example = figma.code`${setup}${call}${trigger}`;

export default {
  example,
  imports: ['import { Toaster, toast } from "@/components/ui/sonner"'],
  id: 'sonner',
  metadata: { nestable: false },
};
