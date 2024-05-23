import { Flex, Image, Text } from '@aws-amplify/ui-react';
import CustomButton from 'components/CustomButton/CustomButton';
import heroScreen from 'assets/images/hero-screen.svg';
import './style.css';

function Hero() {
  return (
    <Flex
      direction="column"
      width="100%"
      height="fit-content"
      padding={{ base: '56px 24px', medium: '56px 48px', xl: '56px 128px' }}
      gap="40px"
      backgroundColor="var(--amplify-colors-neutral-10)"
      alignItems="center"
    >
      <Flex
        direction="column"
        height="fit-content"
        width={{ base: '100%', xl: '885px' }}
        gap="24px"
        alignItems="center"
        padding="0px"
      >
        <Text
          fontWeight="medium"
          fontSize={{ base: '36px', medium: '48px', large: '54px' }}
          color="var(--amplify-colors-neutral-100)"
          width="100%"
          height="fit-content"
          textAlign="center"
        >
          Less paperwork. More builds.
        </Text>
        <Text
          fontWeight="light"
          fontSize={{ base: '24px', medium: '24px', large: '24px' }}
          color="var(--amplify-colors-neutral-90)"
          textAlign="center"
          width="100%"
          height="100%"
        >
          Habitat App is the only platform designed fully for Habitat for
          Humanity affiliates.
          <br />
          <br />
          Join our waitlist today and get a free application cycle.
        </Text>
        <CustomButton
          style={{
            width: 'fit-content',
            height: 'fit-content',
            fontSize: '18px',
            padding: '12px 16px',
          }}
          className="signUp"
        >
          Sign up
        </CustomButton>
      </Flex>
      <Image
        alt="screen"
        width={{
          base: '300px',
          small: '422.5px',
          medium: '662px',
          large: '880px',
        }}
        height={{
          base: '223px',
          small: '314px',
          medium: '492px',
          large: '654px',
        }}
        src={heroScreen}
      />
    </Flex>
  );
}

export default Hero;
