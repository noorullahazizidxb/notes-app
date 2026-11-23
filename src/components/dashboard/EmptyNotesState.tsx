import { useNavigate } from 'react-router-dom';
import { FileText, Plus, SearchX, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type EmptyNotesStateProps = {
  isFiltered: boolean;
  onClearFilters: () => void;
};

type EmptyPanelProps = {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  body: string;
  action: ReactNode;
};

const EmptyPanel = ({ icon: Icon, iconClassName, title, body, action }: EmptyPanelProps) => (
  <div className="rounded-3xl border border-dashed border-border bg-paper px-6 py-14 text-center sm:px-12 sm:py-16">
    <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${iconClassName}`}>
      <Icon className="h-7 w-7" aria-hidden="true" />
    </div>
    <h2 className="mt-5 font-display text-2xl font-bold text-text">{title}</h2>
    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">{body}</p>
    <div className="mt-6 flex justify-center">{action}</div>
  </div>
);

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
