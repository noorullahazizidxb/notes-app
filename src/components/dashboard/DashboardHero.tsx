import { Sparkles } from 'lucide-react';
import QuickCapture from './QuickCapture';
import StatCard from './StatCard';

type DashboardHeroProps = { total: number; favorites: number };

const DashboardHero = ({ total, favorites }: DashboardHeroProps) => (
  <div className="relative overflow-hidden rounded-3xl border border-border bg-paper p-6 shadow-elevated sm:p-8">
    <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-accent opacity-15 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-12 left-10 h-36 w-36 rounded-full bg-accent-soft opacity-20 blur-3xl" />

    <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card-bg px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          Editorial desk
        </p>
        <h1 className="font-display text-3xl leading-tight text-text sm:text-4xl">
          Build notes that stay readable months from now.
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
          Capture ideas quickly, refine with rich formatting, and keep your archive searchable.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <StatCard label="Total notes" value={total} />
          <StatCard label="Favorites" value={favorites} />
        </div>
      </div>
      <QuickCapture />
    </div>
  </div>
);

export default DashboardHero;
