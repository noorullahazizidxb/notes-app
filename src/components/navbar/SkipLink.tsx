export const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:border focus:border-accent focus:bg-paper focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-text focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent/40"
    >
      Skip to content
    </a>
  );
};

export default SkipLink;
