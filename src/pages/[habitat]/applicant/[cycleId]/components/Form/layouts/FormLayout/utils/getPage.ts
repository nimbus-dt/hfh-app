// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPage = (formReady: any) => {
  const pagesCount = formReady?.components;
  if (!pagesCount) return 0;
  const lastPageComponents =
    pagesCount[pagesCount.length - 1]?.components[0]?.components;
  if (!lastPageComponents) return 0;
  return lastPageComponents[lastPageComponents.length - 1].component.value;
};

export default getPage;
