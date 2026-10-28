import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { DevmindsProducts } from './DevmindsProducts';

type SiteFooterProps = {
  to: string;
};

export const SiteFooter = ({ to }: SiteFooterProps) => {
  return (
    <footer className="border-t border-border bg-nav-bg/60 backdrop-blur-xs px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link to={to} aria-label="DevMinds Notes home" className="inline-flex items-center">
          <BrandLogo className="h-7" />
        </Link>
        <p className="text-xs text-text-muted">
          Offline-first Notes Workspace &copy; {new Date().getFullYear()} DevMinds
        </p>
      </div>
      <div className="mx-auto w-full max-w-7xl">
        <DevmindsProducts current="notes" />
      </div>
    </footer>
  );
};

export default SiteFooter;
