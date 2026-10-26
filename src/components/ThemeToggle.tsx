import { Monitor, MoonStar, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { nextThemePreference, type ThemePreference } from '../theme/theme';
import IconButton from './ui/IconButton';

const ICONS: Record<ThemePreference, typeof Sun> = { light: Sun, dark: MoonStar, system: Monitor };
const LABELS: Record<ThemePreference, string> = { light: 'Light', dark: 'Dark', system: 'System' };

/** Cycles light → dark → system. */
const ThemeToggle = () => {
  const { preference, setPreference } = useTheme();
  const next = nextThemePreference(preference);
  const Icon = ICONS[preference];

  return (
    <IconButton
      label={`Theme: ${LABELS[preference]}. Switch to ${LABELS[next].toLowerCase()} theme`}
      title={`Theme: ${LABELS[preference]}`}
      onClick={() => setPreference(next)}
    >
      <Icon className="h-4 w-4" />
    </IconButton>
  );
};

export default ThemeToggle;
