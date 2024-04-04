import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { $createFileNode, FileNode } from '../nodes/FileNode';

export const INSERT_FILE_COMMAND = createCommand();

export default function FilePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([FileNode])) {
      throw new Error(
        'FilePlugin: FileNode not registered on editor (initialConfig.nodes)'
      );
    }

    return editor.registerCommand(
      INSERT_FILE_COMMAND,
      (payload) => {
        const fileNode = $createFileNode(payload);
        $insertNodeToNearestRoot(fileNode);

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
