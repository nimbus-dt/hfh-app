/**
 * Print the provided element, replacing the body content with the element
 * after printing, the original body content is restored
 * @param element
 */
export const printElement = (element: HTMLElement) => {
  const { body } = document;

  const originalChildren: Node[] = [...body.children];

  const elementClone = element.cloneNode(true) as HTMLElement;

  while (body.firstChild) {
    body.firstChild.remove();
  }

  body.append(elementClone);

  const anchors = body.getElementsByTagName('a');
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].setAttribute('href', '#');
  }

  window.print();

  while (body.firstChild) {
    (body.firstChild as HTMLElement).remove();
  }

  for (const child of originalChildren) {
    body.append(child);
  }
};
