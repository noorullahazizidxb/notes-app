import { useMemo } from 'react';
import { WifiOff } from 'lucide-react';
import { useNotesStore } from '../../store/notesStore';
import { useNoteActions } from '../../hooks/useNoteActions';
import DashboardHero from '../../components/dashboard/DashboardHero';
import NotesToolbar from '../../components/dashboard/NotesToolbar';
import TagFilter from '../../components/dashboard/TagFilter';
import NotesGrid from '../../components/NotesGrid';
import EmptyState from '../../components/EmptyState';

const Dashboard = () => {
  const { notes, filteredNotes, searchQuery, setSearchQuery, sortKey, setSortKey, dataMode, isLoading } =
    useNotesStore();
  const actions = useNoteActions();
  const displayed = filteredNotes();

  // Stats always reflect all notes, not just filtered results
  const stats = useMemo(
    () => ({ total: notes.length, favorites: notes.filter((n) => n.isFavorite).length }),
    [notes]
  );

  const allTags = useMemo(() => [...new Set(notes.flatMap((n) => n.tags))].sort(), [notes]);
  const isFiltering = Boolean(actions.activeTag || searchQuery);

  const clearFilters = () => {
    setSearchQuery('');
    actions.clearTag();
  };

  return (
    <section className="space-y-8">
      <DashboardHero total={stats.total} favorites={stats.favorites} />

      {dataMode === 'local' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300"
        >
          <WifiOff className="h-4 w-4 shrink-0" aria-hidden="true" />
          API is currently unreachable — notes are being saved in local mode.
        </div>
      )}

      <div className="space-y-4">
        <NotesToolbar
          title="All notes"
          count={displayed.length}
          sortKey={sortKey}
          onSortChange={setSortKey}
          query={searchQuery}
          onQueryChange={setSearchQuery}
        />
        <TagFilter tags={allTags} activeTag={actions.activeTag} onToggle={actions.onTagClick} onClear={actions.clearTag} />

        {!isLoading && displayed.length === 0 ? (
          <EmptyState
            title={isFiltering ? 'No matching notes' : 'No notes yet'}
            description={
              isFiltering
                ? 'Try a different search term or tag filter.'
                : 'Start with quick capture above or open the full editor to draft your first note.'
            }
            action={
              isFiltering && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-text transition hover:border-accent hover:text-accent"
                >
                  Clear filters
                </button>
              )
            }
          />
        ) : (
          <NotesGrid notes={displayed} isLoading={isLoading} {...actions} />
        )}
      </div>
    </section>
  );
};

export default Dashboard;
