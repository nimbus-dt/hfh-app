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
        title="Insert file"
        open={modalIsOpen}
        onClickClose={handleOpenClose}
        width="35rem"
      >
        <Flex direction="column" alignItems="stretch">
          <FileInput
            label="Upload file"
            maxFileCount={1}
            multiple={false}
            files={files}
            onChange={(newFiles) => setFiles(newFiles)}
          />
          <Flex justifyContent="end">
            <Button variation="primary" onClick={handleAddFileOnClick}>
              Add
            </Button>
            <Button onClick={handleOpenClose}>Cancel</Button>
          </Flex>
        </Flex>
      </Modal>
      <CustomButton
        variation="text-only"
        onClick={handleOpenClose}
        aria-label="Insert File"
        title="Insert File"
        className={style.toolbarButton}
      >
        <MdInsertDriveFile />
      </CustomButton>
    </>
  );
};

export default InsertFileButton;
