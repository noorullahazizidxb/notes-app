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
  const { notes, deleteNote, toggleFavorite, addNote, filteredNotes, setSearchQuery } = useNotesStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load notes from store on initial render
    if (notes.length > 0) {
      setTags([]);
    }
  }, [notes]);

  const handleTagAdd = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddNote = async () => {
    await addNote({
      id: crypto.randomUUID(), // Use crypto for unique ID generation
      title,
      content,
      tags,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setTitle('');
    setContent('');
    setTags([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 space-y-10 bg-bg text-text">
      <div className="space-y-4">
       

        <input
          className="w-full border rounded"
          placeholder="Note Title"
          value={title}
          type='text'
          onChange={(e) => setTitle(e.target.value)}
        />

        <ReactQuill value={content} onChange={setContent} theme="snow" />

        <div className="flex gap-2 items-center">
          <input
            className="border rounded"
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

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm hover:bg-blue-300"
              onClick={() => handleTagRemove(tag)}
            >
              {tag} ×
            </button>
          ))}
        </div>

        <button
          onClick={handleAddNote}
          className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>

      <input
          className="w-100 h-10   border rounded"
          placeholder="Search Notes"
          type="text"
          onChange={handleSearchChange}
        />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
 
        <AnimatePresence>
          {filteredNotes().map((note, index) => (
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
        className="fixed bottom-4 right-4 bg-primary-600 text-white rounded-full p-3 shadow-lg hover:bg-button-hover transition-colors"
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


