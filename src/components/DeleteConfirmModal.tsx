import { createPortal } from 'react-dom';
import { m } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { backdrop, dialog } from '../lib/motion/tokens';

type DeleteConfirmModalProps = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Confirmation dialog, portalled to <body> so transformed ancestors (animated cards)
 * never trap its fixed positioning. Render inside <AnimatePresence> for the exit animation.
 */
export const DeleteConfirmModal = ({ title, onConfirm, onCancel }: DeleteConfirmModalProps) => {
  useBodyScrollLock(true);

  // Handles Escape, Tab cycling and focus return.
  const modalRef = useFocusTrap<HTMLDivElement>({
    isOpen: true,
    onClose: onCancel,
  });

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-body"
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
    >
      <m.div
        variants={backdrop}
        initial="hidden"
        animate="show"
        exit="exit"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <m.div
        ref={modalRef}
        variants={dialog}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative w-full max-w-sm rounded-2xl border border-border bg-paper p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-text-muted transition hover:bg-paper-elevated hover:text-text"
          aria-label="Cancel deletion"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>

        <h2 id="delete-modal-title" className="font-display text-xl font-bold text-text">
          Delete this note?
        </h2>
        <p id="delete-modal-body" className="mt-2 text-sm leading-relaxed text-text-muted">
          <span className="font-semibold text-text">"{title}"</span> will be permanently removed.
          This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn flex-1 bg-rose-600 text-white shadow-sm hover:bg-rose-700"
          >
            Delete note
          </button>
        </div>
      </m.div>
    </div>,
    document.body,
  );
};

export default DeleteConfirmModal;
