import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Drawer from '../components/Drawer';
import NotFound from './routes/NotFound';
import Login from './routes/Login';
import Register from './routes/Register';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { NavigationProvider } from '../lib/navigation/NavigationProvider';

const Dashboard = React.lazy(() => import('./routes/Dashboard'));
const Editor = React.lazy(() => import('./routes/Editor'));
const Favorites = React.lazy(() => import('./routes/Favorites'));
const Settings = React.lazy(() => import('./routes/Settings'));

const ProtectedLayout = () => {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;

  return (
    <NavigationProvider>
      <Drawer />
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </Suspense>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2800,
          style: {
            border: '1px solid var(--color-border)',
            background: 'var(--color-card-bg)',
            color: 'var(--color-text)',
          },
        }}
        containerStyle={{ zIndex: 9999 }}
      />
    </NavigationProvider>
  );
};

const GuestLayout = () => {
  const token = useAuthStore((s) => s.token);
  // Redirect already-authenticated users away from login/register
  if (token) return <Navigate to="/notes" replace />;
  return (
    <NavigationProvider>
      <Outlet />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2800,
          style: {
            border: '1px solid var(--color-border)',
            background: 'var(--color-card-bg)',
            color: 'var(--color-text)',
          },
        }}
      />
    </NavigationProvider>
  );
};

const routes = createRoutesFromElements(
  <>
    <Route element={<GuestLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
    <Route element={<ProtectedLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="notes" element={<Dashboard />} />
      <Route path="editor/:id?" element={<Editor />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="settings" element={<Settings />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </>
);

export const router = createBrowserRouter(routes);
