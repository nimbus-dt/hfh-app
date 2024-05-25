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
          FAQ
        </Text>
      </Flex>
      <Flex width={{ base: '100%', large: '780px' }} padding="0px">
        <Expander isCollapsible>
          <ExpanderItem title="What is Habitat App?" value="demo-item-1">
            HabitatApp is the all-in-one platform for Habitat for Humanity
            affiliates. Currently, affiliates can conduct Homeownership and
            Critical Home Repair applications online through Habitat App.
          </ExpanderItem>
          <ExpanderItem
            title="Can I test Habitat App out before paying?"
            value="demo-item-8"
          >
            Yes! We offer all affiliates a free application cycle where they can
            try out Habitat App.
          </ExpanderItem>
          <ExpanderItem
            title="Is Habitat App customizable?"
            value="demo-item-2"
          >
            Yes! Habitat App is totally customizable. Affiliates can edit their
            applications, reports, analytics and more.
          </ExpanderItem>
          <ExpanderItem
            title="Can Habitat App integrate with other software?"
            value="demo-item-3"
          >
            Yes! Habitat App can integrate with almost any other software to
            allow a smooth operation for your affiliate.
          </ExpanderItem>
          <ExpanderItem
            title="How can I gain access to Habitat App?"
            value="demo-item-4"
          >
            To get access, sign up to our waitlist now. We will contact you as
            soon as possible.
          </ExpanderItem>
        </Expander>
      </Flex>
    </Flex>
  );
}

export default Faqs;
