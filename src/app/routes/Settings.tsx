import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Download, LogOut, Monitor, MoonStar, Palette, Sun, Upload, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNotesStore, type ThemeMode } from '../../store/notesStore';
import { useAuthStore } from '../../store/authStore';
import type { Note } from '../../types/note';

const THEME_OPTIONS: Array<{
  value: ThemeMode;
  label: string;
  description: string;
  icon: typeof Sun;
}> = [
  {
    value: 'light',
    label: 'Light theme',
    description: 'Crisp blue, cyan, and violet palette from the light brand logo.',
    icon: Sun,
  },
  {
    value: 'dark',
    label: 'Dark theme',
    description: 'Warm orange and amber on charcoal from the dark brand logo.',
    icon: MoonStar,
  },
  {
    value: 'system',
    label: 'System match',
    description: 'Automatically adjust based on your operating system preferences.',
    icon: Monitor,
  },
];

export const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme, dataMode, notes, clearNotes } = useNotesStore();
  const { user, clearAuth } = useAuthStore();
  const importRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

  const handleLogout = () => {
    clearAuth();
    clearNotes();
    navigate('/login', { replace: true });
    toast.success('Signed out.');
  };

  const handleExport = () => {
    const json = JSON.stringify(notes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${notes.length} notes.`);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const text = await file.text();
      const parsed: unknown = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error('File must contain a JSON array of notes.');
      const { addNote } = useNotesStore.getState();
      let count = 0;
      for (const raw of parsed as Partial<Note>[]) {
        if (typeof raw.title === 'string' || typeof raw.content === 'string') {
          await addNote({
            title: raw.title ?? 'Imported note',
            content: raw.content ?? '<p></p>',
            tags: Array.isArray(raw.tags) ? raw.tags : [],
            isFavorite: raw.isFavorite ?? false,
          });
          count++;
        }
      }
      toast.success(`Imported ${count} notes.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Import failed.');
    } finally {
      setImporting(false);
      if (importRef.current) importRef.current.value = '';
    }
  };

  return (
    <section className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-paper p-6 sm:p-8 shadow-sm">
        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-paper-elevated px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <Palette className="h-3.5 w-3.5 text-accent" />
            <span>Preferences</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-text">Workspace Settings</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
            Manage your interface appearance, user profile, and data portability.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Theme Settings (Light / Dark / System) */}
        <div className="rounded-2xl border border-border bg-paper p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-accent" />
            <h2 className="font-display text-xl font-bold text-text">Appearance</h2>
          </div>
          <p className="text-xs text-text-muted">
            Select your preferred visual mode or let your operating system decide.
          </p>

          <div className="space-y-2.5 pt-1">
            {THEME_OPTIONS.map(({ value, label, description, icon: Icon }) => {
              const isSelected = theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value)}
                  className={`flex w-full items-start gap-3.5 rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/10 shadow-xs'
                      : 'border-border bg-paper-elevated/40 hover:border-accent/40 hover:bg-paper-elevated'
                  }`}
                >
                  <div
                    className={`mt-0.5 rounded-lg p-2 ${
                      isSelected
                        ? 'bg-accent text-accent-text'
                        : 'bg-paper text-text-muted'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold ${
                        isSelected ? 'text-accent font-bold' : 'text-text'
                      }`}
                    >
                      {label}
                    </p>
                    <p className="mt-0.5 text-xs text-text-muted leading-relaxed">
                      {description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Account Info */}
        <div className="rounded-2xl border border-border bg-paper p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-accent" />
            <h2 className="font-display text-xl font-bold text-text">Account</h2>
          </div>
          <p className="text-xs text-text-muted">
            Your current active user session details and authentication status.
          </p>

          <div className="rounded-xl border border-border bg-paper-elevated/60 p-4 space-y-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                User Name
              </p>
              <p className="text-sm font-semibold text-text">{user?.name ?? 'Anonymous User'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                Email Address
              </p>
              <p className="text-sm font-mono text-text/80">{user?.email ?? 'offline@workspace.local'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out of session</span>
          </button>
        </div>

        {/* Data Mode / Sync */}
        <div className="rounded-2xl border border-border bg-paper p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-accent" />
            <h2 className="font-display text-xl font-bold text-text">Data Storage</h2>
          </div>
          <p className="text-xs text-text-muted">
            Status of local cache and backend cloud persistence.
          </p>

          <div className="rounded-xl border border-border bg-paper-elevated/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-text-muted">Persistence Layer</span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  dataMode === 'api'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    dataMode === 'api' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                {dataMode === 'api' ? 'Cloud Synced' : 'Local Offline Storage'}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-text-muted">
              {dataMode === 'api'
                ? 'Your notes are synchronized with the database and safely accessible across devices.'
                : 'Your notes are safely preserved in browser local storage and will sync automatically when the API is available.'}
            </p>
          </div>
        </div>

        {/* Import & Export */}
        <div className="rounded-2xl border border-border bg-paper p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-accent" />
            <h2 className="font-display text-xl font-bold text-text">Data Portability</h2>
          </div>
          <p className="text-xs text-text-muted">
            Back up your notes to a JSON file or restore from a previous backup anytime.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={handleExport}
              disabled={notes.length === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-text transition hover:bg-accent-hover shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>Export Notes {notes.length > 0 ? `(${notes.length})` : ''}</span>
            </button>

            <button
              type="button"
              onClick={() => importRef.current?.click()}
              disabled={importing}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-paper px-4 py-2.5 text-sm font-semibold text-text transition hover:border-accent hover:text-accent shadow-xs disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload className="h-4 w-4" />
              <span>{importing ? 'Importing…' : 'Import JSON'}</span>
            </button>

            <input
              ref={importRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => void handleImport(e)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
