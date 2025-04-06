import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Drawer from '../components/Drawer';

const Dashboard = React.lazy(() => import('./routes/Dashboard'));
const Editor = React.lazy(() => import('./routes/Editor'));
const Favorites = React.lazy(() => import('./routes/Favorites'));
const Settings = React.lazy(() => import('./routes/Settings'));

const Layout = () => (
  <>
    <Drawer />
    <Navbar />
    <Suspense fallback={<Spinner />}>
    <div className='container mx-auto px-4 pt-16'>
    <Outlet />
    </div>

    </Suspense>
  </>
);

const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="notes" element={<Dashboard />} />
    <Route path="editor/:id?" element={<Editor />} />
    <Route path="favorites" element={<Favorites />} />
    <Route path="settings" element={<Settings />} />
  </Route>
);


export const router = createBrowserRouter(routes);
