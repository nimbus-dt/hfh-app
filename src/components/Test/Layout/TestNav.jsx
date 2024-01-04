/* eslint-disable react/prop-types */
import { Image, Card, Flex, Button } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import logoHabitat from '../../../assets/images/logoHabitat.svg';

export function TestNav({ isAuthenticated }) {
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
            marginRight="1rem"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        )}
      </Flex>
    </Card>
  );
}

TestNav.propTypes = {
  isAuthenticated: PropTypes.bool,
};
