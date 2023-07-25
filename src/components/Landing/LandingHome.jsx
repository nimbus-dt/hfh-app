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
      height="100%"
      backgroundColor="#34548c"
      alignItems="center"
      alignContent="center"
    >
      <Card width="80%" variation="elevated" height="80%" marginTop="100px">
        <Flex
          direction={responsiveBool ? 'column' : 'row'}
          width="100%"
          height="100%"
          justifyContent={responsiveBool ? 'center' : 'space-between'}
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
              Habitat-App
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
              Our innovative platform revolutionizes the application process for
              the Homeownership Program, providing seamless online tools and
              efficient automation to enhance your franchise's operations.
            </Text>
            <Flex
              direction={responsiveBool ? 'column' : 'row'}
              justifyContent="space-between"
              width="100%"
            >
              <Badge>Email Notifications</Badge>
              <Badge>Automated Calculations</Badge>
              <Badge>Cloud Storage</Badge>
              <Badge>No paperwork</Badge>
            </Flex>
            <Button
              variation="primary"
              onClick={() => {
                // redirect to youtube.com in another tab
                window.open(
                  'https://www.loom.com/share/d5430caf09d4462492b701794daa09d4?sid=8376f173-52f0-413f-9be4-141771c3a373',
                  '_blank'
                );
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
