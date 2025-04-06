import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotesStore } from '../store/notesStore';
import { Menu} from 'lucide-react';
import brandLogo from '../utils/brand.png';

interface NavbarButton {
  icon: React.ReactNode;
  onClick: () => void;
  showInRoutes: string[];
  isActive?: boolean;
  title?: string;
}

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, setDrawerOpen,drawerOpen } = useNotesStore();

  const buttons: NavbarButton[] = [
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => navigate('/editor'),
      showInRoutes: ['/notes', '/favorites', '/settings', '/'],
      isActive: pathname === '/editor',
      title: 'New Note'
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => navigate('/favorites'),
      showInRoutes: ['/notes', '/editor', '/settings', '/'],
      isActive: pathname === '/favorites',
      title: 'Favorites'
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.533 1.533 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.533 1.533 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.533 1.533 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => navigate('/settings'),
      showInRoutes: ['/notes', '/editor', '/favorites', '/'],
      isActive: pathname === '/settings',
      title: 'Settings'
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          {theme === 'dark' ? (
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          ) : (
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
          )}
        </svg>
      ),
      onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
      showInRoutes: ['/notes', '/editor', '/favorites', '/settings', '/'],
      title: theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg border-b border-border z-50">
      <div className="container mx-auto px-4">
 
        <div className="flex justify-between items-center h-20">
       {!drawerOpen ? <button
        onClick={() => setDrawerOpen(true)}
        className="m-4 text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg"
      >
        <Menu className="w-5 h-5 inline mr-2" />
        Open Menu
      </button>:''} 
          <div className="flex items-center">
            <span className="text-xl font-bold text-text">Noorullah Azizi's Example App a NoteBook</span>
          </div>
          <div className="flex items-center space-x-4">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className={`p-2 rounded-full border transition-colors ${
                  button.isActive
                    ? 'bg-light-accent dark:bg-dark-accent'
                    : 'hover:bg-red-500 hover:text-white dark:hover:bg-white dark:hover:text-black'
                }`}
                style={{
                  display: button.showInRoutes.includes(pathname) ? 'block' : 'none',
                }}
                title={button.title}
              >
                {button.icon}
              </button>
            ))}
            <img src={brandLogo} alt="Brand Logo" className="h-8 w-auto" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
