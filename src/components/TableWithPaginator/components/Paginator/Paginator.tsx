import { Button, Flex, Text, View } from '@aws-amplify/ui-react';
import React from 'react';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

interface IProperties {
  current: number;
  total: number;
  hasMore?: boolean;
  onChange: (newPage: number) => void;
}

const Paginator = ({ current, total, hasMore, onChange }: IProperties) => (
  <Flex alignItems="center" color="var(--amplify-colors-neutral-90)">
    <Text color="inherit">{`${current} of ${total}`}</Text>
    <Flex gap="18px">
      <Button
        padding="12px"
        variation="link"
        borderRadius="50%"
        color="var(--amplify-colors-neutral-80)"
        onClick={() => current > 1 && onChange(current - 1)}
      >
        <MdOutlineArrowBackIos size="24px" />
      </Button>
      <Button
        padding="12px"
        variation="link"
        borderRadius="50%"
        color="var(--amplify-colors-neutral-80)"
        onClick={() => (current < total || hasMore) && onChange(current + 1)}
      >
        <MdOutlineArrowForwardIos size="24px" />
      </Button>
    </Flex>
  </Flex>
);

export default Paginator;
