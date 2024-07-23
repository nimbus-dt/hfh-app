import {
  Button,
  Flex,
  Heading,
  Text,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react';
import {
  ReviewStatus,
  RootForm,
  SubmissionStatus,
  TestApplication,
  TestCycle,
} from 'models';
import { useEffect, useState } from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';
import TableWithPaginator from 'components/TableWithPaginator';
import Toggle from 'components/Toggle';
import StatusChip from 'components/StatusChip';
import { DataStore } from 'aws-amplify/datastore';
import { Link } from 'react-router-dom';
import { dateOnly } from 'utils/dates';
import Chip from 'components/Chip';
import { stringToHumanReadable } from 'utils/strings';
import useHabitat from 'hooks/utils/useHabitat';
import style from './ApplicantApplicationsPage.module.css';

const ReviewStatusChip = ({ status }: { status: keyof typeof ReviewStatus }) =>
  status === ReviewStatus.PENDING ? (
    <StatusChip status={status} />
  ) : (
    <Chip text="Reviewed" variation="active" />
  );

type DataProps =
  | {
      applications: TestApplication[];
      rootForms: RootForm[];
      cycles: TestCycle[];
    }
  | undefined;

const ApplicantApplicationsPage = () => {
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState<
    keyof typeof SubmissionStatus
  >(SubmissionStatus.INCOMPLETE);
  const { habitat } = useHabitat();
  const { user } = useAuthenticator((context) => [context.user]);
  const [data, setData] = useState<DataProps>(undefined);

  useEffect(() => {
    if (habitat) {
      const fetch = async () => {
        const rootFormsResponse = await DataStore.query(RootForm, (c) =>
          c.habitatID.eq(habitat.id)
        );

        let newCycles: TestCycle[] = [];

        for (const rootFormResponse of rootFormsResponse) {
          const cyclesResponse = await DataStore.query(TestCycle, (c) =>
            c.rootformID.eq(rootFormResponse.id)
          );
          newCycles = newCycles.concat(cyclesResponse);
        }

        let newApplications: TestApplication[] = [];

        for (const newCycle of newCycles) {
          const applicationsResponse = await DataStore.query(
            TestApplication,
            (c) =>
              c.and((c1) => [
                c1.testcycleID.eq(newCycle.id),
                c1.ownerID.eq(user?.username),
              ])
          );
          newApplications = newApplications.concat(applicationsResponse);
        }
        setData({
          applications: newApplications,
          rootForms: rootFormsResponse,
          cycles: newCycles,
        });
      };
      fetch();
    }
  }, [habitat, user?.username]);

  if (!data) return null;

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
          <Heading level={3} style={{ lineHeight: '56px' }}>
            Application Dashboard
          </Heading>
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
        data={data.applications
          .filter(
            (application) =>
              application.submissionStatus === submissionStatusFilter
          )
          .map((application, index) => ({
            id: index,
            cells: [
              {
                value:
                  data.rootForms.find((rootForm) => {
                    const foundCycle = data.cycles.find(
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
                    <Link to={`../${application.testcycleID}`}>
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
