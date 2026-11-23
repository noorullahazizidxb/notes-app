import type { Transition, Variants } from 'framer-motion';

/** Single source of truth for motion timing across the app. */
export const DURATION = {
  fast: 0.15,
  base: 0.24,
  slow: 0.4,
} as const;

export const EASE = {
  /** Decelerating curve for things entering the screen. */
  out: [0.22, 1, 0.36, 1],
  /** Accelerating curve for things leaving the screen. */
  in: [0.4, 0, 1, 1],
} as const;

export const SPRING = {
  /** Panels, drawers and shared-layout indicators. */
  snappy: { type: 'spring', stiffness: 420, damping: 36, mass: 0.9 },
  /** Small interactive feedback (hover lift, press). */
  gentle: { type: 'spring', stiffness: 300, damping: 24 },
} as const satisfies Record<string, Transition>;

/** whileInView settings: reveal once, slightly before the element is fully on screen. */
export const VIEWPORT_ONCE = { once: true, margin: '0px 0px -64px 0px' } as const;

const STAGGER_STEP = 0.06;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

export const staggerChildren: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_STEP } },
};

/** Cards entering/leaving a filtered list (pairs with `layout`). */
export const listItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out, delay: Math.min(index * 0.03, 0.24) },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: DURATION.fast, ease: EASE.in } },
};

/** Route content entering after navigation. */
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.out } },
};

/** Menus and popovers anchored to a trigger. */
export const popover: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: -6 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE.out } },
  exit: { opacity: 0, scale: 0.98, y: -4, transition: { duration: 0.12, ease: EASE.in } },
};

export const backdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.base } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
};

export const dialog: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: SPRING.snappy },
  exit: { opacity: 0, scale: 0.97, y: 8, transition: { duration: DURATION.fast, ease: EASE.in } },
};

/** Inline status text swapping in place (e.g. "Saving…" → "Saved"). */
export const statusSwap: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE.out } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.1, ease: EASE.in } },
};

/** Hover lift for interactive cards. */
export const LIFT = { y: -3 } as const;
