import { useCallback, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useSignOut } from '../../../hooks/useSignOut';
import { getInitials } from '../../../utils/initials';

const UserMenu = () => {
  const user = useAuthStore((s) => s.user);
  const signOut = useSignOut();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);
  const closeAndRefocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useOnClickOutside(containerRef, close);
  useEscapeKey(closeAndRefocus, open);

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="bg-accent-subtle bg-accent-subtle-hover flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-accent transition"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
      >
        {getInitials(user?.name, user?.email)}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="absolute right-0 top-12 z-50 w-60 origin-top-right rounded-2xl border border-border bg-paper-elevated p-2 shadow-elevated"
          >
            <div className="px-3 py-2">
              <p className="truncate text-sm font-semibold text-text">{user?.name ?? 'User'}</p>
              <p className="truncate text-xs text-muted">{user?.email}</p>
            </div>
            <div className="my-1 border-t border-border" />
            <Link
              role="menuitem"
              to="/settings"
              onClick={close}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-text transition hover:bg-card-bg"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              Settings
            </Link>
            <button
              role="menuitem"
              type="button"
              onClick={() => {
                close();
                signOut();
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
