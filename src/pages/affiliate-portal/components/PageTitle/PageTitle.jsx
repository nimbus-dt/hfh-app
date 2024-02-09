import { Divider, Flex, Heading, View } from '@aws-amplify/ui-react';
import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ title }) => (
  <View width="100%">
    <Flex alignItems="end" justifyContent="center">
      <Heading level={3} fontWeight="bold" textAlign="center">
        {title}
      </Heading>
    </Flex>
    <Divider height="1rem" />
  </View>
);

PageTitle.propTypes = {
  title: PropTypes.string,
};

export default PageTitle;
