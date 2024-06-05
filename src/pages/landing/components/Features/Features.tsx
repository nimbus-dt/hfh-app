import { Flex, Image, Text } from '@aws-amplify/ui-react';
import {
  MdOutlineAutoGraph,
  MdOutlineCalculate,
  MdOutlineFeed,
} from 'react-icons/md';
import { useRef, useState } from 'react';
import { motion, useAnimate, useAnimation, useInView } from 'framer-motion';
import featureAnalytics from 'assets/images/feature-analytics.svg';
import featureCalculations from 'assets/images/feature-calculations.svg';
import featureApplications from 'assets/images/feature-online.svg';

import FeatureCard from './components/FeatureCard';
import Background from '../Background';

const textVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1 },
};

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
        <Flex
          direction="column"
          gap="24px"
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          variants={textVariants}
          transition={{ duration: 1 }}
        >
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
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          transition={{ duration: 1, staggerChildren: 0.2 }}
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
        <Flex justifyContent="center">
          {selectedCard === 1 && (
            <Image
              as={motion.img}
              initial="hidden"
              whileInView="visible"
              variants={imageVariants}
              transition={{ duration: 1.5 }}
              alt="application"
              src={featureApplications}
              width="100%"
              maxWidth="880px"
              height="auto"
            />
          )}
          {selectedCard === 2 && (
            <Image
              as={motion.img}
              initial="hidden"
              whileInView="visible"
              variants={imageVariants}
              transition={{ duration: 1.5 }}
              alt="calculations"
              width={{ base: '100%', large: '33%' }}
              maxWidth="405px"
              height="auto"
              src={featureCalculations}
            />
          )}
          {selectedCard === 3 && (
            <Image
              as={motion.img}
              initial="hidden"
              whileInView="visible"
              variants={imageVariants}
              transition={{ duration: 1.5 }}
              alt="analytics"
              src={featureAnalytics}
              width="100%"
              maxWidth="880px"
              height="auto"
            />
          )}
        </Flex>
      </Flex>
    </Background>
  );
}

export default Features;
