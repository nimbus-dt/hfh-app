import { Flex, Text } from '@aws-amplify/ui-react';
import {
  MdOutlineAutoGraph,
  MdOutlineCalculate,
  MdOutlineFeed,
} from 'react-icons/md';
import { useState } from 'react';
import FeatureCard from './components/FeatureCard';

function Features() {
  const [selectedCard, setSelectedCard] = useState(1);

  return (
    <Flex
      direction="row"
      width="100%"
      height="fit-content"
      gap="48px"
      padding={{ base: '72px 32px', medium: '72px 48px', large: '72px 128px' }}
      alignItems="center"
      justifyContent="center"
      id="features"
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
          Habitat App automates your back-office
        </Text>
        <Text
          fontWeight="light"
          fontSize={{ base: '24px', medium: '24px', large: '24px' }}
          color="var(--amplify-colors-neutral-90)"
          textAlign="center"
          width="100%"
          height="100%"
        >
          Don’t let complicated, expensive software get in the way of your home
          builds. Habitat App's tools are easy to use and custom made to your
          affiliate.
        </Text>
        <Flex
          direction={{ base: 'column', medium: 'row' }}
          padding="0px"
          gap="32px"
          width="100%"
          height="fit-content"
        >
          <FeatureCard
            title="Online Applications"
            description="Fully online Homeownership, Repairs and Pre-Screening applications. Guidance at each step."
            icon={
              <MdOutlineFeed
                size="40px"
                color="var(--amplify-colors-primary-100)"
              />
            }
            selected={selectedCard === 1}
            onClick={() => {
              setSelectedCard(1);
            }}
          />
          <FeatureCard
            title="Advanced Calculations"
            description="Automate essential calculations like AMI, household income, and debt-to-income ratios."
            icon={
              <MdOutlineCalculate
                size="40px"
                color="var(--amplify-colors-primary-100)"
              />
            }
            selected={selectedCard === 2}
            onClick={() => {
              setSelectedCard(2);
            }}
          />
          <FeatureCard
            title="Complete Analytics"
            description="Directly report on reasons for denial, demographics, total acceptances per cycle and more."
            icon={
              <MdOutlineAutoGraph
                size="40px"
                color="var(--amplify-colors-primary-100)"
              />
            }
            selected={selectedCard === 3}
            onClick={() => {
              setSelectedCard(3);
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
          {selectedCard === 1 && '1'}
          {selectedCard === 2 && '2'}
          {selectedCard === 3 && '3'}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Features;
