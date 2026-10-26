import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

type SiteFooterProps = {
  to: string;
};

const SiteFooter = ({ to }: SiteFooterProps) => {
  return (
    <footer className="border-t border-border bg-nav-bg px-4 py-5 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link to={to} className="inline-flex items-center">
          <BrandLogo className="h-7" />
        </Link>
        <p className="text-xs text-muted">DevMinds Notes</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
