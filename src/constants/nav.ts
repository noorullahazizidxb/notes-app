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
