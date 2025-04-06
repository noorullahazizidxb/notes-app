
import { useNotesStore } from '../store/notesStore';
import { RouterProvider } from 'react-router-dom';
import { router } from './root';

function App() {
  const { theme } = useNotesStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`transition-theme bg-bg text-text`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
