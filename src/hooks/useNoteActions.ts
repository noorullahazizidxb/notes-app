import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotesStore } from '../store/notesStore';

/** Card-level actions shared by every note list (dashboard, favorites). */
export const useNoteActions = () => {
  const navigate = useNavigate();
  const deleteNote = useNotesStore((s) => s.deleteNote);
  const toggleFavorite = useNotesStore((s) => s.toggleFavorite);
  const activeTag = useNotesStore((s) => s.activeTag);
  const setActiveTag = useNotesStore((s) => s.setActiveTag);

  return {
    activeTag,
    onOpen: useCallback((id: string) => navigate(`/editor/${id}`), [navigate]),
    onDelete: useCallback((id: string) => void deleteNote(id), [deleteNote]),
    onToggleFavorite: useCallback((id: string) => void toggleFavorite(id), [toggleFavorite]),
    onTagClick: useCallback(
      (tag: string) => setActiveTag(activeTag === tag ? null : tag),
      [activeTag, setActiveTag]
    ),
    clearTag: useCallback(() => setActiveTag(null), [setActiveTag]),
  };
};
