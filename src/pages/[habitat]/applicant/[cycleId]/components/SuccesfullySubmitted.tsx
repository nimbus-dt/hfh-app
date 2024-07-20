import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DataStore } from 'aws-amplify';
import { unknown } from 'zod';
import { Flex, Text } from '@aws-amplify/ui-react';

import CustomButton from 'components/CustomButton/CustomButton';
import CustomCard from 'components/CustomCard';
import useHabitat from 'hooks/utils/useHabitat';
import { RootForm, TestApplication, TestCycle } from 'models';

import styles from './SuccesfullySubmitted.module.css';

interface IProperties {
  onReview: () => void;
  application?: TestApplication;
}

const SuccesfullySubmitted = ({ onReview, application }: IProperties) => {
  const { habitat } = useHabitat();
  const { t } = useTranslation();

  const [rootForm, setRootForm] = useState<RootForm | undefined>(undefined);

  useEffect(() => {
    if (application) {
      const fetchRootForm = async () => {
        const cycles = await DataStore.query(TestCycle, (c1) =>
          c1.id.eq(application?.testcycleID)
        );

        const rootForms = await DataStore.query(RootForm, (c1) =>
          c1.id.eq(cycles[0].rootformID)
        );

        setRootForm(rootForms[0]);
      };

      fetchRootForm();
    }
  }, [application]);

  return (
    <CustomCard width={{ base: '100%', medium: '100%' }}>
      <Flex direction="column">
        <Text fontWeight="bold">
          {`${t(
            'pages.habitat.applicant.cycle.components.succesfullySubmitted.message.1'
          )} ${rootForm?.name || unknown} ${t(
            'pages.habitat.applicant.cycle.components.succesfullySubmitted.message.2'
          )} ${habitat?.longName}${t(
            'pages.habitat.applicant.cycle.components.succesfullySubmitted.message.3'
          )}`}
        </Text>
        <div className={styles.buttons}>
          <Link to="../applications">
            <CustomButton variation="secondary">
              {t(
                'pages.habitat.applicant.cycle.components.succesfullySubmitted.goToApplications'
              )}
            </CustomButton>
          </Link>
          <CustomButton onClick={onReview} variation="primary">
            {t(
              'pages.habitat.applicant.cycle.components.succesfullySubmitted.review'
            )}
          </CustomButton>
        </div>
      </Flex>
    </CustomCard>
  );
};

export default SuccesfullySubmitted;
