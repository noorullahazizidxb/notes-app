import { useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Lightbulb, LogOut, NotebookPen, X } from 'lucide-react';
import { useNotesStore } from '../../../store/notesStore';
import { useAuthStore } from '../../../store/authStore';
import { NAV_ITEMS } from '../../../constants/nav';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import { useIsActiveRoute } from '../../../hooks/useIsActiveRoute';
import { useSignOut } from '../../../hooks/useSignOut';
import { getInitials } from '../../../utils/initials';
import BrandLogo from '../../BrandLogo';
import ThemeSelector from '../../ThemeSelector';
import IconButton from '../../ui/IconButton';
import DataModeBadge from '../navbar/DataModeBadge';
import { DRAWER_ID } from '../navbar/Navbar';

/** Mobile navigation drawer: modal dialog with focus trap, Esc/overlay close. */
const Drawer = () => {
  const open = useNotesStore((s) => s.drawerOpen);
  const setDrawerOpen = useNotesStore((s) => s.setDrawerOpen);
  const user = useAuthStore((s) => s.user);
  const signOut = useSignOut();
  const isActive = useIsActiveRoute();
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);

  useEscapeKey(close, open);
  useFocusTrap(panelRef, open);
  useLockBodyScroll(open);

  // Close on navigation and when the viewport grows past the mobile breakpoint.
  useEffect(close, [pathname, close]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const onChange = () => media.matches && close();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [close]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            ref={panelRef}
            id={DRAWER_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col border-r border-border bg-nav-bg shadow-elevated"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Link to="/notes" aria-label="DevMinds Notes — dashboard">
                <BrandLogo className="h-8" />
              </Link>
              <IconButton label="Close navigation menu" onClick={close}>
                <X className="h-4 w-4" />
              </IconButton>
            </div>

            <div className="flex items-center gap-3 px-5 py-4">
              <span className="bg-accent-subtle flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-accent">
                {getInitials(user?.name, user?.email)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-text">{user?.name ?? 'User'}</p>
                <p className="truncate text-xs text-muted">{user?.email}</p>
              </div>
              <DataModeBadge />
            </div>

            <div className="px-5">
              <Link
                to="/editor"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent transition hover:bg-accent-hover"
              >
                <NotebookPen className="h-4 w-4" aria-hidden="true" />
                New note
              </Link>
            </div>

            <nav aria-label="Primary" className="mt-4 flex-1 overflow-y-auto px-3">
              <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Menu</p>
              <ul className="space-y-1">
                {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
                  const active = isActive(to);
                  return (
                    <li key={to}>
                      <Link
                        to={to}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                          active
                            ? 'bg-accent-subtle text-accent'
                            : 'text-text hover:bg-card-bg'
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {label}
                        {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-4 border-t border-border px-5 py-4">
              <div className="flex gap-3 rounded-2xl bg-card-bg p-3 text-sm text-muted">
                <Lightbulb className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <p>Use #hashtags inside notes to auto-capture topic tags.</p>
              </div>
              <ThemeSelector />
              <button
                type="button"
                onClick={signOut}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
