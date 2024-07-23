import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDelete } from 'react-icons/md';
import { Button, Flex, Loader, Text } from '@aws-amplify/ui-react';
import { get } from 'aws-amplify/api';
import LexicalEditor from 'components/LexicalEditor';
import Modal from 'components/Modal';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import ExpandableCard from 'components/ExpandableCard';

const NotePreview = ({
  ownerID,
  createdAt,
  serializedEditorState,
  onDelete,
  deleting,
}) => {
  const { t } = useTranslation();
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
            <b>
              {t(
                'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.components.notePreview.by'
              )}
            </b>{' '}
            {email}
          </Text>
          <Flex alignItems="center">
            <Text>{dayjs(createdAt || undefined).format('YYYY-MM-DD')}</Text>
            <Modal
              title={t(
                'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.components.notePreview.delete.title'
              )}
              onClickClose={handleOpenCloseConfirmModal}
              width="25rem"
              open={confirmModal}
            >
              <Flex direction="column">
                <Text>
                  {t(
                    'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.components.notePreview.delete.warning'
                  )}
                </Text>
                <Flex justifyContent="end">
                  <Button
                    variation="primary"
                    onClick={onDelete}
                    isDisabled={deleting}
                  >
                    {deleting ? (
                      <Flex alignItems="center">
                        <Loader />
                        {t(
                          'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.components.notePreview.delete.deleting'
                        )}
                      </Flex>
                    ) : (
                      t(
                        'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.components.notePreview.delete.accept'
                      )
                    )}
                  </Button>

                  <Button
                    variation="warning"
                    onClick={handleOpenCloseConfirmModal}
                    isDisabled={deleting}
                  >
                    {t(
                      'pages.habitat.affiliate.cycles.cycle.application.components.notesTab.components.notePreview.delete.cancel'
                    )}
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
