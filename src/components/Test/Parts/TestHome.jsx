import {
  View,
  Flex,
  Text,
  Heading,
  Button,
  Authenticator,
  ThemeProvider,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import useHabitatByUrlName from 'hooks/services/useHabitatByUrlName';
import { SubmissionStatus } from 'models';
import { CustomCard } from '../Reusable/CustomCard';

export function TestHome() {
  const { application } = useOutletContext();
  const navigate = useNavigate();
  const { habitat: habitatUrlName, isAuthenticated } = useParams();
  const { habitat, error } = useHabitatByUrlName({
    habitatUrlName,
  });
  const isReallySmall = useBreakpointValue({
    base: true,
    small: false,
  });

  if (error) {
    console.log('Error retrieving Habitat:', error.message);
  }

  const content =
    application &&
    application.submissionStatus === SubmissionStatus.SUBMITTED ? (
      <>
        <Text fontWeight="bold">
          {`You have succesfully submitted your Homeownership Program application
        for ${habitat?.name}. You will receive an email with updates on your
        application.`}
        </Text>
        <Flex justifyContent="end">
          <Link to="../review">
            <Button variation="primary">Review</Button>
          </Link>
        </Flex>
      </>
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
                form: {
                  padding: isReallySmall ? '0.25rem' : undefined,
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
