import { Link, useNavigate } from 'react-router-dom';
import { Menu, Plus } from 'lucide-react';
import { useNotesStore } from '../store/notesStore';
import BrandLogo from './BrandLogo';
import ThemeToggle from './ThemeToggle';
import SkipLink from './navbar/SkipLink';
import NavLinks from './navbar/NavLinks';
import AccountMenu from './navbar/AccountMenu';

export const Navbar = () => {
  const navigate = useNavigate();
  const { setDrawerOpen, drawerOpen, dataMode } = useNotesStore();

  return (
    <>
      <SkipLink />
      <header className="sticky top-0 z-40 border-b border-border bg-nav-bg/90 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Zone: Mobile toggle + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="mobile-drawer-trigger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-paper p-2 text-text transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>

            <Link
              to="/notes"
              aria-label="DevMinds Notes home"
              className="flex items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40"
            >
              <BrandLogo className="h-8 sm:h-9" />
            </Link>
          </div>

          {/* Middle Zone: Desktop Navigation */}
          <NavLinks className="hidden md:flex items-center gap-1" />

          {/* Right Zone: DataMode Badge + ThemeToggle + New Note + Account */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Connection mode indicator */}
            <span
              className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide sm:inline-flex ${
                dataMode === 'api'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
              }`}
              title={dataMode === 'api' ? 'Synced with cloud' : 'Offline local storage'}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  dataMode === 'api' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                aria-hidden="true"
              />
              {dataMode === 'api' ? 'Cloud' : 'Local'}
            </span>

            {/* Theme Toggle (3-way Light/Dark/System) */}
            <div className="hidden sm:block">
              <ThemeToggle compact />
            </div>

            {/* New Note Button */}
            <button
              type="button"
              onClick={() => navigate('/editor')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs sm:text-sm font-semibold text-accent-text transition hover:bg-accent-hover shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/40 whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New note</span>
            </button>

            {/* Account Menu */}
            <AccountMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
