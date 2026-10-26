import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Drawer from '../components/Drawer';
import NotFound from './routes/NotFound';
import Login from './routes/Login';
import Register from './routes/Register';
import GoogleComplete from './routes/GoogleComplete';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { NavigationProvider } from '../lib/navigation/NavigationProvider';
import SiteFooter from '../components/SiteFooter';
import Landing from './routes/Landing';
import Seo from '../seo/Seo';

const Dashboard = React.lazy(() => import('./routes/Dashboard'));
const Editor = React.lazy(() => import('./routes/Editor'));
const Favorites = React.lazy(() => import('./routes/Favorites'));
const Settings = React.lazy(() => import('./routes/Settings'));

const ProtectedLayout = () => {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;

  return (
    <NavigationProvider>
      <Seo title="My notes — DevMinds Notes" noindex />
      <div className="flex min-h-screen flex-col">
        <Drawer />
        <Navbar />
        <Suspense fallback={<Spinner />}>
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto w-full max-w-7xl flex-1 px-4 pb-12 pt-6 sm:px-6 sm:pt-8 lg:px-8 focus:outline-none"
          >
            <Outlet />
          </main>
        </Suspense>
        <SiteFooter to="/notes" />
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2800,
          style: {
            border: '1px solid var(--color-border)',
            background: 'var(--color-paper)',
            color: 'var(--color-text)',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
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
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
        <SiteFooter to="/" />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2800,
          style: {
            border: '1px solid var(--color-border)',
            background: 'var(--color-paper)',
            color: 'var(--color-text)',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </NavigationProvider>
  );
};

const routes = createRoutesFromElements(
  <>
    <Route element={<GuestLayout />}>
      <Route index element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="auth/google/complete" element={<GoogleComplete />} />
    </Route>
    <Route element={<ProtectedLayout />}>
      <Route path="notes" element={<Dashboard />} />
      <Route path="editor/:id?" element={<Editor />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="settings" element={<Settings />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </>
);

export const router = createBrowserRouter(routes);
