import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const EditablePlugin = ({ editable }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(editable);
  }, [editable, editor]);
};

EditablePlugin.propTypes = {
  editable: PropTypes.bool,
};

export default EditablePlugin;
