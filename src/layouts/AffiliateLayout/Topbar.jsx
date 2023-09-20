import PropTypes from 'prop-types';
import { Card, Flex, Heading } from '@aws-amplify/ui-react';

export function Topbar({ habitatName }) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <Card width="100%" variation="elevated" margin="auto" height="6rem">
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Heading level={3} fontWeight="bold">
            Welcome {habitatName} Habitat for Humanity
          </Heading>
        </Flex>
      </Card>
    </Flex>
  );
}

Topbar.propTypes = {
  habitatName: PropTypes.string,
};
