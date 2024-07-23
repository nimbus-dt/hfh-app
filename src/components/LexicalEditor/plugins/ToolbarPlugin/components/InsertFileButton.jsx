import { useTranslation } from 'react-i18next';
import { Button, Flex } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Modal from 'components/Modal';
import FileInput from 'components/FileInput';
import CustomButton from 'components/CustomButton/CustomButton';
import { INSERT_FILE_COMMAND } from '../../FilePlugin';
import style from '../ToolbarPlugin.module.css';

const InsertFileButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();

  const handleOpenClose = () => {
    setFiles([]);
    setModalIsOpen((prevModalIsOpen) => !prevModalIsOpen);
  };

  const handleAddFileOnClick = () => {
    if (files.length > 0) {
      editor.dispatchCommand(INSERT_FILE_COMMAND, {
        path: URL.createObjectURL(files[0]),
        name: files[0]?.name,
      });
      handleOpenClose();
    }
  };

  return (
    <>
      <Modal
        title={t(
          'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertFileButton.insertFile'
        )}
        open={modalIsOpen}
        onClickClose={handleOpenClose}
        width="35rem"
      >
        <Flex direction="column" alignItems="stretch">
          <FileInput
            label={t(
              'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertFileButton.uploadFile'
            )}
            maxFileCount={1}
            multiple={false}
            files={files}
            onChange={(newFiles) => setFiles(newFiles)}
          />
          <Flex justifyContent="end">
            <Button variation="primary" onClick={handleAddFileOnClick}>
              {t(
                'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertFileButton.add'
              )}
            </Button>
            <Button onClick={handleOpenClose}>
              {t(
                'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertFileButton.cancel'
              )}
            </Button>
          </Flex>
        </Flex>
      </Modal>
      <CustomButton
        variation="text-only"
        onClick={handleOpenClose}
        aria-label={t(
          'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertFileButton.insertFile'
        )}
        title={t(
          'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertFileButton.insertFile'
        )}
        className={style.toolbarButton}
      >
        <MdInsertDriveFile />
      </CustomButton>
    </>
  );
};

export default InsertFileButton;
