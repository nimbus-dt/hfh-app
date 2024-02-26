import { Flex, Loader, Text } from '@aws-amplify/ui-react';
import React from 'react';

const LoadingData = () => (
  <Flex>
    <Loader />
    <Text>Loading data</Text>
  </Flex>
);

export default LoadingData;
