export const checkOverflow = (element) => {
  const curOverflow = element.style.overflow;

  if (!curOverflow || curOverflow === 'visible')
    element.style.overflow = 'hidden';

  const isOverflowing =
    element.clientWidth < element.scrollWidth ||
    element.clientHeight < element.scrollHeight;

  element.style.overflow = curOverflow;

  return isOverflowing;
};
