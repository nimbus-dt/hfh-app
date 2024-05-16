import { Flex, Text } from '@aws-amplify/ui-react';
import CustomButton from 'components/CustomButton/CustomButton';
import style from './Hero.module.css';

function HeroHeader() {
  return (
    <Flex
      direction="column"
      height="fit-content"
      width="100%"
      gap="24px"
      alignItems="center"
    >
      <Text
        fontWeight="medium"
        fontSize="54px"
        color="var(--amplify-colors-neutral-100)"
        textAlign="center"
      >
        All-in-One Platform for Habitat affiliates
      </Text>
      <Text
        fontWeight="light"
        fontSize="24px"
        color="var(--amplify-colors-neutral-90)"
        textAlign="center"
        width="80%"
      >
        HabitatApp is here to digitally transform how affiliates conduct their
        operations. <br />
        <br /> Contact us now and get a 1 month free trial.
      </Text>
      <CustomButton>Get the app</CustomButton>
    </Flex>
  );
}

function Hero() {
  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      padding="56px 128px"
      gap="40px"
      backgroundColor="var(--amplify-colors-neutral-10)"
      justifyContent="center"
      alignItems="center"
    >
      <HeroHeader />
      <img
        alt="screen"
        width="880px"
        height="654px"
        src="google.com"
        className={`${style.image}`}
      />
    </Flex>
  );
}

export default Hero;
