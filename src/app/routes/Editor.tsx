import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Star, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import RichTextEditor from '../../components/RichTextEditor';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import { useNotesStore } from '../../store/notesStore';
import { extractTagsFromHTML } from '../../utils/extractTags';
import { mergeTags } from '../../utils/tags';

const countWords = (html: string): number => {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
};

const Editor = () => {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const { notes, addNote, updateNote, dataMode, deleteNote } = useNotesStore();

  const note = useMemo(
    () => (params.id ? (notes.find((n) => n.id === params.id) ?? null) : null),
    [notes, params.id]
  );

  const [noteId, setNoteId] = useState<string | null>(params.id ?? null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p></p>');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [didHydrate, setDidHydrate] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const saveTimerRef = useRef<number | null>(null);

  // Snapshot refs used inside the debounced save to avoid stale closures
  const titleRef = useRef(title);
  const contentRef = useRef(content);
  const tagsRef = useRef(tags);
  const isFavoriteRef = useRef(isFavorite);
  const noteIdRef = useRef(noteId);

  titleRef.current = title;
  contentRef.current = content;
  tagsRef.current = tags;
  isFavoriteRef.current = isFavorite;
  noteIdRef.current = noteId;

  useEffect(() => {
    if (params.id && !note) return;

    if (note) {
      setNoteId(note.id);
      setTitle(note.title);
      setContent(note.content || '<p></p>');
      setTags(note.tags);
      setIsFavorite(note.isFavorite);
    } else {
      setNoteId(null);
      setTitle('');
      setContent('<p></p>');
      setTags([]);
      setIsFavorite(false);
    }
    setLastSaved(null);
    setIsDirty(false);
    setDidHydrate(true);
  }, [note, params.id]);

  const saveNow = useCallback(async (): Promise<void> => {
    const titleValue = titleRef.current.trim() || 'Untitled note';
    const htmlTags = extractTagsFromHTML(contentRef.current).map((t) => t.toLowerCase());
    const merged = mergeTags([...tagsRef.current, ...htmlTags]);

    setIsSaving(true);
    try {
      if (noteIdRef.current) {
        await updateNote(noteIdRef.current, {
          title: titleValue,
          content: contentRef.current,
          tags: merged,
          isFavorite: isFavoriteRef.current,
        });
      } else {
        const created = await addNote({
          title: titleValue,
          content: contentRef.current,
          tags: merged,
          isFavorite: isFavoriteRef.current,
        });
        setNoteId(created.id);
        noteIdRef.current = created.id;
        navigate(`/editor/${created.id}`, { replace: true });
      }
      setTags(merged);
      tagsRef.current = merged;
      setLastSaved(new Date());
      setIsDirty(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save note.');
    } finally {
      setIsSaving(false);
    }
  }, [addNote, updateNote, navigate]);

  useEffect(() => {
    if (!didHydrate || !isDirty) return;
    if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => { void saveNow(); }, 850);
    return () => { if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current); };
  }, [title, content, tags, isFavorite, isDirty, didHydrate, saveNow]);

  const setTagList = (next: string[]) => { setTags(mergeTags(next)); setIsDirty(true); };

  const handleTagAdd = () => {
    if (!tagInput.trim()) return;
    setTagList([...tags, tagInput]);
    setTagInput('');
  };

  const handleDelete = async () => {
    if (noteId) await deleteNote(noteId);
    navigate('/notes');
  };

  const wordCount = useMemo(() => countWords(content), [content]);

  if (params.id && !note) {
    return (
      <section className="rounded-2xl border border-border bg-card-bg p-10 text-center">
        <h1 className="font-display text-3xl text-text">This note does not exist</h1>
        <p className="mt-2 text-sm text-text/70">It may have been deleted or not synced yet.</p>
        <button
          type="button"
          onClick={() => navigate('/notes')}
          className="mt-5 rounded-xl bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white"
        >
          Back to notes
        </button>
      </section>
    );
  }

  return (
    <>
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/notes')}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card-bg px-3 py-2 text-sm font-medium text-text transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
                dataMode === 'api'
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
              }`}
            >
              {dataMode === 'api' ? 'Cloud save' : 'Local save'}
            </span>
            <button
              type="button"
              onClick={() => { setIsFavorite((v) => !v); setIsDirty(true); }}
              className={`rounded-xl border border-border px-3 py-2 text-sm font-medium transition ${
                isFavorite ? 'bg-amber-500/20 text-amber-600' : 'bg-card-bg text-text hover:text-amber-500'
              }`}
            >
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
                Favorite
              </span>
            </button>
            <button
              type="button"
              onClick={() => void saveNow()}
              disabled={isSaving}
              className="inline-flex items-center gap-1 rounded-xl bg-[color:var(--color-accent)] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-[color:var(--color-paper)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-7">
          <div className="space-y-4">
            <input
              value={title}
              onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }}
              placeholder="Untitled note"
              className="w-full border-b border-border bg-transparent pb-3 font-display text-3xl text-text placeholder:text-text/35 focus:border-[color:var(--color-accent)] focus:outline-none"
            />

            <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-card-bg p-3">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleTagAdd(); } }}
                className="min-w-[180px] flex-1 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text/45 focus:border-[color:var(--color-accent)] focus:outline-none"
                placeholder="Add tag (press Enter)"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
              >
                Add
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTagList(tags.filter((t) => t !== tag))}
                  className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-text/70 transition hover:border-rose-500/50 hover:text-rose-500"
                  title="Remove tag"
                >
                  #{tag} ×
                </button>
              ))}
            </div>

            <RichTextEditor
              value={content}
              onChange={(next) => { setContent(next); setIsDirty(true); }}
              placeholder="Write naturally. Add #tags in the text and they'll be auto-captured."
            />

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.15em] text-text/55">
              <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
              <span>
                {isSaving
                  ? 'Saving…'
                  : isDirty
                  ? 'Unsaved changes'
                  : lastSaved
                  ? `Saved ${lastSaved.toLocaleTimeString()}`
                  : 'Not saved yet'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/35 px-3 py-2 text-sm font-semibold text-rose-500 transition hover:bg-rose-500 hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
            Delete note
          </button>
        </div>
      </section>

      {showDeleteModal && (
        <DeleteConfirmModal
          title={title || 'Untitled note'}
          onConfirm={() => { setShowDeleteModal(false); void handleDelete(); }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default Editor;

