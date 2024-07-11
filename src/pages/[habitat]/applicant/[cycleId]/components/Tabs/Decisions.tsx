import { Flex, Text } from '@aws-amplify/ui-react';
import {
  RecursiveModelPredicate,
  SortDirection,
  SortPredicate,
} from '@aws-amplify/datastore';
import DecisionCard from 'components/DecisionCard';
import { useDecisionsQuery } from 'hooks/services';
import { Decision, ReviewStatus, TestApplication } from 'models';
import useHabitat from 'hooks/utils/useHabitat';
import style from './Decisions.module.css';

interface DecisionsProps {
  application: TestApplication;
}

const Decisions = ({ application }: DecisionsProps) => {
  const { habitat } = useHabitat();

  const { data: decisions }: { data: Decision[] } = useDecisionsQuery({
    criteria: (c1: RecursiveModelPredicate<Decision>) =>
      c1.and((c2) => [c2.testapplicationID.eq(application.id)]),
    paginationProducer: {
      sort: (s: SortPredicate<Decision>) =>
        s.createdAt(SortDirection.DESCENDING),
    },
    dependencyArray: [application],
  });

  return (
    <Flex className={`${style.decisionsContainer}`}>
      {decisions.length > 0 ? (
        decisions.map((data) => (
          <DecisionCard
            key={data.id}
            date={data.createdAt || ''}
            habitat={habitat?.longName || ''}
            status={ReviewStatus[data?.status || 'PENDING']}
            editorState={data.serializedEditorState}
          />
        ))
      ) : (
        <Text textAlign="center" fontWeight="bold">
          There are no decisions for this application
        </Text>
      )}
    </Flex>
  );
};

export default Decisions;
