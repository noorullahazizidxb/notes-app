import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';
import { useNotesStore } from '../../store/notesStore';
import NoteCard from '../../components/NoteCard';
import SkeletonCard from '../../components/SkeletonCard';
import DashboardHero from '../../components/dashboard/DashboardHero';
import FilterToolbar from '../../components/dashboard/FilterToolbar';
import EmptyNotesState from '../../components/dashboard/EmptyNotesState';

export const Dashboard = () => {
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

  const displayedNotes = filteredNotes();

  // Metrics
  const stats = useMemo(
    () => ({
      total: notes.length,
      favorites: notes.filter((n) => n.isFavorite).length,
    }),
    [notes]
  );

  // Unique tags for filter bar
  const allTags = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [notes]);

  const handleQuickCreate = async (title: string) => {
    const created = await addNote({
      title,
      content: '<p></p>',
      tags: [],
      isFavorite: false,
    });
    navigate(`/editor/${created.id}`);
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  const isFiltered = Boolean(searchQuery.trim() || activeTag);

  return (
    <section className="space-y-8">
      {/* Quick capture & workspace stats */}
      <DashboardHero
        totalNotes={stats.total}
        favoriteNotes={stats.favorites}
        onQuickCreate={handleQuickCreate}
      />

      {/* Offline Mode Banner */}
      {dataMode === 'local' && (
        <div className="flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          <WifiOff className="h-4 w-4 shrink-0" />
          <p>
            Working in offline mode — your notes are safely saved to local device storage.
          </p>
        </div>
      )}

      {/* Main Notes Area */}
      <div className="space-y-5">
        <FilterToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortKey={sortKey}
          onSortChange={setSortKey}
          allTags={allTags}
          activeTag={activeTag}
          onTagClick={handleTagClick}
          onClearTag={() => setActiveTag(null)}
          totalNotes={displayedNotes.length}
        />

        {/* Content list */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : displayedNotes.length === 0 ? (
          <EmptyNotesState
            isFiltered={isFiltered}
            onClearFilters={() => {
              setSearchQuery('');
              setActiveTag(null);
            }}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {displayedNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22, delay: Math.min(index * 0.02, 0.2) }}
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
