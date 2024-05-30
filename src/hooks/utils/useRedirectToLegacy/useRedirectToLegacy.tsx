import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useRedirectToLegacy = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      pathname.startsWith('/homeownership/') ||
      pathname.startsWith('/affiliate-portal/')
    ) {
      window.location.href = `https://legacy.habitat-app.org${pathname}`;
    }
  }, [pathname]);
};

export default useRedirectToLegacy;
