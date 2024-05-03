import React from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';
import { Habitat } from 'models';
import { Link } from 'react-router-dom';
import CustomButton from 'components/CustomButton/CustomButton';

interface IProperties {
  habitat?: Habitat;
}

const SuccesfullySubmitted = ({ habitat }: IProperties) => (
  <Flex direction="column">
    <Text fontWeight="bold">
      {`You have succesfully submitted your Homeownership Program application
          for ${habitat?.name}. You will receive an email with updates on your
          application.`}
    </Text>
    <Flex justifyContent="end">
      <Link to="../applications">
        <CustomButton variation="primary">Go to applications</CustomButton>
      </Link>
    </Flex>
  </Flex>
);

export default SuccesfullySubmitted;
