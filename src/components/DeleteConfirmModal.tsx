import { AlertTriangle, X } from 'lucide-react';

type DeleteConfirmModalProps = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirmModal = ({ title, onConfirm, onCancel }: DeleteConfirmModalProps) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="delete-modal-title"
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
      aria-hidden="true"
    />
    <div className="relative w-full max-w-sm rounded-2xl border border-border bg-[color:var(--color-paper)] p-6 shadow-2xl">
      <button
        type="button"
        onClick={onCancel}
        className="absolute right-4 top-4 rounded-lg p-1 text-text/50 hover:text-text"
        aria-label="Cancel"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10">
        <AlertTriangle className="h-5 w-5 text-rose-500" />
      </div>

      <h2 id="delete-modal-title" className="font-display text-xl text-text">
        Delete this note?
      </h2>
      <p className="mt-1 text-sm text-text/65">
        <span className="font-medium text-text">"{title}"</span> will be permanently deleted.
        This cannot be undone.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-border bg-card-bg px-4 py-2 text-sm font-semibold text-text transition hover:border-[color:var(--color-accent)]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;
