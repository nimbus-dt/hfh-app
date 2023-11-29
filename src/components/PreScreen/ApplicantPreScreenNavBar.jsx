/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { Image, Card, Flex, Button } from '@aws-amplify/ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import logoHabitat from '../../assets/images/logoHabitat.svg';

export function ApplicantPrescreenNavBar({ menuSlot }) {
  const navigate = useNavigate();
  const urlName = useParams().habitat;

  const handleSignIn = () => {
    navigate('./form/info', { state: { signUpBool: true } });
  };

  const handleSignOut = () => {
    Auth.signOut();
    navigate('./prelim/home');
  };

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();

      return true;
    } catch (error) {
      return false;
    }
  };

  // Use the authenticated state to conditionally render the buttons
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthState().then((authState) => {
      setIsAuthenticated(authState);
    });
  }, []);

  return (
    <Card wrap width="100%" backgroundColor="#55B949" padding="0">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Image
          alt="Habitat Logo"
          src={logoHabitat}
          height="100%"
          marginLeft="-10px"
        />
        <Flex marginRight="40px">
          {isAuthenticated && (
            <Button backgroundColor="white" onClick={handleSignOut}>
              Sign Out
            </Button>
          )}
          {!isAuthenticated && (
            <Button backgroundColor="white" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
