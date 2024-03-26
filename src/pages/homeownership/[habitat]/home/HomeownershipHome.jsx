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
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { SubmissionStatus } from 'models';
import CustomCard from 'components/CustomCard';
import DOMPurify from 'dompurify';

export default function HomeownershipHomePage() {
  const { application, habitat, openCycle } = useOutletContext();
  const navigate = useNavigate();

  const isReallySmall = useBreakpointValue({
    base: true,
    small: false,
  });

  const content = () => {
    if (
      application &&
      (openCycle || application.submissionStatus === SubmissionStatus.RETURNED)
    ) {
      return application.submissionStatus === SubmissionStatus.SUBMITTED ? (
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
              <View
                as="div"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    habitat?.props.homeownershipHomeText
                  ),
                }}
              />
            </Flex>
          </View>
          <Flex justifyContent="end" width="100%">
            <Button variation="primary" onClick={() => navigate('../terms')}>
              Next
            </Button>
          </Flex>
        </>
      );
    }

    return (
      <Text fontWeight="bold">{habitat?.props.homeownershipNoOpenCycle}</Text>
    );
  };

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
        <Authenticator>{content}</Authenticator>
      </ThemeProvider>
    </CustomCard>
  );
}
