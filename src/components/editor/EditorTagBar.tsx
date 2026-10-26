import { useState } from 'react';
import { Plus, Tag, X } from 'lucide-react';

type EditorTagBarProps = {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
};

export const EditorTagBar = ({ tags, onAddTag, onRemoveTag }: EditorTagBarProps) => {
  const [tagInput, setTagInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const clean = tagInput.trim().replace(/^#/, '');
      if (clean) {
        onAddTag(clean);
        setTagInput('');
      }
    }
  };

  const handleAdd = () => {
    const clean = tagInput.trim().replace(/^#/, '');
    if (clean) {
      onAddTag(clean);
      setTagInput('');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
        <Tag className="h-3 w-3" />
        Tags:
      </span>

      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-paper px-2.5 py-1 text-xs font-medium text-text shadow-xs"
        >
          <span>#{tag}</span>
          <button
            type="button"
            onClick={() => onRemoveTag(tag)}
            aria-label={`Remove tag ${tag}`}
            className="rounded p-0.5 text-text-muted hover:text-rose-500 focus:outline-none"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}

      {/* Add tag input */}
      <div className="inline-flex items-center rounded-lg border border-border bg-paper px-2 py-0.5 focus-within:border-accent">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tag…"
          className="w-20 bg-transparent text-xs text-text placeholder:text-text-muted focus:outline-none sm:w-24"
        />
        {tagInput.trim() && (
          <button
            type="button"
            onClick={handleAdd}
            aria-label="Add tag"
            className="text-accent hover:text-accent-hover"
          >
            <Plus className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EditorTagBar;
