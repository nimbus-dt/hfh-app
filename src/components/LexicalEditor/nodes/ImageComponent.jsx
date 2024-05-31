import * as React from 'react';
import PropTypes from 'prop-types';
import './ImageNode.style.css';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { useRef, useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from 'lexical';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { $isImageNode } from './ImageNode';

const ImageComponent = ({ src, nodeKey, altText, s3key }) => {
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [editor] = useLexicalComposerContext();

  const imageRef = useRef(null);

  const onDelete = useCallback(
    (payload) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) {
          node.remove();
          return true;
        }
      }
      return false;
    },
    [isSelected, nodeKey]
  );

  const onClick = useCallback(
    (event) => {
      if (event.target === imageRef.current) {
        if (event.shiftKey) {
          setSelected(!isSelected);
        } else {
          clearSelection();
          setSelected(true);
        }
        return true;
      }

      return false;
    },
    [isSelected, setSelected, clearSelection]
  );

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerCommand(CLICK_COMMAND, onClick, COMMAND_PRIORITY_LOW),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    );

    return () => {
      unregister();
    };
  }, [
    clearSelection,
    editor,
    isSelected,
    nodeKey,
    onClick,
    onDelete,
    setSelected,
  ]);

  return (
    <div onClick={onClick} aria-hidden="true">
      {s3key ? (
        <StorageImage
          className={`image-node ${editor.isEditable() ? 'editable' : ''} ${
            isSelected ? 'selected' : ''
          }`}
          imgKey={s3key}
          alt={altText}
          itemRef={imageRef}
          accessLevel="public"
        />
      ) : (
        <img
          className={`image-node ${editor.isEditable() ? 'editable' : ''} ${
            isSelected ? 'selected' : ''
          }`}
          src={src}
          alt={altText}
          ref={imageRef}
        />
      )}
    </div>
  );
};

ImageComponent.propTypes = {
  src: PropTypes.string,
  altText: PropTypes.string,
  nodeKey: PropTypes.string,
  s3key: PropTypes.string,
};

export default ImageComponent;
