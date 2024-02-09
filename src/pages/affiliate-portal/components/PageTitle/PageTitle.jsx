import { Divider, Flex, Heading, View } from '@aws-amplify/ui-react';
import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ title, habitatName }) => (
  <View width="100%">
    <Flex alignItems="end" justifyContent="center" position="relative">
      <Heading level={3} fontWeight="bold" textAlign="center">
        {title}
      </Heading>
      <Heading level={5} position="absolute" right="0.5rem">
        {habitatName}
      </Heading>
    </Flex>
    <Divider height="1rem" />
  </View>
);

PageTitle.propTypes = {
  title: PropTypes.string,
  habitatName: PropTypes.string,
};

export default PageTitle;
