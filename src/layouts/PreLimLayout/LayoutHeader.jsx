import PropTypes from 'prop-types';
import { Flex, Heading } from '@aws-amplify/ui-react';

export function LayoutHeader({ habitatName }) {
  return (
    <Flex direction="column" as="header">
      <Heading level={3} fontWeight="bold">
        {habitatName}
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        Habitat for Humanity
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        PreScreen Form
      </Heading>
    </Flex>
  );
}

LayoutHeader.propTypes = {
  habitatName: PropTypes.string,
};
