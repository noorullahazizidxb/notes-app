import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';
import SiteFooter from '../SiteFooter';
import Navbar from './navbar/Navbar';
import Drawer from './drawer/Drawer';

/** Authenticated chrome: sticky navbar, mobile drawer, content, footer. */
const AppShell = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <Drawer />
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-7xl flex-1 px-4 pb-12 pt-8 focus:outline-none sm:px-6 lg:px-8">
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </main>
    <SiteFooter to="/notes" />
  </div>
);

export default AppShell;
