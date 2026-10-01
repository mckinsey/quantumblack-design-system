import { PlaygroundAiPreview } from '@/app/playground/ai/playground-ai-registry';
import { type PlaygroundSpec } from '@/app/playground/ai/playground-ai-types';
import { DefaultCard } from '@/app/demo/[name]/ui/card';
import { type NavId } from '@/app/demo/[name]/ui/sidebar-demo-data';
import { Button } from '@/components/ui/button';

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
  aiSpec,
  onClearAiSpec,
}: {
  navId: NavId;
  title: string;
  subtitle: string;
  body: string;
  aiSpec: PlaygroundSpec | null;
  onClearAiSpec: () => void;
}) {
  const cardCount = cardCountByNav[navId];

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <p className="paragraph-small text-fg-tertiary mb-1">{subtitle}</p>
        <h1 className="headings-h2-regular text-fg-primary mb-3">{title}</h1>
        <p className="paragraph-small text-fg-secondary max-w-2xl">{body}</p>
      </div>

      {aiSpec ? (
        <section
          className="border-stroke-divider bg-surface-primary flex flex-col gap-4 rounded-xl border p-6"
          data-slot="playground-ai-canvas">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="headings-h4-regular text-fg-primary">AI preview</h2>
            <Button variant="ghost" size="sm" onClick={onClearAiSpec}>
              Clear preview
            </Button>
          </div>
          <PlaygroundAiPreview spec={aiSpec} />
        </section>
      ) : null}

      <div className="flex flex-wrap gap-6">
        {Array.from({ length: cardCount }, (_, i) => (
          <DefaultCard key={`${navId}-${i}`} />
        ))}
      </div>
    </div>
  );
}
