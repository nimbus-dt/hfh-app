import { Link, useOutletContext } from 'react-router-dom';
import {
  Flex,
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
  ScrollView,
} from '@aws-amplify/ui-react';
import { useEffect, useMemo, useState } from 'react';
import {
  useApplicantInfosQuery,
  useTestApplicationsQuery,
} from 'hooks/services';
import { DataStore, SortDirection } from 'aws-amplify';
import { TestApplication } from 'models';
import Modal from 'components/Modal';
import {
  MdAdd,
  MdArrowDownward,
  MdArrowUpward,
  MdCheck,
  MdClose,
  MdDelete,
  MdEdit,
  MdMoreHoriz,
} from 'react-icons/md';
import { SUBMISSION_STATUS_LIST } from 'utils/constants';
import { stringToHumanReadable } from 'utils/strings';
import PageTitle from '../components/PageTitle/PageTitle';

const PENDING = 'Pending';
const REVIEW_STATUS = ['All', PENDING];
const SUBMISSION_STATUS = [
  {
    key: 'ALL',
    value: 'All',
  },
  ...SUBMISSION_STATUS_LIST,
];

const perPage = 5;

const TestApplications = () => {
  const {
    habitat,
    addCustomStatusToHabitat,
    removeCustomStatusToHabitat,
    updateCustomStatusToHabitat,
  } = useOutletContext();
  const [reviewStatus, setReviewStatus] = useState(REVIEW_STATUS[0]);
  const [submissionStatus, setSubmissionStatus] = useState(
    SUBMISSION_STATUS[0].key
  );
  const [trigger, setTrigger] = useState(0);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState();
  const [editingAlert, setEditingAlert] = useState(false);
  const [deletingStatus, setDeletingStatus] = useState();
  const [newStatus, setNewStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [submittedDateSort, setSubmittedDateSort] = useState(
    SortDirection.DESCENDING
  );
  const { data: applications } = useTestApplicationsQuery({
    criteria: (c1) =>
      c1.and((c2) => {
        let criteriaArr = [c2.habitatID.eq(habitat?.id)];

        if (reviewStatus !== REVIEW_STATUS[0]) {
          criteriaArr = [...criteriaArr, c2.reviewStatus.eq(reviewStatus)];
        }

        if (submissionStatus !== SUBMISSION_STATUS[0].key) {
          criteriaArr = [
            ...criteriaArr,
            c2.submissionStatus.eq(submissionStatus),
          ];
        }

        return criteriaArr;
      }),
    paginationProducer: {
      sort: (s) => s.submittedDate(submittedDateSort),
    },
    dependencyArray: [
      habitat?.id,
      reviewStatus,
      submissionStatus,
      trigger,
      submittedDateSort,
    ],
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
        ? [...habitat.props.data.customStatus, PENDING]
        : [PENDING]
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
            originalApplication.reviewStatus = newStatusValue;
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
          c2.habitatID.eq(habitat?.id),
          c2.reviewStatus.eq(deletingStatus),
        ])
      );

      for (const applicationToUpdate of applicationsToUpdate) {
        await DataStore.save(
          TestApplication.copyOf(applicationToUpdate, (originalApplication) => {
            originalApplication.reviewStatus = PENDING;
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
  const handleStatusOnClick = () => setStatusModalOpen(true);

  const handleSubmittedDateOnClick = () =>
    setSubmittedDateSort((previousSubmittedDateSort) =>
      previousSubmittedDateSort === SortDirection.ASCENDING
        ? SortDirection.DESCENDING
        : SortDirection.ASCENDING
    );

  const handleOnCloseStatusModal = () => setStatusModalOpen(false);

  const handleOnCloseEditingAlert = () => setEditingAlert(false);

  const handleOnCloseDelete = () => setDeletingStatus(undefined);

  const handleCancelEdit = () => {
    setEditingStatus(undefined);
    setNewStatus('');
  };

  useEffect(() => {
    console.log('sort', submittedDateSort);
  }, [submittedDateSort]);

  useEffect(() => {
    console.log('apps', applications);
  }, [applications]);

  return (
    <Flex
      direction="column"
      width="100%"
      alignContent="center"
      justifyContent="center"
    >
      <PageTitle title="Applications" />
      <Flex
        direction="row"
        width="100%"
        marginLeft="0"
        justifyContent={responsiveBool ? 'center' : 'space-between'}
        alignItems="end"
      >
        <Flex>
          <SelectField
            label="Submission status"
            value={submissionStatus}
            onChange={(event) => {
              setSubmissionStatus(event.target.value);
            }}
          >
            {SUBMISSION_STATUS.map(({ key, value }) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Review status"
            value={reviewStatus}
            onChange={(event) => {
              setReviewStatus(event.target.value);
            }}
          >
            {[
              ...REVIEW_STATUS,
              ...(habitat ? habitat.props.data.customStatus || [] : []),
            ].map((statusValue) => (
              <option key={statusValue} value={statusValue}>
                {statusValue}
              </option>
            ))}
          </SelectField>
        </Flex>

        <Badge>
          <Flex alignItems="center">Total: {applications.length}</Flex>
        </Badge>
      </Flex>
      <Flex width="auto" direction="column" justifyContent="center">
        <Modal
          title="Status"
          open={statusModalOpen}
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
                  applications with this status.
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
                  applications with this status to have an Pending status.
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
        <ScrollView maxWidth="100%">
          <Table
            caption=""
            highlightOnHover
            variation="striped"
            justify-content="center"
            size={responsiveBool ? 'small' : ''}
          >
            <TableHead>
              <TableRow>
                <TableCell as="th" width="fit-content">
                  Index
                </TableCell>
                <TableCell as="th" minWidth="25ch">
                  Name
                </TableCell>
                <TableCell as="th" minWidth="15ch">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text>Date Submitted</Text>

                    <Button
                      variation="link"
                      color="var(--amplify-colors-font-primary)"
                      onClick={handleSubmittedDateOnClick}
                      padding="0.5rem"
                      borderRadius="xxxl"
                      style={{ aspectRatio: '1/1' }}
                      height="fit-content"
                    >
                      {submittedDateSort === SortDirection.ASCENDING ? (
                        <MdArrowUpward size="1.25rem" />
                      ) : (
                        <MdArrowDownward size="1.25rem" />
                      )}
                    </Button>
                  </Flex>
                </TableCell>
                <TableCell as="th" minWidth="20ch">
                  Submission status
                </TableCell>
                <TableCell as="th" minWidth="20ch">
                  <Button
                    variation="link"
                    color="var(--amplify-colors-font-primary)"
                    onClick={handleStatusOnClick}
                  >
                    Review status
                  </Button>
                </TableCell>
                <TableCell as="th" width="fit-content">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications
                .slice((currentPage - 1) * perPage, currentPage * perPage)
                .map((application, index) => (
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
                    <TableCell>
                      {application.submittedDate !== '0001-01-01' &&
                        application.submittedDate}
                    </TableCell>
                    <TableCell>
                      {stringToHumanReadable(application.submissionStatus)}
                    </TableCell>
                    <TableCell>
                      <SelectField
                        labelHidden
                        value={application.reviewStatus}
                        onChange={(event) =>
                          handleUpdateApplicationStatus(
                            application.id,
                            event.currentTarget.value
                          )
                        }
                      >
                        {[
                          PENDING,
                          ...(habitat
                            ? habitat.props.data.customStatus || []
                            : []),
                        ].map((selectedStatus) => (
                          <option key={selectedStatus} value={selectedStatus}>
                            {selectedStatus}
                          </option>
                        ))}
                      </SelectField>
                    </TableCell>
                    <TableCell>
                      <Flex justifyContent="center">
                        <Link to={`../applications/${application?.id}`}>
                          <Button
                            height="2rem"
                            width="2rem"
                            padding="0"
                            title="View"
                          >
                            <MdMoreHoriz size="1.25rem" />
                          </Button>
                        </Link>
                      </Flex>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollView>
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
