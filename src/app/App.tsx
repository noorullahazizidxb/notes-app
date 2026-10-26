
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { resolveTheme, useNotesStore } from '../store/notesStore';
import { useAuthStore } from '../store/authStore';
import { router } from './root';

function App() {
  const { theme, loadNotes } = useNotesStore();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    const applyTheme = () => {
      const resolved = resolveTheme(theme);
      document.documentElement.classList.toggle('dark', resolved === 'dark');
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themeMode = theme;
    };

    applyTheme();

    if (theme === 'system' && window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mql.addEventListener('change', listener);
      return () => mql.removeEventListener('change', listener);
    }
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
