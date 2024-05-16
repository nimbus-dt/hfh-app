import { useOutletContext } from 'react-router-dom';
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
    paginationProducer: {
      sort: (s: SortPredicate<Decision>) =>
        s.createdAt(SortDirection.DESCENDING),
    },
  });

  return (
    <div className={`${style.decisionsContainer}`}>
      {decisions.map((data) => (
        <DecisionCard
          key={data.id}
          date={data.createdAt || ''}
          habitat={habitat?.name || ''}
          status={ReviewStatus[data?.status || 'PENDING']}
          editorState={data.serializedEditorState}
        />
      ))}
    </div>
  );
};

export default Decisions;
