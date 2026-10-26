const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-2xl border border-border bg-card-bg p-4">
    <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
    <p className="mt-2 font-display text-3xl text-text">{value}</p>
  </div>
);

export default StatCard;
