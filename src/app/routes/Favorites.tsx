// src/pages/Favorites.tsx
import { useNavigate } from 'react-router-dom';
import { useNotesStore } from '../../store/notesStore';
import NoteCard from '../../components/NoteCard';

const Favorites = () => {
  const navigate = useNavigate();
  const { notes, deleteNote, toggleFavorite } = useNotesStore();
  const favoriteNotes = notes.filter(note => note.isFavorite);

  return (
    <div className="min-h-screen bg-bg">
      <div className="sticky top-0 z-10 bg-card-bg shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Favorite Notes</h1>
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Back
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {favoriteNotes.length === 0 ? (
          <div className="text-center text-text mt-8">
            <p>No favorite notes yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteNotes.map(note => (
              <div key={note.id} className="bg-card-bg rounded-lg shadow-md overflow-hidden">
                <NoteCard
                  note={note}
                  onDelete={(id) => deleteNote(id)}
                  onToggleFavorite={(id) => toggleFavorite(id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
