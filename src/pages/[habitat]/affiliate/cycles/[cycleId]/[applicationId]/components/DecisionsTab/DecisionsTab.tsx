import { useTranslation } from 'react-i18next';
import { Text } from '@aws-amplify/ui-react';

import DecisionCard from 'components/DecisionCard';
import useHabitat from 'hooks/utils/useHabitat';
import { ReviewStatus, Decision } from 'models';

import style from './DecisionsTab.module.css';

interface IProperties {
  decisions: Decision[];
}

const DecisionsTab = ({ decisions }: IProperties) => {
  const { t } = useTranslation();
  const { habitat } = useHabitat();

  return (
    <div className={style.container}>
      {decisions.length > 0 ? (
        decisions.map((decision) => (
          <DecisionCard
            key={decision.id}
            date={decision.createdAt || ''}
            habitat={habitat?.longName || ''}
            status={decision.status as keyof typeof ReviewStatus}
            editorState={decision.serializedEditorState}
            shouldRenderStatusChip
          />
        ))
      ) : (
        <Text textAlign="center" fontWeight="bold">
          {t('components.decisionsTab.noDecisions')}
        </Text>
      )}
    </div>
  );
};

export default DecisionsTab;
