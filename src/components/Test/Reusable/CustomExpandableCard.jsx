import { Flex, Card, Text } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

export function CustomExpandableCard({
  title,
  children,
  expanded,
  onExpandedChange,
}) {
  const [internalExpanded, setInternalExpanded] = useState(expanded || false);

  const onInternalChange = () => {
    if (onExpandedChange !== undefined) {
      onExpandedChange(!expanded);
    } else {
      setInternalExpanded(
        (previousInternalExpanded) => !previousInternalExpanded
      );
    }
  };

  const downArrow = (
    <FaArrowDown style={{ cursor: 'pointer' }} onClick={onInternalChange} />
  );

  const upArrow = (
    <FaArrowUp style={{ cursor: 'pointer' }} onClick={onInternalChange} />
  );

  const getExpandedValue = () => {
    if (onExpandedChange !== undefined) {
      return expanded;
    }
    return internalExpanded;
  };

  return (
    <Card
      variation="elevated"
      wrap
      width={{ base: '80%', medium: '500px' }}
      borderRadius="10px"
      height={getExpandedValue() ? '100%' : '50px'}
      overflow="clip"
    >
      <Flex direction="column" width="100%" height="100%">
        <Flex direction="row" width="100%" justifyContent="space-between">
          <Text fontWeight="bold">{title}</Text>
          {getExpandedValue() ? upArrow : downArrow}
        </Flex>
        {children}
      </Flex>
    </Card>
  );
}

CustomExpandableCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
};
