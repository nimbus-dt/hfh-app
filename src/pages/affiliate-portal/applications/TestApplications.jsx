import { Link, useOutletContext } from 'react-router-dom';
import {
  Flex,
  Heading,
  Divider,
  SelectField,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  useBreakpointValue,
  TableHead,
  Pagination,
  TextField,
  Text,
  View,
} from '@aws-amplify/ui-react';
import { useMemo, useState } from 'react';
import {
  useApplicantInfosQuery,
  useTestApplicationsQuery,
} from 'hooks/services';
import { DataStore } from 'aws-amplify';
import { TestApplication } from 'models';
import Modal from 'components/Modal';
import { MdAdd, MdCheck, MdClose, MdDelete, MdEdit } from 'react-icons/md';

const UNSET = 'Unset';
const STATUS = ['All', UNSET];

const perPage = 5;

const TestApplications = () => {
  const {
    habitat,
    addCustomStatusToHabitat,
    removeCustomStatusToHabitat,
    updateCustomStatusToHabitat,
  } = useOutletContext();
  const [status, setStatus] = useState(STATUS[0]);
  const [trigger, setTrigger] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState();
  const [editingStatus, setEditingStatus] = useState();
  const [editingAlert, setEditingAlert] = useState(false);
  const [deletingStatus, setDeletingStatus] = useState();
  const [newStatus, setNewStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: applications } = useTestApplicationsQuery({
    criteria: (c1) =>
      c1.and((c2) => {
        let criteriaArr = [
          c2.testApplicationAffiliateId.eq(habitat?.id),
          c2.submitted.eq(true),
        ];

        if (status !== STATUS[0]) {
          criteriaArr = [...criteriaArr, c2.status.eq(status)];
        }

        return criteriaArr;
      }),
    dependencyArray: [habitat?.id, status, trigger],
  });

  const { data: applicantInfos } = useApplicantInfosQuery({
    criteria: (c) =>
      c.or((c2) => {
        const arrayOfFilters = applications.map((application) =>
          c2.ownerID.eq(application.id)
        );

        return arrayOfFilters;
      }),
    dependencyArray: [applications],
  });

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
        ? [...habitat.props.data.customStatus, UNSET]
        : [UNSET]
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

  const handleUpdateApplicationStatus = async (
    applicationId,
    newStatusValue
  ) => {
    if (habitat) {
      try {
        const original = await DataStore.query(TestApplication, applicationId);
        await DataStore.save(
          TestApplication.copyOf(original, (originalApplication) => {
            originalApplication.status = newStatusValue;
          })
        );
        setTrigger((previousTrigger) => previousTrigger + 1);
      } catch (error) {
        console.log('Error while updating the status');
      }
    }
  };

  const handleDeleteCustomStatus = async () => {
    try {
      await removeCustomStatusToHabitat(deletingStatus);

      const applicationsToUpdate = await DataStore.query(TestApplication, (c) =>
        c.and((c2) => [
          c2.testApplicationAffiliateId.eq(habitat?.id),
          c2.status.eq(deletingStatus),
        ])
      );

      for (const applicationToUpdate of applicationsToUpdate) {
        await DataStore.save(
          TestApplication.copyOf(applicationToUpdate, (originalApplication) => {
            originalApplication.status = UNSET;
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
          c2.testApplicationAffiliateId.eq(habitat?.id),
          c2.status.eq(editingStatus),
        ])
      );

      for (const applicationToUpdate of applicationsToUpdate) {
        await DataStore.save(
          TestApplication.copyOf(applicationToUpdate, (originalApplication) => {
            originalApplication.status = newStatus;
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

  const handleOnCloseStatusModal = () => setSelectedApplication(undefined);

  const handleOnCloseEditingAlert = () => setEditingAlert(false);

  const handleOnCloseDelete = () => setDeletingStatus(undefined);

  const handleCancelEdit = () => {
    setEditingStatus(undefined);
    setNewStatus('');
  };

  return (
    <Flex
      direction="column"
      width="100%"
      alignContent="center"
      justifyContent="center"
    >
      <Heading level={3} fontWeight="bold" textAlign="center">
        Submitted applications
      </Heading>
      <Divider />
      <Flex
        direction="row"
        width="100%"
        marginLeft="0"
        justifyContent={responsiveBool ? 'center' : 'left'}
      >
        <SelectField
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
          }}
        >
          {[
            ...STATUS,
            ...(habitat ? habitat.props.data.customStatus || [] : []),
          ].map((statusValue) => (
            <option key={statusValue} value={statusValue}>
              {statusValue}
            </option>
          ))}
        </SelectField>

        <Badge>
          <Flex alignItems="center">Total: {applications.length}</Flex>
        </Badge>
      </Flex>
      <Flex width="auto" direction="column" justifyContent="center">
        <Modal
          title="Status"
          open={selectedApplication !== undefined}
          onClickClose={() => handleOnCloseStatusModal()}
          width="30rem"
        >
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
                  amplications with this status.
                </Text>
                <Flex marginTop="1rem" justifyContent="center">
                  <Button
                    variation="primary"
                    onClick={handleUpdateCustomStatus}
                  >
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
                  amplications with this status to have an Unset status.
                </Text>
                <Flex marginTop="1rem" justifyContent="center">
                  <Button
                    variation="primary"
                    onClick={handleDeleteCustomStatus}
                  >
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
                {habitat.props.data.customStatus.map((statusItem) => {
                  const handleSelectStatus = async () => {
                    await handleUpdateApplicationStatus(
                      selectedApplication,
                      statusItem
                    );
                    setSelectedApplication(undefined);
                  };
                  return (
                    <TableRow key={statusItem}>
                      <TableCell>{statusItem}</TableCell>
                      <TableCell>
                        <Flex gap="0.5rem">
                          <Button
                            variation="primary"
                            padding="0.5rem"
                            onClick={handleSelectStatus}
                          >
                            <MdCheck />
                          </Button>
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
                  );
                })}
              </TableBody>
            </Table>
          </>
        </Modal>
        <Table
          caption=""
          highlightOnHover
          variation="striped"
          justify-content="center"
          size={responsiveBool ? 'small' : ''}
        >
          <TableHead>
            <TableRow>
              <TableCell as="th" width="25%">
                Index
              </TableCell>
              <TableCell as="th" width="25%">
                Name
              </TableCell>
              <TableCell as="th" width="25%">
                Date Submitted
              </TableCell>
              <TableCell as="th" width="25%">
                Status
              </TableCell>
              <TableCell as="th" width="25%">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications
              .slice((currentPage - 1) * perPage, currentPage * perPage)
              .map((application, index) => {
                const handleStatusOnClick = () =>
                  setSelectedApplication(application.id);
                return (
                  <TableRow key={application.id}>
                    <TableCell>
                      {index + 1 + (currentPage - 1) * perPage}
                    </TableCell>
                    <TableCell>
                      {
                        applicantInfos.find(
                          (applicantInfo) =>
                            applicantInfo.ownerID === application.id
                        )?.props.basicInfo.fullName
                      }
                    </TableCell>
                    <TableCell>{application.submittedDate}</TableCell>
                    <TableCell>
                      <Button onClick={handleStatusOnClick}>
                        {application.status}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Link to={`../applications/${application?.id}`}>
                        <Button>View</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(applications.length / perPage)}
          onChange={(newCurrentPage) => setCurrentPage(newCurrentPage)}
          onNext={() =>
            setCurrentPage((previousCurrentPage) => previousCurrentPage + 1)
          }
          onPrevious={() =>
            setCurrentPage((previousCurrentPage) => previousCurrentPage - 1)
          }
        />
      </Flex>
    </Flex>
  );
};

export default TestApplications;
