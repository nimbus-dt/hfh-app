import { Flex, Text } from '@aws-amplify/ui-react';
import CustomButton from 'components/CustomButton/CustomButton';

function Contact() {
  return (
    <Flex
      backgroundColor="var(--amplify-colors-primary-100)"
      width="100%"
      height="fit-content"
      justifyContent="center"
      gap="24px"
      padding={{ base: '56px 32px', medium: '56px 112px' }}
      direction="column"
      alignItems="center"
    >
      <Text
        fontWeight="medium"
        fontSize={{ base: '36px', medium: '48px', large: '54px' }}
        width="100%"
        height="fit-content"
        textAlign="center"
        color="white"
      >
        Contact Us
      </Text>
      <Text
        fontWeight="light"
        fontSize="24px"
        width="100%"
        height="fit-content"
        textAlign="center"
        color="white"
      >
        HabitatApp is here to digitally transform how affiliates conduct their
        Homeownership Program.
      </Text>
      <CustomButton
        style={{
          width: 'fit-content',
          height: 'fit-content',
          fontSize: '18px',
          padding: '12px 16px',
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        Contact Us
      </CustomButton>
    </Flex>
  );
}

export default Contact;
