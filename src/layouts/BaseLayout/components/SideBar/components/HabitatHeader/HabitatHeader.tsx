/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Image, Text } from '@aws-amplify/ui-react';
import habitatLogo from 'assets/images/habitatlogowhite.svg';
import { Habitat } from 'models';
import React from 'react';
import Ellipse from '../Ellipse';

interface IProperties {
  habitat: Habitat;
}

const HabitatHeader = ({ habitat }: IProperties) => {
  const habitatName = habitat?.props?.sidebarName?.name;

  return habitatName !== '' ? (
    <Flex
      direction="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
      gap="0px"
      marginBottom="24px"
    >
      <Image
        src={habitatLogo}
        alt="logo"
        width="64px"
        height="57px"
        padding="8px"
      />
      <Text
        color="white"
        padding="0px"
        fontFamily="opti"
        overflow="hidden"
        width="100%"
        whiteSpace="pre-wrap"
        textAlign="center"
        fontSize={habitat?.props?.sidebarName?.fontSize as string}
      >
        {habitat?.props?.sidebarName?.name}
      </Text>
    </Flex>
  ) : (
    <Flex
      direction="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
      gap="0px"
      marginBottom="24px"
    >
      <Ellipse />
    </Flex>
  );
};

export default HabitatHeader;
