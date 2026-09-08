import {
  Alert,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@/components/ui/alert';
import { Icon } from '@/components/ui/icon';

export function PlaygroundDashboardAlert({ onClose }: { onClose: () => void }) {
  return (
    <Alert layout="long">
      <AlertIcon>
        <Icon icon="info" className="text-[25px]" />
      </AlertIcon>
      <AlertContent className="flex-row items-center gap-3 pt-0">
        <AlertTitle className="shrink-0">Revenue operations update</AlertTitle>
        <AlertDescription className="line-clamp-1">
          Conversion is up 4.2% week over week. Pipeline coverage sits at 1.4×
          target.
        </AlertDescription>
      </AlertContent>
      <AlertClose onClick={onClose} />
    </Alert>
  );
}
