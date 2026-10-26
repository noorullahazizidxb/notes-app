import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/** `/editor` is active for `/editor/:id` too; `/` maps to the dashboard. */
export const useIsActiveRoute = (): ((to: string) => boolean) => {
  const { pathname } = useLocation();
  return useCallback(
    (to: string) => {
      const path = pathname === '/' ? '/notes' : pathname;
      return path === to || path.startsWith(`${to}/`);
    },
    [pathname]
  );
};
