import { Flex, Text, Image } from '@aws-amplify/ui-react';

import { TestimonialProps } from '../types';

interface TestimonialCardProps {
  testimonial: TestimonialProps;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Flex
      flex="1"
      padding="40px"
      gap="32px"
      backgroundColor="var(--amplify-colors-primary-100)"
      direction="column"
      borderRadius="8px"
      border="1px solid var(--amplify-colors-primary-90)"
    >
      <Flex flex="1" direction="column" gap="12px">
        <Text
          fontWeight="medium"
          fontSize="24px"
          lineHeight="29.05px"
          color="var(--amplify-colors-neutral-10)"
        >
          {testimonial.text}
        </Text>
        <Flex direction="column" gap="0">
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
