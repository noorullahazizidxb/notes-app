import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { useNotesStore } from '../../store/notesStore';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { popover } from '../../lib/motion/tokens';

export const AccountMenu = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const { clearNotes } = useNotesStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(menuRef, () => setIsOpen(false), true);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLogout = () => {
    clearAuth();
    clearNotes();
    setIsOpen(false);
    navigate('/login', { replace: true });
    toast.success('Signed out.');
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : (user?.email?.[0] ?? '?').toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={triggerRef}
        type="button"
        id="user-menu-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="User account menu"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-paper font-semibold text-accent shadow-sm transition hover:border-accent hover:bg-paper-elevated active:scale-95"
      >
        <span className="text-xs">{initials}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            variants={popover}
            initial="hidden"
            animate="show"
            exit="exit"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            className="absolute right-0 top-12 z-50 w-60 origin-top-right overflow-hidden rounded-2xl border border-border bg-paper p-1.5 shadow-xl"
          >
            <div className="border-b border-border/80 px-3 py-2.5">
              <p className="truncate text-sm font-semibold text-text">{user?.name ?? 'My Account'}</p>
              <p className="truncate text-xs text-text-muted">{user?.email ?? 'Offline Workspace'}</p>
            </div>

            <div className="py-1">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  navigate('/settings');
                  setIsOpen(false);
                }}
                className="flex min-h-[40px] w-full items-center gap-2.5 rounded-xl px-3 text-sm font-medium text-text transition hover:bg-paper-elevated"
              >
                <Settings className="h-4 w-4 text-text-muted" aria-hidden="true" />
                <span>Settings</span>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex min-h-[40px] w-full items-center gap-2.5 rounded-xl px-3 text-sm font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span>Sign out</span>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountMenu;
