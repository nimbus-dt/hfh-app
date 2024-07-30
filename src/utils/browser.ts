export const isMobileBrowser = () =>
  'ontouchstart' in window || navigator.maxTouchPoints > 0;
