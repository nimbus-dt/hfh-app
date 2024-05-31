/**
 * Replace URL object imgs src in an html with it base 64 strings
 * @param {string} htmlString Html string
 * @returns {string}
 */

import { FileNode } from 'components/LexicalEditor/nodes/FileNode';
import { ImageNode } from 'components/LexicalEditor/nodes/ImageNode';
import { fileFromObjectURL, toBase64 } from './files';

export const replaceUrlObjectWithBase64 = async (htmlString) => {
  let newHtmlString = htmlString;

  const imgRegex = /<img([\w\W]+?)[/]?>/g;

  const foundImgElements = htmlString.match(imgRegex);

  if (foundImgElements) {
    for (const imgString of foundImgElements) {
      const blobRegex = /(?<=src=")(.*?)(?=")/g;

      const blobSrcs = imgString.match(blobRegex);

      if (blobSrcs) {
        const imgSrc = blobSrcs[0];

        if (imgSrc.startsWith('blob:')) {
          const dataNameRegex = /(?<=data-name=")(.*?)(?=")/g;

          const name = imgString.match(dataNameRegex);

          const imgFile = await fileFromObjectURL(imgSrc, name[0], 'image/*');

          const imgBase64 = await toBase64(imgFile);

          newHtmlString = newHtmlString.replace(imgSrc, imgBase64);
        }
      }
    }
  }

  return newHtmlString;
};

/**
 * Uploads object urls from image and file nodes and returns editor state with s3Keys
 * @param {Object} editorState JSON of editorState
 * @param {Function} uploadFile Functions that uploads the file to s3
 * @returns {Object}
 */

export const getEditorStateWithFilesInBucket = async (
  editorState,
  uploadFile
) => {
  const childrens = editorState.root.children;

  const newChildrens = [];

  for (const children of childrens) {
    if (children.type === FileNode.getType() && children.path !== undefined) {
      const file = await fileFromObjectURL(children.path, children.name);
      const result = await uploadFile(file);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { path, ...newChildren } = children;
      newChildren.s3Key = result.key;
      newChildrens.push(newChildren);
    } else if (
      children.type === ImageNode.getType() &&
      children.src.startsWith('blob:')
    ) {
      const file = await fileFromObjectURL(
        children.src,
        children.name,
        `image/${children.name.split('.').pop()}`
      );
      const result = await uploadFile(file);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { src, ...newChildren } = children;
      newChildren.s3Key = result.key;
      newChildrens.push(newChildren);
    } else {
      newChildrens.push(children);
    }
  }

  const newEditorState = { ...editorState };
  newEditorState.root.children = newChildrens;
  return newEditorState;
};
