import { Flex, Image, Text } from '@aws-amplify/ui-react';
import CustomButton from 'components/CustomButton/CustomButton';
import heroScreen from 'assets/images/hero-screen.svg';
import styles from './styles.module.css';
import Background from '../Background';

function Hero() {
  return (
    <Background
      id="hero"
      direction="column"
      gap="40px"
      bgColor="var(--amplify-colors-neutral-10)"
      padding={{ base: '4.5rem 2rem', medium: '3.5rem 2rem' }}
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
          Habitat App is the only platform designed specifically for your
          affiliate's Homeownership and Critical Home Repair programs.
        </Text>
        <CustomButton
          style={{
            width: 'fit-content',
            height: 'fit-content',
            fontSize: '18px',
            padding: '12px 16px',
          }}
          className={styles.signUp}
          onClick={() => {
            window.location.href =
              'https://share.hsforms.com/1lqoUQWsfRm2AJVquaEMNCwqw1cl';
          }}
        >
          Sign up
        </CustomButton>
      </Flex>
      <Image
        alt="home screen"
        width="100%"
        maxWidth="880px"
        height="auto"
        src={heroScreen}
        className={styles.hero}
        borderRadius={{ base: '5px', large: '30px' }}
      />
    </Background>
  );
}

export default Hero;
