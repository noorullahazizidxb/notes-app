import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { fadeUp } from '../lib/motion/tokens';

type EmptyPanelProps = {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  body: string;
  action: ReactNode;
};

/** Dashed placeholder used wherever a list has nothing to show yet. */
export const EmptyPanel = ({ icon: Icon, iconClassName, title, body, action }: EmptyPanelProps) => (
  <m.div
    variants={fadeUp}
    initial="hidden"
    animate="show"
    className="rounded-3xl border border-dashed border-border bg-paper px-6 py-14 text-center sm:px-12 sm:py-16"
  >
    <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${iconClassName}`}>
      <Icon className="h-7 w-7" aria-hidden="true" />
    </div>
    <h2 className="mt-5 font-display text-2xl font-bold text-text">{title}</h2>
    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">{body}</p>
    <div className="mt-6 flex justify-center">{action}</div>
  </m.div>
);

export default EmptyPanel;
