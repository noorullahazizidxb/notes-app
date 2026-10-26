import { ArrowUpDown, Search } from 'lucide-react';
import type { SortKey } from '../../store/notesStore';

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Last updated', value: 'updatedAt' },
  { label: 'Date created', value: 'createdAt' },
  { label: 'Title A–Z', value: 'title' },
];

type NotesToolbarProps = {
  title: string;
  count: number;
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
  query: string;
  onQueryChange: (q: string) => void;
};

const fieldClass =
  'rounded-xl border border-border bg-card-bg text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none';

const NotesToolbar = ({ title, count, sortKey, onSortChange, query, onQueryChange }: NotesToolbarProps) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 className="font-display text-2xl text-text">
      {title} <span className="align-middle text-sm font-sans text-muted">({count})</span>
    </h2>
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
      <label className="relative block w-full sm:w-72">
        <span className="sr-only">Search notes</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search notes…"
          className={`${fieldClass} w-full py-2.5 pl-10 pr-3`}
        />
      </label>
      <div className="relative">
        <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" aria-hidden="true" />
        <select
          value={sortKey}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className={`${fieldClass} w-full py-2.5 pl-8 pr-8 sm:w-auto`}
          aria-label="Sort notes"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default NotesToolbar;
