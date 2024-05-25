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
import { useDecisionsQuery, useTestApplicationsQuery } from 'hooks/services';
import {
  Decision,
  Habitat,
  LazyTestApplication,
  ReviewStatus,
  TestApplication,
} from 'models';

import style from './ApplicantDecisionsPage.module.css';

interface IOutletContext {
  habitat?: Habitat;
}

const ApplicantDecisionsPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const { habitat }: IOutletContext = useOutletContext();

  const { data: applications }: { data: TestApplication[] } =
    useTestApplicationsQuery({
      criteria: (c2: RecursiveModelPredicate<LazyTestApplication>) =>
        c2.ownerID.eq(user?.username),
      dependencyArray: [user],
      paginationProducer: (s: SortPredicate<LazyTestApplication>) =>
        s.createdAt(SortDirection.DESCENDING),
    });

  const { data: decisions }: { data: Decision[] } = useDecisionsQuery({
    criteria: (c2: RecursiveModelPredicate<Decision>) =>
      c2.or((c3) => {
        const newDecisions = applications.map((application) =>
          c3.testapplicationID.eq(application.id)
        );

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
            habitat={habitat?.name || ''}
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
