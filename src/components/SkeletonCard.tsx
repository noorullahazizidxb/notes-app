const SkeletonCard = () => (
  <article className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card-bg p-5">
    <div className="mb-4">
      <div className="h-5 w-3/4 rounded-lg bg-[color:var(--color-border)]" />
      <div className="mt-2 h-3 w-1/3 rounded bg-[color:var(--color-border)]" />
    </div>
    <div className="mb-4 space-y-2">
      <div className="h-3 w-full rounded bg-[color:var(--color-border)]" />
      <div className="h-3 w-5/6 rounded bg-[color:var(--color-border)]" />
      <div className="h-3 w-4/6 rounded bg-[color:var(--color-border)]" />
    </div>
    <div className="mb-4 flex gap-2">
      <div className="h-5 w-14 rounded-full bg-[color:var(--color-border)]" />
      <div className="h-5 w-16 rounded-full bg-[color:var(--color-border)]" />
    </div>
    <div className="flex gap-2">
      <div className="h-7 w-16 rounded-lg bg-[color:var(--color-border)]" />
      <div className="h-7 w-16 rounded-lg bg-[color:var(--color-border)]" />
    </div>
  </article>
);

export default SkeletonCard;
