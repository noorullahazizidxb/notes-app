import BrandLogo from './BrandLogo';

const Spinner = () => {
  return (
    <div className="flex min-h-[50vh] flex-1 flex-col items-center justify-center gap-4">
      <BrandLogo className="h-10" />
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[color:var(--color-accent)]" />
      </div>
    </div>
  );
};

export default Spinner;
