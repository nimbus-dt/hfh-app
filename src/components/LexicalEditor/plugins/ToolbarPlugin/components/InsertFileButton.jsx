import { Button, Flex } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Modal from 'components/Modal';
import FileInput from 'components/FileInput';
import { INSERT_IMAGE_COMMAND } from '../../ImagePlugin';

const InsertFileButton = ({ buttonProps }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [files, setFiles] = useState([]);

  const handleOpenClose = () => {
    setFiles([]);
    setModalIsOpen((prevModalIsOpen) => !prevModalIsOpen);
  };

  const handleAddFileOnClick = () => {
    if (files.length > 0) {
      // editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      //   src: URL.createObjectURL(files[0]),
      //   altText,
      //   name: files[0]?.name,
      // });
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
      <Button
        onClick={handleOpenClose}
        {...buttonProps}
        aria-label="Insert image"
      >
        <MdInsertDriveFile />
      </Button>
    </>
  );
};

InsertFileButton.propTypes = {
  buttonProps: PropTypes.object,
};

export default InsertFileButton;
