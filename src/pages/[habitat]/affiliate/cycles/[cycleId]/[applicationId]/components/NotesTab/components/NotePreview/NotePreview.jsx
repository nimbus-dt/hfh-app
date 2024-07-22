import { Button, Flex, Loader, Text } from '@aws-amplify/ui-react';
import { get } from 'aws-amplify/api';
import LexicalEditor from 'components/LexicalEditor';
import Modal from 'components/Modal';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import ExpandableCard from 'components/ExpandableCard';

const NotePreview = ({
  ownerID,
  createdAt,
  serializedEditorState,
  onDelete,
  deleting,
}) => {
  const [email, setEmail] = useState('');

  const [confirmModal, setConfirmModal] = useState(false);

  const handleOpenCloseConfirmModal = () => {
    if (!deleting) {
      setConfirmModal((prevConfirmModal) => !prevConfirmModal);
    }
  };

  useEffect(() => {
    const getEmail = async () => {
      try {
        const response = await get({
          apiName: 'userAPI',
          path: '/email',
          options: {
            queryParams: {
              sub: ownerID,
            },
          },
        }).response;

        const body = await response.body.json();

        setEmail(body.email);
      } catch (error) {
        console.log('error', error);
      }
    };
    getEmail();
  }, [ownerID]);

  return (
    <ExpandableCard>
      <>
        <Flex justifyContent="space-between" alignItems="center">
          <Text>
            <b>Note by:</b> {email}
          </Text>
          <Flex alignItems="center">
            <Text>{dayjs(createdAt || undefined).format('YYYY-MM-DD')}</Text>
            <Modal
              title="Delete note"
              onClickClose={handleOpenCloseConfirmModal}
              width="25rem"
              open={confirmModal}
            >
              <Flex direction="column">
                <Text>Are you sure you want to delete this note?</Text>
                <Flex justifyContent="end">
                  <Button
                    variation="primary"
                    onClick={onDelete}
                    isDisabled={deleting}
                  >
                    {deleting ? (
                      <Flex alignItems="center">
                        <Loader />
                        Deleting
                      </Flex>
                    ) : (
                      'Accept'
                    )}
                  </Button>

                  <Button
                    variation="warning"
                    onClick={handleOpenCloseConfirmModal}
                    isDisabled={deleting}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            </Modal>
            <Button
              variation="destructive"
              padding="0.5rem"
              onClick={handleOpenCloseConfirmModal}
            >
              <MdDelete />
            </Button>
          </Flex>
        </Flex>
        <LexicalEditor serializedEditorState={serializedEditorState} />
      </>
    </ExpandableCard>
  );
};

NotePreview.propTypes = {
  ownerID: PropTypes.string,
  createdAt: PropTypes.string,
  serializedEditorState: PropTypes.string,
  onDelete: PropTypes.func,
  deleting: PropTypes.bool,
};

export default NotePreview;
