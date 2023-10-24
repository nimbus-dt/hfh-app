import {
  Flex,
  Card,
  Image,
  Heading,
  Text,
  Badge,
  useBreakpointValue,
  Button,
} from '@aws-amplify/ui-react';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { AutoPlay } from '@egjs/flicking-plugins';
import {
  HiCog6Tooth,
  HiArrowLeftOnRectangle,
  HiUserGroup,
  HiEnvelope,
  HiUser,
} from 'react-icons/hi2';
import { HiHome } from 'react-icons/hi';
import { IoHammer } from 'react-icons/io5';
import heroIcon from '../../assets/images/hero-icon.svg';

export function LandingHome() {
  const responsiveBool = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });
  return (
    <Flex
      direction="column"
      width="100%"
      height="fit-content"
      backgroundColor="#34548c"
      alignItems="center"
      alignContent="center"
    >
      <Card
        width={responsiveBool ? '90%' : '85%'}
        variation="elevated"
        marginTop="50px"
        height="500px"
        marginBottom="50px"
      >
        <Flex
          direction={responsiveBool ? 'column' : 'row'}
          width="100%"
          height="100%"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
        >
          <Flex
            direction="column"
            width={responsiveBool ? '100%' : '50%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Image alt="Hero Icon" src={heroIcon} />
          </Flex>
          <Flex
            direction="column"
            width={responsiveBool ? '100%' : '50%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Heading
              level="1"
              fontWeight="bold"
              textAlign="center"
              width="100%"
            >
              HabitatApp
            </Heading>
            <Heading
              level="6"
              fontWeight="bold"
              textAlign="center"
              width="100%"
            >
              The ultimate digital transformation solution for Habitat for
              Humanity affiliates
            </Heading>
            <Text textAlign="center" width="100%">
              Our innovative platform provides seamless online tools and
              efficient automation to enhance your affiliate's operations.
            </Text>
            <Flex
              direction={responsiveBool ? 'column' : 'row'}
              justifyContent="space-between"
              width="100%"
              alignContent={responsiveBool ? 'center' : 'top'}
            >
              <Badge>Homeownership Online App</Badge>
              <Badge>Cloud Storage</Badge>
              <Badge>No paperwork</Badge>
              <Badge>Automatizations</Badge>
            </Flex>
            <Button
              variation="primary"
              onClick={() => {
                // redirect to youtube.com in another tab
                window.open('https://youtu.be/1nH2APt0Mg4', '_blank');
              }}
            >
              Watch Demo
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
