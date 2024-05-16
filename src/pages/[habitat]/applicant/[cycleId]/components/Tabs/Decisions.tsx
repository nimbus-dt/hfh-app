import { useOutletContext } from 'react-router-dom';

import { Flex, Text } from '@aws-amplify/ui-react';
import {
  RecursiveModelPredicate,
  SortDirection,
  SortPredicate,
} from '@aws-amplify/datastore';

import DecisionCard from 'components/DecisionCard';
import { useDecisionsQuery } from 'hooks/services';
import { Decision, Habitat, ReviewStatus, TestApplication } from 'models';

import style from './Decisions.module.css';

interface IOutletContext {
  habitat?: Habitat;
}

interface DecisionsProps {
  application: TestApplication;
}

const Decisions = ({ application }: DecisionsProps) => {
  const { habitat }: IOutletContext = useOutletContext();

  const { data: decisions }: { data: Decision[] } = useDecisionsQuery({
    criteria: (c2: RecursiveModelPredicate<Decision>) =>
      c2.or((c3) => [c3.testapplicationID.eq(application.id)]),
    dependencyArray: [application],
    paginationProducer: (s: SortPredicate<Decision>) =>
      s.createdAt(SortDirection.DESCENDING),
  });

  return (
    <Flex className={`${style.decisionsContainer}`}>
      {decisions.length > 0 ? (
        decisions.map((data) => (
          <DecisionCard
            key={data.id}
            date={data.updatedAt || ''}
            habitat={habitat?.name || ''}
            status={ReviewStatus[data?.status || 'PENDING']}
            editorState={data.serializedEditorState}
            showReviewButton
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
