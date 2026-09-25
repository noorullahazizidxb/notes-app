
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useNotesStore } from '../store/notesStore';
import { useAuthStore } from '../store/authStore';
import { router } from './root';

function App() {
  const { theme, loadNotes } = useNotesStore();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (token) void loadNotes();
  }, [token, loadNotes]);

  // pages/components can import `useProgress()` directly from '@bprogress/react'

  return (
    <div className="transition-theme min-h-screen bg-bg text-text">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
