import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Plus, Tag, X } from 'lucide-react';
import { listItem } from '../../lib/motion/tokens';

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
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted">
        <Tag className="h-3.5 w-3.5" aria-hidden="true" />
        Tags
      </span>

      <AnimatePresence mode="popLayout" initial={false}>
        {tags.map((tag) => (
          <m.span
            key={tag}
            layout
            variants={listItem}
            initial="hidden"
            animate="show"
            exit="exit"
            className="inline-flex h-10 items-center rounded-lg border border-border bg-paper pl-3 text-xs font-medium text-text shadow-sm"
          >
            <span>#{tag}</span>
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              aria-label={`Remove tag ${tag}`}
              className="inline-flex h-10 w-9 items-center justify-center rounded-r-lg text-text-muted transition hover:text-rose-500"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </m.span>
        ))}
      </AnimatePresence>

      <m.div
        layout="position"
        className="inline-flex h-10 items-center rounded-lg border border-border bg-paper pl-3 transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent-ring"
      >
        <label htmlFor="editor-tag-input" className="sr-only">
          Add tag
        </label>
        <input
          id="editor-tag-input"
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tag…"
          className="w-24 border-0 bg-transparent p-0 text-xs text-text placeholder:text-text-muted focus:outline-none focus:ring-0 focus-visible:outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!tagInput.trim()}
          aria-label="Add tag"
          className="inline-flex h-10 w-9 items-center justify-center rounded-r-lg text-accent transition hover:text-accent-hover disabled:text-text-muted disabled:opacity-50"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </m.div>
    </div>
  );
};

export default EditorTagBar;
