import {
  Flex,
  Heading,
  useBreakpointValue,
  Text,
  Authenticator,
} from '@aws-amplify/ui-react';
import { BsHouseDoorFill } from 'react-icons/bs';

const Authentication = () => {
  const boolMobile = useBreakpointValue({
    base: true,
    large: false,
  });

  return (
    <Flex direction="row" width="100%" height="100%" gap="0px">
      <Flex
        direction="column"
        width={!boolMobile ? '42%' : '100%'}
        height="100vh"
        justifyContent="center"
        alignItems="center"
        gap="16px"
        padding="20px"
      >
        <BsHouseDoorFill size="40px" />
        <Heading level="5" fontWeight="bold" textAlign="center">
          Habitat for Humanity of Kenosha
        </Heading>
        <Authenticator />
      </Flex>
      {!boolMobile && (
        <Flex
          direction="column"
          width="58%"
          height="100vh"
          backgroundColor="#314D89"
          justifyContent="center"
          alignItems="center"
          padding="50px"
        >
          <Heading
            level="4"
            fontWeight="medium"
            color="white"
            textAlign="center"
          >
            Welcome to our affiliate’s application portal. Excited to empower
            families through home ownership!
          </Heading>
          <Flex
            backgroundColor="black"
            padding="10px"
            borderRadius="50px"
            alignItems="center"
            justifyContent="center"
          >
            <BsHouseDoorFill color="white" size="30px" />
          </Flex>
          <Flex
            direction="column"
            gap="0px"
            alignContent="center"
            justifyContent="center"
          >
            <Text color="white" textAlign="center" fontWeight="medium">
              Susan Meadows
            </Text>
            <Text color="white" textAlign="center" fontWeight="thin">
              Executive Director
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Authentication;
