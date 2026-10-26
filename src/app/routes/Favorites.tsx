import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import NoteCard from '../../components/NoteCard';
import { useNotesStore } from '../../store/notesStore';

export const Favorites = () => {
  const navigate = useNavigate();
  const { notes, deleteNote, toggleFavorite, activeTag, setActiveTag } = useNotesStore();

  const favoriteNotes = useMemo(() => notes.filter((n) => n.isFavorite), [notes]);

  const handleTagClick = (tag: string) => setActiveTag(activeTag === tag ? null : tag);

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-paper p-6 sm:p-8 shadow-sm">
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-paper-elevated px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <Heart className="h-3.5 w-3.5 text-amber-500" />
            <span>Pinned Archive</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <h1 className="font-display text-3xl font-bold text-text">Highlighted Notes</h1>
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              {favoriteNotes.length} {favoriteNotes.length === 1 ? 'favorite' : 'favorites'}
            </span>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
            Your personal shortlist of reusable references, key templates, and essential thoughts.
          </p>
        </div>
      </div>

      {/* Content */}
      {favoriteNotes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-paper p-12 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold text-text">No favorites yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-text-muted">
            Tap the heart icon on any note in your workspace to pin it here for quick reference.
          </p>
          <button
            type="button"
            onClick={() => navigate('/notes')}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-text transition hover:bg-accent-hover shadow-sm"
          >
            <span>Explore all notes</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {favoriteNotes.map((note, index) => (
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
    </section>
  );
};

export default Favorites;
