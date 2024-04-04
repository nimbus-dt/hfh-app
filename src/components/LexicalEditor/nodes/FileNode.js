/* eslint-disable class-methods-use-this */
import { $applyNodeReplacement, DecoratorNode } from 'lexical';
import * as React from 'react';
import FileComponent from './FileComponent';

function convertFileElement(domNode) {
  const img = domNode;
  const { alt: altText, src } = img;
  const node = $createFileNode({ altText, src });
  return { node };
}

export class FileNode extends DecoratorNode {
  __name;

  __s3Key;

  __path;

  static getType() {
    return 'file';
  }

  static clone(node) {
    return new FileNode(node.__key, node.__name, node.__path, node.__s3Key);
  }

  static importJSON(serializedNode) {
    const { name, s3Key } = serializedNode;
    const node = $createFileNode({
      name,
      s3Key,
    });

    return node;
  }

  exportDOM() {
    const element = document.createElement('a');
    element.innerText = this.__name;
    return { element };
  }

  static importDOM() {
    return {
      a: () => ({
        conversion: convertFileElement,
        priority: 0,
      }),
    };
  }

  constructor(key, name, path, s3Key) {
    super(key);
    this.__name = name;
    this.__path = path;
    this.__s3Key = s3Key;
  }

  exportJSON() {
    return {
      type: 'file',
      version: 1,
      name: this.__name,
      s3Key: this.__s3Key,
      path: this.__path,
    };
  }

  // View

  createDOM(config) {
    const div = document.createElement('div');
    const { theme } = config;
    const className = theme.file;
    if (className !== undefined) {
      div.className = className;
    }
    return div;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <FileComponent
        path={this.__path}
        nodeKey={this.getKey()}
        s3key={this.__s3Key}
        name={this.__name}
      />
    );
  }
}

export function $createFileNode({ key, name, s3Key, path }) {
  return $applyNodeReplacement(new FileNode(key, name, path, s3Key));
}

export function $isFileNode(node) {
  return node instanceof FileNode;
}
