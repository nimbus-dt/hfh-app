import React from 'react';
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

function Placeholder() {
  return (
    <Text
      opacity="50"
      position="absolute"
      top="0.75rem"
      left="0.5rem"
      overflow="hidden"
      style={{
        textOverflow: 'ellipsis',
        pointerEvents: 'none',
      }}
    >
      Enter some text...
    </Text>
  );
}

const LexicalEditor = ({
  onChange = () => undefined,
  onChangeHtml,
  editable,
  serializedEditorState,
  disableFiles,
}) => (
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
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
          placeholder={editable && <Placeholder />}
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

LexicalEditor.propTypes = {
  serializedEditorState: PropTypes.string,
  onChange: PropTypes.func,
  onChangeHtml: PropTypes.func,
  editable: PropTypes.bool,
  disableFiles: PropTypes.bool,
};

export default LexicalEditor;
