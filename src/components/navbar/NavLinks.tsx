import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/nav';

type NavLinksProps = {
  className?: string;
  onNavigate?: () => void;
};

export const NavLinks = ({ className = '', onNavigate }: NavLinksProps) => {
  const { pathname } = useLocation();

  return (
    <nav aria-label="Main Navigation" className={className}>
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.to ||
          (pathname === '/' && item.to === '/notes') ||
          (item.to === '/editor' && pathname.startsWith('/editor'));

        const Icon = item.icon;

        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            aria-current={isActive ? 'page' : undefined}
            className={`group relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-all ${
              isActive
                ? 'bg-accent/15 text-accent font-semibold dark:bg-accent/20 dark:text-accent-soft'
                : 'text-text-muted hover:bg-paper-elevated hover:text-text'
            }`}
          >
            <Icon
              className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                isActive ? 'text-accent dark:text-accent-soft' : 'text-text-muted group-hover:text-text'
              }`}
            />
            <span>{item.label}</span>
            {isActive && (
              <span
                className="absolute inset-x-2 -bottom-[13px] hidden h-[2px] rounded-full bg-accent dark:bg-accent-soft md:block"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
