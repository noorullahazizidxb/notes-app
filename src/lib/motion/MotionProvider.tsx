import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig } from 'framer-motion';

const loadFeatures = () => import('./features').then((mod) => mod.default);

/**
 * App-wide motion setup: honours the OS "reduce motion" setting and lazy-loads
 * animation features. `strict` makes any non-`m` motion component a dev error.
 */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  </MotionConfig>
);

export default MotionProvider;
