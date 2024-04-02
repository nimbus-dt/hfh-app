import { Button, Divider, Flex, View } from '@aws-amplify/ui-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
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
import InsertImageButton from './components/InsertImageButton';
import InsertFileButton from './components/InsertFileButton';

const LowPriority = 1;

const buttonProps = {
  padding: '.5rem',
  borderStyle: 'none',
};

const VerticalDivider = () => <Divider orientation="vertical" opacity={1} />;

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

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
          (_payload) => {
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
      <Flex gap="0.25rem" ref={toolbarRef} padding="0.25rem">
        <Button
          isDisabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          aria-label="Undo"
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
          {...buttonProps}
        >
          <MdRedo />
        </Button>
        <VerticalDivider />
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
          aria-label="Format Bold"
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
        >
          <MdFormatAlignLeft />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
          }}
          {...buttonProps}
          aria-label="Center Align"
        >
          <MdFormatAlignCenter />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
          }}
          {...buttonProps}
          aria-label="Right Align"
        >
          <MdFormatAlignRight />
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
          }}
          {...buttonProps}
          aria-label="Justify Align"
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
