import { useTranslation } from 'react-i18next';

import { Flex, Text } from '@aws-amplify/ui-react';
import {
  RecursiveModelPredicate,
  SortDirection,
  SortPredicate,
} from 'aws-amplify/datastore';
import DecisionCard from 'components/DecisionCard';
import { useDecisionsQuery } from 'hooks/services';
import useHabitat from 'hooks/utils/useHabitat';
import { Decision, ReviewStatus, TestApplication } from 'models';

import style from './Decisions.module.css';

interface DecisionsProps {
  application: TestApplication;
}

const Decisions = ({ application }: DecisionsProps) => {
  const { habitat } = useHabitat();
  const { t } = useTranslation();

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
          {t(
            'pages.habitat.applicant.cycle.components.tabs.decisions.noDecisions'
          )}
        </Text>
      )}
    </Flex>
  );
};

export default Decisions;
