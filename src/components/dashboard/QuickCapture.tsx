import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotesStore } from '../../store/notesStore';

const inputClass =
  'w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none';

const QuickCapture = () => {
  const navigate = useNavigate();
  const addNote = useNotesStore((s) => s.addNote);
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);

  const create = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const created = await addNote({
        title: title || 'Untitled note',
        content: '<p></p>',
        tags: [],
        isFavorite: false,
      });
      setTitle('');
      navigate(`/editor/${created.id}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      className="space-y-3 rounded-2xl border border-border bg-card-bg p-4 sm:p-5"
      onSubmit={(e) => {
        e.preventDefault();
        void create();
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Quick capture</p>
      <label htmlFor="quick-title" className="block text-sm font-medium text-text">
        Title
      </label>
      <input
        id="quick-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What are you thinking about?"
        className={inputClass}
      />
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent transition hover:bg-accent-hover disabled:opacity-60"
      >
        Create and open editor
      </button>
      <button
        type="button"
        onClick={() => navigate('/editor')}
        className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-text transition hover:border-accent hover:text-accent"
      >
        Open blank editor
      </button>
    </form>
  );
};

export default QuickCapture;
