export type ResolvedTheme = 'light' | 'dark';
export type ThemePreference = ResolvedTheme | 'system';

export const THEME_PREFERENCES: readonly ThemePreference[] = ['light', 'dark', 'system'];

const DARK_QUERY = '(prefers-color-scheme: dark)';

export const getSystemTheme = (): ResolvedTheme =>
  typeof window !== 'undefined' && window.matchMedia?.(DARK_QUERY).matches ? 'dark' : 'light';

export const resolveTheme = (preference: ThemePreference): ResolvedTheme =>
  preference === 'system' ? getSystemTheme() : preference;

/** Mirrors the inline script in index.html so first paint and React agree. */
export const applyTheme = (theme: ResolvedTheme): void => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
};

export const subscribeToSystemTheme = (onChange: () => void): (() => void) => {
  const media = window.matchMedia?.(DARK_QUERY);
  if (!media) return () => undefined;
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

export const nextThemePreference = (current: ThemePreference): ThemePreference =>
  THEME_PREFERENCES[(THEME_PREFERENCES.indexOf(current) + 1) % THEME_PREFERENCES.length];
