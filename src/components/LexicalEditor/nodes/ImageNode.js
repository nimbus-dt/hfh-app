/* eslint-disable class-methods-use-this */
import { $applyNodeReplacement, DecoratorNode } from 'lexical';
import * as React from 'react';
import ImageComponent from './ImageComponent';

function convertImageElement(domNode) {
  const img = domNode;
  if (img.src.startsWith('file:///')) {
    return null;
  }
  const { alt: altText, src } = img;
  const node = $createImageNode({ altText, src });
  return { node };
}

export class ImageNode extends DecoratorNode {
  __src;

  __altText;

  __name;

  __s3Key;

  static getType() {
    return 'image';
  }

  static clone(node) {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__key,
      node.__name,
      node.__s3Key
    );
  }

  static importJSON(serializedNode) {
    const { altText, src, name, s3Key } = serializedNode;
    const node = $createImageNode({
      altText,
      src,
      name,
      s3Key,
    });

    return node;
  }

  exportDOM() {
    const element = document.createElement('img');

    element.setAttribute('src', this.__src);

    element.setAttribute('alt', this.__altText);

    element.setAttribute('data-name', this.__name);

    element.setAttribute('style', 'min-width:90%;max-width:90%;');

    return { element };
  }

  static importDOM() {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  constructor(src, altText, key, name, s3Key) {
    super(key);
    this.__src = src;
    this.__name = name;
    this.__altText = altText;
    this.__s3Key = s3Key;
  }

  exportJSON() {
    return {
      altText: this.getAltText(),
      src: this.getSrc(),
      type: 'image',
      version: 1,
      name: this.__name,
      s3Key: this.__s3Key,
    };
  }

  // View

  createDOM(config) {
    const div = document.createElement('div');
    const { theme } = config;
    const className = theme.image;
    if (className !== undefined) {
      div.className = className;
    }
    return div;
  }

  updateDOM() {
    return false;
  }

  getSrc() {
    return this.__src;
  }

  getAltText() {
    return this.__altText;
  }

  decorate() {
    return (
      <ImageComponent
        src={this.__src}
        altText={this.__altText}
        nodeKey={this.getKey()}
        s3key={this.__s3Key}
      />
    );
  }
}

export function $createImageNode({ altText, src, key, name, s3Key }) {
  return $applyNodeReplacement(new ImageNode(src, altText, key, name, s3Key));
}

export function $isImageNode(node) {
  return node instanceof ImageNode;
}
