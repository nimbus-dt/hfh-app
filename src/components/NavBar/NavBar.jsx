/* eslint-disable react/prop-types */
import {
  Image,
  Card,
  Flex,
  Button,
  Text,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { MdLogout } from 'react-icons/md';
import logoHabitat from '../../assets/images/trace.svg';

export default function NavBar({ isAuthenticated }) {
  const boolMobile = useBreakpointValue({
    base: true,
    small: false,
  });

  const handleSignOut = async () => {
    await Auth.signOut();
  };

  return (
    <Card wrap width="100%" backgroundColor="#55B949" padding="0">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Image
          alt="Habitat Logo"
          src={logoHabitat}
          height="100%"
          marginLeft="-10px"
        />
        {isAuthenticated && (
          <Button
            variation="link"
            color="black"
            backgroundColor="white"
            marginRight="1rem"
            onClick={handleSignOut}
            padding={boolMobile && '0.5rem'}
          >
            <Flex gap="0.5rem">
              <MdLogout size="1.5rem" />
              {!boolMobile && <Text>Sign out</Text>}
            </Flex>
          </Button>
        )}
      </Flex>
    </Card>
  );
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
};
