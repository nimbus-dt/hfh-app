import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTopOnRouteChange = (elementReference) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (elementReference?.current) {
      elementReference.current.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [elementReference, pathname]);
};

export default useScrollToTopOnRouteChange;
