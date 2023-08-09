import { Flex, Link, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

export function LandingFooter() {
  const navigate = useNavigate();

  const responsiveBool = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });

  const big = (
    <Flex
      direction="column"
      width="100%"
      backgroundColor="white"
      alignItems="center"
      justifyContent="space-between"
      height="fit-content"
      // gap="50px"
    >
      <Flex
        direction={responsiveBool ? 'column' : 'row'}
        width="90%"
        backgroundColor="white"
        alignItems="center"
        justifyContent="space-between"
        height="fit-content"
        overflow="hidden"
        paddingTop={responsiveBool ? '5%' : '2%'}
      >
        <Link onClick={() => navigate('/')}>Home</Link>
        <Link onClick={() => navigate('/about')}>About us</Link>
        <Link onClick={() => navigate('/privacy')}>Privacy Policy</Link>
        <Link onClick={() => navigate('/terms')}>Terms of Use</Link>
        <Link onClick={() => navigate('/return')}>Return Policy</Link>
        <Link onClick={() => navigate('/pricing')}>Pricing</Link>
        <Link onClick={() => navigate('/contact')}>Contact</Link>
      </Flex>
      <Flex
        direction="column"
        width="90%"
        backgroundColor="white"
        alignItems="center"
        height="fit-content"
      >
        <Flex
          direction="column"
          alignContent="center"
          width="100%"
          gap="0.5px"
          marginBottom="10px"
        >
          <Text textAlign="center" color="gray">
            Nimbus S.A de C.V
          </Text>
          <Text textAlign="center" color="gray">
            www.habitat-app.org © 2023
          </Text>
          <Text textAlign="center" color="gray">
            support@nimbus-dt.com
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );

  return big;
}
