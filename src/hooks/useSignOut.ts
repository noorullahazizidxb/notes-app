import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { useNotesStore } from '../store/notesStore';

/** Clears auth + local notes and returns to the login page. */
export const useSignOut = (): (() => void) => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const clearNotes = useNotesStore((s) => s.clearNotes);

  return useCallback(() => {
    clearAuth();
    clearNotes();
    navigate('/login', { replace: true });
    toast.success('Signed out.');
  }, [clearAuth, clearNotes, navigate]);
};
