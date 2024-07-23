import { Link } from 'react-router-dom';
import { Flex, Text } from '@aws-amplify/ui-react';
import { RootForm, TestApplication, TestCycle } from 'models';
import CustomButton from 'components/CustomButton/CustomButton';
import CustomCard from 'components/CustomCard';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify/datastore';
import { unknown } from 'zod';
import useHabitat from 'hooks/utils/useHabitat';
import styles from './SuccesfullySubmitted.module.css';

interface IProperties {
  onReview: () => void;
  application?: TestApplication;
}

const SuccesfullySubmitted = ({ onReview, application }: IProperties) => {
  const { habitat } = useHabitat();

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
          {`You have succesfully submitted your ${
            rootForm?.name || unknown
          } application
            for ${
              habitat?.longName
            }. You will receive an email with updates on your
            application.`}
        </Text>
        <div className={styles.buttons}>
          <Link to="../applications">
            <CustomButton variation="secondary">
              Go to applications
            </CustomButton>
          </Link>
          <CustomButton onClick={onReview} variation="primary">
            Review
          </CustomButton>
        </div>
      </Flex>
    </CustomCard>
  );
};

export default SuccesfullySubmitted;
