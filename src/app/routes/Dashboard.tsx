import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, Search, Sparkles, Tag, WifiOff, X } from 'lucide-react';
import { useNotesStore } from '../../store/notesStore';
import type { SortKey } from '../../store/notesStore';
import NoteCard from '../../components/NoteCard';
import SkeletonCard from '../../components/SkeletonCard';

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Last updated', value: 'updatedAt' },
  { label: 'Date created', value: 'createdAt' },
  { label: 'Title A–Z', value: 'title' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    notes,
    filteredNotes,
    setSearchQuery,
    searchQuery,
    activeTag,
    setActiveTag,
    sortKey,
    setSortKey,
    deleteNote,
    toggleFavorite,
    addNote,
    dataMode,
    isLoading,
  } = useNotesStore();

  const [draftTitle, setDraftTitle] = useState('');

  const displayed = filteredNotes();

  // Stats always reflect all notes, not just filtered results
  const stats = useMemo(() => ({
    total: notes.length,
    favorites: notes.filter((n) => n.isFavorite).length,
  }), [notes]);

  // Collect unique tags from all notes for the filter bar
  const allTags = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [notes]);

  const handleQuickCreate = async () => {
    const created = await addNote({
      title: draftTitle || 'Untitled note',
      content: '<p></p>',
      tags: [],
      isFavorite: false,
    });
    setDraftTitle('');
    navigate(`/editor/${created.id}`);
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  return (
    <section className="space-y-8">
      {/* Hero / quick-capture */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-[color:var(--color-paper)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-[color:var(--color-accent)]/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-10 h-36 w-36 rounded-full bg-[color:var(--color-accent-soft)]/35 blur-2xl" />

        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card-bg px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-text/70">
              <Sparkles className="h-3.5 w-3.5" />
              Editorial desk
            </p>
            <h1 className="font-display text-3xl leading-tight text-text sm:text-4xl">
              Build notes that stay readable months from now.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-text/70 sm:text-base">
              Capture ideas quickly, refine with rich formatting, and keep your archive searchable.
            </p>

            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card-bg p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-text/55">Total notes</p>
                <p className="mt-2 font-display text-3xl text-text">{stats.total}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card-bg p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-text/55">Favorites</p>
                <p className="mt-2 font-display text-3xl text-text">{stats.favorites}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-border bg-card-bg p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-text/55">Quick capture</p>
            <label htmlFor="quick-title" className="text-sm font-medium text-text">
              Title
            </label>
            <input
              id="quick-title"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') void handleQuickCreate(); }}
              placeholder="What are you thinking about?"
              className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text/45 focus:border-[color:var(--color-accent)] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => void handleQuickCreate()}
              className="w-full rounded-xl bg-[color:var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Create and open editor
            </button>
            <button
              type="button"
              onClick={() => navigate('/editor')}
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-text transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
            >
              Open blank editor
            </button>
          </div>
        </div>
      </div>

      {dataMode === 'local' && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          <WifiOff className="h-4 w-4 shrink-0" />
          API is currently unreachable — notes are being saved in local mode.
        </div>
      )}

      {/* Notes list */}
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-2xl text-text">All notes</h2>
          <div className="flex flex-wrap items-center gap-2">
            {/* Sort */}
            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text/45" />
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="rounded-xl border border-border bg-card-bg py-2 pl-8 pr-3 text-sm text-text focus:border-[color:var(--color-accent)] focus:outline-none"
                aria-label="Sort notes"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {/* Search */}
            <label className="relative block w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/45" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes…"
                className="w-full rounded-xl border border-border bg-card-bg py-2.5 pl-10 pr-3 text-sm text-text placeholder:text-text/45 focus:border-[color:var(--color-accent)] focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* Tag filter pills */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-text/50">
              <Tag className="h-3 w-3" />
              Filter
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                  activeTag === tag
                    ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)]'
                    : 'border-border text-text/60 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]'
                }`}
              >
                #{tag}
              </button>
            ))}
            {activeTag && (
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-text/55 hover:text-text"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : displayed.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card-bg p-12 text-center">
            <h3 className="font-display text-2xl text-text">
              {activeTag || searchQuery ? 'No matching notes' : 'No notes yet'}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-text/65">
              {activeTag || searchQuery
                ? 'Try a different search term or tag filter.'
                : 'Start with quick capture above or open the full editor to draft your first note.'}
            </p>
            {(activeTag || searchQuery) && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setActiveTag(null); }}
                className="mt-5 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-text transition hover:border-[color:var(--color-accent)]"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {displayed.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, delay: index * 0.03 }}
                >
                  <NoteCard
                    note={note}
                    activeTag={activeTag}
                    onDelete={(id) => void deleteNote(id)}
                    onToggleFavorite={(id) => void toggleFavorite(id)}
                    onOpen={(id) => navigate(`/editor/${id}`)}
                    onTagClick={handleTagClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;

