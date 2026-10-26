import { Monitor, MoonStar, Sun } from 'lucide-react';
import { useNotesStore, type ThemeMode } from '../store/notesStore';

type ThemeToggleProps = {
  compact?: boolean;
  className?: string;
};

const THEME_OPTIONS: Array<{
  value: ThemeMode;
  label: string;
  icon: typeof Sun;
}> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: MoonStar },
  { value: 'system', label: 'System', icon: Monitor },
];

export const ThemeToggle = ({ compact = false, className = '' }: ThemeToggleProps) => {
  const { theme, setTheme } = useNotesStore();

  return (
    <div
      role="radiogroup"
      aria-label="Theme preference"
      className={`inline-flex items-center gap-0.5 rounded-xl border border-border bg-paper p-1 shadow-sm ${className}`}
    >
      {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${label} mode`}
            title={`${label} mode`}
            onClick={() => setTheme(value)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
              isActive
                ? 'bg-accent text-accent-text font-semibold shadow-sm'
                : 'text-text-muted hover:text-text hover:bg-paper-elevated'
            } ${compact ? 'px-2' : ''}`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {!compact && <span>{label}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
