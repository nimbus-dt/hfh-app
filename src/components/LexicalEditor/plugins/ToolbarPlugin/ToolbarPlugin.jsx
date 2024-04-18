import {
  Button,
  Divider,
  Flex,
  SelectField,
  View,
} from '@aws-amplify/ui-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  $createParagraphNode,
  $isRootOrShadowRoot,
} from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdRedo,
  MdUndo,
} from 'react-icons/md';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from '@lexical/list';
import InsertImageButton from './components/InsertImageButton';
import InsertFileButton from './components/InsertFileButton';

const LowPriority = 1;

const buttonProps = {
  padding: '.5rem',
  borderStyle: 'none',
};

const VerticalDivider = () => (
  <Divider orientation="vertical" opacity={1} alignSelf="stretch" />
);

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      const anchorNode = selection.anchor.getNode();

      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }
    }
  }, [editor]);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const handleTextTypeOnChange = (event) => {
    const type = event.currentTarget.value;
    switch (type) {
      case 'h1': {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode('h1'));
          }
        });
        break;
      }
      case 'h2': {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode('h2'));
          }
        });
        break;
      }
      case 'h3': {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode('h3'));
          }
        });
        break;
      }
      case 'bullet': {
        if (blockType !== 'bullet') {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
          formatParagraph();
        }
        break;
      }
      case 'number': {
        if (blockType !== 'check') {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
          formatParagraph();
        }
        break;
      }
      case 'paragraph':
      default: {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createParagraphNode());
          }
        });
      }
    }
  };

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateToolbar();
          });
        }),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateToolbar();
            return false;
          },
          LowPriority
        ),
        editor.registerCommand(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload);
            return false;
          },
          LowPriority
        ),
        editor.registerCommand(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload);
            return false;
          },
          LowPriority
        )
      ),
    [editor, updateToolbar]
  );

  return (
    <View
      position="sticky"
      top="0rem"
      backgroundColor="Background"
      style={{ zIndex: 1 }}
    >
      <Flex
        gap="0.25rem"
        ref={toolbarRef}
        padding="0.25rem"
        alignItems="center"
      >
        <Button
          isDisabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          aria-label="Undo"
          title="Undo"
          {...buttonProps}
        >
          <MdUndo />
        </Button>
        <Button
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          aria-label="Redo"
          title="Redo"
          {...buttonProps}
        >
          <MdRedo />
        </Button>
        <VerticalDivider />
        <SelectField
          labelHidden
          value={blockType}
          onChange={handleTextTypeOnChange}
        >
          <option value="paragraph">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="bullet">Bullet List</option>
          <option value="number">Numbered List</option>
        </SelectField>
        <VerticalDivider />
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
          aria-label="Format Bold"
          title="Format Bold"
          {...buttonProps}
          backgroundColor={isBold && 'brand.primary.10'}
        >
          <MdFormatBold />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          }}
          {...buttonProps}
          backgroundColor={isItalic && 'brand.primary.10'}
          aria-label="Format Italics"
          title="Format Italics"
        >
          <MdFormatItalic />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          }}
          {...buttonProps}
          backgroundColor={isUnderline && 'brand.primary.10'}
          aria-label="Format Underline"
          title="Format Underline"
        >
          <MdFormatUnderlined />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
          }}
          {...buttonProps}
          backgroundColor={isStrikethrough && 'brand.primary.10'}
          aria-label="Format Strikethrough"
          title="Format Strikethrough"
        >
          <MdFormatStrikethrough />
        </Button>
        <VerticalDivider />
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
          }}
          {...buttonProps}
          aria-label="Left Align"
          title="Left Align"
        >
          <MdFormatAlignLeft />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
          }}
          {...buttonProps}
          aria-label="Center Align"
          title="Center Align"
        >
          <MdFormatAlignCenter />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
          }}
          {...buttonProps}
          aria-label="Right Align"
          title="Right Align"
        >
          <MdFormatAlignRight />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
          }}
          {...buttonProps}
          aria-label="Justify Align"
          title="Justify Align"
        >
          <MdFormatAlignJustify />
        </Button>
        <VerticalDivider />
        <InsertImageButton buttonProps={buttonProps} />
        <InsertFileButton buttonProps={buttonProps} />
      </Flex>
      <Divider opacity={1} />
    </View>
  );
};

export default ToolbarPlugin;
