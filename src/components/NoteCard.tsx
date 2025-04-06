// src/components/NoteCard.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotesStore } from '../store/notesStore';
import { Note } from '../types/note';
import { motion } from 'framer-motion';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const extractTagsFromHTML = (html: string): string[] => {
  const tagRegex = /#(\w+)/g;
  const matches = html.match(tagRegex);
  return matches ? Array.from(new Set(matches.map((tag) => tag.slice(1)))) : [];
};

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onToggleFavorite }) => {
  const { theme } = useNotesStore();
  const navigate = useNavigate();
  const dynamicTags = extractTagsFromHTML(note.content);

  return (
    <motion.div
      className={`p-5 rounded-2xl shadow-lg border transition-all hover:scale-[1.01] hover:shadow-xl cursor-pointer ${
        theme === 'dark'
          ? 'bg-card-bg border-border text-text'
          : 'bg-card-bg border-border text-text'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold line-clamp-1">{note.title || 'Untitled'}</h3>
        <motion.button
          whileTap={{ scale: 1.3 }}
          onClick={() => onToggleFavorite(note.id)}
          className="p-1 text-yellow-400"
        >
          {note.isFavorite ? '★' : '☆'}
        </motion.button>
      </div>

      <div
        className="prose prose-sm dark:prose-invert line-clamp-4 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-3 py-1 rounded-full font-medium bg-card-bg text-text`}
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigate(`/editor/${note.id}`)}
          className="p-2 rounded-full hover:bg-primary-100 transition-colors"
        >
          ✏️
        </button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(note.id)}
          className="p-2 rounded-full hover:bg-red-100 transition-colors"
        >
          🗑️
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NoteCard;
