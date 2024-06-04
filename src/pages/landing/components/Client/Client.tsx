import { Flex, Text } from '@aws-amplify/ui-react';

import TestimonialCard from './components/TestimonialCard';
import testimonials from './data/testimonials';

import Background from '../Background';

function Client() {
  return (
    <Background bgColor="#092C76" direction="column" gap="48px">
      <Flex direction="column" gap="24px">
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
      <Flex direction={{ base: 'column', large: 'row' }} gap="48px">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </Flex>
    </Background>
  );
}

export default Client;
