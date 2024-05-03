import {
  Button,
  Flex,
  Heading,
  Text,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react';
import {
  LazyRootForm,
  LazyTestApplication,
  LazyTestCycle,
  ReviewStatus,
  RootForm,
  SubmissionStatus,
  TestApplication,
  TestCycle,
} from 'models';
import React, { useState } from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';
import TableWithPaginator from 'components/TableWithPaginator';
import Toggle from 'components/Toggle';
import StatusChip from 'components/StatusChip';
import {
  useRootFormsQuery,
  useTestApplicationsQuery,
  useTestCyclesQuery,
} from 'hooks/services';
import {
  RecursiveModelPredicate,
  SortDirection,
  SortPredicate,
} from '@aws-amplify/datastore';
import { Link } from 'react-router-dom';
import { dateOnly } from 'utils/dates';
import Chip from 'components/Chip';
import { stringToHumanReadable } from 'utils/strings';
import style from './ApplicantApplicationsPage.module.css';

const ReviewStatusChip = ({ status }: { status: keyof typeof ReviewStatus }) =>
  status === ReviewStatus.PENDING ? (
    <StatusChip status={status} />
  ) : (
    <Chip text="Reviewed" variation="active" />
  );

const ApplicantApplicationsPage = () => {
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState<
    keyof typeof SubmissionStatus
  >(SubmissionStatus.INCOMPLETE);

  const { user } = useAuthenticator((context) => [context.user]);

  const { data: applications }: { data: TestApplication[] } =
    useTestApplicationsQuery({
      criteria: (c2: RecursiveModelPredicate<LazyTestApplication>) =>
        c2.ownerID.eq(user?.username),
      dependencyArray: [user, submissionStatusFilter],
      paginationProducer: (s: SortPredicate<LazyTestApplication>) =>
        s.createdAt(SortDirection.DESCENDING),
    });

  const { data: cycles }: { data: TestCycle[] } = useTestCyclesQuery({
    criteria: (c2: RecursiveModelPredicate<LazyTestCycle>) =>
      c2.or((c3) =>
        applications.map((application) => c3.id.eq(application.testcycleID))
      ),
    dependencyArray: [applications],
    paginationProducer: (s: SortPredicate<LazyTestCycle>) =>
      s.createdAt(SortDirection.DESCENDING),
  });

  const { data: rootForms }: { data: RootForm[] } = useRootFormsQuery({
    criteria: (c2: RecursiveModelPredicate<LazyRootForm>) =>
      c2.or((c3) => cycles.map((cycle) => c3.id.eq(cycle.rootformID || ''))),
    dependencyArray: [cycles],
    paginationProducer: (s: SortPredicate<LazyRootForm>) =>
      s.createdAt(SortDirection.DESCENDING),
  });

  return (
    <Flex padding="32px" direction="column">
      <Flex
        direction={{
          base: 'column',
          medium: 'row',
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex direction="column">
          <Heading level={3}>Application Dashboard</Heading>
          <Text className={`theme-subtitle-s1 ${style.subtitle}`}>
            Select the type of application
          </Text>
        </Flex>
        <Flex className={`${style.toggleContainer}`}>
          <Toggle
            option1={{
              value: SubmissionStatus.INCOMPLETE,
              label: 'Incomplete',
            }}
            option2={{ value: SubmissionStatus.COMPLETED, label: 'Complete' }}
            active={submissionStatusFilter}
            onChange={(newValue) => {
              setSubmissionStatusFilter(newValue);
            }}
          />
        </Flex>
      </Flex>
      <View className="theme-subtitle-s2">
        <Text as="span">Current Applications</Text>
      </View>
      <TableWithPaginator
        headers={[
          {
            id: 'name',
            value: 'Name',
          },

          {
            id: 'date',
            value:
              submissionStatusFilter === SubmissionStatus.INCOMPLETE
                ? 'Date Started'
                : 'Date Completed',
          },
          {
            id: 'status',
            value:
              submissionStatusFilter === SubmissionStatus.INCOMPLETE
                ? 'Status'
                : 'Review Status',
            textAlign: 'center',
          },
          {
            id: 'view',
            value: 'View',
            textAlign: 'center',
          },
        ]}
        data={applications
          .filter(
            (application) =>
              application.submissionStatus === submissionStatusFilter
          )
          .map((application, index) => ({
            id: index,
            cells: [
              {
                value:
                  rootForms.find((rootForm) => {
                    const foundCycle = cycles.find(
                      (cycle) => cycle.id === application.testcycleID
                    );
                    return foundCycle && rootForm.id === foundCycle.rootformID;
                  })?.name || 'Unknown',
                id: 'name',
              },
              {
                value: dateOnly(
                  submissionStatusFilter === SubmissionStatus.INCOMPLETE
                    ? application.createdAt || ''
                    : application.submittedDate
                ),
                id: 'date',
              },
              {
                value: (
                  <Flex width="100%" justifyContent="center">
                    {submissionStatusFilter === SubmissionStatus.INCOMPLETE ? (
                      <Chip
                        text={stringToHumanReadable(
                          application.submissionStatus
                        )}
                        variation="danger"
                      />
                    ) : (
                      <ReviewStatusChip status={application.reviewStatus} />
                    )}
                  </Flex>
                ),
                id: 'status',
              },
              {
                value: (
                  <Flex width="100%" justifyContent="center">
                    <Link
                      to={`../../${application.testcycleID}/${application.id}`}
                    >
                      <Button variation="link" padding="0">
                        <MdOutlineOpenInNew
                          size="24px"
                          color="var(--amplify-colors-neutral-90)"
                        />
                      </Button>
                    </Link>
                  </Flex>
                ),
                id: 'view',
              },
            ],
          }))}
      />
    </Flex>
  );
};

export default ApplicantApplicationsPage;
