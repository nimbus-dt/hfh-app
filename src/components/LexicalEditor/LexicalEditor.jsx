import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { Text, View } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { HeadingNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import LexicalEditorTheme from './LexicalEditor.Theme';
import './LexicalEditor.style.css';
import RestoreStatePlugin from './plugins/RestoreStatePlugin';
import EditablePlugin from './plugins/EditablePlugin';
import { ImageNode } from './nodes/ImageNode';
import ImagePlugin from './plugins/ImagePlugin';
import FilePlugin from './plugins/FilePlugin';
import { FileNode } from './nodes/FileNode';
import ExportToHtmlPlugin from './plugins/ExportToHtmlPlugin';

// eslint-disable-next-line react/display-name
const Placeholder = ({ text, updateHeight }) => {
  const { t } = useTranslation();
  const textRef = useRef(null);
  useEffect(() => {
    if (!textRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (textRef.current) {
        requestAnimationFrame(() => updateHeight(textRef.current.offsetHeight));
      }
    });
    resizeObserver.observe(textRef.current);
    return () => {
      resizeObserver.disconnect();
      updateHeight(undefined);
    };
  }, [updateHeight]);

  return (
    <Text
      opacity="50"
      position="absolute"
      top="0"
      left="0"
      padding="0.75rem 0.5rem"
      overflow="hidden"
      style={{
        whiteSpace: 'pre-wrap',
        textOverflow: 'ellipsis',
        pointerEvents: 'none',
      }}
      as="p"
      ref={textRef}
    >
      {text || t('components.lexicalEditor.placeholder')}
    </Text>
  );
};

Placeholder.propTypes = {
  text: PropTypes.string,
  updateHeight: PropTypes.func,
};

const LexicalEditor = ({
  onChange = () => undefined,
  onChangeHtml,
  editable,
  serializedEditorState,
  disableFiles,
  placeholder,
}) => {
  const [placeholderHeight, setPlaceholderHeight] = useState(undefined);
  return (
    <LexicalComposer
      initialConfig={{
        theme: LexicalEditorTheme,
        namespace: 'MyEditor',
        onError: (error) => console.log('Lexical error', error),
        nodes: [
          ImageNode,
          ...(disableFiles ? [] : [FileNode]),
          HeadingNode,
          ListNode,
          ListItemNode,
        ],
      }}
    >
      <View
        border="var(--amplify-colors-border-primary)"
        borderStyle={editable ? 'solid' : ''}
        borderRadius="small"
        borderWidth="medium"
      >
        {editable && <ToolbarPlugin disableFiles={disableFiles} />}
        <View position="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`editor-input ${!editable ? 'editor-readonly' : ''}`}
                style={{
                  height: placeholderHeight,
                }}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
            placeholder={
              editable && (
                <Placeholder
                  text={placeholder}
                  updateHeight={setPlaceholderHeight}
                />
              )
            }
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <OnChangePlugin onChange={onChange} />
          <ListPlugin />
          {!disableFiles && <FilePlugin />}
          <ImagePlugin />
          <EditablePlugin editable={!!editable} />
          <RestoreStatePlugin serializedEditorState={serializedEditorState} />
          {onChangeHtml && <ExportToHtmlPlugin onChange={onChangeHtml} />}
        </View>
      </View>
    </LexicalComposer>
  );
};

LexicalEditor.propTypes = {
  serializedEditorState: PropTypes.string,
  onChange: PropTypes.func,
  onChangeHtml: PropTypes.func,
  editable: PropTypes.bool,
  disableFiles: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default LexicalEditor;
