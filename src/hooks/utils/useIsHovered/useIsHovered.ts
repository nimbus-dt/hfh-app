import { RefObject, useEffect, useState } from 'react';

const useIsHovered = (elementRef: RefObject<HTMLElement>) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleOnLeave = () => {
      setHovered(false);
    };

    const handleOnHover = () => {
      setHovered(true);
    };

    const element = elementRef.current;

    if (element) {
      elementRef.current.addEventListener('mouseleave', handleOnLeave, false);
      elementRef.current.addEventListener('mouseover', handleOnHover, false);
    }
    return () => {
      if (element) {
        element.removeEventListener('mouseleave', handleOnLeave, false);
        element.removeEventListener('mouseover', handleOnHover, false);
      }
    };
  }, [elementRef]);

  return hovered;
};

export default useIsHovered;
