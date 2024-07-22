import {
  Button,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  TextField,
  View,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import Modal from 'components/Modal';
import { Habitat, TestApplication } from 'models';
import React, { useCallback, useMemo, useState } from 'react';
import { MdAdd, MdCheck, MdClose, MdDelete, MdEdit } from 'react-icons/md';
import { DEFAULT_REVIEW_STATUS } from 'utils/constants';
import PropTypes from 'prop-types';
import useHabitat from 'hooks/utils/useHabitat';
import { useTranslation } from 'react-i18next';

const StatusModal = ({ open, onClose, setTrigger }) => {
  const { habitat, setHabitat } = useHabitat();
  const [editingStatus, setEditingStatus] = useState();
  const [editingAlert, setEditingAlert] = useState(false);
  const [deletingStatus, setDeletingStatus] = useState();
  const [newStatus, setNewStatus] = useState('');
  const { t } = useTranslation();

  const responsiveBool = useBreakpointValue({
    base: true,
    large: false,
  });

  const handleNewStatusOnChange = (event) => {
    setNewStatus(event.currentTarget.value);
  };

  const statusAlreadyExists = useMemo(
    () =>
      (habitat.props.customStatus
        ? [...habitat.props.customStatus, DEFAULT_REVIEW_STATUS]
        : [DEFAULT_REVIEW_STATUS]
      ).includes(newStatus),
    [habitat, newStatus]
  );

  const addCustomStatusToHabitat = useCallback(
    async (newCustomStatus) => {
      try {
        const original = await DataStore.query(Habitat, habitat);
        const persistedHabitat = await DataStore.save(
          Habitat.copyOf(original, (originalHabitat) => {
            if (
              !(
                originalHabitat.props.customStatus
                  ? originalHabitat.props.customStatus
                  : []
              ).includes(newCustomStatus) &&
              newCustomStatus !== DEFAULT_REVIEW_STATUS
            ) {
              originalHabitat.props.customStatus = originalHabitat.props
                .customStatus
                ? [...originalHabitat.props.customStatus, newCustomStatus]
                : [newCustomStatus];
            }
          })
        );
        setHabitat(persistedHabitat);
      } catch (error) {
        console.log(`Error updating the habitat's custom status.`);
      }
    },
    [habitat, setHabitat]
  );

  const removeCustomStatusToHabitat = useCallback(
    async (customStatus) => {
      try {
        const original = await DataStore.query(Habitat, habitat);
        const persistedHabitat = await DataStore.save(
          Habitat.copyOf(original, (originalHabitat) => {
            originalHabitat.props.customStatus =
              originalHabitat.props.customStatus.filter(
                (customStatusIntem) => customStatusIntem !== customStatus
              );
          })
        );
        setHabitat(persistedHabitat);
      } catch (error) {
        console.log(`Error removing a custom status from the habitat.`);
      }
    },
    [habitat, setHabitat]
  );

  const updateCustomStatusToHabitat = useCallback(
    async (oldCustomStatus, newCustomStatus) => {
      try {
        const original = await DataStore.query(Habitat, habitat);
        const persistedHabitat = await DataStore.save(
          Habitat.copyOf(original, (originalHabitat) => {
            originalHabitat.props.customStatus = [
              ...originalHabitat.props.customStatus.filter(
                (customStatusIntem) => customStatusIntem !== oldCustomStatus
              ),
              newCustomStatus,
            ];
          })
        );
        setHabitat(persistedHabitat);
      } catch (error) {
        console.log(`Error updating a custom status from the habitat.`);
      }
    },
    [habitat, setHabitat]
  );

  const handleAddStatus = async () => {
    try {
      if (!statusAlreadyExists) {
        await addCustomStatusToHabitat(newStatus);
      }
      setNewStatus('');
    } catch (error) {
      console.log('Error while adding the new status');
    }
  };

  const updateExistingApplicationsCustomStatus = async (
    oldStatus,
    newStatusToSet
  ) => {
    try {
      const habitatRootForms = await habitat?.RootForms.toArray();

      for (const rootForm of habitatRootForms) {
        const rootFormsCycles = await rootForm.Cycles.toArray();

        const applicationsToUpdate = await DataStore.query(
          TestApplication,
          (c) =>
            c.and((c2) => [
              c2.customStatus.eq(oldStatus),
              c2.or((c3) =>
                rootFormsCycles.map((cycle) => c3.testcycleID.eq(cycle.id))
              ),
            ])
        );

        for (const applicationToUpdate of applicationsToUpdate) {
          await DataStore.save(
            TestApplication.copyOf(
              applicationToUpdate,
              (originalApplication) => {
                originalApplication.customStatus = newStatusToSet;
              }
            )
          );
        }
      }
    } catch (error) {
      console.log('Error while updating applications status.', error);
    }
  };

  const handleDeleteCustomStatus = async () => {
    try {
      await removeCustomStatusToHabitat(deletingStatus);

      await updateExistingApplicationsCustomStatus(
        deletingStatus,
        DEFAULT_REVIEW_STATUS
      );

      setTrigger((previousTrigger) => previousTrigger + 1);
      setDeletingStatus(undefined);
    } catch (error) {
      console.log('Error while updating applications status.', error);
    }
  };

  const handleUpdateCustomStatus = async () => {
    try {
      await updateCustomStatusToHabitat(editingStatus, newStatus);

      await updateExistingApplicationsCustomStatus(editingStatus, newStatus);

      setTrigger((previousTrigger) => previousTrigger + 1);
      setEditingStatus(false);
      setNewStatus('');
      setEditingAlert(false);
    } catch (error) {
      console.log('Error while updating applications status.', error);
    }
  };

  const handleOnCloseEditingAlert = () => setEditingAlert(false);

  const handleOnCloseDelete = () => setDeletingStatus(undefined);

  const handleCancelEdit = () => {
    setEditingStatus(undefined);
    setNewStatus('');
  };
  return (
    <Modal
      title={t(
        'pages.habitat.affiliate.cycles.cycle.components.statusModal.title'
      )}
      open={open}
      onClickClose={onClose}
      width="30rem"
    >
      <>
        <Modal
          title={t(
            'pages.habitat.affiliate.cycles.cycle.components.statusModal.edit.title'
          )}
          open={editingAlert}
          onClickClose={handleOnCloseEditingAlert}
          width="25rem"
        >
          <View>
            <Text as="p">
              {t(
                'pages.habitat.affiliate.cycles.cycle.components.statusModal.edit.text'
              )}
            </Text>
            <Flex marginTop="1rem" justifyContent="center">
              <Button variation="primary" onClick={handleUpdateCustomStatus}>
                {t(
                  'pages.habitat.affiliate.cycles.cycle.components.statusModal.edit.accept'
                )}
              </Button>
              <Button
                variation="destructive"
                onClick={handleOnCloseEditingAlert}
              >
                {t(
                  'pages.habitat.affiliate.cycles.cycle.components.statusModal.edit.cancel'
                )}
              </Button>
            </Flex>
          </View>
        </Modal>
        <Modal
          title={t(
            'pages.habitat.affiliate.cycles.cycle.components.statusModal.delete.title'
          )}
          open={deletingStatus !== undefined}
          onClickClose={handleOnCloseDelete}
          width="25rem"
        >
          <View>
            <Text as="p">
              {t(
                'pages.habitat.affiliate.cycles.cycle.components.statusModal.delete.text'
              )}
            </Text>
            <Flex marginTop="1rem" justifyContent="center">
              <Button variation="primary" onClick={handleDeleteCustomStatus}>
                {t(
                  'pages.habitat.affiliate.cycles.cycle.components.statusModal.delete.accept'
                )}
              </Button>
              <Button variation="destructive" onClick={handleOnCloseDelete}>
                {t(
                  'pages.habitat.affiliate.cycles.cycle.components.statusModal.delete.cancel'
                )}
              </Button>
            </Flex>
          </View>
        </Modal>
        <Flex width="100%" justifyContent="space-between" alignItems="end">
          <TextField
            label={t(
              'pages.habitat.affiliate.cycles.cycle.components.statusModal.newStatus.label'
            )}
            value={newStatus}
            onChange={handleNewStatusOnChange}
            hasError={statusAlreadyExists || newStatus === ''}
            errorMessage={t(
              'pages.habitat.affiliate.cycles.cycle.components.statusModal.newStatus.error'
            )}
          />
          {editingStatus ? (
            <Flex>
              <Button
                padding="0.5rem"
                variation="destructive"
                title="Cancel edit"
                isDisabled={statusAlreadyExists}
                onClick={handleCancelEdit}
              >
                <MdClose />
              </Button>
              <Button
                padding="0.5rem"
                variation="primary"
                title="Confirm edit"
                isDisabled={statusAlreadyExists}
                onClick={() => setEditingAlert(true)}
              >
                <MdCheck />
              </Button>
            </Flex>
          ) : (
            <Button
              padding="0.5rem"
              variation="primary"
              title="Add status"
              isDisabled={statusAlreadyExists}
              onClick={handleAddStatus}
            >
              <MdAdd />
            </Button>
          )}
        </Flex>
        <br />

        <Table
          caption=""
          highlightOnHover
          variation="striped"
          justify-content="center"
          size={responsiveBool ? 'small' : ''}
        >
          <TableHead>
            <TableRow>
              <TableCell as="th" width="70%">
                {t(
                  'pages.habitat.affiliate.cycles.cycle.components.statusModal.name'
                )}
              </TableCell>
              <TableCell as="th" width="30%">
                {t(
                  'pages.habitat.affiliate.cycles.cycle.components.statusModal.actions'
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habitat.props.customStatus?.map((statusItem) => (
              <TableRow key={statusItem}>
                <TableCell>{statusItem}</TableCell>
                <TableCell>
                  <Flex gap="0.5rem">
                    <Button
                      padding="0.5rem"
                      onClick={() => {
                        setEditingStatus(statusItem);
                        setNewStatus(statusItem);
                      }}
                    >
                      <MdEdit />
                    </Button>
                    <Button
                      padding="0.5rem"
                      variation="destructive"
                      onClick={() => setDeletingStatus(statusItem)}
                    >
                      <MdDelete />
                    </Button>
                  </Flex>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </Modal>
  );
};

StatusModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setTrigger: PropTypes.func,
};

export default StatusModal;
