/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Flex, Card } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

export function CustomCard({
  children,
  width = { base: '80%', medium: '500px' },
}) {
  return (
    <Card
      variation="elevated"
      wrap
      width={width}
      borderRadius="10px"
      height="100%"
      overflow="clip"
    >
      <Flex direction="column" width="100%" height="100%">
        {children}
      </Flex>
    </Card>
  );
}

CustomCard.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
