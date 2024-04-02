import LexicalEditor from 'components/LexicalEditor';
import Modal from 'components/Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Flex, Loader } from '@aws-amplify/ui-react';

const NoteModal = ({ open, onClose, onSave, uploading }) => {
  const [editorState, setEditorState] = useState();

  const handleOnChange = (state) => {
    setEditorState(state.toJSON());
  };

  const handleOnSave = () => {
    onSave(editorState);
    setEditorState();
  };

  return (
    <Modal title="Note" open={open} onClickClose={onClose} width="45rem">
      <LexicalEditor
        editorState={editorState}
        onChange={handleOnChange}
        editable
      />
      <Flex justifyContent="right" marginTop="1rem">
        <Button onClick={handleOnSave} variation="primary">
          {uploading ? (
            <>
              <Loader />
              Uploading
            </>
          ) : (
            'Save'
          )}
        </Button>
      </Flex>
    </Modal>
  );
};

NoteModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  uploading: PropTypes.bool,
};

export default NoteModal;
