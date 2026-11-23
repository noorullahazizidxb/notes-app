import { AnimatePresence, m } from 'framer-motion';
import type { Note } from '../types/note';
import { LIFT, SPRING, listItem } from '../lib/motion/tokens';
import NoteCard from './NoteCard';

type NoteGridProps = {
  notes: Note[];
  activeTag: string | null;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onOpen: (id: string) => void;
  onTagClick: (tag: string) => void;
};

/** Responsive card grid; cards reflow smoothly as filters, sorting or favorites change. */
export const NoteGrid = ({ notes, ...cardHandlers }: NoteGridProps) => (
  <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <AnimatePresence mode="popLayout">
      {notes.map((note, index) => (
        <m.li
          key={note.id}
          layout
          custom={index}
          variants={listItem}
          initial="hidden"
          animate="show"
          exit="exit"
          whileHover={LIFT}
          transition={SPRING.gentle}
          className="h-full"
        >
          <NoteCard note={note} {...cardHandlers} />
        </m.li>
      ))}
    </AnimatePresence>
  </ul>
);

export default NoteGrid;
