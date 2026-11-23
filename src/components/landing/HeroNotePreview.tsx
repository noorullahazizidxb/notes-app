import { m, type Variants } from 'framer-motion';
import { Bold, Check, Heart, Italic, List } from 'lucide-react';
import { DURATION, EASE, SPRING } from '../../lib/motion/tokens';

const PREVIEW_TAGS = ['ideas', 'weekly', 'reading'] as const;

/* Transform-only entrance: the preview is never hidden, so it can't delay LCP. */
const backCard: Variants = {
  hidden: { rotate: 0, x: 0 },
  show: { rotate: -5, x: -18, transition: { ...SPRING.gentle, delay: 0.15 } },
};

const frontCard: Variants = {
  hidden: { y: 18 },
  show: { y: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

const tagChip: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  show: (index: number) => ({ scale: 1, opacity: 1, transition: { ...SPRING.gentle, delay: 0.45 + index * 0.08 } }),
};

/** Decorative product glimpse for the landing hero: a note whose #hashtags become tags. */
export const HeroNotePreview = () => (
  <m.div aria-hidden="true" initial="hidden" animate="show" className="relative mx-auto w-full max-w-md select-none">
    <m.div
      variants={backCard}
      className="absolute inset-0 rounded-3xl border border-border bg-paper-elevated shadow-md"
    />
    <m.div variants={frontCard} className="relative overflow-hidden rounded-3xl border border-border bg-paper p-6 text-left shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-soft to-accent-2" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-bg p-1 text-text-muted">
          {[Bold, Italic, List].map((Icon, i) => (
            <span key={i} className="flex h-7 w-7 items-center justify-center rounded-md">
              <Icon className="h-3.5 w-3.5" />
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-text-muted">
          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          Saved
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <p className="font-display text-2xl font-bold text-text">Weekly planning</p>
        <Heart className="mt-1 h-4 w-4 shrink-0 text-amber-500" fill="currentColor" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        Draft the launch post, reply to reader mail and finish chapter four.{' '}
        <span className="font-medium text-accent">#ideas</span> <span className="font-medium text-accent">#weekly</span>
      </p>
      <div className="mt-3 space-y-2">
        <div className="h-2 w-11/12 rounded-full bg-paper-elevated" />
        <div className="h-2 w-3/4 rounded-full bg-paper-elevated" />
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
        {PREVIEW_TAGS.map((tag, index) => (
          <m.span
            key={tag}
            custom={index}
            variants={tagChip}
            className="rounded-md bg-accent-subtle px-2.5 py-1 text-xs font-semibold text-accent"
          >
            #{tag}
          </m.span>
        ))}
      </div>
    </m.div>
  </m.div>
);

export default HeroNotePreview;
