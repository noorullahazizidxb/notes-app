import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import ThemeToggle from './ThemeToggle';
import { DevmindsProducts } from './DevmindsProducts';

type SiteFooterProps = {
  to: string;
};

export const SiteFooter = ({ to }: SiteFooterProps) => (
  <footer className="border-t border-border bg-nav-bg px-4 pb-8 pt-10 backdrop-blur-sm sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Link to={to} aria-label="DevMinds Notes home" className="inline-flex items-center">
            <BrandLogo className="h-8" />
          </Link>
          <p className="max-w-sm text-sm text-text-muted">Write, tag and find your notes on any device.</p>
        </div>
        <ThemeToggle className="self-start sm:self-auto" />
      </div>

      <DevmindsProducts current="notes" />

      <p className="mt-8 border-t border-border pt-6 text-xs text-text-muted">
        &copy; {new Date().getFullYear()} DevMinds. Offline-first notes workspace.
      </p>
    </div>
  </footer>
);

export default SiteFooter;
