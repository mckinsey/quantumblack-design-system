import { DefaultCard } from '@/app/demo/[name]/ui/card';
import { type NavId } from '@/app/demo/[name]/ui/sidebar-demo-data';
import { KpiStat } from '@/app/demo/[name]/ui/statistic';
import { type StatisticSentiment } from '@/components/ui/statistic';

const cardCountByNav: Record<NavId, number> = {
  home: 4,
  dashboard: 8,
  flow: 3,
  focus: 6,
};

type DashboardStat = {
  label: string;
  value: string;
  unit: string;
  sentiment: StatisticSentiment;
  trendValue: string;
  trendContext: string;
};

const dashboardStats: DashboardStat[] = [
  {
    label: 'MRR',
    value: '1.24',
    unit: 'M',
    sentiment: 'positive',
    trendValue: '+4.2%',
    trendContext: 'vs last week',
  },
  {
    label: 'Conversion',
    value: '3.8',
    unit: '%',
    sentiment: 'positive',
    trendValue: '+0.6',
    trendContext: 'vs last week',
  },
  {
    label: 'Pipeline',
    value: '1.4',
    unit: '×',
    sentiment: 'neutral',
    trendValue: '0.0',
    trendContext: 'coverage ratio',
  },
  {
    label: 'Churn',
    value: '2.1',
    unit: '%',
    sentiment: 'negative',
    trendValue: '+0.3',
    trendContext: 'vs last month',
  },
  {
    label: 'Active accounts',
    value: '842',
    unit: '',
    sentiment: 'positive',
    trendValue: '+12',
    trendContext: 'this quarter',
  },
  {
    label: 'Avg deal size',
    value: '48',
    unit: 'K',
    sentiment: 'positive',
    trendValue: '+5.1%',
    trendContext: 'vs last quarter',
  },
  {
    label: 'Win rate',
    value: '31',
    unit: '%',
    sentiment: 'neutral',
    trendValue: '-1.2',
    trendContext: 'vs last month',
  },
  {
    label: 'NPS',
    value: '62',
    unit: '',
    sentiment: 'positive',
    trendValue: '+4',
    trendContext: 'vs last survey',
  },
];

function PlaygroundDefaultCards({ navId }: { navId: NavId }) {
  const cardCount = cardCountByNav[navId];

  return (
    <div className="flex flex-wrap gap-6">
      {Array.from({ length: cardCount }, (_, i) => (
        <DefaultCard key={`${navId}-${i}`} />
      ))}
    </div>
  );
}

function PlaygroundDashboardStats() {
  return (
    <div className="flex flex-wrap gap-6">
      {dashboardStats.map(stat => (
        <KpiStat
          key={stat.label}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
          sentiment={stat.sentiment}
          trendValue={stat.trendValue}
          trendContext={stat.trendContext}
        />
      ))}
    </div>
  );
}

export function PlaygroundCards({
  navId,
  title,
  subtitle,
  body,
}: {
  navId: NavId;
  title: string;
  subtitle: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <p className="paragraph-small text-fg-tertiary mb-1">{subtitle}</p>
        <h1 className="headings-h2-regular text-fg-primary mb-3">{title}</h1>
        <p className="paragraph-small text-fg-secondary max-w-2xl">{body}</p>
      </div>

      {navId === 'dashboard' ? (
        <PlaygroundDashboardStats />
      ) : (
        <PlaygroundDefaultCards navId={navId} />
      )}
    </div>
  );
}
