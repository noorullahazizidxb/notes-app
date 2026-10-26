import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useNotesStore } from '../../store/notesStore';
import { useNoteActions } from '../../hooks/useNoteActions';
import PageHeader from '../../components/PageHeader';
import NotesGrid from '../../components/NotesGrid';
import EmptyState from '../../components/EmptyState';

const Favorites = () => {
  const notes = useNotesStore((s) => s.notes);
  const isLoading = useNotesStore((s) => s.isLoading);
  const actions = useNoteActions();
  const favoriteNotes = useMemo(() => notes.filter((n) => n.isFavorite), [notes]);

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Favorites"
        icon={<Heart className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}
        title="Your highlighted notes"
        description="This is your shortlist of reusable references, templates, and ideas worth revisiting."
      />

      {!isLoading && favoriteNotes.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-6 w-6" aria-hidden="true" />}
          title="No favorites yet"
          description="Open a note and mark it with the heart to pin it here."
          action={
            <Link
              to="/notes"
              className="inline-flex rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:bg-accent-hover"
            >
              Browse all notes
            </Link>
          }
        />
      ) : (
        <NotesGrid notes={favoriteNotes} isLoading={isLoading} {...actions} />
      )}
    </section>
  );
};

export default Favorites;
