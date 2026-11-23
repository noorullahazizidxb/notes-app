import { Link, useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
import { NAV_ITEMS, isNavItemActive } from '../../constants/nav';
import { SPRING } from '../../lib/motion/tokens';

type NavLinksProps = {
  className?: string;
};

export const NavLinks = ({ className = '' }: NavLinksProps) => {
  const { pathname } = useLocation();

  return (
    <nav aria-label="Main Navigation" className={className}>
      {NAV_ITEMS.map((item) => {
        const isActive = isNavItemActive(item, pathname);
        const Icon = item.icon;

        return (
          <Link
            key={item.to}
            to={item.to}
            aria-current={isActive ? 'page' : undefined}
            className={`group relative inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl px-3.5 text-sm font-medium transition-colors ${
              isActive ? 'font-semibold text-accent' : 'text-text-muted hover:bg-paper-elevated hover:text-text'
            }`}
          >
            {isActive && (
              <m.span
                layoutId="nav-active-pill"
                transition={SPRING.snappy}
                aria-hidden="true"
                className="absolute inset-0 rounded-xl bg-accent-subtle"
              />
            )}
            <Icon
              className={`relative h-4 w-4 transition-transform group-hover:scale-110 ${
                isActive ? 'text-accent' : 'text-text-muted group-hover:text-text'
              }`}
            />
            <span className="relative">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
