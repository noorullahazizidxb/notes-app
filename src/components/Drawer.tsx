import React from 'react';
import { useNotesStore } from '../store/notesStore';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Drawer = () => {
  const { drawerOpen, setDrawerOpen, theme } = useNotesStore();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', to: '/', icon: '📋' },
    { label: 'Editor', to: '/editor', icon: '📝' },
    { label: 'Favorites', to: '/favorites', icon: '⭐' },
    { label: 'Settings', to: '/settings', icon: '⚙️' }
  ];

  return (
    <>
      {/* Drawer backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer content */}
      <div
        className={`fixed left-0 top-20 bottom-0 w-64 transform transition-transform duration-300 ${
          drawerOpen 
            ? 'translate-x-0' 
            : '-translate-x-full'
        } z-50 border-r dark:border-dark-border border-light-border`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex flex-col flex-grow bg-light-base dark:bg-dark-base">
            <button
              onClick={() => setDrawerOpen(false)}
              className={`absolute top-4 right-4 transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-500' 
                  : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className={`text-xl font-bold mb-4 text-light-text dark:text-dark-text 
                ${  theme === 'dark' 
                    ? 'text-gray-400 hover:text-gray-500' 
                    : 'text-gray-600 hover:text-gray-700'
                    
                    }`}>
              Navigation
            </h2>

            <nav className="space-y-2 flex-grow">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.to);
                    setDrawerOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors w-full ${
                    drawerOpen 
                      ? 'hover:bg-light-hover dark:hover:bg-dark-hover' 
                      : 'hover:bg-transparent'
                  }`}
                >
                  <span className="text-xl text-light-text dark:text-dark-text">
                    {item.icon}
                  </span>
                  <span className={`${theme === 'dark' 
                  ? 'text-gray-400 hover:text-white-500' 
                  : 'text-gray-600 hover:text-white-700'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
