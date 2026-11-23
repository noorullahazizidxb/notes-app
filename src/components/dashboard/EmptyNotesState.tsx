import { useNavigate } from 'react-router-dom';
import { FileText, Plus, SearchX } from 'lucide-react';
import EmptyPanel from '../EmptyPanel';

type EmptyNotesStateProps = {
  isFiltered: boolean;
  onClearFilters: () => void;
};

export const EmptyNotesState = ({ isFiltered, onClearFilters }: EmptyNotesStateProps) => {
  const navigate = useNavigate();

  if (isFiltered) {
    return (
      <EmptyPanel
        icon={SearchX}
        iconClassName="bg-paper-elevated text-text-muted"
        title="No matching notes found"
        body="We couldn't find any notes matching your search or tag filter. Try a different word or clear the filters."
        action={
          <button type="button" onClick={onClearFilters} className="btn btn-secondary">
            Reset filters
          </button>
        }
      />
    );
  }

  return (
    <EmptyPanel
      icon={FileText}
      iconClassName="bg-accent-subtle text-accent"
      title="Your workspace is empty"
      body="Capture your first thought, meeting note, reading quote, or to-do checklist. Add #tags as you write to keep things organized."
      action={
        <button type="button" onClick={() => navigate('/editor')} className="btn btn-primary btn-lg">
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Create your first note</span>
        </button>
      }
    />
  );
};

export default EmptyNotesState;
