import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Drawer from '../components/Drawer';
import NotFound from './routes/NotFound';
import { Toaster } from 'react-hot-toast';

const Dashboard = React.lazy(() => import('./routes/Dashboard'));
const Editor = React.lazy(() => import('./routes/Editor'));
const Favorites = React.lazy(() => import('./routes/Favorites'));
const Settings = React.lazy(() => import('./routes/Settings'));

const Layout = () => (
  <>
    <Drawer />
    <Navbar />
    <Suspense fallback={<Spinner />}>
      <div className='container mx-auto px-4 pt-20 bg-bg text-text'>
        <Outlet />
      </div>
    </Suspense>
    <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} containerStyle={{ zIndex: 9999, accentColor: '#333',animation: 'ease-in-out' }}  reverseOrder={false} />
  </>
);

const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="notes" element={<Dashboard />} />
    <Route path="editor/:id?" element={<Editor />} />
    <Route path="favorites" element={<Favorites />} />
    <Route path="settings" element={<Settings />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

export const router = createBrowserRouter(routes);
