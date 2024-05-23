import { Flex, Text, Expander, ExpanderItem } from '@aws-amplify/ui-react';

function Faqs() {
  return (
    <Flex
      direction="column"
      gap="40px"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      padding={{ base: '56px 32px', medium: '56px 48px', large: '56px 132px' }}
      backgroundColor="var(--amplify-colors-neutral-10)"
      id="faqs"
    >
      <Flex
        width="100%"
        height="fit-content"
        alignItems="center"
        gap="24px"
        padding="0px"
        direction="column"
      >
        <Text
          fontWeight="medium"
          fontSize={{ base: '36px', medium: '48px', large: '54px' }}
          width="100%"
          height="fit-content"
          textAlign="center"
          color="var(--amplify-colors-neutral-100)"
        >
          FAQs
        </Text>
        <Text
          fontWeight="light"
          fontSize="24px"
          width="100%"
          height="fit-content"
          textAlign="center"
          color="var(--amplify-colors-neutral-100)"
        >
          HabitatApp is here to digitally transform how affiliates conduct their
          Homeownership Program.
        </Text>
      </Flex>
      <Flex width={{ base: '100%', large: '780px' }} padding="0px">
        <Expander isCollapsible>
          <ExpanderItem title="What is Habitat App?" value="demo-item-2">
            HabitatApp is the all-in-one app for Habitat for Humanity
            affiliates. With it, affiliates can conduct all of their operations
            online - Homeownership Programs, Repairs, Volunteer Management and
            more.
          </ExpanderItem>
          <ExpanderItem
            title="How can I gain access to HabitatApp?"
            value="demo-item-3"
          >
            To get access, contact us now so that we can reach out to you and
            schedule a demo!
          </ExpanderItem>
        </Expander>
      </Flex>
    </Flex>
  );
}

export default Faqs;
