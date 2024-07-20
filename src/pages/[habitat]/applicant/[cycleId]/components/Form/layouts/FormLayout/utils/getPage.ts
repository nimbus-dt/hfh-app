// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPage = (formReady: any, translate: (key?: string) => string) => {
  const pagesCount = formReady?.components;
  if (!pagesCount) return 0;
  const lastPageComponents =
    pagesCount[pagesCount.length - 1]?.components[0]?.components;
  if (!lastPageComponents) return 0;

  const pages =
    lastPageComponents[lastPageComponents.length - 1].component.value;

  console.log(pages);
  for (let i = 0; i < pages.length; i++) {
    pages[i].section = translate(pages[i].section);
  }
  return lastPageComponents[lastPageComponents.length - 1].component.value;
};

export default getPage;
