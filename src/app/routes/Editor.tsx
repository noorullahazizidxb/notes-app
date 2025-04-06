import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotesStore } from '../../store/notesStore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import debounce from 'lodash/debounce';
import { extractTagsFromHTML } from '../../utils/extractTags';

const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { notes, updateNote, addNote, addTag, removeTag } = useNotesStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const isEditMode = !!id;

  const handleSave = () => {
    if (!title && !content) return;

    const parsedTags = extractTagsFromHTML(content);
    const allTags = Array.from(new Set([...tags, ...parsedTags]));

    const payload = { title, content, tags: allTags, isFavorite };

    if (isEditMode) {
      updateNote(id!, payload);
    } else {
      const newNote = addNote(payload);
      if (newNote) {
        navigate(`/editor/${newNote.id}`, { replace: true });
      }
    }
    setLastSaved(new Date());
  };

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'onClick' && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        if (isEditMode) {
          setTags([...tags, tagInput.trim()]);
          handleSave();
        } else {
          setTags([...tags, tagInput.trim()]);
          handleSave();
        }
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (tag: string) => {
    if (isEditMode) {
      removeTag(id!, tag);
    } else {
      setTags(tags.filter(t => t !== tag));
      handleSave();
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (isEditMode) {
      updateNote(id!, { isFavorite: !isFavorite });
    } else {
      handleSave();
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
          className="w-full px-4 py-2 rounded-lg border shadow text-lg text-light-text dark:text-dark-text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleSave();
          }}
        />

        <ReactQuill 
          value={content} 
          onChange={(value) => {
            setContent(value);
            handleSave();
          }} 
          theme="snow" 
        />

        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <input
              className="px-3 py-1 border rounded text-light-text dark:text-dark-text"
              value={tagInput}
              placeholder={isEditMode ? "Update tag" : "Add tag"}
              type='text'
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagAdd}
            />
            <button
              onClick={handleTagAdd}
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
                  className="px-3 py-1 bg-light-button-hover dark:bg-dark-hover rounded-full text-sm text-light-text dark:text-dark-text"
                >
                  {tag}
                  <button
                    onClick={() => handleTagRemove(tag)}
                    className="ml-2 text-light-text dark:text-dark-text hover:text-red-500"
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
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
          >
            Back
          </button>
          <button
            onClick={handleToggleFavorite}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
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
