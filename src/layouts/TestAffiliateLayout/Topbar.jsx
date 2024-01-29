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
          overflow="hidden"
        >
          <Heading
            level={3}
            fontWeight="bold"
            maxWidth="100%"
            whiteSpace="nowrap"
            display="inline-block"
            style={{ textOverflow: 'ellipsis' }}
            overflow="hidden"
          >
            Welcome {habitatName}
          </Heading>
        </Flex>
      </Card>
    </Flex>
  );
}

Topbar.propTypes = {
  habitatName: PropTypes.string,
};
