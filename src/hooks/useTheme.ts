import { useEffect, useState } from 'react';
import { useNotesStore } from '../store/notesStore';
import {
  applyTheme,
  resolveTheme,
  subscribeToSystemTheme,
  type ResolvedTheme,
  type ThemePreference,
} from '../theme/theme';

type UseTheme = {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
};

/** Read/write the persisted theme preference and the theme actually shown. */
export const useTheme = (): UseTheme => {
  const preference = useNotesStore((s) => s.theme);
  const setPreference = useNotesStore((s) => s.setTheme);
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolveTheme(preference));

  useEffect(() => {
    const update = () => setResolved(resolveTheme(preference));
    update();
    if (preference !== 'system') return undefined;
    return subscribeToSystemTheme(update);
  }, [preference]);

  return { preference, resolved, setPreference };
};

/** Mount once at the app root: keeps <html> in sync with the preference. */
export const useApplyTheme = (): void => {
  const { resolved } = useTheme();
  useEffect(() => applyTheme(resolved), [resolved]);
};
