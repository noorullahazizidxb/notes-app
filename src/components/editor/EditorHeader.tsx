import { ArrowLeft, Check, Heart, Loader2, Save, Trash2 } from 'lucide-react';

type EditorHeaderProps = {
  onBack: () => void;
  isSaving: boolean;
  isDirty: boolean;
  lastSaved: Date | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onDelete: () => void;
  onSave: () => void;
  wordCount: number;
};

export const EditorHeader = ({
  onBack,
  isSaving,
  isDirty,
  lastSaved,
  isFavorite,
  onToggleFavorite,
  onDelete,
  onSave,
  wordCount,
}: EditorHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4">
      {/* Back button & Status */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to notes"
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-paper px-3 py-2 text-sm font-semibold text-text transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Notes</span>
        </button>

        {/* Save status indicator */}
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          {isSaving ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
              <span>Saving…</span>
            </>
          ) : isDirty ? (
            <span className="text-amber-600 dark:text-amber-400">Unsaved changes</span>
          ) : lastSaved ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>Saved</span>
            </>
          ) : null}
        </div>
      </div>

      {/* Meta & Actions */}
      <div className="flex items-center gap-2">
        <span className="hidden text-xs text-text-muted sm:inline-block tabular-nums mr-2">
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>

        {/* Favorite */}
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
          className={`rounded-xl border p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 ${
            isFavorite
              ? 'border-amber-500/40 bg-amber-500/15 text-amber-500'
              : 'border-border bg-paper text-text-muted hover:border-amber-400 hover:text-amber-500'
          }`}
        >
          <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete note"
          className="rounded-xl border border-border bg-paper p-2 text-text-muted transition hover:border-rose-400 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        {/* Save button */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-text transition hover:bg-accent-hover shadow-sm disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
