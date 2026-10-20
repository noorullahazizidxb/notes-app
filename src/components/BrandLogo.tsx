type BrandLogoProps = {
  className?: string;
};

const BrandLogo = ({ className = 'h-9' }: BrandLogoProps) => {
  return (
    <span className={`brand-logo inline-flex items-center ${className}`}>
      <img
        src="/brand/notes-logo-light.svg"
        alt="DevMinds Notes"
        className="brand-logo__light h-full w-auto"
      />
      <img
        src="/brand/notes-logo-dark.svg"
        alt=""
        aria-hidden="true"
        className="brand-logo__dark h-full w-auto"
      />
    </span>
  );
};

export default BrandLogo;
