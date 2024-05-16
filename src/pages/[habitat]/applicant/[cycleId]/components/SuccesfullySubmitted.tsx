import React from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';
import { Habitat } from 'models';
import { Link } from 'react-router-dom';
import CustomButton from 'components/CustomButton/CustomButton';
import styles from './SuccesfullySubmitted.module.css';

interface IProperties {
  habitat?: Habitat;
  onReview: () => void;
}

const SuccesfullySubmitted = ({ habitat, onReview }: IProperties) => (
  <Flex direction="column">
    <Text fontWeight="bold">
      {`You have succesfully submitted your Homeownership Program application
          for ${habitat?.name}. You will receive an email with updates on your
          application.`}
    </Text>
    <div className={styles.buttons}>
      <Link to="../applications">
        <CustomButton variation="secondary">Go to applications</CustomButton>
      </Link>
      <CustomButton onClick={onReview} variation="primary">
        Review
      </CustomButton>
    </div>
  </Flex>
);

export default SuccesfullySubmitted;
