
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useNotesStore } from '../store/notesStore';
import { useAuthStore } from '../store/authStore';
import { router } from './root';
import { useApplyTheme } from '../hooks/useTheme';

function App() {
  const loadNotes = useNotesStore((s) => s.loadNotes);
  const token = useAuthStore((s) => s.token);
  useApplyTheme();

  useEffect(() => {
    if (token) void loadNotes();
  }, [token, loadNotes]);

  return (
    <div className="transition-theme min-h-screen bg-bg text-text">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
