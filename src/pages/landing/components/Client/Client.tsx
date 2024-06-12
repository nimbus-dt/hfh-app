import { Flex, Text } from '@aws-amplify/ui-react';
import { motion } from 'framer-motion';

import TestimonialCard from './components/TestimonialCard';
import testimonials from './data/testimonials';

import Background from '../Background';

const textVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

function Client() {
  return (
    <Background id="clients" bgColor="#092C76" direction="column" gap="48px">
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
          color="var(--amplify-colors-neutral-10)"
          whiteSpace="nowrap"
        >
          Our Clients
        </Text>
        <Text
          fontWeight="light"
          fontSize="24px"
          lineHeight="29.05px"
          textAlign="center"
          color="var(--amplify-colors-neutral-10)"
        >
          Hear what they have to say and their amazing stories!
        </Text>
      </Flex>
      <Flex
        direction={{ base: 'column', large: 'row' }}
        gap="48px"
        as={motion.div}
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        transition={{ duration: 1.5, staggerChildren: 0.2 }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </Flex>
    </Background>
  );
}

export default Client;
