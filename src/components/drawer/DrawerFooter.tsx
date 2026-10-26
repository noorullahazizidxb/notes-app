import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { useNotesStore } from '../../store/notesStore';
import ThemeToggle from '../ThemeToggle';

type DrawerFooterProps = {
  onClose: () => void;
};

export const DrawerFooter = ({ onClose }: DrawerFooterProps) => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const clearNotes = useNotesStore((s) => s.clearNotes);

  const handleLogout = () => {
    clearAuth();
    clearNotes();
    onClose();
    navigate('/login', { replace: true });
    toast.success('Signed out.');
  };

  return (
    <div className="space-y-4 border-t border-border pt-4">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Appearance
        </label>
        <ThemeToggle className="w-full justify-between" />
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 px-3.5 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
      >
        <LogOut className="h-4 w-4" />
        <span>Sign out</span>
      </button>
    </div>
  );
};

export default DrawerFooter;
