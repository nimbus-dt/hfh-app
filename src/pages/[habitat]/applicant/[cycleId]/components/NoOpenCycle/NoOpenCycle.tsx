import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { TestCycle } from 'models';

import CustomButton from 'components/CustomButton';
import CustomCard from 'components/CustomCard';

import style from './NoOpenCycle.module.css';

interface IProperties {
  cycle?: TestCycle;
  onReview: () => void;
  showReview: boolean;
}

const NoOpenCycle = ({ cycle, onReview, showReview }: IProperties) => (
  <CustomCard width={{ base: '100%', medium: '100%' }}>
    <div // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(cycle?.closedCycleMessage || ''),
      }}
    />
    <div className={`${style.buttonContainer}`}>
      <Link to="../applications">
        <CustomButton onClick={onReview} variation="secondary">
          Go back
        </CustomButton>
      </Link>
      {showReview && <CustomButton onClick={onReview}>Review</CustomButton>}
    </div>
  </CustomCard>
);

export default NoOpenCycle;
