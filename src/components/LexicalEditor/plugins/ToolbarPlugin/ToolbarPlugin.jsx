import { useTranslation } from 'react-i18next';
import { Divider, Flex, View } from '@aws-amplify/ui-react';
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
import PropTypes from 'prop-types';
import CustomSelect from 'components/DropdownMenu/DropdownMenu';
import CustomButton from 'components/CustomButton/CustomButton';
import InsertImageButton from './components/InsertImageButton';
import InsertFileButton from './components/InsertFileButton';
import style from './ToolbarPlugin.module.css';

const LowPriority = 1;

const VerticalDivider = () => (
  <Divider orientation="vertical" opacity={1} alignSelf="stretch" />
);

const ToolbarPlugin = ({ disableFiles }) => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const { t } = useTranslation();

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
        wrap="wrap"
      >
        <CustomButton
          variation="text-only"
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          aria-label={t('components.lexicalEditor.plugins.ToolbarPlugin.undo')}
          title={t('components.lexicalEditor.plugins.ToolbarPlugin.undo')}
          className={style.toolbarButton}
        >
          <MdUndo />
        </CustomButton>
        <CustomButton
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          aria-label={t('components.lexicalEditor.plugins.ToolbarPlugin.redo')}
          title={t('components.lexicalEditor.plugins.ToolbarPlugin.redo')}
          variation="text-only"
          className={style.toolbarButton}
        >
          <MdRedo />
        </CustomButton>
        <VerticalDivider />
        <CustomSelect
          variation="small"
          value={blockType}
          onChange={handleTextTypeOnChange}
        >
          <option value="paragraph">
            {t('components.lexicalEditor.plugins.ToolbarPlugin.paragraph')}
          </option>
          <option value="h1">
            {t('components.lexicalEditor.plugins.ToolbarPlugin.h1')}
          </option>
          <option value="h2">
            {t('components.lexicalEditor.plugins.ToolbarPlugin.h2')}
          </option>
          <option value="h3">
            {t('components.lexicalEditor.plugins.ToolbarPlugin.h3')}
          </option>
          <option value="bullet">
            {t('components.lexicalEditor.plugins.ToolbarPlugin.bullet')}
          </option>
          <option value="number">
            {t('components.lexicalEditor.plugins.ToolbarPlugin.number')}
          </option>
        </CustomSelect>
        <VerticalDivider />
        <CustomButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
          aria-label={t('components.lexicalEditor.plugins.ToolbarPlugin.bold')}
          title={t('components.lexicalEditor.plugins.ToolbarPlugin.bold')}
          variation="text-only"
          className={`${style.toolbarButton} ${isBold ? style.selected : ''}`}
        >
          <MdFormatBold />
        </CustomButton>
        <CustomButton
          variation="text-only"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          }}
          className={`${style.toolbarButton} ${isItalic ? style.selected : ''}`}
          aria-label={t(
            'components.lexicalEditor.plugins.ToolbarPlugin.italic'
          )}
          title={t('components.lexicalEditor.plugins.ToolbarPlugin.italic')}
        >
          <MdFormatItalic />
        </CustomButton>
        <CustomButton
          variation="text-only"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          }}
          className={`${style.toolbarButton} ${
            isUnderline ? style.selected : ''
          }`}
          aria-label={t(
            'components.lexicalEditor.plugins.ToolbarPlugin.underline'
          )}
          title={t('components.lexicalEditor.plugins.ToolbarPlugin.underline')}
        >
          <MdFormatUnderlined />
        </CustomButton>
        <CustomButton
          variation="text-only"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
          }}
          className={`${style.toolbarButton} ${
            isStrikethrough ? style.selected : ''
          }`}
          aria-label={t(
            'components.lexicalEditor.plugins.ToolbarPlugin.strikethrough'
          )}
          title={t(
            'components.lexicalEditor.plugins.ToolbarPlugin.strikethrough'
          )}
        >
          <MdFormatStrikethrough />
        </CustomButton>
        <VerticalDivider />
        <CustomButton
          variation="text-only"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
          }}
          aria-label={t(
            'components.lexicalEditor.plugins.ToolbarPlugin.leftAlign'
          )}
          title={t('components.lexicalEditor.plugins.ToolbarPlugin.leftAlign')}
          className={`${style.toolbarButton}`}
        >
          <MdFormatAlignLeft />
        </CustomButton>
        <CustomButton
          variation="text-only"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
          }}
          aria-label={t(
            'components.lexicalEditor.plugins.ToolbarPlugin.centerAlign'
          )}
          title={t(
            'components.lexicalEditor.plugins.ToolbarPlugin.centerAlign'
          )}
          className={`${style.toolbarButton}`}
        >
          <MdFormatAlignCenter />
        </CustomButton>
        <CustomButton
          variation="text-only"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
          }}
          aria-label={t(
            'components.lexicalEditor.plugins.ToolbarPlugin.rightAlign'
          )}
          title={t('components.lexicalEditor.plugins.ToolbarPlugin.rightAlign')}
          className={`${style.toolbarButton}`}
        >
          <MdFormatAlignRight />
        </CustomButton>
        <CustomButton
          variation="text-only"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
          }}
          aria-label={t(
            'components.lexicalEditor.plugins.ToolbarPlugin.justifyAlign'
          )}
          title={t(
            'components.lexicalEditor.plugins.ToolbarPlugin.justifyAlign'
          )}
          className={`${style.toolbarButton}`}
        >
          <MdFormatAlignJustify />
        </CustomButton>
        <VerticalDivider />
        <InsertImageButton />
        {!disableFiles && <InsertFileButton />}
      </Flex>
      <Divider opacity={1} />
    </View>
  );
};

ToolbarPlugin.propTypes = {
  disableFiles: PropTypes.bool,
};

export default ToolbarPlugin;
