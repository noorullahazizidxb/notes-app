import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../../constants/nav';
import { useIsActiveRoute } from '../../../hooks/useIsActiveRoute';

const DesktopNav = () => {
  const isActive = useIsActiveRoute();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
        const active = isActive(to);
        return (
          <NavLink
            key={to}
            to={to}
            aria-current={active ? 'page' : undefined}
            className={`relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              active ? 'bg-accent-subtle text-accent' : 'text-muted hover:bg-card-bg hover:text-text'
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
