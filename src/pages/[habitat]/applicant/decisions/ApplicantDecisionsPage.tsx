import { useOutletContext } from 'react-router-dom';
import {
  Flex,
  Heading,
  Text,
  View,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import {
  RecursiveModelPredicate,
  SortDirection,
  SortPredicate,
} from '@aws-amplify/datastore';

import DecisionCard from 'components/DecisionCard';
import {
  useDecisionsQuery,
  useRootFormsQuery,
  useTestApplicationsQuery,
  useTestCyclesQuery,
} from 'hooks/services';
import {
  Decision,
  Habitat,
  LazyRootForm,
  LazyTestApplication,
  ReviewStatus,
  RootForm,
  TestApplication,
  TestCycle,
} from 'models';

import style from './ApplicantDecisionsPage.module.css';

interface IOutletContext {
  habitat?: Habitat;
}

const ApplicantDecisionsPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const { habitat }: IOutletContext = useOutletContext();

  const { data: rootForms }: { data: RootForm[] } = useRootFormsQuery({
    criteria: (c1: RecursiveModelPredicate<LazyRootForm>) =>
      c1.habitatID.eq(habitat?.id || ''),
    dependencyArray: [habitat],
    paginationProducer: (s: SortPredicate<LazyRootForm>) =>
      s.createdAt(SortDirection.DESCENDING),
  });

  const { data: cycles }: { data: TestCycle[] } = useTestCyclesQuery({
    criteria: (c2: RecursiveModelPredicate<TestCycle>) =>
      c2.or((c3) => {
        const newCycles = rootForms.map((rootForm) =>
          c3.rootformID.eq(rootForm.id)
        );

        if (!newCycles.length) {
          return [c3.id.eq('')];
        }

        return newCycles;
      }),
    dependencyArray: [rootForms],
    paginationProducer: {
      sort: (s: SortPredicate<TestCycle>) =>
        s.createdAt(SortDirection.DESCENDING),
    },
  });

  const { data: applications }: { data: TestApplication[] } =
    useTestApplicationsQuery({
      criteria: (c2: RecursiveModelPredicate<TestApplication>) =>
        c2.or((c3) => {
          const newApplications = cycles.map((cycle) =>
            c3.testcycleID.eq(cycle.id)
          );

          if (!newApplications.length) {
            return [c3.id.eq('')];
          }

          return newApplications;
        }),
      dependencyArray: [user, cycles],
      paginationProducer: (s: SortPredicate<LazyTestApplication>) =>
        s.createdAt(SortDirection.DESCENDING),
    });

  const { data: decisions }: { data: Decision[] } = useDecisionsQuery({
    criteria: (c2: RecursiveModelPredicate<Decision>) =>
      c2.or((c3) => {
        const newDecisions = applications
          .filter((application) => application.ownerID === user?.username)
          .map((application) => c3.testapplicationID.eq(application.id));

        if (!newDecisions.length) {
          return [c3.id.eq('')];
        }

        return newDecisions;
      }),
    dependencyArray: [applications],
    paginationProducer: {
      sort: (s: SortPredicate<Decision>) =>
        s.createdAt(SortDirection.DESCENDING),
    },
  });

  return (
    <View padding="32px">
      <Flex className={`${style.cta}`} direction="column">
        <Heading level={3} className="theme-headline-medium">
          Decisions Dashboard
        </Heading>
        <View className={`theme-body-medium ${style.subtitle}`}>
          <Text color="inherit">
            Exchange information with affiliates and revise your submissions
          </Text>
        </View>
      </Flex>
      <Flex className={`${style.decisionsContainer}`}>
        {decisions.map((data) => (
          <DecisionCard
            key={data.id}
            date={data.updatedAt || ''}
            habitat={habitat?.longName || ''}
            status={ReviewStatus[data?.status || 'PENDING']}
            editorState={data.serializedEditorState}
            applicationRoute={
              data?.status === ReviewStatus.RETURNED
                ? `../${
                    applications.find(
                      (application) => data.testapplicationID === application.id
                    )?.testcycleID
                  }`
                : undefined
            }
          />
        ))}
      </Flex>
    </View>
  );
};

export default ApplicantDecisionsPage;
