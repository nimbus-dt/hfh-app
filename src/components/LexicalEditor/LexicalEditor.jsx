import React from 'react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { Text, View } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import ToolbarPlugin from './components/ToolbarPlugin';
import LexicalEditorTheme from './LexicalEditor.Theme';
import './LexicalEditor.style.css';

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
  initialEditorState,
  onChange = () => {},
  editable,
}) => (
  <LexicalComposer
    initialConfig={{
      editorState: initialEditorState,
      editable,
      theme: LexicalEditorTheme,
      namespace: 'MyEditor',
      onError: (error) => console.log('Lexical error', error),
    }}
  >
    <View
      border="var(--amplify-colors-border-primary)"
      borderStyle="solid"
      borderRadius="small"
      borderWidth="medium"
    >
      {editable && <ToolbarPlugin />}
      <View position="relative">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          ErrorBoundary={LexicalErrorBoundary}
          placeholder={editable && <Placeholder />}
        />
        {editable && (
          <>
            <HistoryPlugin />
            <AutoFocusPlugin />
            <OnChangePlugin onChange={onChange} />
          </>
        )}
      </View>
    </View>
  </LexicalComposer>
);

LexicalEditor.propTypes = {
  initialEditorState: PropTypes.object,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
};

export default LexicalEditor;
