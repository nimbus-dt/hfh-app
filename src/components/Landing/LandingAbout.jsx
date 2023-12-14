import {
  Flex,
  Card,
  Image,
  Heading,
  Text,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import logo from '../../assets/images/nimbus-logo.png';

export function LandingAbout() {
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
        marginBottom="50px"
        height="500px"
      >
        <Flex
          direction={responsiveBool ? 'column' : 'row'}
          width="100%"
          height="100%"
          alignContent="center"
          justifyContent={responsiveBool ? 'center' : 'space-between'}
        >
          <Flex
            direction="column"
            width={responsiveBool ? '100%' : '50%'}
            height="100%"
            alignItems="stretch"
            justifyContent="center"
          >
            <Image src={logo} alt="Nimbus Logo" />
          </Flex>
          <Flex
            direction="column"
            width={responsiveBool ? '100%' : '50%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
            alignContent="space-between"
            alignSelf="center"
          >
            <Heading level="5" textAlign="center">
              Nimbus: your partner in digital transformations
            </Heading>
            <Text textAlign="center" alignself="center">
              Nimbus, founded by{' '}
              <a
                href="https://www.linkedin.com/in/jose-guillermo-avelar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guillermo Avelar
              </a>
              , specializes in custom SaaS products for digital transformations.
              Leveraging cloud technologies and AI, our solutions provide secure
              access to powerful applications across devices. We streamline
              operations, enhance collaboration, and enable effortless scaling
              for businesses in the digital era.
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
