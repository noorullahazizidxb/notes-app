// src/pages/Settings.tsx
import { useNavigate } from 'react-router-dom';
import { useNotesStore } from '../../store/notesStore';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useNotesStore();

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10  shadow-sm">
        <div className={`container ${ theme=='dark' ? 'bg-dark-card-bg':'bg-light-card-bg'} mx-auto px-4 py-4 flex justify-between items-center`}>
          <h1 className="text-2xl font-bold">Settings</h1>
          <button
            onClick={() => navigate('/notes')}
            className="p-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`container my-5 mx-auto px-4 py-8 rounded-2xl shadow-lg border transition-all hover:scale-[1.01] hover:shadow-xl cursor-pointer bg-card-bg border-border text-text`}>
        <div className="rounded-lg shadow-sm p-6 ">
          <h2 className="text-lg font-semibold mb-4">Theme</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setTheme('light')}
              className="px-4 py-2 rounded-lg transition-colors bg-yellow-400 text-black hover:bg-yellow-500 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className="px-4 py-2 rounded-lg transition-colors bg-gray-800 text-white hover:bg-gray-900 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
