import { Flex, Card, Text } from '@aws-amplify/ui-react';
import { forwardRef, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const CustomExpandableCard = forwardRef(
  (
    {
      title,
      children,
      expanded,
      onExpandedChange,
      width = { base: '80%', medium: '500px' },
    },
    ref
  ) => {
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
        width={width}
        borderRadius="10px"
        ref={ref}
      >
        <Flex direction="column" width="100%" height="100%">
          <Flex
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontWeight="bold">{title}</Text>
            {getExpandedValue() ? upArrow : downArrow}
          </Flex>
          {getExpandedValue() && children}
        </Flex>
      </Card>
    );
  }
);

CustomExpandableCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default CustomExpandableCard;
