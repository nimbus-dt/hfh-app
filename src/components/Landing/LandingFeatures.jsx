import {
  Button,
  Flex,
  Card,
  Heading,
  Image,
  useBreakpointValue,
  Text,
} from '@aws-amplify/ui-react';

export function LandingFeatures() {
  return (
    <Flex direction="row" width="80%" justifyContent="space-between" gap="2%">
      <Card variation="elevated" border="medium" width="20%">
        <Heading level="6" width="100%" textAlign="center">
          Streamlined Application Process
        </Heading>
        <Text textAlign="center" color="gray">
          Create customized online application forms tailored to your
          franchise's specific needs.
        </Text>
      </Card>
      <Card variation="elevated" border="medium" width="20%">
        <Heading level="6" width="100%" textAlign="center">
          Efficient Cloud Storage
        </Heading>
        <Text textAlign="center" color="gray">
          Store and access all applications securely in the cloud, eliminating
          the need for physical paperwork.
        </Text>
      </Card>
      <Card variation="elevated" border="medium" width="20%">
        <Heading level="6" width="100%" textAlign="center">
          Automated Decision Making
        </Heading>
        <Text textAlign="center" color="gray">
          Speed up the application review process with intelligent automation,
          making quick and accurate decisions.
        </Text>
      </Card>
      <Card variation="elevated" border="medium" width="20%">
        <Heading level="6" width="100%" textAlign="center">
          Real-Time Email Notifications
        </Heading>
        <Text textAlign="center" color="gray">
          Keep applicants informed in real-time with automated email
          notifications about their application status and updates.
        </Text>
      </Card>
    </Flex>
  );
}
