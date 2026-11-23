import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import EmptyPanel from '../../components/EmptyPanel';
import NoteGrid from '../../components/NoteGrid';
import { useNotesStore } from '../../store/notesStore';

export const Favorites = () => {
  const navigate = useNavigate();
  const { notes, deleteNote, toggleFavorite, activeTag, setActiveTag } = useNotesStore();

  const favoriteNotes = useMemo(() => notes.filter((n) => n.isFavorite), [notes]);

  const handleTagClick = (tag: string) => setActiveTag(activeTag === tag ? null : tag);

  return (
    <section className="space-y-6">
      <header className="relative overflow-hidden rounded-3xl border border-border bg-paper p-6 shadow-sm sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
              <Heart className="h-6 w-6" fill="currentColor" aria-hidden="true" />
            </span>
            <div>
              <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">Favorites</h1>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-text-muted">
                The notes you come back to most: references, templates and key thoughts.
              </p>
            </div>
          </div>
          <span className="self-start rounded-full border border-border bg-paper-elevated px-3 py-1 text-xs font-semibold tabular-nums text-text-muted sm:self-auto">
            {favoriteNotes.length} {favoriteNotes.length === 1 ? 'favorite' : 'favorites'}
          </span>
        </div>
      </header>

      {favoriteNotes.length === 0 ? (
        <EmptyPanel
          icon={Heart}
          iconClassName="bg-amber-500/10 text-amber-500"
          title="No favorites yet"
          body="Tap the heart on any note to keep it here for quick reference."
          action={
            <button type="button" onClick={() => navigate('/notes')} className="btn btn-primary">
              Go to all notes
            </button>
          }
        />
      ) : (
        <NoteGrid
          notes={favoriteNotes}
          activeTag={activeTag}
          onDelete={(id) => void deleteNote(id)}
          onToggleFavorite={(id) => void toggleFavorite(id)}
          onOpen={(id) => navigate(`/editor/${id}`)}
          onTagClick={handleTagClick}
        />
      )}
    </section>
  );
};

export default Favorites;
