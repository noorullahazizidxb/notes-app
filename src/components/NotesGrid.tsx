import { AnimatePresence, motion } from 'framer-motion';
import type { Note } from '../types/note';
import NoteCard from './NoteCard';
import SkeletonCard from './SkeletonCard';

type NotesGridProps = {
  notes: Note[];
  isLoading?: boolean;
  activeTag?: string | null;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onTagClick: (tag: string) => void;
};

const GRID = 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3';

const NotesGrid = ({ notes, isLoading, activeTag = null, onOpen, onDelete, onToggleFavorite, onTagClick }: NotesGridProps) => {
  if (isLoading) {
    return (
      <div className={GRID} aria-busy="true" aria-label="Loading notes">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={GRID}>
      <AnimatePresence>
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, delay: Math.min(index, 10) * 0.03 }}
          >
            <NoteCard
              note={note}
              activeTag={activeTag}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
              onOpen={onOpen}
              onTagClick={onTagClick}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotesGrid;
