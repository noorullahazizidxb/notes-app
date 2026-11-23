import { AnimatePresence, m } from 'framer-motion';
import { ArrowLeft, Check, Heart, Loader2, Save, Trash2 } from 'lucide-react';
import { statusSwap } from '../../lib/motion/tokens';

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

type SaveState = 'saving' | 'dirty' | 'saved' | 'idle';

const resolveSaveState = (isSaving: boolean, isDirty: boolean, lastSaved: Date | null): SaveState => {
  if (isSaving) return 'saving';
  if (isDirty) return 'dirty';
  return lastSaved ? 'saved' : 'idle';
};

const SaveStatus = ({ state }: { state: SaveState }) => (
  <div role="status" aria-live="polite" className="flex items-center text-xs text-text-muted sm:min-w-[7.5rem]">
    <AnimatePresence mode="wait" initial={false}>
      {state !== 'idle' && (
        <m.span
          key={state}
          variants={statusSwap}
          initial="hidden"
          animate="show"
          exit="exit"
          className="inline-flex items-center gap-1.5"
        >
          {state === 'saving' && (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" aria-hidden="true" />
              Saving…
            </>
          )}
          {state === 'dirty' && <span className="text-amber-700 dark:text-amber-400">Unsaved changes</span>}
          {state === 'saved' && (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              Saved
            </>
          )}
        </m.span>
      )}
    </AnimatePresence>
  </div>
);

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
      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} aria-label="Back to notes" className="btn btn-secondary btn-sm">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Notes</span>
        </button>

        <SaveStatus state={resolveSaveState(isSaving, isDirty, lastSaved)} />
      </div>

      <div className="flex items-center gap-2">
        <span className="mr-2 hidden text-xs tabular-nums text-text-muted sm:inline-block">
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>

        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
          aria-pressed={isFavorite}
          className={`icon-btn ${
            isFavorite ? 'border-amber-500/40 bg-amber-500/15 text-amber-500 hover:border-amber-500 hover:text-amber-500' : 'hover:border-amber-400 hover:text-amber-500'
          }`}
        >
          <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete note"
          className="icon-btn hover:border-rose-400 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>

        <button type="button" onClick={onSave} disabled={isSaving} className="btn btn-primary btn-sm">
          <Save className="h-4 w-4" aria-hidden="true" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
