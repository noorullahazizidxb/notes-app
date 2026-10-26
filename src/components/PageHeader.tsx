import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow: string;
  icon?: ReactNode;
  title: string;
  description?: string;
};

const PageHeader = ({ eyebrow, icon, title, description }: PageHeaderProps) => (
  <div className="rounded-3xl border border-border bg-paper p-6 shadow-elevated sm:p-8">
    <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card-bg px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
      {icon}
      {eyebrow}
    </p>
    <h1 className="mt-3 font-display text-3xl text-text sm:text-4xl">{title}</h1>
    {description && <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{description}</p>}
  </div>
);

export default PageHeader;
