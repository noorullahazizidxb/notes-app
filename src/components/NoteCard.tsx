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

export const NoteCard = ({
  note,
  activeTag,
  onDelete,
  onToggleFavorite,
  onOpen,
  onTagClick,
}: NoteCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const preview = stripHtml(note.content) || 'No additional text in this note…';

  return (
    <>
      <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-paper p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
        {/* Top subtle accent line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-soft to-accent-2 opacity-80" />

        <div>
          {/* Header: Title, Timestamp, and Favorite Toggle */}
          <div className="mb-3 flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={() => onOpen(note.id)}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-lg"
            >
              <h3 className="line-clamp-1 font-display text-lg font-bold text-text group-hover:text-accent transition-colors">
                {note.title || 'Untitled note'}
              </h3>
              <p className="mt-1 text-xs text-text-muted">
                Updated {formatDate(note.updatedAt)}
              </p>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(note.id);
              }}
              className={`rounded-xl p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                note.isFavorite
                  ? 'bg-amber-500/15 text-amber-500 hover:bg-amber-500/25'
                  : 'text-text-muted hover:bg-paper-elevated hover:text-amber-500'
              }`}
              aria-label={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className="h-4 w-4"
                fill={note.isFavorite ? 'currentColor' : 'none'}
              />
            </button>
          </div>

          {/* Note text preview */}
          <button
            type="button"
            onClick={() => onOpen(note.id)}
            className="mb-4 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-lg"
          >
            <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">
              {preview}
            </p>
          </button>
        </div>

        <div>
          {/* Tags */}
          {note.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-1.5">
              {note.tags.slice(0, 4).map((tag) => {
                const isSelected = activeTag === tag;
                return (
                  <button
                    key={`${note.id}-${tag}`}
                    type="button"
                    onClick={() => onTagClick(tag)}
                    aria-label={`Filter by tag ${tag}`}
                    className={`rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-accent/15 text-accent font-semibold dark:bg-accent/25'
                        : 'bg-paper-elevated text-text-muted hover:bg-accent/10 hover:text-accent'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
              {note.tags.length > 4 && (
                <span className="text-xs text-text-muted">+{note.tags.length - 4}</span>
              )}
            </div>
          )}

          {/* Actions: Edit & Delete */}
          <div className="flex items-center gap-2 border-t border-border/80 pt-3">
            <button
              type="button"
              onClick={() => onOpen(note.id)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-paper-elevated px-3 py-1.5 text-xs font-semibold text-text transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            >
              <PencilLine className="h-3.5 w-3.5" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </button>
          </div>
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
