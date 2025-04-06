// src/pages/Settings.tsx

import React from 'react';
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

      <div  className={`container my-5 mx-auto px-4 py-8 rounded-2xl shadow-lg border transition-all hover:scale-[1.01] hover:shadow-xl cursor-pointer ${
        theme === 'dark'
          ? 'bg-dark-card-bg border-dark-border text-dark-text'
          : 'bg-light-card-bg border-light-border text-light-text'
      }`} >
        <div className="rounded-lg shadow-sm p-6 ">
          <h2 className="text-lg font-semibold mb-4">Theme</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme === 'light'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
