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
import { TestApplication } from 'models';
import React, { useMemo, useState } from 'react';
import { MdAdd, MdCheck, MdClose, MdDelete, MdEdit } from 'react-icons/md';
import { DEFAULT_REVIEW_STATUS } from 'utils/constants';
import PropTypes from 'prop-types';

const StatusModal = ({
  open,
  onClose,
  habitat,
  addCustomStatusToHabitat,
  removeCustomStatusToHabitat,
  updateCustomStatusToHabitat,
  setTrigger,
}) => {
  const [editingStatus, setEditingStatus] = useState();
  const [editingAlert, setEditingAlert] = useState(false);
  const [deletingStatus, setDeletingStatus] = useState();
  const [newStatus, setNewStatus] = useState('');

  const responsiveBool = useBreakpointValue({
    base: true,
    large: false,
  });

  const handleNewStatusOnChange = (event) => {
    setNewStatus(event.currentTarget.value);
  };

  const statusAlreadyExists = useMemo(
    () =>
      (habitat.props.data.customStatus
        ? [...habitat.props.data.customStatus, DEFAULT_REVIEW_STATUS]
        : [DEFAULT_REVIEW_STATUS]
      ).includes(newStatus),
    [habitat, newStatus]
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

  const handleDeleteCustomStatus = async () => {
    try {
      await removeCustomStatusToHabitat(deletingStatus);

      const applicationsToUpdate = await DataStore.query(TestApplication, (c) =>
        c.and((c2) => [
          c2.habitatID.eq(habitat?.id),
          c2.reviewStatus.eq(deletingStatus),
        ])
      );

      for (const applicationToUpdate of applicationsToUpdate) {
        await DataStore.save(
          TestApplication.copyOf(applicationToUpdate, (originalApplication) => {
            originalApplication.reviewStatus = DEFAULT_REVIEW_STATUS;
          })
        );
      }

      setTrigger((previousTrigger) => previousTrigger + 1);
      setDeletingStatus(undefined);
    } catch (error) {
      console.log('Error while updating applications status.');
    }
  };

  const handleUpdateCustomStatus = async () => {
    try {
      await updateCustomStatusToHabitat(editingStatus, newStatus);

      const applicationsToUpdate = await DataStore.query(TestApplication, (c) =>
        c.and((c2) => [
          c2.habitatID.eq(habitat?.id),
          c2.reviewStatus.eq(editingStatus),
        ])
      );

      for (const applicationToUpdate of applicationsToUpdate) {
        await DataStore.save(
          TestApplication.copyOf(applicationToUpdate, (originalApplication) => {
            originalApplication.reviewStatus = newStatus;
          })
        );
      }

      setTrigger((previousTrigger) => previousTrigger + 1);
      setEditingStatus(undefined);
      setNewStatus('');
      setEditingAlert(false);
    } catch (error) {
      console.log('Error while updating applications status.');
    }
  };

  const handleOnCloseEditingAlert = () => setEditingAlert(false);

  const handleOnCloseDelete = () => setDeletingStatus(undefined);

  const handleCancelEdit = () => {
    setEditingStatus(undefined);
    setNewStatus('');
  };
  return (
    <Modal title="Status" open={open} onClickClose={onClose} width="30rem">
      <>
        <Modal
          title="Alert"
          open={editingAlert}
          onClickClose={handleOnCloseEditingAlert}
          width="25rem"
        >
          <View>
            <Text as="p">
              You want to edit the status? This would update all the
              applications with this status.
            </Text>
            <Flex marginTop="1rem" justifyContent="center">
              <Button variation="primary" onClick={handleUpdateCustomStatus}>
                Accept
              </Button>
              <Button
                variation="destructive"
                onClick={handleOnCloseEditingAlert}
              >
                Cancel
              </Button>
            </Flex>
          </View>
        </Modal>
        <Modal
          title="Alert"
          open={deletingStatus !== undefined}
          onClickClose={handleOnCloseDelete}
          width="25rem"
        >
          <View>
            <Text as="p">
              You want to delete the status? This would update all the
              applications with this status to have an Pending status.
            </Text>
            <Flex marginTop="1rem" justifyContent="center">
              <Button variation="primary" onClick={handleDeleteCustomStatus}>
                Accept
              </Button>
              <Button variation="destructive" onClick={handleOnCloseDelete}>
                Cancel
              </Button>
            </Flex>
          </View>
        </Modal>
        <Flex width="100%" justifyContent="space-between" alignItems="end">
          <TextField
            label="New status:"
            value={newStatus}
            onChange={handleNewStatusOnChange}
            hasError={statusAlreadyExists || newStatus === ''}
            errorMessage="Invalid status"
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
                Name
              </TableCell>
              <TableCell as="th" width="30%">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habitat.props.data.customStatus?.map((statusItem) => (
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
  habitat: PropTypes.object,
  addCustomStatusToHabitat: PropTypes.func,
  removeCustomStatusToHabitat: PropTypes.func,
  updateCustomStatusToHabitat: PropTypes.func,
  setTrigger: PropTypes.func,
};

export default StatusModal;
