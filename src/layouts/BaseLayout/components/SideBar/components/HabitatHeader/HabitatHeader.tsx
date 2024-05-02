/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Image, Text } from '@aws-amplify/ui-react';
import habitatLogo from 'assets/images/habitatlogowhite.svg';
import { Habitat } from 'models';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import Ellipse from '../Ellipse';

const HabitatHeader = () => {
  const habitatURL = useParams().habitat;
  const [name, setName] = useState('');
  const [fontSize, setFontSize] = useState('');

  // Get Habitat and set sidebarName
  useEffect(() => {
    async function getHabitat() {
      try {
        const habitatsResponse = await DataStore.query(Habitat, (c: any) =>
          c.urlName.eq(habitatURL)
        );

        const habitatObject = habitatsResponse[0];
        const { props } = habitatObject;
        const { sidebarName } = props;

        const nameTemp = sidebarName ? sidebarName.name : '';
        const fontSizeTemp = sidebarName ? sidebarName.fontSize : '';

        setName(nameTemp as string);
        setFontSize(fontSizeTemp as string);
      } catch (error) {
        console.log(error);
      }
    }
    getHabitat();
  }, [habitatURL]);

  return name !== '' ? (
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
        fontSize={fontSize}
      >
        {name}
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
