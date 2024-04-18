import * as React from 'react';
import PropTypes from 'prop-types';
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
import { Button, Flex, Text, View } from '@aws-amplify/ui-react';
import { MdDownload } from 'react-icons/md';
import { downloadWithUrl } from 'utils/files';
import { Storage } from 'aws-amplify';
import { $isFileNode } from './FileNode';

const FileComponent = ({ nodeKey, name, s3key, path }) => {
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [editor] = useLexicalComposerContext();

  const fileRef = useRef(null);

  const handleOnDownload = async () => {
    if (isSelected || !editor.isEditable()) {
      try {
        if (s3key) {
          const getUrlResult = await Storage.get(s3key, {
            expires: 600,
            validateObjectExistence: true,
          });
          downloadWithUrl(getUrlResult, name);
        } else {
          downloadWithUrl(path, name);
        }
      } catch (error) {
        console.log('Error downloading file.');
      }
    }
  };

  const onDelete = useCallback(
    (payload) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isFileNode(node)) {
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
      if (
        event.target === fileRef.current ||
        fileRef.current.contains(event.target)
      ) {
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
    <Flex
      onClick={onClick}
      aria-hidden="true"
      borderColor={
        isSelected
          ? 'var(--amplify-colors-blue-40)'
          : 'var(--amplify-colors-border-primary)'
      }
      borderStyle={editor.isEditable() ? 'solid' : ''}
      borderRadius="small"
      borderWidth="medium"
      padding="0.25rem"
      style={{
        cursor: 'pointer',
      }}
      ref={fileRef}
    >
      <Button
        flex={1}
        variation="primary"
        onClick={handleOnDownload}
        maxWidth="100%"
        title={name}
      >
        <Flex alignItems="center" maxWidth="100%">
          <Flex>
            <MdDownload />
          </Flex>
          <Text
            color="white"
            overflow="hidden"
            style={{ textOverflow: 'ellipsis' }}
            whiteSpace="nowrap"
          >
            {name}
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
};

FileComponent.propTypes = {
  name: PropTypes.string,
  nodeKey: PropTypes.string,
  s3key: PropTypes.string,
  path: PropTypes.string,
};

export default FileComponent;
