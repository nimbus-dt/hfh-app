import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TestCycle } from 'models';

import CustomButton from 'components/CustomButton';
import CustomCard from 'components/CustomCard';

import style from './NoOpenCycle.module.css';

interface IProperties {
  cycle?: TestCycle;
  onReview: () => void;
  showReview: boolean;
}

const NoOpenCycle = ({ cycle, onReview, showReview }: IProperties) => {
  const { t } = useTranslation();
  return (
    <CustomCard width={{ base: '100%', medium: '100%' }}>
      <div // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(cycle?.closedCycleMessage || ''),
        }}
      />
      <div className={`${style.buttonContainer}`}>
        <Link to="../applications">
          <CustomButton onClick={onReview} variation="secondary">
            {t('pages.habitat.applicant.cycle.components.noOpenCycle.goBack')}
          </CustomButton>
        </Link>
        {showReview && (
          <CustomButton onClick={onReview}>
            {t('pages.habitat.applicant.cycle.components.noOpenCycle.review')}
          </CustomButton>
        )}
      </div>
    </CustomCard>
  );
};

export default NoOpenCycle;
