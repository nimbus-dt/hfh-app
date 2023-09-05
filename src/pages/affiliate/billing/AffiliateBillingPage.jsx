import { Alert, Divider, Flex, Heading } from '@aws-amplify/ui-react';

export function AffiliateBillingPage() {
  return (
    <Flex direction="column" width="100%" height="100%">
      <Heading level={3} fontWeight="bold" textAlign="center">
        Billing
      </Heading>

      <Divider />

      <Alert
        key={alert.key}
        variation="warning"
        isDismissible={false}
        hasIcon
        marginTop="4rem"
        marginBottom="4rem"
      >
        Billing information will be available soon
      </Alert>
    </Flex>
  );
}
