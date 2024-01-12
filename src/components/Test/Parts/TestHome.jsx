import {
  View,
  Flex,
  Text,
  Heading,
  Button,
  Authenticator,
  ThemeProvider,
} from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import useHabitatByUrlName from 'hooks/services/useHabitatByUrlName';
import { CustomCard } from '../Reusable/CustomCard';

export function TestHome() {
  const { application } = useOutletContext();
  const navigate = useNavigate();
  const { habitat: habitatUrlName, isAuthenticated } = useParams();
  const { habitat, error } = useHabitatByUrlName({
    habitatUrlName,
  });

  if (error) {
    console.log('Error retrieving Habitat:', error.message);
  }

  const content =
    application && application.submitted ? (
      <Text fontWeight="bold">
        You've submitted an application already, wait for an update on your
        application.
      </Text>
    ) : (
      <>
        <View as="div">
          <Flex marginBottom="30px" direction="column" gap="xl">
            {habitat?.props?.prePreScreen?.prePreScreenHomeText?.map(
              (item, index) => (
                <View as="div" key={index}>
                  <Heading level="5">{item.title}</Heading>
                  <Text>{item.text}</Text>
                </View>
              )
            )}
          </Flex>
        </View>
        <Flex justifyContent="end" width="100%">
          <Button variation="primary" onClick={() => navigate('../terms')}>
            Next
          </Button>
        </Flex>
      </>
    );

  return (
    <CustomCard>
      <ThemeProvider
        theme={{
          name: 'homeownership-authentication',
          tokens: {
            components: {
              authenticator: {
                container: {
                  widthMax: '100%',
                },
                router: {
                  borderStyle: 'none',
                  boxShadow: 'none',
                },
              },
            },
          },
        }}
      >
        <Authenticator hideSignUp={isAuthenticated}>{content}</Authenticator>
      </ThemeProvider>
    </CustomCard>
  );
}
