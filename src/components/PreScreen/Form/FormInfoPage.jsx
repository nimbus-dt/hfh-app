import {
  Flex,
  Heading,
  Text,
  View,
  Button,
  Authenticator,
} from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';

export function FormInfoPage() {
  /* CONSTS */
  const [habitat] = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const signUpBool = location.state?.signUpBool;

  return (
    <Flex direction="column" alignItems="center">
      <Authenticator hideSignUp={signUpBool}>
        <View as="div">
          <Flex marginBottom="30px" direction="column" gap="xl">
            {habitat?.props?.preScreen?.homeText?.map((item, index) => (
              <View as="div" key={index}>
                <Heading level="5">{item.title}</Heading>
                <Text>{item.text}</Text>
              </View>
            ))}
          </Flex>
          <Flex direction="column">
            <Button
              variation="primary"
              width="fit-content"
              onClick={() => navigate('../user')}
            >
              Next
            </Button>
          </Flex>
        </View>
      </Authenticator>
    </Flex>
  );
}
