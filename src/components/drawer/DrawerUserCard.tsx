import { useAuthStore } from '../../store/authStore';
import { useNotesStore } from '../../store/notesStore';

export const DrawerUserCard = () => {
  const user = useAuthStore((s) => s.user);
  const dataMode = useNotesStore((s) => s.dataMode);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : (user?.email?.[0] ?? '?').toUpperCase();

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-paper p-3.5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text">{user?.name ?? 'My Account'}</p>
        <p className="truncate text-xs text-text-muted">{user?.email ?? 'Offline Workspace'}</p>
      </div>
      <span
        className={`inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
          dataMode === 'api'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
        }`}
      >
        {dataMode === 'api' ? 'Cloud' : 'Local'}
      </span>
    </div>
  );
};

export default DrawerUserCard;
