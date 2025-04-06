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
            ? 'translate-x-0 z-50' 
            : '-translate-x-full'
        } z-50 border-r border-border bg-bg`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex flex-col flex-grow bg-bg">
            <button
              onClick={() => setDrawerOpen(false)}
              title="Close Drawer"
              className={`absolute top-4 right-4 transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-500' 
                  : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className={`text-xl font-bold mb-4 text-text`}>Navigation</h2>

            <nav className="space-y-2 flex-grow">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.to);
                    setDrawerOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors w-full ${
                    theme === 'dark'
                      ? 'hover:bg-white hover:text-black'
                      : 'hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <span className="text-xl text-text">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <style>{`
        .navbar {
          z-index: ${drawerOpen ? 0 : 50};
        }
        .dashboard {
          z-index: ${drawerOpen ? 50 : 0};
        }
      `}</style>
    </>
  );
};

export default Drawer;
