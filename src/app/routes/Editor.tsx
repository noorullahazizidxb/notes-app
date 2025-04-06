import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotesStore } from '../../store/notesStore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { extractTagsFromHTML } from '../../utils/extractTags';
import debounce from 'lodash/debounce';

const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { notes, updateNote, addNote } = useNotesStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const isEditMode = !!id;

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (updatedContent: string) => {
      if (!title && !updatedContent) return;

      const parsedTags = extractTagsFromHTML(updatedContent);
      const allTags = Array.from(new Set([...tags, ...parsedTags]));

      const payload = { title, content: updatedContent, tags: allTags, isFavorite };

      if (isEditMode) {
        await updateNote(id!, payload);
      } else {
        const newNote = await addNote({
          ...payload,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        if (newNote) {
          navigate(`/editor/${newNote.id}`, { replace: true });
        }
      }
      setLastSaved(new Date());
    }, 1000), // Save after 1 second of inactivity
    [title, tags, isFavorite, isEditMode, id, updateNote, addNote, navigate]
  );

  const handleContentChange = (value: string) => {
    setContent(value);
    debouncedSave(value); // Trigger debounced save
  };

  const handleTagAddClick = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (isEditMode) {
      updateNote(id!, { isFavorite: !isFavorite });
    }
  };

  useEffect(() => {
    if (id) {
      const note = notes.find((n) => n.id === id);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setTags(note.tags);
        setIsFavorite(note.isFavorite);
      }
    }
  }, [id, notes]);

  return (
    <div className="p-6 space-y-10">
      <div className="space-y-4">
        <input
          className="w-full border rounded"
          placeholder="Note Title"
          value={title}
          onChange={handleInputChange(setTitle)}
        />

        <ReactQuill 
          value={content} 
          onChange={handleContentChange} // Use debounced save
          theme="snow" 
        />

        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <input
              className="border rounded"
              value={tagInput}
              placeholder={isEditMode ? "Update tag" : "Add tag"}
              type='text'
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              onClick={handleTagAddClick}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {isEditMode ? 'Update Tag' : 'Add Tag'}
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-button-hover rounded-full text-sm text-text"
                >
                  {tag}
                  <button
                    onClick={() => handleTagRemove(tag)}
                    className="ml-2 text-text hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center gap-2"
          >
            Back
          </button>
          <button
            onClick={handleToggleFavorite}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
          >
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <button
            onClick={() => { debouncedSave(content); navigate('/'); }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"
          >
            {isEditMode ? 'Update' : 'Add'}
          </button>
        </div>

        {lastSaved && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Editor;