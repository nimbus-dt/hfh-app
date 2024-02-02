import { Flex, Text } from '@aws-amplify/ui-react';
import React from 'react';
import PropTypes from 'prop-types';

const FeaturePreview = ({ icon, title, description }) => (
  <Flex direction="column" alignItems="center">
    {icon}
    <Text fontSize="17px" textAlign="center" fontWeight="bold">
      {title}
    </Text>
    <Text fontSize="15px" textAlign="center">
      {description}
    </Text>
  </Flex>
);

FeaturePreview.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default FeaturePreview;
