import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import RichTextEditor from '../../components/RichTextEditor';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import EditorHeader from '../../components/editor/EditorHeader';
import EditorTagBar from '../../components/editor/EditorTagBar';
import { useNotesStore } from '../../store/notesStore';
import { extractTagsFromHTML } from '../../utils/extractTags';
import { mergeTags } from '../../utils/tags';

const countWords = (html: string): number => {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(/\s+/).length : 0;
};

export const Editor = () => {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const { notes, addNote, updateNote, deleteNote } = useNotesStore();

  const existingNote = useMemo(
    () => (params.id ? notes.find((n) => n.id === params.id) ?? null : null),
    [notes, params.id]
  );

  const [noteId, setNoteId] = useState<string | null>(params.id ?? null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p></p>');
  const [tags, setTags] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const saveTimerRef = useRef<number | null>(null);

  // Snapshot refs to avoid stale closures in debounced saves
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

  // Hydrate state from existing note
  useEffect(() => {
    if (params.id && !existingNote) return;

    if (existingNote) {
      setNoteId(existingNote.id);
      setTitle(existingNote.title);
      setContent(existingNote.content || '<p></p>');
      setTags(existingNote.tags);
      setIsFavorite(existingNote.isFavorite);
    } else {
      setNoteId(null);
      setTitle('');
      setContent('<p></p>');
      setTags([]);
      setIsFavorite(false);
    }
    setLastSaved(null);
    setIsDirty(false);
  }, [existingNote, params.id]);

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
    } catch {
      toast.error('Failed to save note.');
    } finally {
      setIsSaving(false);
    }
  }, [addNote, updateNote, navigate]);

  // Debounced auto-save triggers ~1.2s after user stops typing
  const triggerAutoSave = useCallback(() => {
    setIsDirty(true);
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      void saveNow();
    }, 1200);
  }, [saveNow]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    triggerAutoSave();
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    triggerAutoSave();
  };

  const handleAddTag = (newTag: string) => {
    const next = mergeTags([...tags, newTag]);
    setTags(next);
    tagsRef.current = next;
    triggerAutoSave();
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const next = tags.filter((t) => t !== tagToRemove);
    setTags(next);
    tagsRef.current = next;
    triggerAutoSave();
  };

  const handleToggleFavorite = () => {
    const next = !isFavorite;
    setIsFavorite(next);
    isFavoriteRef.current = next;
    triggerAutoSave();
  };

  const handleDelete = async () => {
    if (!noteId) {
      navigate('/notes');
      return;
    }
    await deleteNote(noteId);
    navigate('/notes');
  };

  const wordCount = useMemo(() => countWords(content), [content]);

  return (
    <section className="space-y-6">
      {/* Top Header */}
      <EditorHeader
        onBack={() => navigate('/notes')}
        isSaving={isSaving}
        isDirty={isDirty}
        lastSaved={lastSaved}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onDelete={() => setShowDeleteModal(true)}
        onSave={() => void saveNow()}
        wordCount={wordCount}
      />

      {/* Title Input */}
      <div>
        <label htmlFor="editor-title" className="sr-only">
          Note title
        </label>
        <input
          id="editor-title"
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Untitled note"
          className="w-full bg-transparent font-display text-3xl sm:text-4xl font-bold text-text placeholder:text-text-muted/50 focus:outline-none"
        />
      </div>

      {/* Tags Bar */}
      <EditorTagBar
        tags={tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
      />

      {/* TipTap Rich Text Area */}
      <RichTextEditor
        value={content}
        onChange={handleContentChange}
        placeholder="Tip: Type #hashtags anywhere in your notes to automatically tag topics."
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          title={title || 'Untitled note'}
          onConfirm={() => {
            setShowDeleteModal(false);
            void handleDelete();
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </section>
  );
};

export default Editor;
