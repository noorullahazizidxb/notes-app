import type { ReactNode } from 'react';
import { NotebookText } from 'lucide-react';

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
};

const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card-bg px-6 py-14 text-center">
    <span className="bg-accent-subtle mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-accent">
      {icon ?? <NotebookText className="h-6 w-6" aria-hidden="true" />}
    </span>
    <h3 className="font-display text-2xl text-text">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm text-muted">{description}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
