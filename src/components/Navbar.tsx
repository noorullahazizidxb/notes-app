import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, MoonStar, NotebookPen, Sun, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNotesStore } from '../store/notesStore';
import { useAuthStore } from '../store/authStore';
import { NAV_ITEMS } from '../constants/nav';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, setDrawerOpen, drawerOpen, dataMode, clearNotes } = useNotesStore();
  const { user, clearAuth } = useAuthStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setUserMenuOpen(false));

  const handleLogout = () => {
    clearAuth();
    clearNotes();
    setUserMenuOpen(false);
    navigate('/login', { replace: true });
    toast.success('Signed out.');
  };

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : (user?.email?.[0] ?? '?').toUpperCase();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/80 bg-[color:var(--color-nav-bg)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          {!drawerOpen && (
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="rounded-xl border border-border bg-card-bg p-2 text-text transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}
          <Link to="/notes" className="flex items-center gap-2">
            <span className="rounded-lg bg-[color:var(--color-accent)]/10 p-1.5 text-[color:var(--color-accent)]">
              <NotebookPen className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-lg leading-none text-text">DevMinds Notes</p>
              <p className="hidden text-xs uppercase tracking-[0.16em] text-text/60 sm:block">
                Focused editorial workspace
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.to || (pathname === '/' && item.to === '/notes');
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-[color:var(--color-accent)] text-white shadow-sm'
                    : 'text-text/75 hover:bg-card-bg hover:text-text'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span
            className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide sm:inline-flex ${
              dataMode === 'api'
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
            }`}
          >
            {dataMode === 'api' ? 'Cloud' : 'Local'}
          </span>

          <button
            type="button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="rounded-xl border border-border bg-card-bg p-2 text-text transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => navigate('/editor')}
            className="hidden items-center gap-1 rounded-xl bg-[color:var(--color-accent)] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 sm:inline-flex"
          >
            <NotebookPen className="h-4 w-4" />
            New note
          </button>

          {/* User avatar + dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--color-accent)]/15 text-sm font-semibold text-[color:var(--color-accent)] transition hover:bg-[color:var(--color-accent)]/25"
              aria-label="User menu"
              aria-expanded={userMenuOpen}
            >
              {initials}
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-11 z-50 w-56 rounded-2xl border border-border bg-[color:var(--color-paper)] p-2 shadow-xl">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-text">{user?.name ?? 'User'}</p>
                  <p className="truncate text-xs text-text/55">{user?.email}</p>
                </div>
                <div className="my-1 border-t border-border" />
                <button
                  type="button"
                  onClick={() => { navigate('/settings'); setUserMenuOpen(false); }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-text transition hover:bg-card-bg"
                >
                  <User className="h-4 w-4" />
                  Settings
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-rose-500 transition hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

