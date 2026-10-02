import React, { useState, useEffect } from 'react';
import { CMSProvider } from './context/CMSContext';
import { PublicPortfolio } from './pages/PublicPortfolio';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash.startsWith('#admin') ||
      window.location.hash.startsWith('#/admin')
    );
  });

  useEffect(() => {
    const handleRouteChange = () => {
      const isAdmin =
        window.location.pathname.startsWith('/admin') ||
        window.location.hash.startsWith('#admin') ||
        window.location.hash.startsWith('#/admin');
      setIsAdminRoute(isAdmin);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  return (
    <CMSProvider>
      {isAdminRoute ? <AdminPage /> : <PublicPortfolio />}
    </CMSProvider>
  );
}
