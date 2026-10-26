import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from 'react-router-dom';
import React from 'react';
import AppShell from '../components/layout/AppShell';
import AppToaster from '../components/layout/AppToaster';
import NotFound from './routes/NotFound';
import Login from './routes/Login';
import Register from './routes/Register';
import GoogleComplete from './routes/GoogleComplete';
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
      <AppShell />
      <AppToaster />
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
      <AppToaster />
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
