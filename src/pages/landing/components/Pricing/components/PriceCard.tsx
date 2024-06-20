import { Button, Flex, Text } from '@aws-amplify/ui-react';

import { MdCancel, MdCheck } from 'react-icons/md';

import { PriceProps } from '../types';

const PriceCard = ({
  titleBlack,
  titleGray,
  message,
  body,
  button,
}: PriceProps) => (
  <Flex
    width="100%"
    maxWidth="400px"
    direction="column"
    gap="32px"
    padding="40px"
    backgroundColor="#F4F4F4"
    border="1px solid #BDBDBD"
    borderRadius="8px"
  >
    <Flex gap="16px" direction="column">
      <Text
        fontWeight="500"
        fontSize="40px"
        lineHeight="48.41px"
        color="var(--amplify-colors-neutral-100)"
      >
        {titleBlack}
        <span
          style={{
            display: 'inline',
            fontWeight: '500',
            fontSize: '24px',
            lineHeight: '29.05px',
            color: '#757575',
          }}
        >
          {titleGray}
        </span>
      </Text>
      <div style={{ border: '1px solid #000000' }} />
      <Text
        fontWeight="300"
        fontSize="24px"
        lineHeight="29.05px"
        letterSpacing="0.015em"
      >
        {message}
      </Text>
      {body.map((item) => (
        <Flex gap="12px" key={item.id} alignItems="center">
          {item.type === 'include' ? (
            <MdCheck color="#62AA7C" size={24} />
          ) : (
            <MdCancel color="#FF0000" size={24} />
          )}
          <Text
            fontWeight="300"
            fontSize="20px"
            lineHeight="24px"
            letterSpacing="0.015em"
            color="#757575"
          >
            {item.text}
          </Text>
        </Flex>
      ))}
    </Flex>
    <Button variation="primary" isFullWidth>
      {button}
    </Button>
  </Flex>
);

export default PriceCard;
