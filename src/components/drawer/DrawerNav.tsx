import { useLocation, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { NAV_ITEMS, isNavItemActive } from '../../constants/nav';

type DrawerNavProps = {
  onItemClick: () => void;
};

export const DrawerNav = ({ onItemClick }: DrawerNavProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (to: string) => {
    navigate(to);
    onItemClick();
  };

  return (
    <div className="space-y-4">
      {/* Quick compose CTA */}
      <button
        type="button"
        onClick={() => handleNavigate('/editor')}
        className="btn btn-primary w-full"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        <span>Create new note</span>
      </button>

      {/* Nav List */}
      <nav aria-label="Mobile Navigation" className="space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive = isNavItemActive(item, pathname);
          const Icon = item.icon;

          return (
            <button
              key={item.to}
              type="button"
              onClick={() => handleNavigate(item.to)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3.5 text-left text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent-subtle font-semibold text-accent'
                  : 'text-text-muted hover:bg-paper-elevated hover:text-text'
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  isActive ? 'text-accent' : 'text-text-muted'
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default DrawerNav;
