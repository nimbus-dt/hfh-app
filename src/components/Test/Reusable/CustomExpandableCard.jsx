/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Flex, Card, Text } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export function CustomExpandableCard(props) {
  const [expanded, setExpanded] = useState(props.expanded || false);

  const downArrow = (
    <FaArrowDown
      onClick={() => {
        setExpanded(!expanded);
      }}
    />
  );

  const upArrow = (
    <FaArrowUp
      onClick={() => {
        setExpanded(!expanded);
      }}
    />
  );

  return (
    <Card
      variation="elevated"
      wrap
      width={{ base: '80%', medium: '500px' }}
      borderRadius="10px"
      height={expanded ? '100%' : '50px'}
      overflow="clip"
    >
      <Flex direction="column" width="100%" height="100%">
        <Flex direction="row" width="100%" justifyContent="space-between">
          <Text fontWeight="bold">{props.title}</Text>
          {expanded ? upArrow : downArrow}
        </Flex>
        {props.children}
      </Flex>
    </Card>
  );
}
