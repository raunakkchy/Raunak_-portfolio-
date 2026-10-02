import React, { useState, useEffect } from 'react';
import { CMSProvider } from './context/CMSContext';
import { PublicPortfolio } from './pages/PublicPortfolio';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // If URL hash was left as #admin when opening the site, clean it up so the public portfolio always opens
      if (window.location.hash.startsWith('#admin') || window.location.hash.startsWith('#/admin')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        return false;
      }
      // Only enter admin if path is explicitly /admin
      return window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
    }
    return false;
  });

  useEffect(() => {
    const handleRouteChange = () => {
      const pathname = window.location.pathname;
      setIsAdminRoute(pathname === '/admin' || pathname.startsWith('/admin/'));
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <CMSProvider>
      {isAdminRoute ? <AdminPage /> : <PublicPortfolio />}
    </CMSProvider>
  );
}
