import { Link } from 'react-router-dom';
import { Menu, NotebookPen } from 'lucide-react';
import { useNotesStore } from '../../../store/notesStore';
import BrandLogo from '../../BrandLogo';
import ThemeToggle from '../../ThemeToggle';
import IconButton from '../../ui/IconButton';
import DataModeBadge from './DataModeBadge';
import DesktopNav from './DesktopNav';
import UserMenu from './UserMenu';

export const DRAWER_ID = 'app-drawer';

const Navbar = () => {
  const drawerOpen = useNotesStore((s) => s.drawerOpen);
  const setDrawerOpen = useNotesStore((s) => s.setDrawerOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_srgb,var(--color-nav-bg)_85%,transparent)] backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <IconButton
          label="Open navigation menu"
          aria-expanded={drawerOpen}
          aria-controls={DRAWER_ID}
          onClick={() => setDrawerOpen(true)}
          className="md:hidden"
        >
          <Menu className="h-4 w-4" />
        </IconButton>

        <Link to="/notes" aria-label="DevMinds Notes — dashboard" className="flex shrink-0 items-center">
          <BrandLogo className="h-8 sm:h-9" />
        </Link>

        <div className="ml-4 hidden flex-1 md:block">
          <DesktopNav />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <DataModeBadge className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Link
            to="/editor"
            className="hidden items-center gap-1.5 rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-on-accent shadow-sm transition hover:bg-accent-hover sm:inline-flex"
          >
            <NotebookPen className="h-4 w-4" aria-hidden="true" />
            New note
          </Link>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
