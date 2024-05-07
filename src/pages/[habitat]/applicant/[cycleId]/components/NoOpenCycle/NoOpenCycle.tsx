import React from 'react';
import { TestCycle } from 'models';
import DOMPurify from 'dompurify';
import CustomButton from 'components/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import style from './NoOpenCycle.module.css';

interface IProperties {
  cycle?: TestCycle;
  onReview: () => void;
  showReview: boolean;
}

const NoOpenCycle = ({ cycle, onReview, showReview }: IProperties) => (
  <>
    <div
      // eslint-disable-next-line react/no-danger
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
  </>
);

export default NoOpenCycle;
