import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

type DeleteConfirmModalProps = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteConfirmModal = ({ title, onConfirm, onCancel }: DeleteConfirmModalProps) => {
  useBodyScrollLock(true);

  const modalRef = useFocusTrap<HTMLDivElement>({
    isOpen: true,
    onClose: onCancel,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="relative w-full max-w-sm rounded-2xl border border-border bg-paper p-6 shadow-2xl transition-all"
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-text-muted hover:bg-paper-elevated hover:text-text focus:outline-none focus:ring-2 focus:ring-accent/40"
          aria-label="Cancel deletion"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <h2 id="delete-modal-title" className="font-display text-xl font-bold text-text">
          Delete this note?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          <span className="font-semibold text-text">"{title}"</span> will be permanently removed.
          This action cannot be undone.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-border bg-paper-elevated px-4 py-2 text-sm font-semibold text-text transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
