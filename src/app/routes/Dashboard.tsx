// src/pages/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { useNotesStore } from '../../store/notesStore';
import { Note } from '../../types/note';
import NoteCard from '../../components/NoteCard';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { notes, deleteNote, toggleFavorite, addNote, theme } = useNotesStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [localNotes, setLocalNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load notes from store on initial render
    if (notes.length > 0) {
      setLocalNotes(notes);
    }
  }, [notes]);

  const handleTagAdd = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleAddNote = async () => {
    const newNote = await addNote({
      title,
      content,
      tags,
      isFavorite: false,
    });
    // Notes will be automatically updated in the store and local state
    setTitle('');
    setContent('');
    setTags([]);
  };

  return (
    <div className="p-6 space-y-10">
      <div className="space-y-4">
        <input
          className="w-full px-4 py-2 rounded-lg border shadow text-lg text"
          placeholder="Note Title"
          value={title}
          type='text'
          onChange={(e) => setTitle(e.target.value)}
        />

        <ReactQuill value={content} onChange={setContent} theme="snow" />

        <div className="flex gap-2 items-center">
          <input
            className="px-3 py-1 border rounded"
            value={tagInput}
            placeholder="Add tag"
            type='text'
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTagAdd()}
          />
          <button
            onClick={handleTagAdd}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Tag
          </button>
        </div>

        <button
          onClick={handleAddNote}
          className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <AnimatePresence>
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1, // Stagger animations by 0.1s
                ease: "easeOut"
              }}
            >
              <NoteCard
                note={note}
                onDelete={() => deleteNote(note.id)}
                onToggleFavorite={() => toggleFavorite(note.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={() => navigate('/editor')}
        className="fixed bottom-4 right-4 bg-primary-600 text-white rounded-full p-3 shadow-lg hover:bg-primary-700 transition-colors"
        title="New Note"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default Dashboard;


