import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useNotesStore } from '../store/notesStore';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import BrandLogo from './BrandLogo';
import DrawerUserCard from './drawer/DrawerUserCard';
import DrawerNav from './drawer/DrawerNav';
import DrawerFooter from './drawer/DrawerFooter';

export const Drawer = () => {
  const { pathname } = useLocation();
  const { drawerOpen, setDrawerOpen } = useNotesStore();

  const handleClose = () => setDrawerOpen(false);

  // Lock body scroll while open
  useBodyScrollLock(drawerOpen);

  // Focus trap + return focus to mobile-drawer-trigger button
  const drawerRef = useFocusTrap<HTMLElement>({
    isOpen: drawerOpen,
    onClose: handleClose,
  });

  // Close on route change
  useEffect(() => {
    useNotesStore.getState().setDrawerOpen(false);
  }, [pathname]);

  // Close on window resize if viewport reaches desktop (md: 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawerOpen, setDrawerOpen]);

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Slide-in Drawer */}
      <aside
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-hidden={!drawerOpen}
        // React 18 has no boolean `inert` typing; '' sets the attribute, undefined removes it.
        {...{ inert: drawerOpen ? undefined : '' }}
        tabIndex={-1}
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-r border-border bg-paper p-5 shadow-2xl transition-transform duration-300 ease-out focus:outline-none ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with Brand and Close Button */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center">
            <h2 id="drawer-title" className="sr-only">
              Navigation Menu
            </h2>
            <BrandLogo className="h-8" />
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close navigation"
            className="rounded-xl border border-border bg-paper-elevated p-2 text-text transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body with scroll if needed */}
        <div className="flex-1 space-y-6 overflow-y-auto py-5 pr-1">
          <DrawerUserCard />
          <DrawerNav onItemClick={handleClose} />
        </div>

        {/* Footer with Theme Selector and Sign out */}
        <DrawerFooter onClose={handleClose} />
      </aside>
    </>
  );
};

export default Drawer;
