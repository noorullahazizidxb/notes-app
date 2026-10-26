import { useNavigate } from 'react-router-dom';
import { FileText, Plus, SearchX } from 'lucide-react';

type EmptyNotesStateProps = {
  isFiltered: boolean;
  onClearFilters: () => void;
};

export const EmptyNotesState = ({ isFiltered, onClearFilters }: EmptyNotesStateProps) => {
  const navigate = useNavigate();

  if (isFiltered) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-paper p-12 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-elevated text-text-muted">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold text-text">No matching notes found</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-text-muted">
          We couldn't find any notes matching your search or tag filter. Try adjusting your query.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-border bg-paper-elevated px-4 py-2 text-sm font-semibold text-text transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed border-border bg-paper p-12 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
        <FileText className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold text-text">Your workspace is empty</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
        Capture your first thought, meeting note, reading quote, or todo checklist.
      </p>
      <button
        type="button"
        onClick={() => navigate('/editor')}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-text transition hover:bg-accent-hover shadow-sm"
      >
        <Plus className="h-4 w-4" />
        <span>Create your first note</span>
      </button>
    </div>
  );
};

export default EmptyNotesState;
