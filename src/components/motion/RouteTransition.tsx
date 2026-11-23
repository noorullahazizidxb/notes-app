import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
import { pageEnter } from '../../lib/motion/tokens';

/**
 * Fades route content in on navigation. Keyed by the first path segment so
 * `/editor` → `/editor/:id` (after the first autosave) does not remount the editor.
 */
export const RouteTransition = ({ children }: { children: ReactNode }) => {
  const section = useLocation().pathname.split('/')[1] ?? '';
  return (
    <m.div key={section} variants={pageEnter} initial="hidden" animate="show">
      {children}
    </m.div>
  );
};

export default RouteTransition;
