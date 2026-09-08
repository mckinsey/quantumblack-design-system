import { DefaultCard } from '@/app/demo/[name]/ui/card';
import { type NavId } from '@/app/demo/[name]/ui/sidebar-demo-data';

import { PlaygroundDashboardAlert } from './playground-alert';

const cardCountByNav: Record<NavId, number> = {
  home: 4,
  dashboard: 8,
  flow: 3,
  focus: 6,
};

export function PlaygroundCards({
  navId,
  title,
  subtitle,
  body,
  welcomeAlertOpen,
  onWelcomeAlertClose,
}: {
  navId: NavId;
  title: string;
  subtitle: string;
  body: string;
  welcomeAlertOpen?: boolean;
  onWelcomeAlertClose?: () => void;
}) {
  const cardCount = cardCountByNav[navId];

  return (
    <div className="flex flex-col gap-8 p-8">
      {welcomeAlertOpen ? (
        <PlaygroundDashboardAlert onClose={() => onWelcomeAlertClose?.()} />
      ) : null}

      <div>
        <p className="paragraph-small text-fg-tertiary mb-1">{subtitle}</p>
        <h1 className="headings-h2-regular text-fg-primary mb-3">{title}</h1>
        <p className="paragraph-small text-fg-secondary max-w-2xl">{body}</p>
      </div>

      <div className="flex flex-wrap gap-6">
        {Array.from({ length: cardCount }, (_, i) => (
          <DefaultCard key={`${navId}-${i}`} />
        ))}
      </div>
    </div>
  );
}
