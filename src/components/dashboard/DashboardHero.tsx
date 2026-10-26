import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Heart, Sparkles } from 'lucide-react';

type DashboardHeroProps = {
  totalNotes: number;
  favoriteNotes: number;
  onQuickCreate: (title: string) => Promise<void>;
};

export const DashboardHero = ({
  totalNotes,
  favoriteNotes,
  onQuickCreate,
}: DashboardHeroProps) => {
  const navigate = useNavigate();
  const [draftTitle, setDraftTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onQuickCreate(draftTitle.trim() || 'Untitled note');
      setDraftTitle('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-paper p-6 sm:p-8 shadow-sm">
      {/* Brand aura decoration */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-12 h-44 w-44 rounded-full bg-accent-soft/15 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
        {/* Left Column: Headline and metrics */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-paper-elevated px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Workspace Desk</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-text">
            Ideas, organized with clarity.
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Draft with rich typography, organize via auto-parsed tags, and keep your thoughts
            searchable anywhere.
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-2 gap-3 pt-2 max-w-md">
            <div className="rounded-2xl border border-border bg-paper-elevated p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                <BookOpen className="h-3.5 w-3.5" />
                <span>All Notes</span>
              </div>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums text-text">
                {totalNotes}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-paper-elevated p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                <Heart className="h-3.5 w-3.5 text-amber-500" />
                <span>Favorites</span>
              </div>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums text-text">
                {favoriteNotes}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Quick capture form */}
        <div className="rounded-2xl border border-border bg-paper-elevated p-5 sm:p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text">Quick Capture</h2>
          <p className="mt-1 text-xs text-text-muted">
            Start a thought now and jump straight into editing.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label htmlFor="quick-capture-title" className="sr-only">
                Note title
              </label>
              <input
                id="quick-capture-title"
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-text transition hover:bg-accent-hover shadow-sm disabled:opacity-60"
              >
                <span>Create note</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/editor')}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-paper px-4 py-2.5 text-sm font-semibold text-text transition hover:border-accent hover:text-accent"
              >
                Blank editor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
