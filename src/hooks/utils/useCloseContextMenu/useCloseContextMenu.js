import { useEffect } from 'react';
import PropTypes from 'prop-types';

const useCloseContextMenu = (contextMenuRef, onClickOutside) => {
  useEffect(() => {
    const handleClickOutsideContextMenu = (event) => {
      if (
        contextMenuRef.current &&
        event.target instanceof Element &&
        !contextMenuRef.current.contains(event.target)
      ) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutsideContextMenu);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideContextMenu);
    };
  }, [contextMenuRef, onClickOutside]);
};

useCloseContextMenu.propTypes = {
  contextMenuRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onClickOutside: PropTypes.func,
};

export default useCloseContextMenu;
