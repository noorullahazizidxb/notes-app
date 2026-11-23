import { useId } from 'react';
import { LayoutGroup, m } from 'framer-motion';
import { Monitor, MoonStar, Sun } from 'lucide-react';
import { useNotesStore, type ThemeMode } from '../store/notesStore';
import { SPRING } from '../lib/motion/tokens';

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
  // Several toggles can be on screen at once (navbar, footer, drawer); scope each indicator.
  const groupId = useId();

  return (
    <LayoutGroup id={groupId}>
      <div
        role="radiogroup"
        aria-label="Theme preference"
        className={`inline-flex items-center gap-0.5 rounded-xl border border-border bg-paper p-0.5 shadow-sm ${className}`}
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
              className={`relative inline-flex h-10 min-w-10 grow items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-colors ${
                compact ? 'px-2.5' : 'px-3'
              } ${isActive ? 'font-semibold text-accent-text' : 'text-text-muted hover:bg-paper-elevated hover:text-text'}`}
            >
              {isActive && (
                <m.span
                  layoutId="theme-indicator"
                  transition={SPRING.snappy}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg bg-accent shadow-sm"
                />
              )}
              <Icon className="relative h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {!compact && <span className="relative">{label}</span>}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
};

export default ThemeToggle;
