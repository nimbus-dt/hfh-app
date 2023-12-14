import { Flex, Heading, Divider, Badge } from '@aws-amplify/ui-react';

export function AffiliateVolunteersPage() {
  return (
    <Flex
      direction="column"
      width="100%"
      alignContent="center"
      justifyContent="center"
    >
      <Heading level={3} fontWeight="bold" textAlign="center">
        Repairs
      </Heading>
      <Divider />
      <Badge variation="warning" width="100%">
        This page is currently under construction
      </Badge>
    </Flex>
  );
}
