import { Flex, Text } from '@aws-amplify/ui-react';
import { motion } from 'framer-motion';

import Background from '../Background';
import prices from './data/prices';
import PriceCard from './components/PriceCard';

const textVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const Pricing = () => (
  <Background id="pricing" bgColor="#FAFAFA" direction="column" gap="48px">
    <Flex
      direction="column"
      gap="24px"
      as={motion.div}
      initial="hidden"
      whileInView="visible"
      variants={textVariants}
      transition={{ duration: 1.5 }}
    >
      <Text
        fontWeight="medium"
        fontSize="54px"
        lineHeight="65.35px"
        letterSpacing="-0.005em"
        textAlign="center"
        color="var(--amplify-colors-neutral-100)"
      >
        Pricing that matches your affiliate’s needs
      </Text>
      <Text
        fontWeight="light"
        fontSize="24px"
        lineHeight="29.05px"
        textAlign="center"
        color="var(--amplify-colors-neutral-100)"
      >
        No matter how many applications you receive or team members you have -
        our pricing is simple, transparent and adapts specifically to your
        affiliate.
      </Text>
    </Flex>
    <Flex
      direction={{ base: 'column', large: 'row' }}
      gap="48px"
      width="100%"
      alignItems="center"
      justifyContent="center"
      as={motion.div}
      initial="hidden"
      whileInView="visible"
      variants={cardVariants}
      transition={{ duration: 1.5, staggerChildren: 0.2 }}
    >
      {prices.map((price) => (
        <PriceCard
          key={price.id}
          id={price.id}
          titleBlack={price.titleBlack}
          titleGray={price.titleGray}
          message={price.message}
          body={price.body}
          button={price.button}
        />
      ))}
    </Flex>
    <Text
      fontWeight="light"
      fontSize="10px"
      lineHeight="29.05px"
      textAlign="center"
      color="var(--amplify-colors-neutral-100)"
    >
      Monthly prices, charged per year.
    </Text>
  </Background>
);

export default Pricing;
