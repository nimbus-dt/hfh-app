import DecisionCard from 'components/DecisionCard';
import { ReviewStatus, Decision, Habitat } from 'models';
import React from 'react';
import { Text } from '@aws-amplify/ui-react';
import useHabitat from 'hooks/utils/useHabitat';
import style from './DecisionsTab.module.css';

interface IProperties {
  decisions: Decision[];
}

const DecisionsTab = ({ decisions }: IProperties) => {
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
          There are no decisions for this application
        </Text>
      )}
    </div>
  );
};

export default DecisionsTab;
