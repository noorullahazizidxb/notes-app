import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import NoteCard from '../../components/NoteCard';
import { useNotesStore } from '../../store/notesStore';

const Favorites = () => {
  const navigate = useNavigate();
  const { notes, deleteNote, toggleFavorite, activeTag, setActiveTag } = useNotesStore();

  const favoriteNotes = useMemo(() => notes.filter((n) => n.isFavorite), [notes]);

  const handleTagClick = (tag: string) => setActiveTag(activeTag === tag ? null : tag);

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-border bg-[color:var(--color-paper)] p-6 sm:p-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card-bg px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-text/60">
          <Heart className="h-3.5 w-3.5" />
          Favorites
        </p>
        <h1 className="mt-3 font-display text-3xl text-text">Your highlighted notes</h1>
        <p className="mt-2 max-w-2xl text-sm text-text/70">
          This is your shortlist of reusable references, templates, and ideas worth revisiting.
        </p>
      </div>

      {favoriteNotes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card-bg p-10 text-center">
          <h2 className="font-display text-2xl text-text">No favorites yet</h2>
          <p className="mt-2 text-sm text-text/65">Open a note and mark it with the star to pin it here.</p>
          <button
            type="button"
            onClick={() => navigate('/notes')}
            className="mt-5 rounded-xl bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white"
          >
            Browse all notes
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {favoriteNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              activeTag={activeTag}
              onDelete={(id) => void deleteNote(id)}
              onToggleFavorite={(id) => void toggleFavorite(id)}
              onOpen={(id) => navigate(`/editor/${id}`)}
              onTagClick={handleTagClick}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;

