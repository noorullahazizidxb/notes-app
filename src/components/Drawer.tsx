import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
import { X } from 'lucide-react';
import { useNotesStore } from '../store/notesStore';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import BrandLogo from './BrandLogo';
import { DURATION, SPRING } from '../lib/motion/tokens';
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
      <m.div
        initial={false}
        animate={{ opacity: drawerOpen ? 1 : 0 }}
        transition={{ duration: DURATION.base }}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm ${drawerOpen ? '' : 'pointer-events-none'}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Slide-in Drawer */}
      <m.aside
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-hidden={!drawerOpen}
        // React 18 has no boolean `inert` typing; '' sets the attribute, undefined removes it.
        {...{ inert: drawerOpen ? undefined : '' }}
        tabIndex={-1}
        initial={false}
        animate={{ x: drawerOpen ? '0%' : '-100%' }}
        transition={SPRING.snappy}
        className="fixed inset-y-0 left-0 z-50 flex h-full w-80 max-w-[85vw] -translate-x-full flex-col border-r border-border bg-paper p-5 shadow-2xl focus:outline-none"
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
            className="icon-btn bg-paper-elevated text-text"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body with scroll if needed */}
        <div className="flex-1 space-y-6 overflow-y-auto py-5 pr-1">
          <DrawerUserCard />
          <DrawerNav onItemClick={handleClose} />
        </div>

        {/* Footer with Theme Selector and Sign out */}
        <DrawerFooter onClose={handleClose} />
      </m.aside>
    </>
  );
};

export default Drawer;
