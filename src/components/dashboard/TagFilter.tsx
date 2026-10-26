import { Tag, X } from 'lucide-react';

type TagFilterProps = {
  tags: string[];
  activeTag: string | null;
  onToggle: (tag: string) => void;
  onClear: () => void;
};

const TagFilter = ({ tags, activeTag, onToggle, onClear }: TagFilterProps) => {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by tag">
      <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted">
        <Tag className="h-3 w-3" aria-hidden="true" />
        Filter
      </span>
      {tags.map((tag) => {
        const active = activeTag === tag;
        return (
          <button
            key={tag}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(tag)}
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition ${
              active
                ? 'bg-accent-subtle border-accent text-accent'
                : 'border-border text-muted hover:border-accent hover:text-accent'
            }`}
          >
            #{tag}
          </button>
        );
      })}
      {activeTag && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted hover:text-text"
        >
          <X className="h-3 w-3" aria-hidden="true" />
          Clear
        </button>
      )}
    </div>
  );
};

export default TagFilter;
