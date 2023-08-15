import {
  Flex,
  Card,
  Image,
  Heading,
  Text,
  ScrollView,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import logo from '../../assets/images/nimbus-logo.png';

export function LandingPricing() {
  const paddle = window.Paddle;
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
      <Card
        width={responsiveBool ? '90%' : '85%'}
        height={responsiveBool ? 'fit-content' : '80%'}
        variation="elevated"
        marginTop="5%"
        marginBottom="5%"
      >
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
            <Image src={logo} alt="Nimbus Logo" />
          </Flex>
          <Flex
            direction="column"
            width={responsiveBool ? '100%' : '50%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Heading level="5" textAlign="center">
              Pricing
            </Heading>
            <ScrollView height="50%" width="100%">
              <Flex direction="column" width="100%" height="100%" gap="10px">
                <Flex direction="column" width="100%" height="100%" gap="5px">
                  <Text fontWeight="bold">1. Free Tier</Text>
                  <Text>
                    Sign up fee: <b>$0</b> <br />
                    Monthly fee: <b>$0</b>
                  </Text>
                  <Text>
                    <ul>
                      <li>100 pre-screen forms</li>
                      <li>1 user</li>
                      <li>Email notifications when a decision has been made</li>
                      <li>Storage and processing of pre-screens</li>
                      <li>
                        Ideal for small affiliates or those just starting with
                        Habitat-App
                      </li>
                    </ul>
                  </Text>
                </Flex>
                <Flex direction="column" width="100%" height="100%" gap="5px">
                  <Text fontWeight="bold">2. Standard Tier</Text>
                  <Text>
                    Sign up fee: <b>$2000</b> <br />
                    Monthly fee: <b>$100</b>
                  </Text>
                  <Text>
                    <ul>
                      <li>1000 pre-screen forms</li>
                      <li>5 users</li>
                      <li>Email notifications when a decision has been made</li>
                      <li>Storage and processing of pre-screens</li>
                    </ul>
                  </Text>
                </Flex>
              </Flex>
            </ScrollView>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
