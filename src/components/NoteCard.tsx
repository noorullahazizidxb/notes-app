import { useState } from 'react';
import { Heart, PencilLine, Trash2 } from 'lucide-react';
import type { Note } from '../types/note';
import DeleteConfirmModal from './DeleteConfirmModal';

type NoteCardProps = {
  note: Note;
  activeTag: string | null;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onOpen: (id: string) => void;
  onTagClick: (tag: string) => void;
};

const stripHtml = (html: string): string =>
  html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const formatDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const NoteCard = ({ note, activeTag, onDelete, onToggleFavorite, onOpen, onTagClick }: NoteCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const preview = stripHtml(note.content) || 'Start writing your ideas…';

  return (
    <>
      <article className="group relative overflow-hidden rounded-2xl border border-border bg-card-bg p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[color:var(--color-accent)] via-[color:var(--color-accent-soft)] to-[color:var(--color-accent)] opacity-70" />

        <div className="mb-4 flex items-start justify-between gap-3">
          <button type="button" onClick={() => onOpen(note.id)} className="text-left">
            <h3 className="line-clamp-1 font-display text-xl text-text">{note.title || 'Untitled note'}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text/55">
              Updated {formatDate(note.updatedAt)}
            </p>
          </button>

          <button
            type="button"
            onClick={() => onToggleFavorite(note.id)}
            className={`rounded-lg p-2 transition ${
              note.isFavorite ? 'bg-amber-400/20 text-amber-500' : 'text-text/45 hover:bg-card-bg hover:text-amber-500'
            }`}
            aria-label={note.isFavorite ? 'Remove favorite' : 'Mark as favorite'}
          >
            <Heart className="h-4 w-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <button type="button" onClick={() => onOpen(note.id)} className="mb-4 w-full text-left">
          <p className="line-clamp-4 text-sm leading-6 text-text/75">{preview}</p>
        </button>

        {note.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {note.tags.slice(0, 4).map((tag) => (
              <button
                key={`${note.id}-${tag}`}
                type="button"
                onClick={() => onTagClick(tag)}
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                  activeTag === tag
                    ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)]'
                    : 'border-border text-text/65 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpen(note.id)}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-text transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
          >
            <PencilLine className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-rose-500 transition hover:bg-rose-500 hover:text-white"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </article>

      {showDeleteModal && (
        <DeleteConfirmModal
          title={note.title || 'Untitled note'}
          onConfirm={() => {
            setShowDeleteModal(false);
            onDelete(note.id);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default NoteCard;

