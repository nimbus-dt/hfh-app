import { Flex, Image, Text } from '@aws-amplify/ui-react';
import {
  MdOutlineAutoGraph,
  MdOutlineCalculate,
  MdOutlineFeed,
} from 'react-icons/md';
import { useState } from 'react';
import featureAnalytics from 'assets/images/feature-analytics.svg';
import featureCalculations from 'assets/images/feature-calculations.svg';
import featureApplications from 'assets/images/feature-online.svg';

import FeatureCard from './components/FeatureCard';
import Background from '../Background';

function Features() {
  const [selectedCard, setSelectedCard] = useState(1);

  return (
    <Background
      id="features"
      direction="row"
      gap="48px"
      bgColor="var(--amplify-colors-neutral-10)"
    >
      <Flex
        direction="column"
        gap="48px"
        width="100%"
        height="fit-content"
        padding="0px"
        alignContent="center"
        backgroundColor="var(--amplify-colors-neutral-0)"
      >
        <Flex direction="column" gap="24px">
          <Text
            fontWeight="medium"
            fontSize={{ base: '36px', medium: '48px', large: '54px' }}
            lineHeight={{
              base: '43.57px',
              medium: '58.09px',
              large: '65.35px',
            }}
            letterSpacing={{
              base: '-0.005em',
              medium: '-0.05em',
              large: '-0.05em',
            }}
            textAlign="center"
            color="var(--amplify-colors-neutral-100)"
          >
            No more paper applications
          </Text>
          <Text
            fontWeight="light"
            fontSize="24px"
            lineHeight="29.05px"
            textAlign="center"
            color="var(--amplify-colors-neutral-90)"
          >
            Habitat App allows applicants to submit online applications, upload
            income records, revise application mistakes, and review decisions -
            all in one place.
          </Text>
        </Flex>
        <Flex
          direction={{ base: 'column', medium: 'row' }}
          padding="0px"
          gap="32px"
          width="100%"
          height="fit-content"
        >
          <FeatureCard
            title="Online Applications"
            description="Fully online Homeownership and Critical Home Repair applications. Guidance at each step."
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
            description="Gather reports on reasons for denial, demographics, total acceptances per cycle and more."
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
          alignContent="center"
          justifyContent="center"
          alignItems="center"
        >
          {selectedCard === 1 && (
            <Image
              alt="application"
              src={featureApplications}
              width={{
                base: '90%',
                medium: '463px',
                large: '616px',
              }}
              height={{
                base: '67%',
                medium: '344px',
                large: '459px',
              }}
            />
          )}
          {selectedCard === 2 && (
            <Image
              alt="calculations"
              width={{
                base: '350px',
                medium: '400px',
                large: '576px',
              }}
              height={{
                base: '241px',
                medium: '274px',
                large: '395px',
              }}
              src={featureCalculations}
              borderRadius="30px"
            />
          )}
          {selectedCard === 3 && (
            <Image
              alt="analytics"
              width={{
                base: '350px',
                medium: '400px',
                large: '576px',
              }}
              height={{
                base: '241px',
                medium: '274px',
                large: '395px',
              }}
              src={featureAnalytics}
              borderRadius="30px"
            />
          )}
        </Flex>
      </Flex>
    </Background>
  );
}

export default Features;
