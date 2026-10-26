import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { useNotesStore } from '../../store/notesStore';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

export const AccountMenu = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const { clearNotes } = useNotesStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(menuRef, () => setIsOpen(false), true);

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
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-paper font-semibold text-accent shadow-sm transition hover:border-accent hover:bg-paper-elevated focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        <span className="text-xs">{initials}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          className="absolute right-0 top-11 z-50 w-60 overflow-hidden rounded-2xl border border-border bg-paper p-1.5 shadow-xl transition-all"
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
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-text transition hover:bg-paper-elevated"
            >
              <Settings className="h-4 w-4 text-text-muted" />
              <span>Settings</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
