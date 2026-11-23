import { ArrowUpDown, Search, Tag, X } from 'lucide-react';
import type { SortKey } from '../../store/notesStore';

type FilterToolbarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
  allTags: string[];
  activeTag: string | null;
  onTagClick: (tag: string) => void;
  onClearTag: () => void;
  totalNotes: number;
};

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Recently updated', value: 'updatedAt' },
  { label: 'Date created', value: 'createdAt' },
  { label: 'Title (A–Z)', value: 'title' },
];

export const FilterToolbar = ({
  searchQuery,
  onSearchChange,
  sortKey,
  onSortChange,
  allTags,
  activeTag,
  onTagClick,
  onClearTag,
  totalNotes,
}: FilterToolbarProps) => {
  return (
    <div className="space-y-3">
      {/* Top row: Section Title + Search & Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-2xl font-bold text-text">Notes</h2>
          <span className="rounded-md bg-paper-elevated px-2 py-0.5 text-xs font-semibold tabular-nums text-text-muted">
            {totalNotes}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Sort Selector */}
          <div className="relative">
            <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <select
              value={sortKey}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              aria-label="Sort notes"
              className="min-h-[40px] rounded-xl border border-border bg-paper py-2 pl-9 pr-8 text-sm font-medium text-text transition hover:border-accent focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent-ring"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="relative min-w-0 flex-1 basis-48 sm:w-64 sm:flex-none">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <input
              type="search"
              aria-label="Search notes"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search notes…"
              className="min-h-[40px] w-full rounded-xl border border-border bg-paper py-2 pl-9 pr-10 text-sm text-text placeholder:text-text-muted transition hover:border-accent focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent-ring [&::-webkit-search-cancel-button]:hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center rounded-r-xl text-text-muted hover:text-text"
                aria-label="Clear search query"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tag Filter Chips */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 pt-1">
          <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-medium text-text-muted">
            <Tag className="h-3.5 w-3.5" aria-hidden="true" />
            Filter by tag
          </span>

          {allTags.map((tag) => {
            const isSelected = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagClick(tag)}
                aria-pressed={isSelected}
                className={`tap-target inline-flex h-8 items-center rounded-lg px-3 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-accent text-accent-text font-semibold shadow-sm'
                    : 'border border-border bg-paper text-text-muted hover:border-accent/50 hover:text-text'
                }`}
              >
                #{tag}
              </button>
            );
          })}

          {activeTag && (
            <button
              type="button"
              onClick={onClearTag}
              className="tap-target ml-1 inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-paper px-2.5 text-xs text-text-muted transition-colors hover:border-rose-400 hover:text-rose-500"
            >
              <X className="h-3 w-3" aria-hidden="true" />
              <span>Clear tag</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;
