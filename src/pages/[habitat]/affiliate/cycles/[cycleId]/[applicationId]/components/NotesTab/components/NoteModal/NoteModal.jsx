import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LexicalEditor from 'components/LexicalEditor';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { Button, Flex, Loader } from '@aws-amplify/ui-react';

const NoteModal = ({ open, onClose, onSave, uploading }) => {
  const { t } = useTranslation();
  const [editorState, setEditorState] = useState();

  const handleOnChange = (state) => {
    setEditorState(state.toJSON());
  };

  const handleOnSave = () => {
    onSave(editorState);
    setEditorState();
  };

  return (
    <Modal
      title={t(
        'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.components.noteModal.title'
      )}
      open={open}
      onClickClose={onClose}
      width="45rem"
    >
      <LexicalEditor
        editorState={editorState}
        onChange={handleOnChange}
        editable
      />
      <Flex justifyContent="right" marginTop="1rem">
        <Button
          onClick={handleOnSave}
          variation="primary"
          isDisabled={uploading}
        >
          {uploading ? (
            <Flex alignItems="center">
              <Loader />
              {t(
                'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.components.noteModal.uploading'
              )}
            </Flex>
          ) : (
            t(
              'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.components.noteModal.save'
            )
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
