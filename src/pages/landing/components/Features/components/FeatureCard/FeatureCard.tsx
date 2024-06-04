import { Flex, Text } from '@aws-amplify/ui-react';
import { ReactElement } from 'react';
import './style.css';

interface IProperties {
  icon: ReactElement;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function FeatureCard({
  icon,
  title,
  description,
  selected,
  onClick,
}: IProperties) {
  return (
    <Flex
      direction="column"
      width="100%"
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      gap="32px"
      padding="16px"
      backgroundColor={
        selected
          ? 'var(--amplify-colors-primary-30)'
          : 'var(--amplify-colors-neutral-10)'
      }
      borderRadius="8px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={
        selected
          ? 'var(--amplify-colors-primary-70)'
          : 'var(--amplify-colors-neutral-60)'
      }
      className="mainContainer"
      onClick={onClick}
    >
      <Flex
        direction="row"
        width="fit-content"
        height="fit-content"
        gap="10px"
        padding="24px"
        borderRadius="60px"
        backgroundColor="var(--amplify-colors-primary-40)"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </Flex>
      <Flex
        direction="column"
        width="100%"
        height="fit-content"
        gap="9px"
        justifyContent="center"
      >
        <Text
          fontWeight="semibold"
          fontSize="24px"
          lineHeight="29.05px"
          textAlign="center"
          color="var(--amplify-colors-neutral-100)"
        >
          {title}
        </Text>
        <Text
          fontWeight="light"
          fontSize="20px"
          lineHeight="24.2px"
          textAlign="center"
          color="var(--amplify-colors-neutral-100)"
        >
          {description}
        </Text>
      </Flex>
    </Flex>
  );
}

export default FeatureCard;
