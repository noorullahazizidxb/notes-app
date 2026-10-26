import { Monitor, MoonStar, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import type { ThemePreference } from '../theme/theme';

const OPTIONS: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: MoonStar },
  { value: 'system', label: 'System', icon: Monitor },
];

/** Segmented radio group for choosing the theme preference. */
const ThemeSelector = () => {
  const { preference, setPreference } = useTheme();

  return (
    <div role="radiogroup" aria-label="Theme" className="inline-flex rounded-xl border border-border bg-bg p-1">
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const selected = preference === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setPreference(value)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              selected ? 'bg-accent text-on-accent shadow-sm' : 'text-muted hover:text-text'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSelector;
