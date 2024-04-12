import { $generateHtmlFromNodes } from '@lexical/html';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { func } from 'prop-types';

const ExportToHtmlPlugin = ({ onChange }) => {
  const onChangeInternal = (editorState, editor) => {
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);

      onChange(htmlString);
    });
  };

  return <OnChangePlugin onChange={onChangeInternal} ignoreSelectionChange />;
};

ExportToHtmlPlugin.propTypes = {
  onChange: func,
};

export default ExportToHtmlPlugin;
