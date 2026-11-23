import { BookMarked, Heart, PencilLine, Settings } from 'lucide-react';

export type NavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/notes', icon: BookMarked },
  { label: 'Compose', to: '/editor', icon: PencilLine },
  { label: 'Favorites', to: '/favorites', icon: Heart },
  { label: 'Settings', to: '/settings', icon: Settings },
];

/** Whether a nav item represents the current route (shared by desktop nav and mobile drawer). */
export const isNavItemActive = (item: NavItem, pathname: string): boolean =>
  pathname === item.to ||
  (pathname === '/' && item.to === '/notes') ||
  (item.to === '/editor' && pathname.startsWith('/editor'));
