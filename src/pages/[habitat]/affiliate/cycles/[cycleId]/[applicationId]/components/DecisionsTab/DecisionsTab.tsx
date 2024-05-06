import DecisionCard from 'components/DecisionCard';
import { ReviewStatus, Decision, Habitat } from 'models';
import React from 'react';
import style from './DecisionsTab.module.css';

interface IProperties {
  habitat?: Habitat;
  decisions: Decision[];
}

const DecisionsTab = ({ habitat, decisions }: IProperties) => (
  <div className={style.container}>
    {decisions.map((decision) => (
      <DecisionCard
        key={decision.id}
        date={decision.createdAt || ''}
        habitat={habitat?.name || ''}
        status={decision.status as keyof typeof ReviewStatus}
        editorState={decision.serializedEditorState}
      />
    ))}
  </div>
);

export default DecisionsTab;
