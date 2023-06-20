/* eslint-disable import/no-extraneous-dependencies */
import {
  Flex,
  Button,
  Card,
  Heading,
  Text,
  Image,
} from '@aws-amplify/ui-react';
import { BiUser, BiSupport } from 'react-icons/bi';
import { AiFillCloud } from 'react-icons/ai';

import nimbusLogo from '../../assets/images/nimbus-logo.png';

export function LandingLayout() {
  const contactButton = <Button backgroundColor="white">Contact us</Button>;

  const nav = (
    <Flex
      direction="row"
      width="100%"
      backgroundColor="white"
      alignItems="center"
    >
      <Flex width="25%" height="100%">
        <Image alt="Habitat Logo" src={nimbusLogo} height="100%" width="100%" />
      </Flex>
      <Flex
        width="75%"
        justifyContent="flex-end"
        height="100%"
        marginRight="30px"
      >
        {contactButton}
      </Flex>
    </Flex>
  );

  const hero = (
    <Card
      width="100%"
      height="500px"
      backgroundImage="linear-gradient(to bottom, #ffffff, #55B949)"
    >
      <Flex direction="column" alignItems="center">
        <Heading level="1" fontWeight="bold">
          Digitally transform
        </Heading>
        <Heading level="1" fontWeight="bold" marginBottom="10px">
          your Habitat affiliate
        </Heading>
        <Heading
          level="4"
          fontWeight="normal"
          marginBottom="30px"
          width="40%"
          textAlign="center"
        >
          With our platform you can take all your processes digital, storing all
          of your affiliate's data securely in the cloud
        </Heading>
        {contactButton}
      </Flex>
    </Card>
  );

  const explanation = (
    <Flex direction="column">
      <Flex
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
        padding="20px"
      >
        <Card variation="outlined" backgroundColor="lightgray" width="30% ">
          <Flex width="100%" justifyContent="center" marginBottom="10px">
            <BiUser size="50px" />
          </Flex>
          <Heading textAlign="center" level="3">
            Online PreScreens
          </Heading>
          <Text textAlign="center">Hey</Text>
        </Card>
        <Card variation="outlined" backgroundColor="lightgray" width="30% ">
          <Flex width="100%" justifyContent="center" marginBottom="10px">
            <AiFillCloud size="50px" />
          </Flex>
          <Heading textAlign="center" level="3">
            Cloud Data Storage
          </Heading>
        </Card>
        <Card variation="outlined" backgroundColor="lightgray" width="30% ">
          <Flex width="100%" justifyContent="center" marginBottom="10px">
            <BiSupport size="50px" />
          </Flex>
          <Heading textAlign="center" level="3">
            User Support
          </Heading>
        </Card>
      </Flex>
    </Flex>
  );

  const contactForm = (
    <Card variation="outlined" width="100%" height="500px">
      <Flex direction="column">Contact</Flex>
    </Card>
  );

  const footer = (
    <Card variation="outlined" width="100%" height="200px">
      <Flex direction="column">Footer</Flex>
    </Card>
  );

  return (
    <Flex width="100%" direction="column">
      {nav}
      {hero}
      {explanation}
      {contactForm}
      {footer}
    </Flex>
  );
}
