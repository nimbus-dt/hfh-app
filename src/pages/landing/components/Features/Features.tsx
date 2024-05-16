import { Flex, Text } from '@aws-amplify/ui-react';
import { MdCalculate } from 'react-icons/md';
import { useState } from 'react';
import FeatureCard from './components/FeatureCard';

function Features() {
  const [selectedCard, setSelectedCard] = useState(0);

  return (
    <Flex
      direction="row"
      width="100%"
      height="fit-content"
      border="1px solid cyan"
      gap="48px"
      padding={{ base: '72px 32px', medium: '72px 48px', large: '72px 128px' }}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        gap="24px"
        width="100%"
        height="fit-content"
        padding="0px"
        alignContent="center"
        backgroundColor="var(--amplify-colors-neutral-0)"
      >
        <Text
          fontWeight="medium"
          fontSize={{ base: '36px', medium: '48px', large: '54px' }}
          color="var(--amplify-colors-neutral-100)"
          width="100%"
          height="fit-content"
          textAlign="center"
        >
          Benefits of using the app
        </Text>
        <Text
          fontWeight="light"
          fontSize={{ base: '24px', medium: '24px', large: '24px' }}
          color="var(--amplify-colors-neutral-90)"
          textAlign="center"
          width="100%"
          height="100%"
        >
          HabitatApp is here to digitally transform how affiliates conduct their
          operations.
        </Text>
        <Flex
          direction={{ base: 'column', medium: 'row' }}
          padding="0px"
          gap="32px"
          width="100%"
          height="fit-content"
        >
          <FeatureCard
            title="Advanced Calculations"
            description="Automate essential calculations like AMI, household income, and debt-to-income ratios."
            icon={
              <MdCalculate
                size="40px"
                color="var(--amplify-colors-primary-100)"
              />
            }
            selected={selectedCard === 1}
            onClick={() => {
              if (selectedCard !== 1) {
                setSelectedCard(1);
              } else {
                setSelectedCard(0);
              }
            }}
          />
          <FeatureCard
            title="Advanced Calculations"
            description="Automate essential calculations like AMI, household income, and debt-to-income ratios."
            icon={
              <MdCalculate
                size="40px"
                color="var(--amplify-colors-primary-100)"
              />
            }
            selected={selectedCard === 2}
            onClick={() => {
              if (selectedCard !== 2) {
                setSelectedCard(2);
              } else {
                setSelectedCard(0);
              }
            }}
          />
          <FeatureCard
            title="Advanced Calculations"
            description="Automate essential calculations like AMI, household income, and debt-to-income ratios."
            icon={
              <MdCalculate
                size="40px"
                color="var(--amplify-colors-primary-100)"
              />
            }
            selected={selectedCard === 3}
            onClick={() => {
              if (selectedCard !== 3) {
                setSelectedCard(3);
              } else {
                setSelectedCard(0);
              }
            }}
          />
        </Flex>
        <Flex
          direction="column"
          width="100%"
          height="fit-content"
          padding="32px"
          backgroundColor="var(--amplify-colors-neutral-10)"
          alignContent="center"
          justifyContent="center"
          alignItems="center"
        >
          {selectedCard === 0 && '0'}
          {selectedCard === 1 && '1'}
          {selectedCard === 2 && '2'}
          {selectedCard === 3 && '3'}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Features;
