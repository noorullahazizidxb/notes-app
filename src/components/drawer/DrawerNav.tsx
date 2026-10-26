import { useLocation, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { NAV_ITEMS } from '../../constants/nav';

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
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-text transition hover:bg-accent-hover shadow-sm"
      >
        <Plus className="h-4 w-4" />
        <span>Create new note</span>
      </button>

      {/* Nav List */}
      <nav aria-label="Mobile Navigation" className="space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.to ||
            (pathname === '/' && item.to === '/notes') ||
            (item.to === '/editor' && pathname.startsWith('/editor'));
          const Icon = item.icon;

          return (
            <button
              key={item.to}
              type="button"
              onClick={() => handleNavigate(item.to)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                isActive
                  ? 'bg-accent/15 text-accent font-semibold dark:bg-accent/20 dark:text-accent-soft'
                  : 'text-text-muted hover:bg-paper-elevated hover:text-text'
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  isActive ? 'text-accent dark:text-accent-soft' : 'text-text-muted'
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
