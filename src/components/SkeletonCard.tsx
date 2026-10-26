export const SkeletonCard = () => (
  <article
    aria-hidden="true"
    className="animate-pulse overflow-hidden rounded-2xl border border-border bg-paper p-5 shadow-sm"
  >
    <div className="mb-4 flex items-start justify-between">
      <div className="w-3/4 space-y-2">
        <div className="h-5 w-4/5 rounded-md bg-paper-elevated" />
        <div className="h-3 w-1/3 rounded bg-paper-elevated" />
      </div>
      <div className="h-8 w-8 rounded-lg bg-paper-elevated" />
    </div>

    <div className="mb-5 space-y-2.5">
      <div className="h-3.5 w-full rounded bg-paper-elevated" />
      <div className="h-3.5 w-5/6 rounded bg-paper-elevated" />
      <div className="h-3.5 w-2/3 rounded bg-paper-elevated" />
    </div>

    <div className="mb-4 flex gap-2">
      <div className="h-5 w-12 rounded-md bg-paper-elevated" />
      <div className="h-5 w-14 rounded-md bg-paper-elevated" />
    </div>

    <div className="flex gap-2 border-t border-border/80 pt-3">
      <div className="h-7 w-16 rounded-lg bg-paper-elevated" />
      <div className="h-7 w-16 rounded-lg bg-paper-elevated" />
    </div>
  </article>
);

export default SkeletonCard;
