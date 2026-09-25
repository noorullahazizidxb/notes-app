import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Download, LogOut, MoonStar, Palette, Sun, Upload, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNotesStore } from '../../store/notesStore';
import { useAuthStore } from '../../store/authStore';
import type { Note } from '../../types/note';

const Settings = () => {
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
    a.download = `notes-export-${new Date().toISOString().slice(0, 10)}.json`;
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
    <section className="space-y-5">
      <div className="rounded-3xl border border-border bg-[color:var(--color-paper)] p-6 sm:p-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card-bg px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-text/60">
          <Palette className="h-3.5 w-3.5" />
          Preferences
        </p>
        <h1 className="mt-3 font-display text-3xl text-text">Workspace settings</h1>
        <p className="mt-2 max-w-2xl text-sm text-text/70">
          Manage your account, appearance, and data.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Profile */}
        <div className="rounded-2xl border border-border bg-card-bg p-5">
          <h2 className="inline-flex items-center gap-2 font-display text-2xl text-text">
            <User className="h-5 w-5" />
            Account
          </h2>
          <div className="mt-4 rounded-xl border border-border bg-bg p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-text/55">Signed in as</p>
            <p className="mt-1 font-semibold text-text">{user?.name ?? '—'}</p>
            <p className="text-sm text-text/65">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-500/30 px-4 py-2 text-sm font-semibold text-rose-500 transition hover:bg-rose-500 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        {/* Theme */}
        <div className="rounded-2xl border border-border bg-card-bg p-5">
          <h2 className="font-display text-2xl text-text">Theme</h2>
          <p className="mt-1 text-sm text-text/70">Switch between warm daylight and low-light writing mode.</p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                theme === 'light'
                  ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-white'
                  : 'border-border bg-bg text-text hover:border-[color:var(--color-accent)]'
              }`}
            >
              <Sun className="h-4 w-4" />
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                theme === 'dark'
                  ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-white'
                  : 'border-border bg-bg text-text hover:border-[color:var(--color-accent)]'
              }`}
            >
              <MoonStar className="h-4 w-4" />
              Dark
            </button>
          </div>
        </div>

        {/* Data mode */}
        <div className="rounded-2xl border border-border bg-card-bg p-5">
          <h2 className="inline-flex items-center gap-2 font-display text-2xl text-text">
            <Database className="h-5 w-5" />
            Data mode
          </h2>
          <p className="mt-1 text-sm text-text/70">
            Notes are saved through the API when available, with local fallback when offline.
          </p>
          <div className="mt-4 rounded-xl border border-border bg-bg p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-text/55">Current mode</p>
            <p
              className={`mt-2 text-sm font-semibold ${
                dataMode === 'api' ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'
              }`}
            >
              {dataMode === 'api' ? 'Cloud API mode' : 'Local browser mode'}
            </p>
          </div>
        </div>

        {/* Export / Import */}
        <div className="rounded-2xl border border-border bg-card-bg p-5">
          <h2 className="font-display text-2xl text-text">Data portability</h2>
          <p className="mt-1 text-sm text-text/70">
            Export your notes as JSON or import from a previous export.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExport}
              disabled={notes.length === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-text transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Export {notes.length > 0 ? `(${notes.length})` : ''}
            </button>
            <button
              type="button"
              onClick={() => importRef.current?.click()}
              disabled={importing}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-text transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload className="h-4 w-4" />
              {importing ? 'Importing…' : 'Import JSON'}
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

