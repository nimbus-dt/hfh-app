import { motion } from 'framer-motion';
import { Flex, Text, Image } from '@aws-amplify/ui-react';

import { TestimonialProps } from '../types';

interface TestimonialCardProps {
  testimonial: TestimonialProps;
}

const testimonialCardVariants = {
  regular: { y: 0 },
  hover: { y: -6 },
};

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Flex
      as={motion.div}
      flex="1"
      padding="40px"
      gap="8px"
      backgroundColor="var(--amplify-colors-primary-100)"
      direction="column"
      borderRadius="8px"
      border="1px solid var(--amplify-colors-primary-90)"
      transition={{ transition: 'transform 0.3s ease' }}
      initial="regular"
      whileHover="hover"
      variants={testimonialCardVariants}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      style={{
        cursor: 'pointer',
      }}
    >
      <Flex direction="column" gap="64px" alignItems="center">
        <Text
          fontWeight="light"
          fontSize="20px"
          lineHeight="24px"
          color="var(--amplify-colors-neutral-10)"
        >
          {testimonial.text}
        </Text>
        <Flex
          direction="column"
          gap="0"
          flex="1 1 auto"
          justifyContent="flex-end"
        >
          <Text
            fontWeight="500"
            fontSize="20px"
            lineHeight="24px"
            letterSpacing="0.015em"
            color="var(--amplify-colors-neutral-10)"
          >
            {testimonial.author.name}
          </Text>
          <Text
            fontWeight="400"
            fontSize="16px"
            lineHeight="24px"
            letterSpacing="0.005em"
            color="var(--amplify-colors-neutral-10)"
          >
            {testimonial.author.title}
          </Text>
        </Flex>
      </Flex>
      <Image
        alt={`${testimonial.organization.name} logo`}
        src={testimonial.organization.logo}
        height="110px"
        width="202.16px"
        objectFit="contain"
      />
    </Flex>
  );
}

export default TestimonialCard;
