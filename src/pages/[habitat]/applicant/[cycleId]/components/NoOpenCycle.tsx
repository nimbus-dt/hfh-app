import React from 'react';
import { Text } from '@aws-amplify/ui-react';
import { Habitat } from 'models';

interface IProperties {
  habitat?: Habitat;
}

const NoOpenCycle = ({ habitat }: IProperties) => (
  <Text fontWeight="bold">{habitat?.props.homeownershipNoOpenCycle}</Text>
);

export default NoOpenCycle;
