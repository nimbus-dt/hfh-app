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
  Text,
  ScrollView,
} from '@aws-amplify/ui-react';
import { useState } from 'react';
import {
  useApplicantInfosQuery,
  useTestApplicationsQuery,
} from 'hooks/services';
import { DataStore, SortDirection } from 'aws-amplify';
import { TestApplication } from 'models';
import {
  MdAdd,
  MdArrowDownward,
  MdArrowUpward,
  MdMoreHoriz,
} from 'react-icons/md';
import { DEFAULT_REVIEW_STATUS, SUBMISSION_STATUS_LIST } from 'utils/constants';
import { stringToHumanReadable } from 'utils/strings';
import PageTitle from '../components/PageTitle/PageTitle';
import StatusModal from './components/StatusModal';

const REVIEW_STATUS = ['All', DEFAULT_REVIEW_STATUS];
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
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(0);

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

  const handleOnCloseStatusModal = () => setStatusModalOpen(false);

  const handleStatusOnClick = () => setStatusModalOpen(true);

  const handleSubmittedDateOnClick = () =>
    setSubmittedDateSort((previousSubmittedDateSort) =>
      previousSubmittedDateSort === SortDirection.ASCENDING
        ? SortDirection.DESCENDING
        : SortDirection.ASCENDING
    );

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
        <Flex alignItems="end">
          <Badge>
            <Flex alignItems="center">Total: {applications.length}</Flex>
          </Badge>
          <Button height="2rem" width="2rem" padding="0" onClick={() => {}}>
            <MdAdd size="1.25rem" />
          </Button>
        </Flex>
      </Flex>
      <Flex width="auto" direction="column" justifyContent="center">
        <StatusModal
          open={statusModalOpen}
          onClose={handleOnCloseStatusModal}
          habitat={habitat}
          addCustomStatusToHabitat={addCustomStatusToHabitat}
          removeCustomStatusToHabitat={removeCustomStatusToHabitat}
          updateCustomStatusToHabitat={updateCustomStatusToHabitat}
          setTrigger={setTrigger}
        />
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
                          DEFAULT_REVIEW_STATUS,
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
