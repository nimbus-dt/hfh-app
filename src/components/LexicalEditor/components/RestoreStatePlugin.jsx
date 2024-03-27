import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const RestoreStatePlugin = ({ serializedEditorState }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (serializedEditorState) {
      const initialEditorState = editor.parseEditorState(serializedEditorState);
      editor.setEditorState(initialEditorState);
    }
  }, [serializedEditorState, editor]);
};

RestoreStatePlugin.propTypes = {
  serializedEditorState: PropTypes.string,
};

export default RestoreStatePlugin;
